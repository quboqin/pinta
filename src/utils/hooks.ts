import fs from 'fs-extra'
import path from 'path'
import { HookType } from '../types'

/**
 * Get hook script content for a specific hook type
 */
function getHookScript(hookType: HookType): string {
  const scripts: Record<HookType, string> = {
    'pre-commit': `#!/bin/bash
# Pre-commit hook - runs before each commit
# This hook runs linting and formatting checks

echo "Running pre-commit checks..."

# Run linter
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting failed. Please fix the errors before committing."
  exit 1
fi

# Run formatter check
npm run format:check 2>/dev/null || true

echo "✅ Pre-commit checks passed!"
exit 0
`,
    'post-commit': `#!/bin/bash
# Post-commit hook - runs after each commit
# This hook can be used for notifications or automated tasks

COMMIT_MSG=$(git log -1 --pretty=%B)
COMMIT_HASH=$(git log -1 --pretty=%H)

echo "📝 Commit created: $COMMIT_HASH"
echo "Message: $COMMIT_MSG"

# Optional: Add notifications or automated tasks here
# Example: Send notification to team chat
# Example: Trigger CI/CD pipeline
# Example: Update project documentation

exit 0
`,
    'user-prompt-submit': `#!/bin/bash
# User prompt submit hook - runs when user submits a prompt to Claude Code
# This hook can validate or modify user prompts

# Read the prompt from stdin
PROMPT=$(cat)

# Optional: Add prompt validation or enhancement logic here
# Example: Check for required context
# Example: Add project-specific instructions
# Example: Log prompts for analysis

# Output the (potentially modified) prompt
echo "$PROMPT"

exit 0
`,
    'tool-result': `#!/bin/bash
# Tool result hook - runs after each tool execution
# This hook can process or validate tool results

# Read the tool result from stdin
TOOL_RESULT=$(cat)

# Optional: Add result processing logic here
# Example: Log tool executions
# Example: Validate tool outputs
# Example: Trigger follow-up actions

# Output the (potentially modified) result
echo "$TOOL_RESULT"

exit 0
`
  }

  return scripts[hookType]
}

/**
 * Get hook description for documentation
 */
function getHookDescription(hookType: HookType): string {
  const descriptions: Record<HookType, string> = {
    'pre-commit': 'Runs linting and formatting checks before each commit',
    'post-commit': 'Runs after each commit for notifications or automated tasks',
    'user-prompt-submit': 'Validates or modifies user prompts before sending to Claude Code',
    'tool-result': 'Processes or validates tool results after execution'
  }

  return descriptions[hookType]
}

/**
 * Install selected hooks into the project
 */
export async function installHooks(projectPath: string, hooks: HookType[]): Promise<void> {
  if (!hooks || hooks.length === 0) {
    return
  }

  console.log('\n🪝 Setting up Claude Code Hooks...\n')

  // Create .claude/hooks directory
  const hooksDir = path.join(projectPath, '.claude', 'hooks')
  await fs.ensureDir(hooksDir)

  // Install each hook
  for (const hook of hooks) {
    console.log(`   📝 Installing ${hook} hook...`)
    const hookScript = getHookScript(hook)
    const hookPath = path.join(hooksDir, `${hook}.sh`)

    await fs.writeFile(hookPath, hookScript)
    await fs.chmod(hookPath, '755') // Make executable
  }

  // Create README for hooks
  const readmeContent = generateHooksReadme(hooks)
  const readmePath = path.join(hooksDir, 'README.md')
  await fs.writeFile(readmePath, readmeContent)

  // Update package.json scripts if pre-commit hook is installed
  if (hooks.includes('pre-commit')) {
    await updatePackageJsonForHooks(projectPath)
  }

  console.log('\n✅ Hooks installed successfully!')
  console.log(`📂 Hook scripts saved to: .claude/hooks/`)
  console.log(`📖 Documentation: .claude/hooks/README.md\n`)
}

/**
 * Generate README documentation for installed hooks
 */
function generateHooksReadme(hooks: HookType[]): string {
  let readme = `# Claude Code Hooks

This project has been configured with the following Claude Code hooks:

`

  hooks.forEach((hook) => {
    readme += `## ${hook}\n\n`
    readme += `${getHookDescription(hook)}\n\n`
    readme += `**Script location:** \`.claude/hooks/${hook}.sh\`\n\n`

    if (hook === 'pre-commit') {
      readme += `**Note:** Make sure your project has \`lint\` script defined in package.json.\n\n`
    }
  })

  readme += `## How Hooks Work

Claude Code hooks are shell scripts that execute at specific points:

- **pre-commit**: Runs before creating a git commit
- **post-commit**: Runs after a git commit is created
- **user-prompt-submit**: Runs when you submit a prompt to Claude
- **tool-result**: Runs after Claude executes a tool

## Customizing Hooks

You can modify these hook scripts to fit your project's needs:

1. Navigate to \`.claude/hooks/\`
2. Edit the hook script you want to customize
3. Make sure the script remains executable (\`chmod +x hook-name.sh\`)
4. Test your changes

## Disabling Hooks

To temporarily disable a hook:
- Rename it with a \`.disabled\` extension (e.g., \`pre-commit.sh.disabled\`)

To permanently remove a hook:
- Delete the hook script file

## More Information

For more details about Claude Code hooks, visit:
- https://docs.claude.com/claude-code/hooks

`

  return readme
}

/**
 * Update package.json to include format:check script if needed
 */
async function updatePackageJsonForHooks(projectPath: string): Promise<void> {
  const packageJsonPath = path.join(projectPath, 'package.json')

  try {
    const packageJson = await fs.readJson(packageJsonPath)

    // Add format:check script if it doesn't exist
    if (packageJson.scripts && !packageJson.scripts['format:check']) {
      packageJson.scripts['format:check'] =
        'prettier --check "src/**/*.{ts,tsx,js,jsx,json,css,md}"'
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
    }
  } catch (error) {
    // If package.json doesn't exist yet, that's okay
    console.warn('Could not update package.json for hooks')
  }
}

/**
 * Get list of available hooks with descriptions
 */
export function getAvailableHooks(): Array<{ name: HookType; description: string }> {
  return [
    { name: 'pre-commit', description: 'Run checks before each commit' },
    { name: 'post-commit', description: 'Run tasks after each commit' },
    { name: 'user-prompt-submit', description: 'Validate/modify prompts to Claude' },
    { name: 'tool-result', description: 'Process tool execution results' }
  ]
}
