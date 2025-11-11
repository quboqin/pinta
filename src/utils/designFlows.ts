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
  console.log('📦 Installing BMad Method...')

  try {
    // Run npx bmad-method@alpha install
    await execa('npx', ['bmad-method@alpha', 'install'], {
      cwd: projectPath,
      stdio: 'inherit'
    })

    console.log('✅ BMad Method installed successfully!')
  } catch (error) {
    console.error('❌ Failed to install BMad Method:', error)
    throw new Error(
      'BMad Method installation failed. Please install manually using: npx bmad-method@alpha install'
    )
  }
}

/**
 * Install Spec Kits
 */
async function installSpecKits(projectPath: string): Promise<void> {
  console.log('📦 Installing Spec Kits...')

  // Check if uv is installed
  const hasUv = await commandExists('uv')

  if (!hasUv) {
    console.warn('⚠️  uv is not installed. Installing Spec Kits requires uv.')
    console.log('Please install uv first: curl -LsSf https://astral.sh/uv/install.sh | sh')
    console.log('Or visit: https://docs.astral.sh/uv/')

    // Create instructions file
    const instructionsPath = path.join(projectPath, '.specify', 'INSTALL_INSTRUCTIONS.md')
    await fs.ensureDir(path.dirname(instructionsPath))
    await fs.writeFile(
      instructionsPath,
      `# Spec Kits Installation Instructions

Spec Kits requires \`uv\` to be installed. Please follow these steps:

## 1. Install uv

**macOS/Linux:**
\`\`\`bash
curl -LsSf https://astral.sh/uv/install.sh | sh
\`\`\`

**Windows:**
\`\`\`powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
\`\`\`

Or visit: https://docs.astral.sh/uv/

## 2. Install Spec Kits

Once uv is installed, run:

\`\`\`bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
\`\`\`

## 3. Initialize Spec Kits

In your project directory, run:

\`\`\`bash
specify init --here --ai claude --force
\`\`\`

## More Information

- GitHub: https://github.com/github/spec-kit
- Documentation: https://github.github.io/spec-kit/
`
    )

    console.log(`📄 Installation instructions saved to: .specify/INSTALL_INSTRUCTIONS.md`)
    return
  }

  try {
    // Install specify-cli using uv
    console.log('Installing specify-cli tool...')
    await execa(
      'uv',
      ['tool', 'install', 'specify-cli', '--from', 'git+https://github.com/github/spec-kit.git'],
      {
        stdio: 'inherit'
      }
    )

    // Initialize in project directory
    console.log('Initializing Spec Kits in project...')
    await execa('specify', ['init', '--here', '--ai', 'claude', '--force'], {
      cwd: projectPath,
      stdio: 'inherit'
    })

    console.log('✅ Spec Kits installed successfully!')
  } catch (error) {
    console.error('❌ Failed to install Spec Kits:', error)

    // Create fallback instructions
    const instructionsPath = path.join(projectPath, '.specify', 'INSTALL_INSTRUCTIONS.md')
    await fs.ensureDir(path.dirname(instructionsPath))
    await fs.writeFile(
      instructionsPath,
      `# Spec Kits Installation Failed

Automatic installation failed. Please install manually:

## Manual Installation Steps

### 1. Install specify-cli
\`\`\`bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
\`\`\`

### 2. Initialize in this project
\`\`\`bash
cd ${projectPath}
specify init --here --ai claude --force
\`\`\`

## Alternative: Use without installation
\`\`\`bash
uvx --from git+https://github.com/github/spec-kit.git specify init --here --ai claude --force
\`\`\`

## More Information
- GitHub: https://github.com/github/spec-kit
- Documentation: https://github.github.io/spec-kit/

## Error Details
${error}
`
    )

    console.log(`📄 Manual installation instructions saved to: .specify/INSTALL_INSTRUCTIONS.md`)
  }
}

/**
 * Install selected design flows into the project
 */
