# BMad Design Workflow

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
