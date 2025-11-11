import fs from 'fs-extra'
import path from 'path'
import { execa } from 'execa'
import { DesignFlow } from '../types'

/**
 * Get design flow installation info
 */
function getDesignFlowInfo(flow: DesignFlow): {
  name: string
  repo: string
  installCmd: string
  initCmd?: string
} {
  const info: Record<
    DesignFlow,
    { name: string; repo: string; installCmd: string; initCmd?: string }
  > = {
    bmad: {
      name: 'BMad Method',
      repo: 'https://github.com/bmad-code-org/BMAD-METHOD',
      installCmd: 'npx bmad-method@alpha install',
      initCmd: undefined // Installation handles initialization
    },
    'spec-kits': {
      name: 'Spec Kits',
      repo: 'https://github.com/github/spec-kit',
      installCmd: 'uv tool install specify-cli --from git+https://github.com/github/spec-kit.git',
      initCmd: 'specify init --here --ai claude --force'
    }
  }

  return info[flow]
}

/**
 * Check if command exists
 */
async function commandExists(command: string): Promise<boolean> {
  try {
    await execa('which', [command])
    return true
  } catch {
    return false
  }
}

/**
 * Install BMad Method
 */
async function installBMad(projectPath: string): Promise<void> {
  console.log('📦 Setting up BMad Method installation instructions...')

  // Create instructions file since BMad installer is interactive
  const bmadDir = path.join(projectPath, 'docs', 'design-flows', 'bmad')
  await fs.ensureDir(bmadDir)

  const instructionsPath = path.join(bmadDir, 'INSTALL_INSTRUCTIONS.md')
  await fs.writeFile(
    instructionsPath,
    `# BMad Method Installation Instructions

BMad Method requires an interactive installation process. Please follow these steps after your Pinta project is created:

## Installation Steps

### 1. Navigate to your project directory
\`\`\`bash
cd ${path.basename(projectPath)}
\`\`\`

### 2. Run the BMad installer
\`\`\`bash
npx bmad-method@alpha install
\`\`\`

### 3. Follow the interactive prompts
The installer will ask you to:
- Select modules (BMM, BMB, CIS)
- Configure your name and preferences
- Choose language settings
- Set up IDE integration

### 4. Verify installation
After installation, you should see a \`bmad/\` directory in your project with:
- \`bmad/core/\` - Core framework + BMad Master agent
- \`bmad/bmm/\` - BMad Method (12 agents, 34 workflows)
- \`bmad/bmb/\` - BMad Builder (optional)
- \`bmad/cis/\` - Creative Intelligence Suite (optional)
- \`bmad/_cfg/\` - Your customization directory

## Getting Started

After installation:
1. Load any agent from \`bmad/\` in your AI assistant (Claude Code, Cursor, etc.)
2. Run \`*workflow-init\` to set up your project workflow
3. Choose your planning track (Quick Flow, BMad Method, or Enterprise)

## Documentation

- **Repository**: https://github.com/bmad-code-org/BMAD-METHOD
- **Quick Start**: https://github.com/bmad-code-org/BMAD-METHOD#-quick-start
- **Documentation Hub**: https://github.com/bmad-code-org/BMAD-METHOD/tree/main/src/modules/bmm/docs

## Support

- **Discord**: https://discord.gg/gk8jAdXWmj
- **GitHub Issues**: https://github.com/bmad-code-org/BMAD-METHOD/issues
- **YouTube**: https://www.youtube.com/@BMadCode

## Alternative: Install Stable Version

If you prefer the stable v4 instead of alpha:
\`\`\`bash
npx bmad-method install
\`\`\`

## Troubleshooting

If installation fails:
1. Ensure Node.js v20+ is installed
2. Check you have write permissions in the project directory
3. Try clearing npm cache: \`npm cache clean --force\`
4. See the official docs for more help
`
  )

  console.log(
    `📄 BMad installation instructions created at: docs/design-flows/bmad/INSTALL_INSTRUCTIONS.md`
  )
  console.log(
    'ℹ️  BMad requires interactive setup - please run the installer after project creation'
  )
}

/**
 * Install Spec Kits
 */
