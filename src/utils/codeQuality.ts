import fs from 'fs-extra'
import path from 'path'
import { ProjectConfig } from '../types'

export async function setupCodeQuality(projectPath: string, config: ProjectConfig): Promise<void> {
  if (config.features.prettier) {
    await createPrettierConfig(projectPath)
  }

  if (config.features.eslint) {
    await createESLintConfig(projectPath, config)
  }
}

async function createPrettierConfig(projectPath: string): Promise<void> {
  const prettierConfig = {
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    arrowParens: 'always',
    endOfLine: 'lf'
  }

  await fs.writeJson(path.join(projectPath, '.prettierrc'), prettierConfig, { spaces: 2 })

  const prettierIgnore = `# Dependencies
node_modules/

# Build outputs
dist/
build/
coverage/
.next/
out/

# Misc
*.log
.DS_Store
`

  await fs.writeFile(path.join(projectPath, '.prettierignore'), prettierIgnore)
}

interface ESLintConfig {
  env: Record<string, boolean>
  extends: string[]
  parser?: string
  parserOptions: {
    ecmaVersion: string
    sourceType: string
  }
  plugins?: string[]
  rules: Record<string, string | [string, Record<string, string[]>]>
}

async function createESLintConfig(projectPath: string, config: ProjectConfig): Promise<void> {
  const useTypeScript = config.frontend?.typescript || config.backend?.typescript

  const eslintConfig: ESLintConfig = {
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    extends: ['eslint:recommended'],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'warn'
    }
  }

  if (useTypeScript) {
    eslintConfig.parser = '@typescript-eslint/parser'
    eslintConfig.extends.push('plugin:@typescript-eslint/recommended')
    eslintConfig.plugins = ['@typescript-eslint']
    eslintConfig.rules['@typescript-eslint/no-unused-vars'] = 'warn'
    eslintConfig.rules['@typescript-eslint/no-explicit-any'] = 'warn'
  }

  if (config.features.prettier) {
    eslintConfig.extends.push('plugin:prettier/recommended')
    eslintConfig.plugins = eslintConfig.plugins || []
    eslintConfig.plugins.push('prettier')
  }

  await fs.writeJson(path.join(projectPath, '.eslintrc.json'), eslintConfig, { spaces: 2 })

  const eslintIgnore = `node_modules/
dist/
build/
coverage/
.next/
out/
*.config.js
`

  await fs.writeFile(path.join(projectPath, '.eslintignore'), eslintIgnore)
}
