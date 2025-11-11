import fs from 'fs-extra'
import path from 'path'
import { CustomCommand } from '../types'

/**
 * Get command content for a specific custom command
 */
function getCommandContent(commandType: CustomCommand): string {
  const commands: Record<CustomCommand, string> = {
    'review-pr': `Review the pull request and provide feedback on:

1. **Code Quality**
   - Check for code smells and anti-patterns
   - Verify adherence to coding standards
   - Look for potential bugs or edge cases

2. **Testing**
   - Ensure tests cover the new changes
   - Check test quality and coverage
   - Verify test naming and organization

3. **Documentation**
   - Check if code is properly documented
   - Verify README updates if needed
   - Ensure API documentation is current

4. **Security**
   - Look for potential security vulnerabilities
   - Check for sensitive data exposure
   - Verify input validation

5. **Performance**
   - Identify potential performance issues
   - Check for unnecessary computations
   - Look for optimization opportunities

Provide constructive feedback with specific suggestions for improvement.
`,
    'generate-tests': `Generate comprehensive tests for the selected code.

Please create tests that:

1. **Unit Tests**
   - Test individual functions/methods in isolation
   - Cover edge cases and error conditions
   - Use descriptive test names

2. **Test Structure**
   - Follow the Arrange-Act-Assert pattern
   - Group related tests in describe blocks
   - Use appropriate test fixtures and mocks

3. **Coverage**
   - Test happy paths
   - Test error conditions
   - Test boundary conditions

4. **Best Practices**
   - Keep tests focused and single-purpose
   - Make tests independent and repeatable
   - Use meaningful assertions

Generate the tests using the project's testing framework (Jest, Mocha, etc.).
`,
    refactor: `Refactor the selected code to improve its quality.

Focus on:

1. **Code Organization**
   - Extract complex logic into smaller functions
   - Improve naming for clarity
   - Remove code duplication

2. **Simplification**
   - Reduce complexity and nesting
   - Simplify conditional logic
   - Remove unnecessary code

3. **Best Practices**
   - Apply SOLID principles
   - Use appropriate design patterns
   - Follow language-specific idioms

4. **Maintainability**
   - Improve readability
   - Add helpful comments where needed
   - Make code more testable

Ensure the refactored code:
- Maintains the same functionality
- Includes tests to verify behavior
- Improves code quality metrics
`,
    documentation: `Generate comprehensive documentation for the selected code.

Create documentation that includes:

1. **Overview**
   - Purpose and functionality
   - Key features and capabilities
   - Use cases and examples

2. **API Documentation**
   - Function/method signatures
   - Parameter descriptions
   - Return values
   - Exceptions/errors

3. **Usage Examples**
   - Basic usage examples
   - Advanced scenarios
   - Common patterns

4. **Technical Details**
   - Implementation notes
   - Performance considerations
   - Dependencies and requirements

Format the documentation using:
- JSDoc/TSDoc for code comments
- Markdown for README files
- Clear and concise language
`,
    deploy: `Prepare the application for deployment.

Complete the following deployment checklist:

1. **Pre-deployment Checks**
   - Run all tests and ensure they pass
   - Run linter and fix any issues
   - Check for security vulnerabilities
   - Verify environment variables

2. **Build Process**
   - Create production build
   - Optimize assets (if applicable)
   - Verify build output

3. **Configuration**
   - Check production configurations
   - Verify API endpoints
   - Ensure secrets are properly managed

4. **Deployment**
   - Document deployment steps
   - Create deployment scripts if needed
   - Set up CI/CD pipeline (if not exists)

5. **Post-deployment**
   - Verify deployment success
   - Check application health
   - Monitor for errors

Provide a deployment guide and checklist for the team.
`
  }

  return commands[commandType]
}

/**
 * Get command description for documentation
 */
function getCommandDescription(commandType: CustomCommand): string {
  const descriptions: Record<CustomCommand, string> = {
    'review-pr': 'Comprehensive code review for pull requests',
    'generate-tests': 'Generate unit tests for selected code',
    refactor: 'Refactor code to improve quality and maintainability',
    documentation: 'Generate comprehensive documentation',
    deploy: 'Deployment checklist and preparation'
  }

  return descriptions[commandType]
}

/**
 * Install selected custom commands into the project
 */
export async function installCustomCommands(
  projectPath: string,
  commands: CustomCommand[]
): Promise<void> {
  if (!commands || commands.length === 0) {
    return
  }

  // Create .claude/commands directory
  const commandsDir = path.join(projectPath, '.claude', 'commands')
  await fs.ensureDir(commandsDir)

  // Install each command
  for (const command of commands) {
    const commandContent = getCommandContent(command)
    const commandPath = path.join(commandsDir, `${command}.md`)

    await fs.writeFile(commandPath, commandContent)
  }

  // Create README for commands
  const readmeContent = generateCommandsReadme(commands)
  const readmePath = path.join(commandsDir, 'README.md')
  await fs.writeFile(readmePath, readmeContent)
}

/**
 * Generate README documentation for installed commands
 */
function generateCommandsReadme(commands: CustomCommand[]): string {
  let readme = `# Claude Code Custom Commands

This project has been configured with the following custom slash commands:

`

  commands.forEach((command) => {
    readme += `## /${command}\n\n`
    readme += `${getCommandDescription(command)}\n\n`
    readme += `**Usage:** Type \`/${command}\` in Claude Code to execute this command.\n\n`
    readme += `**File:** \`.claude/commands/${command}.md\`\n\n`
  })

  readme += `## How to Use Custom Commands

Custom commands are invoked using the slash notation in Claude Code:

\`\`\`
/command-name
\`\`\`

For example:
- \`/review-pr\` - Review current pull request
- \`/generate-tests\` - Generate tests for selected code
- \`/refactor\` - Refactor selected code

## Creating Your Own Commands

You can create custom commands by adding new markdown files to \`.claude/commands/\`:

1. Create a new file: \`.claude/commands/my-command.md\`
2. Write the command instructions in markdown
3. Use the command with \`/my-command\` in Claude Code

## Command Best Practices

- Keep instructions clear and specific
- Break down complex tasks into steps
- Include examples when helpful
- Use numbered or bulleted lists for structure

## Editing Commands

To modify an existing command:

1. Navigate to \`.claude/commands/\`
2. Edit the markdown file for the command
3. Save your changes
4. The command will use the updated instructions immediately

## More Information

For more details about Claude Code custom commands, visit:
- https://docs.claude.com/claude-code/commands

`

  return readme
}

/**
 * Get list of available custom commands with descriptions
 */
export function getAvailableCustomCommands(): Array<{ name: CustomCommand; description: string }> {
  return [
    { name: 'review-pr', description: 'Comprehensive pull request code review' },
    { name: 'generate-tests', description: 'Generate unit tests for code' },
    { name: 'refactor', description: 'Refactor code for better quality' },
    { name: 'documentation', description: 'Generate comprehensive docs' },
    { name: 'deploy', description: 'Deployment preparation checklist' }
  ]
}