async function installSpecKits(projectPath: string): Promise<void> {
  console.log('📦 Setting up Spec Kits installation instructions...')

  // Create instructions file
  const specKitsDir = path.join(projectPath, 'docs', 'design-flows', 'spec-kits')
  await fs.ensureDir(specKitsDir)

  // Check if uv is installed
  const hasUv = await commandExists('uv')
  const uvStatus = hasUv ? '✅ Detected' : '❌ Not installed'

  const instructionsPath = path.join(specKitsDir, 'INSTALL_INSTRUCTIONS.md')
  await fs.writeFile(
    instructionsPath,
    `# Spec Kits Installation Instructions

Spec Kits requires \`uv\` Python package manager. Please follow these steps after your Pinta project is created:

## Prerequisites Check

- **uv**: ${uvStatus}
- **Python**: 3.11+ required

## Installation Steps

### 1. Install uv (if not already installed)

${
  !hasUv
    ? `**You need to install uv first:**

**macOS/Linux:**
\`\`\`bash
curl -LsSf https://astral.sh/uv/install.sh | sh
\`\`\`

**Windows:**
\`\`\`powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
\`\`\`

After installation, restart your terminal or run:
\`\`\`bash
source ~/.bashrc  # or ~/.zshrc
\`\`\`

**More info**: https://docs.astral.sh/uv/

`
    : `uv is already installed on your system. You can proceed to step 2.

`
}### 2. Install Spec Kits CLI

\`\`\`bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
\`\`\`

### 3. Navigate to your project directory

\`\`\`bash
cd ${path.basename(projectPath)}
\`\`\`

### 4. Initialize Spec Kits in your project

\`\`\`bash
specify init --here --ai claude --force
\`\`\`

This will create a \`.specify/\` directory with:
- Project constitution template
- Spec, plan, and task templates
- AI agent slash commands (/speckit.*)
- Scripts for feature management

### 5. Verify installation

After initialization, you should see:
- \`.specify/memory/\` - Project constitution and memory
- \`.specify/scripts/\` - Automation scripts
- \`.specify/templates/\` - Spec, plan, and task templates

## Alternative: One-time Usage

If you prefer not to install globally, you can use uvx:

\`\`\`bash
cd ${path.basename(projectPath)}
uvx --from git+https://github.com/github/spec-kit.git specify init --here --ai claude --force
\`\`\`

## Getting Started

After installation, launch your AI assistant and use:

1. \`/speckit.constitution\` - Create project principles
2. \`/speckit.specify\` - Create feature specifications
3. \`/speckit.plan\` - Create technical plans
4. \`/speckit.tasks\` - Break down into tasks
5. \`/speckit.implement\` - Execute implementation

## Documentation

- **Repository**: https://github.com/github/spec-kit
- **Complete Guide**: https://github.com/github/spec-kit/blob/main/spec-driven.md
- **Documentation**: https://github.github.io/spec-kit/
- **Video Overview**: https://www.youtube.com/watch?v=a9eR1xsfvHg

## Supported AI Agents

✅ Claude Code, GitHub Copilot, Gemini CLI, Cursor, Windsurf, Qwen, and more

## Troubleshooting

**If \`uv\` installation fails:**
- Check Python version: \`python3 --version\` (need 3.11+)
- Try with sudo if permission denied
- See https://docs.astral.sh/uv/ for platform-specific help

**If \`specify init\` fails:**
- Make sure you're in the project directory
- Check that uv tool directory is in PATH
- Try the uvx alternative command above
`
  )

  console.log(
    `📄 Spec Kits installation instructions created at: docs/design-flows/spec-kits/INSTALL_INSTRUCTIONS.md`
  )
  console.log(
    hasUv
      ? 'ℹ️  uv detected - you can install Spec Kits after project creation'
      : '⚠️  uv not found - please install uv first, then run the Spec Kits installer'
  )
}

/**
 * Install selected design flows into the project
 */
