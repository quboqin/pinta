# Technical Architecture

## Pinta - AI-Driven Project Framework Setup Tool

**Last Updated**: 2025-11-11
**Version**: 0.1.0

---

## 1. System Overview

### 1.1 Architecture Pattern

Pinta follows a modular CLI architecture with clear separation of concerns:

- **Command Layer**: Handles CLI argument parsing and user interaction
- **Generator Layer**: Responsible for project structure generation
- **Utility Layer**: Provides reusable functions for file operations, configuration, etc.
- **Template Layer**: Contains project templates and configuration files

### 1.2 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLI Entry Point                       │
│                          (cli.ts)                            │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Command Layer                           │
│              (commands/init.ts, etc.)                        │
│  - Parse options                                             │
│  - Interactive prompts                                       │
│  - Validate input                                            │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Generator Layer                           │
│            (generators/ProjectGenerator.ts)                  │
│  - Project structure generation                              │
│  - File creation                                             │
│  - Dependency management                                     │
└─────────┬────────────────┬──────────────┬────────────────────┘
          │                │              │
          ▼                ▼              ▼
┌─────────────────┐ ┌──────────────┐ ┌──────────────────┐
│  Utility Layer  │ │   Templates  │ │  External Tools  │
│                 │ │              │ │                  │
│ - packageJson   │ │ - Configs    │ │ - Git            │
│ - gitignore     │ │ - Docs       │ │ - npm/yarn/pnpm  │
│ - documentation │ │ - Starters   │ │ - TypeScript     │
│ - codeQuality   │ │              │ │                  │
│ - vscode        │ │              │ │                  │
└─────────────────┘ └──────────────┘ └──────────────────┘
```

---

## 2. Component Architecture

### 2.1 CLI Entry Point (`src/cli.ts`)

**Responsibilities**:
- Parse command-line arguments using Commander.js
- Register commands and options
- Handle version display
- Execute appropriate command handler

**Dependencies**:
- `commander`: CLI framework
- Command handlers from `src/commands/`

**Key Design Decisions**:
- Use Commander.js for standardized CLI interface
- Support both positional arguments and flags
- Provide helpful error messages for invalid inputs

### 2.2 Command Layer (`src/commands/`)

#### init.ts

**Responsibilities**:
- Orchestrate project initialization workflow
- Collect user input through interactive prompts
- Validate configuration
- Invoke ProjectGenerator
- Display success messages and next steps

**Key Functions**:
- `initCommand()`: Main command handler
- `getProjectConfig()`: Gather configuration via prompts
- `displayNextSteps()`: Show post-generation instructions

**Design Patterns**:
- Command pattern for action handlers
- Builder pattern for configuration assembly

### 2.3 Generator Layer (`src/generators/`)

#### ProjectGenerator.ts

**Responsibilities**:
- Generate project directory structure
- Create configuration files
- Setup git repository
- Install dependencies (optional)
- Generate documentation

**Key Methods**:
- `generate()`: Main generation orchestrator
- `generateStandardStructure()`: Create standard project
- `generateMonorepoStructure()`: Create monorepo with workspaces
- `generateSubmodulesStructure()`: Create submodules setup
- `setupCommonFeatures()`: Configure ESLint, Prettier, VS Code, etc.

**Design Patterns**:
- Template Method pattern for generation flow
- Strategy pattern for different project structures

### 2.4 Utility Layer (`src/utils/`)

Provides reusable functions for specific tasks:

#### packageJson.ts
- Generate package.json based on framework selection
- Add framework-specific dependencies
- Configure npm scripts

#### gitignore.ts
- Create comprehensive .gitignore file
- Include common ignore patterns for Node.js projects

#### documentation.ts
- Generate uncle-bob.md with project logbook
- Create PRD.md template
- Create architecture.md template
- Create plan.md with implementation phases

#### codeQuality.ts
- Setup ESLint configuration
- Setup Prettier configuration
- Create ignore files for linters

#### vscode.ts
- Generate .vscode/settings.json
- Configure recommended extensions
- Setup debug configurations

### 2.5 Type System (`src/types/`)

**Key Interfaces**:

```typescript
ProjectConfig {
  name: string
  description?: string
  structure: ProjectStructure
  frontend?: FrameworkConfig
  backend?: FrameworkConfig
  features: FeatureFlags
}

InitOptions {
  projectName?: string
  template?: string
  monorepo?: boolean
  submodules?: boolean
  // ... other options
}
```

---

## 3. Data Flow

### 3.1 Project Initialization Flow

```
User Input
    │
    ▼
Command Parsing (Commander.js)
    │
    ▼
Interactive Prompts (Inquirer.js)
    │
    ▼
Configuration Assembly
    │
    ▼
Project Generator
    │
    ├──▶ Create Directory Structure
    │
    ├──▶ Generate Configuration Files
    │       ├─ package.json
    │       ├─ tsconfig.json
    │       ├─ .eslintrc.json
    │       ├─ .prettierrc
    │       └─ .gitignore
    │
    ├──▶ Setup VS Code
    │       ├─ settings.json
    │       ├─ extensions.json
    │       └─ launch.json
    │
    ├──▶ Generate Documentation
    │       ├─ uncle-bob.md
    │       ├─ PRD.md
    │       ├─ architecture.md
    │       └─ plan.md
    │
    ├──▶ Initialize Git
    │       └─ git init + initial branch
    │
    └──▶ Create README.md
    │
    ▼
