# Pinta

A powerful CLI tool for quick setup of AI-driven project frameworks.

## Features

- 🚀 **AI-Driven Project Setup**: Quickly scaffold projects with AI-powered code generation
- 🎯 **Technology Stack Selection**: Choose from popular frontend and backend frameworks
- 📦 **Flexible Project Structures**:
  - Standard single-project structure
  - Monorepo with workspaces
  - Git submodules for separate repositories
- 🎨 **AI Design Workflow Integration**: Built-in support for AI-assisted development workflows
- 🛠️ **Code Quality Tools**: Automatic setup of Prettier, ESLint, and VS Code configuration
- 🔧 **Extensible**: Support for custom commands, multi-agent collaboration (MCPS), and plugins

## Installation

```bash
npm install -g pinta
```

Or use directly with npx:

```bash
npx pinta init my-project
```

## Quick Start

### Interactive Mode

```bash
pinta init
```

Follow the interactive prompts to configure your project.

### Command-Line Mode

```bash
pinta init my-project --frontend react --backend nestjs --monorepo
```

## Usage

### Initialize a New Project

```bash
pinta init [project-name] [options]
```

#### Options

- `-t, --template <template>` - Project template to use
- `--monorepo` - Use monorepo structure with workspaces
- `--submodules` - Use git submodules structure
- `--frontend <framework>` - Frontend framework (react, vue, angular, svelte, next, nuxt)
- `--backend <framework>` - Backend framework (express, nestjs, fastify, koa)
- `--skip-git` - Skip git initialization
- `--skip-install` - Skip dependency installation

#### Examples

**Create a React + Express project:**
```bash
pinta init my-app --frontend react --backend express
```

**Create a monorepo with Next.js and NestJS:**
```bash
pinta init my-monorepo --monorepo --frontend next --backend nestjs
```

**Create a project with submodules:**
```bash
pinta init my-project --submodules
```

## Project Structure

Pinta creates projects with a structured documentation approach:

```
my-project/
├── src/                  # Source code
├── docs/                 # Project documentation
│   ├── uncle-bob.md      # Project logbook and ideas
│   ├── PRD.md            # Product Requirements Document
│   ├── architecture.md   # Technical architecture
│   └── plan.md           # Implementation plan
├── tests/                # Test files
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── README.md
```

## Supported Frameworks

### Frontend

- React
- Vue
- Angular
- Svelte
- Next.js
- Nuxt

### Backend

- Express
- NestJS
- Fastify
- Koa
- Hapi

## Development

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd pinta

# Install dependencies
npm install

# Build the project
npm run build

# Link for local development
npm link
```

### Commands

- `npm run dev` - Run in development mode
- `npm run build` - Build the project
- `npm run watch` - Watch mode for development
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## Documentation

This project follows its own structured documentation approach. See the `docs/` folder:

- **[uncle-bob.md](./docs/uncle-bob.md)**: Project ideas and requirements logbook
- **[PRD.md](./docs/PRD.md)**: Product Requirements Document (to be created)
- **[architecture.md](./docs/architecture.md)**: Technical architecture (to be created)
- **[plan.md](./docs/plan.md)**: Implementation plan (to be created)

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT

## Roadmap

- [ ] Support for more frameworks and templates
- [ ] AI integration with Claude and other LLMs
- [ ] Custom template creation
- [ ] Plugin system
- [ ] Multi-agent collaboration support (MCPS)
- [ ] Interactive project dashboard
- [ ] Cloud deployment integration

## Support

For issues and questions, please open an issue on GitHub.