export async function installDesignFlows(projectPath: string, flows: DesignFlow[]): Promise<void> {
  if (!flows || flows.length === 0) {
    return
  }

  console.log('\n🎨 Setting up Design Flows...\n')

  // Create design-flows directory for documentation
  const designFlowsDir = path.join(projectPath, 'docs', 'design-flows')
  await fs.ensureDir(designFlowsDir)

  // Setup each design flow
  for (const flow of flows) {
    const info = getDesignFlowInfo(flow)
    console.log(`\n📚 Preparing ${info.name}...`)
    console.log(`   Repository: ${info.repo}\n`)

    try {
      if (flow === 'bmad') {
        await installBMad(projectPath)
      } else if (flow === 'spec-kits') {
        await installSpecKits(projectPath)
      }

      // Note: Installation instructions are created by the individual install functions
      const flowDir = path.join(designFlowsDir, flow)
      await fs.ensureDir(flowDir)

      const readmeDoc = `# ${info.name} - Ready to Install

${info.name} is configured for this project. Follow the installation instructions to complete setup.

## Repository
${info.repo}

## Next Steps

📄 **See [INSTALL_INSTRUCTIONS.md](./INSTALL_INSTRUCTIONS.md) for complete installation steps**

## Quick Summary

**Command to run after Pinta project creation:**

\`\`\`bash
${info.installCmd}
\`\`\`

${info.initCmd ? `\n**Initialization:**\n\n\`\`\`bash\n${info.initCmd}\n\`\`\`\n` : ''}

## Documentation

- Repository: ${info.repo}
- ${flow === 'bmad' ? 'Quick Start: https://github.com/bmad-code-org/BMAD-METHOD#-quick-start' : 'Complete Guide: https://github.com/github/spec-kit/blob/main/spec-driven.md'}
`

      await fs.writeFile(path.join(flowDir, 'README.md'), readmeDoc)
    } catch (error) {
      console.error(`❌ Failed to install ${info.name}:`, error)
      // Continue with other flows even if one fails
    }
  }

  // Create overview README
  const readmeContent = generateDesignFlowsReadme(flows)
  const readmePath = path.join(designFlowsDir, 'README.md')
  await fs.writeFile(readmePath, readmeContent)

  console.log('\n✅ Design Flows setup complete!\n')
  console.log('📋 Installation instructions have been created in docs/design-flows/')
  console.log('👉 Please follow the instructions after project creation to complete installation\n')
}

/**
 * Generate README for design flows setup
 */
function generateDesignFlowsReadme(flows: DesignFlow[]): string {
  let readme = `# Design Flows - Ready to Install

This project is configured with the following AI design workflows. Please complete the installation steps for each flow you selected:

`

  flows.forEach((flow) => {
    const info = getDesignFlowInfo(flow)
    const flowName = flow === 'bmad' ? 'BMad Method' : 'Spec Kits'
    readme += `## ${flowName}\n\n`
    readme += `${getDesignFlowDescription(flow)}\n\n`
    readme += `**Repository**: [${info.repo}](${info.repo})\n\n`
    readme += `**Installation Instructions**: 📄 [${flow}/INSTALL_INSTRUCTIONS.md](./${flow}/INSTALL_INSTRUCTIONS.md)\n\n`
    readme += `**Quick Reference**: [${flow}/README.md](./${flow}/README.md)\n\n`
  })

  readme += `## Installation Overview

`

  if (flows.includes('bmad')) {
    readme += `### BMad Method

**Installation Command:**
\`\`\`bash
npx bmad-method@alpha install
\`\`\`

**What Will Be Installed:**
- \`bmad/\` directory with complete framework
- 12 specialized AI agents (PM, Architect, Developer, etc.)
- 34 workflows for AI-driven agile development
- Customization directory in \`bmad/_cfg/\`

**After Installation:**
1. Load any agent from \`bmad/\` in your AI assistant
2. Run \`*workflow-init\` to set up your workflow
3. Choose your planning track

📄 [Full Instructions](./bmad/INSTALL_INSTRUCTIONS.md)

`
  }

  if (flows.includes('spec-kits')) {
    readme += `### Spec Kits

**Installation Commands:**
\`\`\`bash
# 1. Install uv (if not already installed)
curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. Install Spec Kits CLI
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# 3. Initialize in your project
specify init --here --ai claude --force
\`\`\`

**What Will Be Installed:**
- \`.specify/\` directory with templates and scripts
- AI agent slash commands (/speckit.*)
- Project constitution, spec, plan, and task templates

**After Installation:**
1. Launch your AI assistant
2. Use \`/speckit.constitution\` to create principles
3. Use \`/speckit.specify\` to create specifications

📄 [Full Instructions](./spec-kits/INSTALL_INSTRUCTIONS.md)

`
  }

  readme += `## Using Multiple Flows

You can use both methodologies together:

- **BMad for rapid development**: Use BMad's Quick Flow or iterative approach for prototyping
- **Spec Kits for structured planning**: Use Spec Kits for complex features requiring detailed specifications
- **Hybrid approach**: Start with Spec Kits for planning, then use BMad workflows for implementation

## Support & Resources

- **BMad Method**: https://github.com/bmad-code-org/BMAD-METHOD
- **Spec Kits**: https://github.com/github/spec-kit
- **Discord (BMad)**: https://discord.gg/gk8jAdXWmj

## Important Notes

⚠️ **BMad Installation**: The BMad installer is interactive and will ask you questions during setup. Make sure to complete the Pinta project creation first, then run the BMad installer.

⚠️ **Spec Kits Prerequisites**: Spec Kits requires Python 3.11+ and the \`uv\` package manager. Install \`uv\` first if you don't have it.

## Troubleshooting

If you encounter any installation issues:
- Check the individual INSTALL_INSTRUCTIONS.md files in each flow directory
- Verify prerequisites are installed (Node.js 20+ for BMad, Python 3.11+ and uv for Spec Kits)
- See the official documentation links above for platform-specific help
`

  return readme
}

/**
 * Get design flow description
 */
function getDesignFlowDescription(flow: DesignFlow): string {
  const descriptions: Record<DesignFlow, string> = {
    bmad: 'Bottom-up Methodology for AI-Driven Development - Build progressively from foundation with specialized AI agents',
    'spec-kits':
      'Specification-driven design - Plan comprehensively with executable specifications before implementation'
  }

  return descriptions[flow]
}

/**
 * Get list of available design flows with descriptions
 */
export function getAvailableDesignFlows(): Array<{ name: DesignFlow; description: string }> {
  return [
    { name: 'bmad', description: 'BMad Method - AI-driven agile development (npx install)' },
    { name: 'spec-kits', description: 'Spec Kits - Specification-driven development (requires uv)' }
  ]
}