Success Message & Next Steps
```

---

## 4. File System Structure

### 4.1 Generated Project Structure (Standard)

```
project-name/
├── src/
│   ├── index.ts
│   ├── components/      # if frontend
│   ├── pages/           # if frontend
│   ├── routes/          # if backend
│   ├── controllers/     # if backend
│   └── services/        # if backend
├── tests/
├── docs/
│   ├── uncle-bob.md
│   ├── PRD.md
│   ├── architecture.md
│   └── plan.md
├── .vscode/
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── CLAUDE.md
└── README.md
```

### 4.2 Generated Project Structure (Monorepo)

```
project-name/
├── apps/
│   ├── frontend/
│   └── backend/
├── packages/
│   └── shared/
├── docs/
│   ├── uncle-bob.md
│   ├── PRD.md
│   ├── architecture.md
│   └── plan.md
├── package.json         # root with workspaces
├── turbo.json
└── README.md
```

### 4.3 Pinta's Own Structure

```
pinta/
├── src/
│   ├── cli.ts                    # CLI entry point
│   ├── index.ts                  # Programmatic API
│   ├── commands/                 # Command handlers
│   │   └── init.ts
│   ├── generators/               # Project generators
│   │   └── ProjectGenerator.ts
│   ├── utils/                    # Utility functions
│   │   ├── packageJson.ts
│   │   ├── gitignore.ts
│   │   ├── documentation.ts
│   │   ├── codeQuality.ts
│   │   └── vscode.ts
│   ├── templates/                # Project templates
│   └── types/                    # TypeScript types
│       └── index.ts
├── docs/                         # Pinta documentation
│   ├── uncle-bob.md
│   ├── PRD.md
│   ├── architecture.md
│   └── plan.md
├── tests/                        # Test files
├── dist/                         # Compiled output
├── package.json
├── tsconfig.json
├── jest.config.js
├── .eslintrc.json
├── .prettierrc
├── CLAUDE.md
└── README.md
```

---

## 5. Technology Stack

### 5.1 Core Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| commander | CLI framework | ^11.1.0 |
| inquirer | Interactive prompts | ^9.2.12 |
| chalk | Terminal styling | ^5.3.0 |
| ora | Loading spinners | ^8.0.1 |
| fs-extra | Enhanced file system | ^11.2.0 |
| execa | Process execution | ^8.0.1 |

### 5.2 Development Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| typescript | Type system | ^5.3.3 |
| @types/node | Node.js types | ^20.10.5 |
| eslint | Linting | ^8.56.0 |
| prettier | Code formatting | ^3.1.1 |
| jest | Testing framework | ^29.7.0 |
| ts-jest | TypeScript + Jest | ^29.1.1 |

---

## 6. Security Considerations

### 6.1 Security Measures

- **No Arbitrary Code Execution**: Never execute user-provided code
- **Path Validation**: Validate all file paths to prevent directory traversal
- **Dependency Pinning**: Use exact versions for critical dependencies
- **Input Sanitization**: Sanitize project names and descriptions
- **Permission Checks**: Verify write permissions before file operations

### 6.2 Threat Model

| Threat | Mitigation |
|--------|------------|
| Malicious project names | Validate against regex, reject special characters |
| Path traversal | Use path.resolve() and validate against cwd |
| Dependency vulnerabilities | Regular npm audit, Dependabot |
| Command injection | Use execa with array args, no shell |

---

## 7. Performance Considerations

### 7.1 Optimization Strategies

- **Lazy Loading**: Load heavy dependencies only when needed
- **Parallel Operations**: Run independent file operations in parallel
- **Minimal Dependencies**: Keep dependency tree small
- **Caching**: Cache template files for repeated use (future)

### 7.2 Performance Targets

- CLI startup: < 500ms
- Project generation: < 30s (without npm install)
- Memory usage: < 100MB
- Package size: < 5MB

---

## 8. Testing Strategy

### 8.1 Test Levels

- **Unit Tests**: Test individual utility functions
- **Integration Tests**: Test command handlers and generators
- **E2E Tests**: Test complete workflows from CLI to project creation
- **Snapshot Tests**: Test generated file contents

### 8.2 Test Coverage Goals

- Overall coverage: > 90%
- Critical paths: 100%
- Utility functions: 100%
- Command handlers: > 95%

---

## 9. Extensibility

### 9.1 Plugin Architecture (Future)

```typescript
interface PintaPlugin {
  name: string;
  version: string;
  hooks: {
    beforeGenerate?: (config: ProjectConfig) => void;
    afterGenerate?: (projectPath: string) => void;
    addCommands?: (program: Command) => void;
  };
}
```

### 9.2 Template System (Future)

- Support for custom templates via Git repositories
- Template manifest format
- Template variables and interpolation
- Template composition and inheritance

---

## 10. Deployment Architecture

### 10.1 Distribution

- **npm Registry**: Primary distribution method
- **GitHub Releases**: Tagged releases with changelog
- **Binary Distribution**: (Future) Standalone binaries via pkg

### 10.2 CI/CD Pipeline

```
Push to main
    │
    ▼
Run Tests (GitHub Actions)
    │
    ▼
Lint & Type Check
    │
    ▼
Build Distribution
    │
    ▼
Publish to npm (on tag)
```

---

## 11. Monitoring and Observability

### 11.1 Telemetry (Future, Opt-in)

- Usage statistics (frameworks selected, structures used)
- Error reporting (anonymized)
- Performance metrics

### 11.2 Logging

- CLI uses structured logging with levels
- Verbose mode for debugging
- Logs stored in user's home directory (optional)

---

## 12. Future Architecture Evolution

### 12.1 Planned Improvements

- **Microservices Architecture**: Separate AI service for code generation
- **Web Dashboard**: Visual project builder
- **Cloud Integration**: Direct deployment to cloud providers
- **Template Marketplace**: Community-driven template sharing

### 12.2 Scalability Considerations

- **Stateless Design**: CLI remains stateless for simplicity
- **API Layer**: RESTful API for programmatic access (future)
- **Caching Layer**: Redis for template caching (future)
