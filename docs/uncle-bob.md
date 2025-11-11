# Pinta CLI Tool - Project Requirements

**Project Path**: `/Users/qinqubo/magic/vibe-coding/pinta`

---

## Overview

Please develop a CLI tool with the following features:

## Core Features

### 1. AI-Driven Project Setup

Enables quick setup of AI-driven project frameworks (powered by Claude code generation, Codex, etc.) by inputting project names and requirement descriptions.

### 2. Technology Stack Selection

Supports selection of frontend and backend technology stack frameworks.

### 3. Git Repository Configuration

Automatically configures Git repositories with two project structure options:

- **Submodules**: Managing frontend and backend projects separately as submodules
- **Monorepo**: Using a Monorepo model for unified management

### 4. AI Design Workflow Integration

Includes built-in configuration for AI design workflows (such as spec kits, BMad, and other solutions).

### 5. Code Quality Tools

Installs Prettier and ESLint, and configures VS Code for code formatting.

### 6. Custom Command Configuration

Allows custom command configuration, hooks, integrating multi-agent collaboration (MCPS), sub-agents, skills, plugins, and other auxiliary tools.

---

## Project Documentation Structure

This project includes a `docs` folder containing the following Markdown documents, each with a specific purpose:

- **uncle-bob.md**: A default-named logbook that records all user ideas, including initial requirements
- **PRD.md**: Translates user requirements into a detailed Product Requirements Document (PRD)
- **architecture.md**: As the name suggests, this document is used to design the project's architecture
- **plan.md**: Breaks down the content of PRD.md into multiple epics for phased execution

---

## New Requirements

### 6. Design Flows Selection and Installation ✅ IMPLEMENTED

**Requirement**: Before MCPS/hooks/commands installation, let users select which AI design flows to use and install them into the project.

**Implemented Features**:

1. **Design Flow Selection**: Multi-select interface for AI design workflows
   - **BMad Method**: Bottom-up AI design methodology (https://github.com/bmad-code-org/BMAD-METHOD)
     - Installed via: `npx bmad-method@alpha install`
     - Creates `bmad/` directory with 12 agents and 34 workflows
   - **Spec Kits**: Specification-driven design approach (https://github.com/github/spec-kit)
     - Installed via: `uv tool install specify-cli`
     - Creates `.specify/` directory with templates and slash commands
   - Users can select one, both, or neither

2. **Actual Installation**: Executes real installation commands
   - BMad: Runs `npx bmad-method@alpha install` in project directory
   - Spec Kits: Checks for `uv`, installs `specify-cli`, runs `specify init`
   - Error handling with fallback instructions if installation fails

3. **Documentation**: Generates comprehensive installation documentation
   - `docs/design-flows/<flow>/INSTALLED.md` for each installed flow
   - Detailed "What Was Installed" sections with directory structures
   - Getting started guides and links to official documentation
   - Troubleshooting and manual installation instructions

4. **Prerequisites Check**:
   - BMad: Requires Node.js and npx (automatically available)
   - Spec Kits: Checks for `uv` installation, provides install instructions if missing
   - Creates `.specify/INSTALL_INSTRUCTIONS.md` if `uv` not available

### 7. MCPS, Hooks, and Custom Commands Installation ✅ IMPLEMENTED

**Requirement**: Allow users to select and install necessary MCPS (Model Context Protocol Servers), hooks, and custom commands into their projects.

**Implemented Features**:

1. **MCPS Selection**: Multi-select interface for popular MCP servers
   - **Filesystem**: File system access for reading/writing files
   - **GitHub**: GitHub API integration (requires GITHUB_PERSONAL_ACCESS_TOKEN)
   - **Context7**: Access to up-to-date library documentation and examples
   - **Git**: Git operations and repository management
   - **Fetch**: Fetch content from URLs and web APIs
   - **PostgreSQL**: PostgreSQL database access (requires connection string)
   - **SQLite**: SQLite database operations
   - Creates `.claude/mcp-config.json` with server configurations
   - Generates `.claude/MCP-README.md` with usage instructions

2. **Hooks Selection**: Multi-select interface for Claude Code hooks
   - **pre-commit**: Runs linting and formatting checks before each commit
   - **post-commit**: Runs after each commit for notifications or automated tasks
   - **user-prompt-submit**: Validates or modifies user prompts before sending to Claude
   - **tool-result**: Processes or validates tool results after execution
   - Creates executable hook scripts in `.claude/hooks/`
   - Generates `.claude/hooks/README.md` with documentation
   - Updates package.json with format:check script for pre-commit hook

3. **Custom Commands**: Multi-select interface for common slash commands
   - **review-pr**: Comprehensive pull request code review
   - **generate-tests**: Generate unit tests for selected code
   - **refactor**: Refactor code to improve quality and maintainability
   - **documentation**: Generate comprehensive documentation
   - **deploy**: Deployment preparation checklist
   - Creates command markdown files in `.claude/commands/`
   - Generates `.claude/commands/README.md` with usage guide

4. **Installation**: Automatically configures and installs selected features
   - MCP servers: `installMCPServers()` creates JSON config and README
   - Hooks: `installHooks()` creates executable bash scripts and README
   - Commands: `installCustomCommands()` creates markdown files and README
   - All features integrated into project generation flow

5. **Documentation**: Comprehensive documentation generated for all features
   - Each feature category has its own README with:
     - Description of installed features
     - Usage instructions
     - Configuration requirements
     - Best practices
     - Links to official documentation
