# Setup Project - Interactive Project Scaffolding

Help the user create a complete project structure with code quality tools and VS Code configuration.

## Step 1: Project Structure Selection

Use the AskUserQuestion tool to ask the user which project structure they want:

**Question**: "What project structure would you like to use?"

**Options**:
1. **Standard** - Single project with all code in one repository
   - Description: Best for simple projects or when you want everything in one place
   - Creates: src/, tests/, docs/ directories

2. **Monorepo** - Multiple packages managed together with workspaces
   - Description: Best for multiple related projects sharing code and dependencies
   - Creates: packages/, apps/, with workspace configuration

3. **Submodules** - Separate repositories linked via git submodules
   - Description: Best for independent frontend/backend that need separate version control
   - Creates: Structure with setup script for git submodules

## Step 2: Frontend Framework Selection

Use the AskUserQuestion tool to ask about frontend:

**Question**: "Which frontend framework do you want to use?"

**Options**:
1. **React** - Popular component-based UI library
2. **Vue** - Progressive JavaScript framework
3. **Angular** - Full-featured TypeScript framework
4. **Svelte** - Compile-time framework with no virtual DOM
5. **Next.js** - React framework with SSR and static generation
6. **Nuxt** - Vue framework with SSR and static generation
7. **None** - No frontend framework

## Step 3: Backend Framework Selection

Use the AskUserQuestion tool to ask about backend:

**Question**: "Which backend framework do you want to use?"

**Options**:
1. **Express** - Fast, unopinionated web framework
2. **NestJS** - Progressive Node.js framework with TypeScript
3. **Fastify** - Fast and low overhead web framework
4. **Koa** - Expressive middleware framework
5. **None** - No backend framework

## Step 4: TypeScript Preference

Use the AskUserQuestion tool:

**Question**: "Do you want to use TypeScript?"

**Options**:
1. **Yes** - Use TypeScript for type safety
2. **No** - Use JavaScript

## Step 5: Create Project Structure

Based on the user's selections, create the appropriate directory structure:

### For Standard Structure:
```
project-name/
├── src/
│   ├── components/      (if frontend selected)
│   ├── pages/          (if frontend selected)
│   ├── routes/         (if backend selected)
│   ├── controllers/    (if backend selected)
│   ├── services/       (if backend selected)
│   └── index.ts/js
├── tests/
├── docs/
├── .vscode/
├── package.json
├── tsconfig.json        (if TypeScript)
├── .eslintrc.json
├── .prettierrc
├── .gitignore
└── README.md
```

### For Monorepo Structure:
```
project-name/
├── packages/
│   └── shared/
├── apps/
│   ├── frontend/       (if frontend selected)
│   └── backend/        (if backend selected)
├── docs/
├── .vscode/
├── package.json         (root with workspaces)
├── turbo.json
├── .eslintrc.json
├── .prettierrc
├── .gitignore
└── README.md
```

### For Submodules Structure:
```
project-name/
├── docs/
├── .vscode/
├── setup-submodules.sh
├── package.json
├── .gitignore
└── README.md
```

## Step 6: Create package.json

Create a package.json with appropriate scripts and dependencies:

```json
{
  "name": "project-name",
  "version": "0.1.0",
  "scripts": {
    "dev": "...",
    "build": "...",
    "test": "jest",
    "lint": "eslint src/**/*.{ts,tsx,js,jsx}",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\""
  },
  "devDependencies": {
    "eslint": "^8.56.0",
    "prettier": "^3.2.4",
    "@typescript-eslint/parser": "^6.19.0",
    "@typescript-eslint/eslint-plugin": "^6.19.0"
  }
}
```

Add framework-specific dependencies based on selections.

## Step 7: ESLint Configuration

Create `.eslintrc.json` with framework-specific rules:

### For React/Next.js:
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["react", "@typescript-eslint"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### For Vue/Nuxt:
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "@typescript-eslint/parser"
  }
}
```

### For Backend (Express, NestJS, etc.):
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off"
  }
}
```

## Step 8: Prettier Configuration

Create `.prettierrc` with sensible defaults:

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

## Step 9: VS Code Configuration

Create `.vscode/settings.json` for format-on-save:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

Create `.vscode/extensions.json` with recommended extensions:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "usernamehw.errorlens",
    "christian-kohler.path-intellisense",
    "formulahendry.auto-rename-tag"
  ]
}
```

Add framework-specific extensions based on selections.

## Step 10: TypeScript Configuration (if selected)

Create `tsconfig.json`:

### For Frontend (React/Vue):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### For Backend (Express/NestJS):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Step 11: Create .gitignore

Create `.gitignore` with common patterns:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
build/
dist/
.next/
out/

# Misc
.DS_Store
*.log
.env
.env.local
.env.*.local

# IDE
.vscode/*
!.vscode/settings.json
!.vscode/extensions.json
.idea/
*.swp
*.swo
```

## Step 12: Create README.md

Generate a comprehensive README with:
- Project description
- Project structure explanation
- Setup instructions
- Development commands
- Tech stack information

## Step 13: Final Summary

After creating all files, provide a summary:

```
✅ Project structure created successfully!

📁 Structure: [standard/monorepo/submodules]
⚛️  Frontend: [framework or none]
🚀 Backend: [framework or none]
📘 TypeScript: [yes/no]

Next steps:
1. Install dependencies: npm install
2. Start development: npm run dev
3. Format code: npm run format
4. Run linting: npm run lint

VS Code will automatically format on save and show linting errors.
```

## Important Notes

- Always use the Write tool to create files, not bash commands
- Create directories using Write tool with appropriate file content
- If the user wants to modify the structure, ask follow-up questions
- Ensure all paths are correct and files are created in the right locations
- Test that package.json scripts work with the selected frameworks
