import fs from 'fs-extra'
import path from 'path'
import { DesignFlow } from '../types'

/**
 * Get design flow documentation content
 */
function getDesignFlowContent(flow: DesignFlow): { guide: string; template: string } {
  const contents: Record<DesignFlow, { guide: string; template: string }> = {
    bmad: {
      guide: `# BMad Design Workflow

BMad (Bottom-up Methodology for AI-Driven Development) is a structured approach to building software with AI assistance.

## Overview

BMad focuses on building applications from the ground up, starting with core functionality and progressively adding features. This methodology is particularly effective when working with AI coding assistants.

## Workflow Phases

### Phase 1: Foundation
1. **Core Data Structures**: Define your data models and types
2. **Basic Operations**: Implement CRUD operations
3. **Validation**: Add input validation and error handling

### Phase 2: Business Logic
1. **Core Features**: Implement primary business logic
2. **Service Layer**: Create services that orchestrate operations
3. **Testing**: Write unit tests for business logic

### Phase 3: API Layer
1. **Endpoints**: Create API endpoints/routes
2. **Controllers**: Implement request handlers
3. **Middleware**: Add authentication, logging, error handling

### Phase 4: User Interface
1. **Components**: Build UI components
2. **State Management**: Implement state handling
3. **Integration**: Connect UI to API

### Phase 5: Enhancement
1. **Optimization**: Performance improvements
2. **Polish**: UX enhancements and refinements
3. **Documentation**: Update docs and comments

## Best Practices

- **Start Small**: Begin with minimal viable features
- **Iterate Quickly**: Build, test, refine in short cycles
- **Test Early**: Write tests alongside implementation
- **Document As You Go**: Update documentation incrementally

## Working with AI

When using BMad with AI assistants:

1. **Clear Requests**: Be specific about what you want to build
2. **Incremental Changes**: Request one feature at a time
3. **Review & Validate**: Always review AI-generated code
4. **Provide Context**: Share relevant code and requirements

## Integration with Project Docs

- Use **uncle-bob.md** to log ideas and requirements for each phase
- Update **PRD.md** as features are defined
- Document architecture decisions in **architecture.md**
- Track progress in **plan.md** by phase
`,
      template: `# BMad Project Template

## Current Phase: Phase 1 - Foundation

### Phase Progress

- [ ] Phase 1: Foundation
  - [ ] Core data structures
  - [ ] Basic operations
  - [ ] Validation
- [ ] Phase 2: Business Logic
- [ ] Phase 3: API Layer
- [ ] Phase 4: User Interface
- [ ] Phase 5: Enhancement

### Phase 1 Tasks

#### Core Data Structures
- Define your primary entities
- Create TypeScript interfaces/types
- Set up database schemas

#### Basic Operations
- Implement create operations
- Implement read operations
- Implement update operations
- Implement delete operations

#### Validation
- Add input validation
- Implement error handling
- Create validation utilities

### Next Steps

1. Complete Phase 1 tasks
2. Write tests for core functionality
3. Document data structures
4. Move to Phase 2

### Notes

_Add your notes and observations here as you work through each phase_
`
    },
    'spec-kits': {
      guide: `# Spec Kits Design Workflow

Spec Kits is a specification-driven design approach that emphasizes detailed planning and documentation before implementation.

## Overview

Spec Kits focuses on creating comprehensive specifications and design documents before writing code. This methodology ensures alignment between stakeholders and provides clear implementation guidelines.

## Workflow Phases

### Phase 1: Requirements Gathering
1. **Stakeholder Interviews**: Understand user needs
2. **Use Cases**: Document user scenarios
3. **Requirements List**: Create detailed requirements

### Phase 2: Specification Writing
1. **Functional Specs**: Define what the system should do
2. **Technical Specs**: Define how it will be built
3. **API Specs**: Document interfaces and contracts

### Phase 3: Design Documentation
1. **Architecture Design**: System structure and components
2. **Data Models**: Database schemas and relationships
3. **UI/UX Mockups**: Visual designs and user flows

### Phase 4: Review & Validation
1. **Stakeholder Review**: Get feedback on specs
2. **Technical Review**: Validate feasibility
3. **Refinement**: Update based on feedback

### Phase 5: Implementation
1. **Guided Development**: Build following specs
2. **Spec Updates**: Adjust specs as needed
3. **Validation**: Ensure implementation matches specs

## Specification Templates

### Functional Specification Template

\`\`\`markdown
# Feature: [Feature Name]

## Overview
Brief description of the feature

## User Stories
- As a [user type], I want to [action] so that [benefit]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Dependencies
- List of dependencies

## Technical Considerations
- Performance requirements
- Security requirements
- Scalability needs
\`\`\`

### API Specification Template

\`\`\`markdown
# API: [Endpoint Name]

## Endpoint
\`POST /api/resource\`

## Request
\`\`\`json
{
  "field": "value"
}
\`\`\`

## Response
\`\`\`json
{
  "id": "uuid",
  "status": "success"
}
\`\`\`

## Error Codes
- 400: Bad Request
- 401: Unauthorized
- 500: Server Error
\`\`\`

## Best Practices

- **Be Specific**: Write detailed, unambiguous specifications
- **Visual Aids**: Use diagrams and mockups
- **Iterative**: Refine specs based on feedback
- **Living Documents**: Update specs as requirements change

## Working with AI

When using Spec Kits with AI assistants:

1. **Share Specs**: Provide complete specifications to AI
2. **Request Reviews**: Ask AI to review specs for completeness
3. **Guided Implementation**: Reference specs during development
4. **Spec-First**: Always update specs before implementing changes

## Integration with Project Docs

- **uncle-bob.md**: Raw ideas and initial requirements
- **PRD.md**: Product requirements derived from specs
- **architecture.md**: Technical architecture specifications
- **plan.md**: Implementation plan based on specs
- **docs/specs/**: Detailed feature specifications (create this folder)
`,
      template: `# Spec Kits Project Template

## Specifications Status

### Completed Specs
- [ ] Requirements document
- [ ] Architecture specification
- [ ] API specification
- [ ] Data model specification
- [ ] UI/UX specification

### In Progress
_List specifications currently being written_

### Pending
_List specifications that need to be created_

## Specification Checklist

### Requirements Phase
- [ ] Stakeholder interviews completed
- [ ] Use cases documented
- [ ] Requirements prioritized
- [ ] Acceptance criteria defined

### Design Phase
- [ ] Architecture diagram created
- [ ] Component interfaces defined
- [ ] Data models documented
- [ ] API contracts specified

### Review Phase
- [ ] Technical review completed
- [ ] Stakeholder approval received
- [ ] Feasibility validated
- [ ] Dependencies identified

### Implementation Phase
- [ ] Development started
- [ ] Unit tests aligned with specs
- [ ] Integration tests defined
- [ ] Documentation updated

## Specification Template

### [Specification Name]

**Status**: [Draft | Review | Approved | Implemented]

**Last Updated**: [Date]

**Owner**: [Name]

#### Summary
_Brief description of what this specification covers_

#### Details
_Detailed specification content_

#### Dependencies
_Related specifications and dependencies_

#### Notes
_Additional notes and considerations_

---

## Next Steps

1. Complete pending specifications
2. Get stakeholder approval
3. Begin implementation following specs
4. Keep specs updated as implementation progresses

### Notes

_Add your notes about the specification process here_
`
    }
  }

  return contents[flow]
}

