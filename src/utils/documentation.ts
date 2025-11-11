import fs from 'fs-extra'
import path from 'path'
import { ProjectConfig } from '../types'

export async function createDocumentation(
  projectPath: string,
  config: ProjectConfig
): Promise<void> {
  const docsPath = path.join(projectPath, 'docs')
  await fs.ensureDir(docsPath)

  // Create uncle-bob.md
  const uncleBobContent = `# ${config.name} - Project Logbook

## Initial Requirements

${config.description || 'Project description to be added...'}

## Ideas and Notes

_This document serves as a logbook for recording all project ideas, feature requests, and requirements as they emerge._

---

## Date: ${new Date().toISOString().split('T')[0]}

### Project Initialization

Project created with the following configuration:
- **Structure**: ${config.structure}
- **Frontend**: ${config.frontend?.framework || 'none'}
- **Backend**: ${config.backend?.framework || 'none'}
- **TypeScript**: ${config.frontend?.typescript || config.backend?.typescript ? 'Yes' : 'No'}
- **AI Workflow**: ${config.features.aiWorkflow ? 'Enabled' : 'Disabled'}
`

  await fs.writeFile(path.join(docsPath, 'uncle-bob.md'), uncleBobContent)

  // Create PRD.md
  const prdContent = `# Product Requirements Document (PRD)

## ${config.name}

**Version**: 0.1.0
**Last Updated**: ${new Date().toISOString().split('T')[0]}

---

## 1. Overview

### 1.1 Purpose
${config.description || '_To be defined_'}

### 1.2 Goals and Objectives
- [ ] Define clear project goals
- [ ] Identify target users
- [ ] Establish success metrics

---

## 2. User Stories

### 2.1 Primary User Stories
_To be defined based on requirements from uncle-bob.md_

---

## 3. Functional Requirements

### 3.1 Core Features
_List the main features and functionality_

### 3.2 Non-Functional Requirements
- Performance
- Security
- Scalability
- Maintainability

---

## 4. Technical Specifications

### 4.1 Technology Stack
- **Frontend**: ${config.frontend?.framework || 'TBD'}
- **Backend**: ${config.backend?.framework || 'TBD'}
- **Language**: ${config.frontend?.typescript ? 'TypeScript' : 'JavaScript'}

### 4.2 Integration Points
_Define external services and APIs_

---

## 5. Success Metrics

_Define KPIs and metrics to measure success_

---

## 6. Timeline

_Project milestones and deadlines to be defined in plan.md_
`

  await fs.writeFile(path.join(docsPath, 'PRD.md'), prdContent)

  // Create architecture.md
  const architectureContent = `# Technical Architecture

## ${config.name}

**Last Updated**: ${new Date().toISOString().split('T')[0]}

---

## 1. System Overview

### 1.1 Architecture Pattern
${getArchitecturePattern(config)}

### 1.2 High-Level Architecture
\`\`\`
[Diagram to be added]
\`\`\`

---

## 2. Component Architecture

### 2.1 Frontend Architecture
${
  config.frontend?.framework !== 'none'
    ? `
- Framework: ${config.frontend?.framework}
- State Management: TBD
- Routing: TBD
- UI Components: TBD
`
    : '_No frontend configured_'
}

### 2.2 Backend Architecture
${
  config.backend?.framework !== 'none'
    ? `
- Framework: ${config.backend?.framework}
- API Design: RESTful / GraphQL (TBD)
- Database: TBD
- Authentication: TBD
`
    : '_No backend configured_'
}

---

## 3. Data Architecture

### 3.1 Data Models
_Define data models and relationships_

### 3.2 Database Schema
_Define database schema_

---

## 4. Infrastructure

### 4.1 Deployment Architecture
_Define deployment strategy and infrastructure_

### 4.2 CI/CD Pipeline
_Define continuous integration and deployment process_

---

## 5. Security Architecture

### 5.1 Authentication & Authorization
_Define security measures_

### 5.2 Data Protection
_Define data protection strategies_

---

## 6. Performance Considerations

_Define performance optimization strategies_
`

  await fs.writeFile(path.join(docsPath, 'architecture.md'), architectureContent)

  // Create plan.md
  const planContent = `# Implementation Plan

## ${config.name}

**Last Updated**: ${new Date().toISOString().split('T')[0]}

---

## Overview

This document breaks down the PRD into executable epics and tasks for phased implementation.

---

## Phase 1: Foundation (Weeks 1-2)

### Epic 1.1: Project Setup
- [x] Initialize project structure
- [x] Setup development environment
- [ ] Configure CI/CD pipeline
- [ ] Setup testing framework

### Epic 1.2: Core Architecture
- [ ] Implement basic architecture
- [ ] Setup database schema
- [ ] Create base models
- [ ] Setup API structure

---

## Phase 2: Core Features (Weeks 3-6)

### Epic 2.1: [Feature Name]
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

### Epic 2.2: [Feature Name]
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

---

## Phase 3: Enhancement (Weeks 7-8)

### Epic 3.1: Polish & Optimization
- [ ] Performance optimization
- [ ] UI/UX improvements
- [ ] Error handling
- [ ] Documentation

---

## Phase 4: Launch Preparation (Weeks 9-10)

### Epic 4.1: Testing & QA
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance testing

### Epic 4.2: Deployment
- [ ] Production setup
- [ ] Monitoring setup
- [ ] Documentation
- [ ] Launch

---

## Backlog

_Items to be prioritized in future phases_
`

  await fs.writeFile(path.join(docsPath, 'plan.md'), planContent)
}

function getArchitecturePattern(config: ProjectConfig): string {
  if (config.structure === 'monorepo') {
    return 'Monorepo architecture with multiple packages and applications managed in a single repository.'
  } else if (config.structure === 'submodules') {
    return 'Multi-repository architecture with git submodules for managing frontend and backend separately.'
  }
  return 'Standard application architecture.'
}
