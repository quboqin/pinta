# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Pinta** is a CLI tool designed to enable quick setup of AI-driven project frameworks. The tool will support:
- AI-powered project initialization with Claude code generation
- Frontend and backend technology stack selection
- Git repository configuration (Submodules or Monorepo)
- AI design workflow integration
- Code quality tools (Prettier, ESLint, VS Code configuration)
- Custom command configuration with multi-agent collaboration (MCPS)

## Project Status

This is an early-stage project currently in the planning and requirements gathering phase. No code has been implemented yet.

## Documentation Workflow

The `docs/` folder follows a structured documentation approach:

1. **uncle-bob.md**: Primary logbook for recording all user ideas and initial requirements
2. **PRD.md**: Translates requirements from uncle-bob.md into a formal Product Requirements Document
3. **architecture.md**: Technical architecture design and system structure
4. **plan.md**: Breaks down the PRD into executable epics for phased implementation

When working on this project:
- User ideas and requirements should be captured in `docs/uncle-bob.md`
- Formal requirements should be documented in `docs/PRD.md`
- Architecture decisions should be recorded in `docs/architecture.md`
- Implementation planning should be organized in `docs/plan.md`

## Development Approach

When implementing features for this CLI tool:
- The tool should support both interactive and command-line argument modes
- Git operations should be handled carefully, especially for submodule and monorepo setups
- AI integration points (Claude, Codex) should be modular and extensible
- Configuration files should follow industry standards (e.g., .prettierrc, .eslintrc)