/**
 * Get design flow description
 */
function getDesignFlowDescription(flow: DesignFlow): string {
  const descriptions: Record<DesignFlow, string> = {
    bmad: 'Bottom-up Methodology for AI-Driven Development - Build progressively from foundation',
    'spec-kits': 'Specification-driven design - Plan comprehensively before implementation'
  }

  return descriptions[flow]
}

/**
 * Install selected design flows into the project
 */
export async function installDesignFlows(projectPath: string, flows: DesignFlow[]): Promise<void> {
  if (!flows || flows.length === 0) {
    return
  }

  // Create design-flows directory
  const designFlowsDir = path.join(projectPath, 'docs', 'design-flows')
  await fs.ensureDir(designFlowsDir)

  // Install each design flow
  for (const flow of flows) {
    const { guide, template } = getDesignFlowContent(flow)
    const flowDir = path.join(designFlowsDir, flow)
    await fs.ensureDir(flowDir)

    // Write guide
    const guidePath = path.join(flowDir, 'GUIDE.md')
    await fs.writeFile(guidePath, guide)

    // Write template
    const templatePath = path.join(flowDir, 'TEMPLATE.md')
    await fs.writeFile(templatePath, template)
  }

  // Create overview README
  const readmeContent = generateDesignFlowsReadme(flows)
  const readmePath = path.join(designFlowsDir, 'README.md')
  await fs.writeFile(readmePath, readmeContent)
}