export async function installDesignFlows(projectPath: string, flows: DesignFlow[]): Promise<void> {
  if (!flows || flows.length === 0) {
    return
  }

  console.log('\n🎨 Installing Design Flows...\n')

  // Create design-flows directory for documentation
  const designFlowsDir = path.join(projectPath, 'docs', 'design-flows')
  await fs.ensureDir(designFlowsDir)

  // Install each design flow
  for (const flow of flows) {
    const info = getDesignFlowInfo(flow)
    console.log(`\n📚 Installing ${info.name}...`)
    console.log(`   Repository: ${info.repo}`)
    console.log(`   Command: ${info.installCmd}\n`)

    try {
      if (flow === 'bmad') {
        await installBMad(projectPath)
      } else if (flow === 'spec-kits') {
        await installSpecKits(projectPath)
      }

      // Create installation documentation
      const flowDir = path.join(designFlowsDir, flow)
      await fs.ensureDir(flowDir)

      const installDoc = `# ${info.name} - Installed

This project has ${info.name} installed and configured.

## Repository
${info.repo}

## Installation Command Used
\`\`\`bash
${info.installCmd}
\`\`\`

${info.initCmd ? `## Initialization Command\n\`\`\`bash\n${info.initCmd}\n\`\`\`\n` : ''}

## What Was Installed

${
  flow === 'bmad'
    ? `- \`bmad/\` directory with the complete BMad framework
- Core agents and workflows
- BMad Method module (BMM) with 12 specialized agents
- 34 workflows for AI-driven agile development
- Configuration in \`bmad/_cfg/\` for customization

## Getting Started

1. Load any agent from \`bmad/\` in your AI assistant (Claude Code, Cursor, etc.)
2. Run \`*workflow-init\` to set up your project workflow
3. Follow the Quick Start guide: https://github.com/bmad-code-org/BMAD-METHOD#-quick-start

## Documentation

- Complete documentation: https://github.com/bmad-code-org/BMAD-METHOD
- Quick Start: https://github.com/bmad-code-org/BMAD-METHOD/blob/main/src/modules/bmm/docs/quick-start.md
- Agents Guide: https://github.com/bmad-code-org/BMAD-METHOD/blob/main/src/modules/bmm/docs/agents-guide.md`
    : `- \`.specify/\` directory with Spec Kit templates and scripts
- Project constitution template
- Spec, plan, and task templates
- AI agent slash commands (/speckit.*)
- Scripts for managing features and specifications

## Getting Started

1. Launch your AI assistant in the project directory
2. Use \`/speckit.constitution\` to create project principles
3. Use \`/speckit.specify\` to create specifications
4. Use \`/speckit.plan\` to create technical plans
5. Use \`/speckit.tasks\` to break down into tasks
6. Use \`/speckit.implement\` to execute implementation

## Documentation

- Complete guide: https://github.com/github/spec-kit/blob/main/spec-driven.md
- Repository: https://github.com/github/spec-kit
- Documentation: https://github.github.io/spec-kit/`
}

## Support

For issues or questions:
- GitHub Issues: ${info.repo}/issues
- Documentation: ${info.repo}#readme
`

      await fs.writeFile(path.join(flowDir, 'INSTALLED.md'), installDoc)
    } catch (error) {
      console.error(`❌ Failed to install ${info.name}:`, error)
      // Continue with other flows even if one fails
    }
  }

  // Create overview README
  const readmeContent = generateDesignFlowsReadme(flows)
  const readmePath = path.join(designFlowsDir, 'README.md')
  await fs.writeFile(readmePath, readmeContent)

  console.log('\n✅ Design Flows installation complete!\n')
}

/**
 * Generate README for installed design flows
 */
function generateDesignFlowsReadme(flows: DesignFlow[]): string {
  let readme = `# Design Flows - Installed

This project has the following AI design workflows installed:

`

  flows.forEach((flow) => {
    const info = getDesignFlowInfo(flow)
    const flowName = flow === 'bmad' ? 'BMad Method' : 'Spec Kits'
    readme += `## ${flowName}\n\n`
    readme += `${getDesignFlowDescription(flow)}\n\n`
    readme += `**Repository**: [${info.repo}](${info.repo})\n\n`
    readme += `**Installation Guide**: [${flow}/INSTALLED.md](./${flow}/INSTALLED.md)\n\n`
  })

  readme += `## Installed Tools

`

  if (flows.includes('bmad')) {
    readme += `### BMad Method

The BMad Method has been installed in the \`bmad/\` directory.

**Key Components:**
- **bmad/core/** - Core framework with BMad Master agent
- **bmad/bmm/** - BMad Method module (12 agents, 34 workflows)
- **bmad/_cfg/** - Your customization directory

**Next Steps:**
1. Load any agent from \`bmad/\` in your AI assistant
2. Run \`*workflow-init\` to initialize your workflow
3. Choose your planning track (Quick Flow, BMad Method, or Enterprise)

**Documentation:** [bmad/INSTALLED.md](./bmad/INSTALLED.md)

`
  }

  if (flows.includes('spec-kits')) {
    readme += `### Spec Kits

Spec Kits has been installed in the \`.specify/\` directory.

**Key Components:**
- **.specify/memory/** - Project constitution and memory
- **.specify/scripts/** - Automation scripts
- **.specify/templates/** - Spec, plan, and task templates

**Next Steps:**
1. Launch your AI assistant in the project directory
2. Use \`/speckit.constitution\` to establish project principles
3. Use \`/speckit.specify\` to create feature specifications
4. Follow the spec-driven development workflow

**Documentation:** [spec-kits/INSTALLED.md](./spec-kits/INSTALLED.md)

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

## Troubleshooting

If you encounter any installation issues, check the individual INSTALLED.md files for each flow for detailed troubleshooting steps and manual installation instructions.
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
