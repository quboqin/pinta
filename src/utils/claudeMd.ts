import fs from 'fs-extra'
import path from 'path'
import { ProjectConfig } from '../types'

export async function createClaudeMd(projectPath: string, config: ProjectConfig): Promise<void> {
  const claudeMdContent = generateClaudeMdContent(config)
  await fs.writeFile(path.join(projectPath, 'CLAUDE.md'), claudeMdContent)
}

function generateClaudeMdContent(config: ProjectConfig): string {
  return `# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**${config.name}** is ${config.description || 'a project created with Pinta'}.

### Project Structure
${getProjectStructureDescription(config)}

### Tech Stack
${getTechStackSection(config)}

## Development Commands

### Setup
\`\`\`bash
# Install dependencies
npm install
\`\`\`

### Development
\`\`\`bash
# Start development server
npm run dev
\`\`\`

### Building
\`\`\`bash
# Build the project
npm run build
\`\`\`

### Testing
\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

### Code Quality
\`\`\`bash
# Lint code
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
\`\`\`

## Architecture

${getArchitectureSection(config)}

## Development Guidelines

${getDevelopmentGuidelines(config)}

## Common Development Tasks

${getCommonTasks(config)}

## Documentation

This project follows a structured documentation approach:

- **docs/uncle-bob.md**: Project logbook for ideas and requirements
- **docs/PRD.md**: Product Requirements Document
- **docs/architecture.md**: Technical architecture details
- **docs/plan.md**: Implementation plan and roadmap

When working on features, always:
1. Check relevant documentation in docs/ folder
2. Update documentation as you make changes
3. Follow the coding standards enforced by ESLint and Prettier
4. Write tests for new functionality
5. Update the README if adding user-facing features
`
}

function getProjectStructureDescription(config: ProjectConfig): string {
  switch (config.structure) {
    case 'monorepo':
      return `This is a **monorepo** project with the following structure:
- \`apps/\`: Individual applications (frontend, backend)
- \`packages/\`: Shared packages and libraries
- Uses Turbo for build orchestration and caching`
    case 'submodules':
      return `This project uses **git submodules** to manage separate repositories:
- Frontend and backend are in separate git repositories
- Use \`git submodule update --init --recursive\` to initialize
- See setup-submodules.sh for setup instructions`
    default:
      return `This is a **standard** project with a single repository containing both frontend and backend code (if applicable).`
  }
}

function getTechStackSection(config: ProjectConfig): string {
  const stack: string[] = []

  if (config.frontend?.framework !== 'none') {
    stack.push(`- **Frontend**: ${config.frontend?.framework}`)
  }
  if (config.backend?.framework !== 'none') {
    stack.push(`- **Backend**: ${config.backend?.framework}`)
  }
  if (config.frontend?.typescript || config.backend?.typescript) {
    stack.push('- **Language**: TypeScript')
  }
  if (config.features.prettier) {
    stack.push('- **Code Formatting**: Prettier')
  }
  if (config.features.eslint) {
    stack.push('- **Linting**: ESLint')
  }

  return stack.length > 0 ? stack.join('\n') : 'No specific tech stack configured'
}

function getArchitectureSection(config: ProjectConfig): string {
  const hasFrontend = config.frontend?.framework !== 'none'
  const hasBackend = config.backend?.framework !== 'none'

  if (!hasFrontend && !hasBackend) {
    return 'See docs/architecture.md for detailed architecture information.'
  }

  let architecture = 'See docs/architecture.md for detailed architecture information.\n\n'

  if (hasFrontend && hasBackend) {
    architecture += `This is a full-stack application:\n`
    architecture += `- **Frontend** (${config.frontend?.framework}): Located in ${config.structure === 'monorepo' ? 'apps/frontend/' : 'src/'}\n`
    architecture += `- **Backend** (${config.backend?.framework}): Located in ${config.structure === 'monorepo' ? 'apps/backend/' : 'src/'}\n`
  } else if (hasFrontend) {
    architecture += `This is a frontend application using ${config.frontend?.framework}.`
  } else if (hasBackend) {
    architecture += `This is a backend application using ${config.backend?.framework}.`
  }

  return architecture
}

function getDevelopmentGuidelines(config: ProjectConfig): string {
  const useTypeScript = config.frontend?.typescript || config.backend?.typescript

  let guidelines = ''

  if (useTypeScript) {
    guidelines += `- **TypeScript**: This project uses TypeScript. Maintain strict type safety.\n`
  }

  guidelines += `- **Code Quality**: All code must pass ESLint and Prettier checks before committing.\n`
  guidelines += `- **Testing**: Write tests for all new features and bug fixes.\n`
  guidelines += `- **Documentation**: Update relevant documentation when making changes.\n`
  guidelines += `- **Commits**: Write clear, descriptive commit messages.\n`

  return guidelines
}

function getCommonTasks(config: ProjectConfig): string {
  const hasFrontend = config.frontend?.framework !== 'none'
  const hasBackend = config.backend?.framework !== 'none'

  let tasks = `### Adding a New Feature

1. Create or update requirements in docs/uncle-bob.md
2. Plan the implementation in docs/plan.md
3. Implement the feature with tests
4. Update documentation
5. Submit for review

### Fixing a Bug

1. Write a failing test that reproduces the bug
2. Fix the bug
3. Verify the test passes
4. Update relevant documentation

`

  if (hasFrontend) {
    tasks += `### Adding a New Component (Frontend)

1. Create component file in src/components/
2. Write component tests
3. Export from index file
4. Document props and usage

`
  }

  if (hasBackend) {
    tasks += `### Adding a New API Endpoint (Backend)

1. Define route in src/routes/
2. Create controller in src/controllers/
3. Add business logic in src/services/
4. Write integration tests
5. Document API endpoint

`
  }

  return tasks
}
