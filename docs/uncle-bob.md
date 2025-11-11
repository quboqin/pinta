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

### 6. Design Flows Selection and Installation

**Requirement**: Before MCPS/hooks/commands installation, let users select which AI design flows to use and install them into the project.

**Features to implement**:

1. **Design Flow Selection**: Multi-select interface for AI design workflows
   - **BMad**: Bottom-up AI design methodology
   - **Spec Kits**: Specification-driven design approach
   - Users can select one, both, or neither
2. **Installation**: Set up selected design flow templates and documentation
3. **Documentation**: Generate workflow guides and templates for selected flows
4. **Integration**: Integrate design flows with the existing docs structure (uncle-bob.md, PRD.md, architecture.md, plan.md)

### 7. MCPS, Hooks, and Custom Commands Installation

**Requirement**: Allow users to select and install necessary MCPS (Model Context Protocol Servers), hooks, and custom commands into their projects.

**Features to implement**:

1. **MCPS Selection**: Multi-select interface for popular MCP servers (filesystem, github, context7, etc.)
2. **Hooks Selection**: Multi-select interface for Claude Code hooks (pre-commit, post-commit, user-prompt-submit, etc.)
3. **Custom Commands**: Multi-select interface for common slash commands and workflows
4. **Installation**: Automatically configure and install selected features into the project
5. **Documentation**: Generate appropriate documentation for installed features
