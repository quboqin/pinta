# Claude Code Commands and Skills

This directory contains custom commands and skills for use with Claude Code to help with project development.

## 📂 Directory Structure

```
.claude/
├── commands/           # Slash commands for specific tasks
│   └── setup-project.md
├── skills/            # Reusable skill sets for Claude
│   └── project-scaffolding.md
├── settings.local.json
└── USAGE.md          # This file
```

## 🎯 Available Commands

### `/setup-project` - Interactive Project Scaffolding

Creates a complete project structure with code quality tools and VS Code configuration.

**Usage:**
```
/setup-project
```

**What it does:**
1. Asks you to choose project structure (standard/monorepo/submodules)
2. Lets you select frontend framework (React, Vue, Next.js, etc.)
3. Lets you select backend framework (Express, NestJS, etc.)
4. Asks about TypeScript preference
5. Creates complete directory structure
6. Sets up package.json with appropriate dependencies
7. Configures ESLint with framework-specific rules
8. Configures Prettier with sensible defaults
9. Sets up VS Code for format-on-save
10. Adds recommended VS Code extensions

**Example Flow:**
```
User: /setup-project

Claude: What project structure would you like to use?
1. Standard - Single project
2. Monorepo - Multiple packages
3. Submodules - Separate repositories

[User selects option]

Claude: Which frontend framework?
1. React
2. Vue
3. Next.js
...

[Claude creates complete project structure]
```

## 🎨 Available Skills

### `project-scaffolding` - Project Setup Expertise

A comprehensive skill that gives Claude expertise in project scaffolding.

**When to invoke:**
- You want Claude to help set up a new project
- You need guidance on project structure
- You want framework-specific configurations

**How to use:**
Skills are typically invoked automatically when you use related commands, but you can also reference them in conversations:

```
"Using the project-scaffolding skill, help me set up a React monorepo with TypeScript"
```

## 🚀 Quick Start Examples

### Example 1: Create a React + Express Full-Stack Project
```
/setup-project
```
Then select:
- Structure: Standard
- Frontend: React
- Backend: Express
- TypeScript: Yes

### Example 2: Create a Next.js Monorepo
```
/setup-project
```
Then select:
- Structure: Monorepo
- Frontend: Next.js
- Backend: None
- TypeScript: Yes

### Example 3: Frontend-Only Vue Project
```
/setup-project
```
Then select:
- Structure: Standard
- Frontend: Vue
- Backend: None
- TypeScript: Yes

## 📋 What Gets Created

After running `/setup-project`, you'll have:

### Standard Structure
```
your-project/
├── src/
│   ├── components/      # Frontend components
│   ├── pages/          # Frontend pages
│   ├── routes/         # Backend routes
│   ├── controllers/    # Backend controllers
│   ├── services/       # Backend services
│   └── index.ts
├── tests/
├── docs/
├── .vscode/
│   ├── settings.json       # Format-on-save enabled
│   └── extensions.json     # Recommended extensions
├── package.json            # With all scripts and deps
├── tsconfig.json           # TypeScript configuration
├── .eslintrc.json         # Framework-specific linting
├── .prettierrc            # Code formatting rules
├── .gitignore             # Comprehensive ignore list
└── README.md              # Project documentation
```

### Configuration Files Details

#### ESLint Configuration
- Framework-specific rules (React hooks, Vue composition API, etc.)
- TypeScript integration
- Automatic error fixing on save

#### Prettier Configuration
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 100,
  "arrowParens": "always"
}
```

#### VS Code Settings
- Format on save enabled
- ESLint auto-fix enabled
- Prettier as default formatter
- Type checking enabled

#### Recommended Extensions
- ESLint
- Prettier
- Framework-specific extensions (React snippets, Vue Volar, etc.)
- Error Lens
- Path Intellisense

## 🎓 Tips and Best Practices

### 1. Use the Command for New Projects
The `/setup-project` command is perfect for:
- Starting new projects from scratch
- Setting up proof-of-concepts
- Creating example projects
- Bootstrapping microservices

### 2. Customize After Creation
After the initial setup:
- Review and adjust ESLint rules
- Customize Prettier settings
- Add project-specific VS Code settings
- Update README with your project details

### 3. Monorepo Considerations
When using monorepo:
- Each package needs its own package.json
- Use Turborepo for task orchestration
- Shared configurations go in root
- Each app can have different frameworks

### 4. VS Code Integration
After setup:
1. Restart VS Code to load new settings
2. Install recommended extensions when prompted
3. Test format-on-save by editing a file
4. Check that linting errors show up

## 🔧 Customization

### Adding Custom ESLint Rules
Edit `.eslintrc.json`:
```json
{
  "rules": {
    "your-custom-rule": "error"
  }
}
```

### Changing Prettier Settings
Edit `.prettierrc`:
```json
{
  "semi": true,  // Use semicolons
  "singleQuote": false  // Use double quotes
}
```

### Adding More VS Code Extensions
Edit `.vscode/extensions.json`:
```json
{
  "recommendations": [
    "existing.extension",
    "your.new-extension"
  ]
}
```

## 🐛 Troubleshooting

### ESLint Not Working
1. Restart VS Code
2. Run `npm install` to ensure dependencies are installed
3. Check that ESLint extension is installed
4. Verify .eslintrc.json is valid JSON

### Format on Save Not Working
1. Install Prettier extension
2. Check .vscode/settings.json exists
3. Restart VS Code
4. Verify Prettier is set as default formatter

### TypeScript Errors
1. Check tsconfig.json is valid
2. Run `npm install` to get @types packages
3. Restart TypeScript server in VS Code

## 📚 Related Documentation

- [Pinta CLI Documentation](../README.md)
- [VS Code Settings Reference](https://code.visualstudio.com/docs/getstarted/settings)
- [ESLint Configuration](https://eslint.org/docs/user-guide/configuring/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

## 🤝 Contributing

To add more commands or skills:

1. Create a new markdown file in `commands/` or `skills/`
2. Follow the existing format
3. Test with Claude Code
4. Update this documentation

## 💡 Ideas for More Commands

Future commands to consider:
- `/add-testing` - Set up Jest/Vitest
- `/add-ci-cd` - GitHub Actions workflows
- `/add-docker` - Docker configuration
- `/add-api-docs` - Swagger/OpenAPI setup
- `/add-database` - Database setup (Prisma, TypeORM)