/**
 * Generate README for installed design flows
 */
function generateDesignFlowsReadme(flows: DesignFlow[]): string {
  let readme = `# Design Flows

This project is configured with the following AI design workflows:

`

  flows.forEach((flow) => {
    const flowName = flow === 'bmad' ? 'BMad' : 'Spec Kits'
    readme += `## ${flowName}\n\n`
    readme += `${getDesignFlowDescription(flow)}\n\n`
    readme += `**Guide**: [${flow}/GUIDE.md](./${flow}/GUIDE.md)\n\n`
    readme += `**Template**: [${flow}/TEMPLATE.md](./${flow}/TEMPLATE.md)\n\n`
  })

  readme += `## How to Use Design Flows

Each design flow includes:

1. **GUIDE.md** - Comprehensive methodology guide
   - Workflow phases
   - Best practices
   - Integration with project docs
   - Tips for working with AI

2. **TEMPLATE.md** - Practical working template
   - Phase tracking
   - Task checklists
   - Progress monitoring
   - Notes section

## Choosing a Design Flow

### Use BMad when:
- Building from scratch with AI assistance
- Iterating quickly on features
- Prototyping and exploring ideas
- Working on greenfield projects

### Use Spec Kits when:
- Requirements are well-defined
- Multiple stakeholders need alignment
- Complex system with many integrations
- Documentation is critical

### Use Both when:
- Large project with multiple phases
- Some features need detailed specs, others need exploration
- Team uses different approaches for different components

## Integration with Project Documentation

Your project includes structured documentation:

- **docs/uncle-bob.md** - Ideas and requirements logbook
- **docs/PRD.md** - Product Requirements Document
- **docs/architecture.md** - Technical architecture
- **docs/plan.md** - Implementation plan

Design flows complement these documents by providing:
- Structured methodologies
- Phase-based workflows
- AI collaboration guidelines

## Getting Started

1. Read the GUIDE.md for your chosen design flow(s)
2. Copy TEMPLATE.md content to start your workflow
3. Integrate with existing project docs
4. Follow the methodology as you build

## Tips for Success

- **Stay Consistent**: Follow the chosen methodology
- **Update Regularly**: Keep templates and docs current
- **Adapt as Needed**: Methodologies are guidelines, not rigid rules
- **Leverage AI**: Use AI assistants to help with each phase

For more information on working with Claude Code, see the project's CLAUDE.md file.
`

  return readme
}

/**
 * Get list of available design flows with descriptions
 */
export function getAvailableDesignFlows(): Array<{ name: DesignFlow; description: string }> {
  return [
    { name: 'bmad', description: 'Bottom-up AI-driven development' },
    { name: 'spec-kits', description: 'Specification-driven design' }
  ]
}
