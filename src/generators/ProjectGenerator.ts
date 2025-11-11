import fs from 'fs-extra'
import path from 'path'
import { execa } from 'execa'
import { ProjectConfig } from '../types'
import { createPackageJson } from '../utils/packageJson'
import { createGitIgnore } from '../utils/gitignore'
import { createDocumentation } from '../utils/documentation'
import { setupCodeQuality } from '../utils/codeQuality'
import { setupVSCode } from '../utils/vscode'
import { createClaudeMd } from '../utils/claudeMd'

export class ProjectGenerator {
  private config: ProjectConfig
  private projectPath: string

  constructor(config: ProjectConfig) {
    this.config = config
    this.projectPath = path.resolve(process.cwd(), config.name)
  }

  async generate(): Promise<void> {
    // Create project directory
    await this.createProjectDirectory()

    // Generate project files based on structure
    switch (this.config.structure) {
      case 'monorepo':
        await this.generateMonorepoStructure()
        break
      case 'submodules':
        await this.generateSubmodulesStructure()
        break
      default:
        await this.generateStandardStructure()
    }

    // Setup common features
    await this.setupCommonFeatures()
  }

  private async createProjectDirectory(): Promise<void> {
    await fs.ensureDir(this.projectPath)
  }

  private async generateStandardStructure(): Promise<void> {
    // Create basic directory structure
    const dirs = ['src', 'docs', 'tests']
    if (this.config.frontend?.framework !== 'none') {
      dirs.push('src/components', 'src/pages')
    }
    if (this.config.backend?.framework !== 'none') {
      dirs.push('src/routes', 'src/controllers', 'src/services')
    }

    for (const dir of dirs) {
      await fs.ensureDir(path.join(this.projectPath, dir))
    }

    // Create package.json
    const packageJson = createPackageJson(this.config)
    await fs.writeJson(path.join(this.projectPath, 'package.json'), packageJson, { spaces: 2 })

    // Create README
    await this.createReadme()
  }

  private async generateMonorepoStructure(): Promise<void> {
    // Create monorepo structure with workspaces
    const dirs = ['packages', 'apps', 'docs']

    if (this.config.frontend?.framework !== 'none') {
      dirs.push('apps/frontend')
    }
    if (this.config.backend?.framework !== 'none') {
      dirs.push('apps/backend')
    }

    for (const dir of dirs) {
      await fs.ensureDir(path.join(this.projectPath, dir))
    }

    // Create root package.json with workspaces
    const packageJson = {
      name: this.config.name,
      version: '0.1.0',
      private: true,
      workspaces: ['packages/*', 'apps/*'],
      scripts: {
        dev: 'turbo run dev',
        build: 'turbo run build',
        test: 'turbo run test',
        lint: 'turbo run lint'
      },
      devDependencies: {
        turbo: '^1.11.2'
      }
    }
    await fs.writeJson(path.join(this.projectPath, 'package.json'), packageJson, { spaces: 2 })

    // Create turbo.json
    const turboConfig = {
      $schema: 'https://turbo.build/schema.json',
      pipeline: {
        build: {
          dependsOn: ['^build'],
          outputs: ['dist/**', '.next/**']
        },
        dev: {
          cache: false
        },
        lint: {},
        test: {}
      }
    }
    await fs.writeJson(path.join(this.projectPath, 'turbo.json'), turboConfig, { spaces: 2 })

    await this.createReadme()
  }

  private async generateSubmodulesStructure(): Promise<void> {
    // Create structure for separate repositories
    const dirs = ['docs']

    for (const dir of dirs) {
      await fs.ensureDir(path.join(this.projectPath, dir))
    }

    // Create main package.json
    const packageJson = createPackageJson(this.config)
    await fs.writeJson(path.join(this.projectPath, 'package.json'), packageJson, { spaces: 2 })

    // Create script to setup submodules
    const setupScript = `#!/bin/bash
# This script helps setup git submodules for frontend and backend

echo "Setting up submodules for ${this.config.name}"
echo "Run the following commands to add your repositories as submodules:"
echo ""
echo "git submodule add <frontend-repo-url> frontend"
echo "git submodule add <backend-repo-url> backend"
echo ""
echo "After adding submodules, run:"
echo "git submodule update --init --recursive"
`
    await fs.writeFile(path.join(this.projectPath, 'setup-submodules.sh'), setupScript)
    await fs.chmod(path.join(this.projectPath, 'setup-submodules.sh'), '755')

    await this.createReadme()
  }

  private async setupCommonFeatures(): Promise<void> {
    // Setup Git
    if (this.config.features.git) {
      await this.setupGit()
    }

    // Setup code quality tools
    if (this.config.features.prettier || this.config.features.eslint) {
      await setupCodeQuality(this.projectPath, this.config)
    }

    // Setup VS Code
    if (this.config.features.vscode) {
      await setupVSCode(this.projectPath)
    }

    // Create documentation
    if (this.config.features.aiWorkflow) {
      await createDocumentation(this.projectPath, this.config)
      await createClaudeMd(this.projectPath, this.config)
    }

    // Create .gitignore
    await createGitIgnore(this.projectPath)
  }

  private async setupGit(): Promise<void> {
    try {
      await execa('git', ['init'], { cwd: this.projectPath })
      await execa('git', ['branch', '-M', 'main'], { cwd: this.projectPath })
    } catch (error) {
      console.warn('Warning: Could not initialize git repository')
    }
  }

  private async createReadme(): Promise<void> {
    const readme = `# ${this.config.name}

${this.config.description || 'An AI-driven project created with Pinta'}

## Project Structure

${this.getStructureDescription()}

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
\`\`\`

## Documentation

This project follows a structured documentation approach:

- **docs/uncle-bob.md**: Project ideas and requirements logbook
- **docs/PRD.md**: Product Requirements Document
- **docs/architecture.md**: Technical architecture design
- **docs/plan.md**: Implementation plan and epics

## Tech Stack

${this.getTechStackDescription()}

## License

MIT
`
    await fs.writeFile(path.join(this.projectPath, 'README.md'), readme)
  }

  private getStructureDescription(): string {
    switch (this.config.structure) {
      case 'monorepo':
        return 'This project uses a monorepo structure with multiple packages and apps managed together.'
      case 'submodules':
        return 'This project uses git submodules to manage frontend and backend repositories separately.'
      default:
        return 'This is a standard project structure.'
    }
  }

  private getTechStackDescription(): string {
    const stack: string[] = []

    if (this.config.frontend?.framework !== 'none') {
      stack.push(`- **Frontend**: ${this.config.frontend?.framework}`)
    }
    if (this.config.backend?.framework !== 'none') {
      stack.push(`- **Backend**: ${this.config.backend?.framework}`)
    }
    if (this.config.frontend?.typescript || this.config.backend?.typescript) {
      stack.push('- **Language**: TypeScript')
    }

    return stack.join('\n') || 'No specific tech stack configured'
  }
}
