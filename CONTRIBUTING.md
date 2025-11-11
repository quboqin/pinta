# Contributing to Pinta

Thank you for your interest in contributing to Pinta! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the bug
- Expected vs actual behavior
- Your environment (OS, Node version, npm version)
- Any relevant logs or screenshots

### Suggesting Features

We welcome feature suggestions! Please create an issue with:
- A clear description of the feature
- The problem it solves
- Example use cases
- Any implementation ideas you have

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes**
4. **Add tests** for any new functionality
5. **Ensure tests pass**: `npm test`
6. **Lint your code**: `npm run lint`
7. **Build the project**: `npm run build`
8. **Commit your changes** with a clear commit message
9. **Push to your fork** and submit a pull request

#### Pull Request Guidelines

- Follow the existing code style (enforced by ESLint and Prettier)
- Write clear, descriptive commit messages
- Include tests for new features or bug fixes
- Update documentation as needed
- Keep PRs focused on a single feature or fix
- Reference related issues in your PR description

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/pinta.git
cd pinta

# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Build the project
npm run build
```

### Project Structure

```
pinta/
├── src/
│   ├── cli.ts              # CLI entry point
│   ├── commands/           # Command implementations
│   ├── generators/         # Project generators
│   ├── utils/              # Utility functions
│   ├── templates/          # Project templates
│   └── types/              # TypeScript types
├── docs/                   # Project documentation
└── tests/                  # Test files
```

### Testing

- Write unit tests for utility functions
- Write integration tests for generators
- Ensure all tests pass before submitting a PR
- Aim for high test coverage (goal: 90%+)

### Documentation

- Update the README if you change user-facing functionality
- Add JSDoc comments for new functions and classes
- Update relevant documentation in the `docs/` folder
- Include examples for new features

### Code Style

We use ESLint and Prettier to maintain code quality:

```bash
# Check linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Commit Messages

Write clear, descriptive commit messages:

```
feat: add React starter template
fix: resolve project name validation issue
docs: update contributing guidelines
test: add tests for validation utility
refactor: simplify ProjectGenerator class
```

Follow conventional commits format:
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `test:` test additions or changes
- `refactor:` code refactoring
- `chore:` maintenance tasks
- `style:` code style changes
- `perf:` performance improvements

### Release Process

Releases are handled by maintainers:

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create a git tag
4. Push tag to trigger GitHub Actions
5. GitHub Actions will automatically publish to npm

## Questions?

If you have questions, feel free to:
- Open an issue for discussion
- Join our community chat (if available)
- Reach out to maintainers

## License

By contributing to Pinta, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Your contributions make Pinta better for everyone. We appreciate your time and effort!
