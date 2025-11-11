import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'
import { ProjectGenerator } from '../generators/ProjectGenerator'
import { validateProjectName, sanitizeProjectName } from '../utils/validation'
import {
  InitOptions,
  ProjectConfig,
  ProjectStructure,
  FrontendFramework,
  BackendFramework
} from '../types'

export async function initCommand(projectName?: string, options: InitOptions = {}): Promise<void> {
  console.log(chalk.bold.cyan('\n🎨 Welcome to Pinta!\n'))
  console.log(chalk.gray('Setting up your AI-driven project framework...\n'))

  try {
    // Get project configuration through interactive prompts
    const config = await getProjectConfig(options, projectName)

    // Create project
    const spinner = ora('Creating project...').start()
    const generator = new ProjectGenerator(config)

    await generator.generate()

    spinner.succeed(chalk.green('Project created successfully!'))

    // Display next steps
    displayNextSteps(config.name)
  } catch (error) {
    console.error(chalk.red('\n❌ Error creating project:'), error)
    process.exit(1)
  }
}

async function getProjectConfig(
  options: InitOptions,
  projectName?: string
): Promise<ProjectConfig> {
  // Validate and sanitize projectName if provided
  if (projectName) {
    const validation = validateProjectName(projectName)
    if (!validation.valid) {
      throw new Error(`Invalid project name: ${validation.error}`)
    }
    projectName = validation.sanitized
  }

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Project name:',
      default: projectName || 'my-ai-project',
      when: !projectName,
      validate: (input: string) => {
        const result = validateProjectName(input)
        if (!result.valid) {
          return result.error || 'Invalid project name'
        }
        return true
      },
      filter: (input: string) => {
        return sanitizeProjectName(input)
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description (optional):'
    },
    {
      type: 'list',
      name: 'structure',
      message: 'Select project structure:',
      choices: [
        { name: 'Standard (single project)', value: 'standard' },
        { name: 'Monorepo (unified management)', value: 'monorepo' },
        { name: 'Submodules (separate repositories)', value: 'submodules' }
      ],
      when: !options.monorepo && !options.submodules
    },
    {
      type: 'list',
      name: 'frontend',
      message: 'Select frontend framework:',
      choices: [
        { name: 'React', value: 'react' },
        { name: 'Vue', value: 'vue' },
        { name: 'Angular', value: 'angular' },
        { name: 'Svelte', value: 'svelte' },
        { name: 'Next.js', value: 'next' },
        { name: 'Nuxt', value: 'nuxt' },
        { name: 'None', value: 'none' }
      ],
      when: !options.frontend
    },
    {
      type: 'list',
      name: 'backend',
      message: 'Select backend framework:',
      choices: [
        { name: 'Express', value: 'express' },
        { name: 'NestJS', value: 'nestjs' },
        { name: 'Fastify', value: 'fastify' },
        { name: 'Koa', value: 'koa' },
        { name: 'None', value: 'none' }
      ],
      when: !options.backend
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: 'Use TypeScript?',
      default: true
    },
    {
      type: 'confirm',
      name: 'aiWorkflow',
      message: 'Include AI workflow configuration?',
      default: true
    }
  ])

  // Determine structure
  let structure: ProjectStructure = 'standard'
  if (options.monorepo || answers.structure === 'monorepo') {
    structure = 'monorepo'
  } else if (options.submodules || answers.structure === 'submodules') {
    structure = 'submodules'
  }

  const config: ProjectConfig = {
    name: projectName || answers.name,
    description: answers.description,
    structure,
    frontend: {
      framework: (options.frontend as FrontendFramework) || answers.frontend,
      typescript: answers.typescript
    },
    backend: {
      framework: (options.backend as BackendFramework) || answers.backend,
      typescript: answers.typescript
    },
    features: {
      git: !options.skipGit,
      prettier: true,
      eslint: true,
      vscode: true,
      aiWorkflow: answers.aiWorkflow !== false
    }
  }

  return config
}

function displayNextSteps(projectName: string): void {
  console.log(chalk.bold('\n📋 Next steps:\n'))
  console.log(chalk.cyan(`  cd ${projectName}`))
  console.log(chalk.cyan('  npm install'))
  console.log(chalk.cyan('  npm run dev'))
  console.log(chalk.gray('\n  Check out the docs/ folder for project documentation'))
  console.log(chalk.gray('  - uncle-bob.md: Project ideas and requirements'))
  console.log(chalk.gray('  - PRD.md: Product requirements document'))
  console.log(chalk.gray('  - architecture.md: Technical architecture'))
  console.log(chalk.gray('  - plan.md: Implementation plan\n'))
}
