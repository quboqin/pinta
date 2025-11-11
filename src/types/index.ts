/**
 * Core types and interfaces for Pinta
 */

export type ProjectStructure = 'monorepo' | 'submodules' | 'standard'

export type FrontendFramework = 'react' | 'vue' | 'angular' | 'svelte' | 'next' | 'nuxt' | 'none'

export type BackendFramework = 'express' | 'nestjs' | 'fastify' | 'koa' | 'hapi' | 'none'

export interface ProjectConfig {
  name: string
  description?: string
  structure: ProjectStructure
  frontend?: {
    framework: FrontendFramework
    typescript?: boolean
  }
  backend?: {
    framework: BackendFramework
    typescript?: boolean
  }
  features: {
    git: boolean
    prettier: boolean
    eslint: boolean
    vscode: boolean
    aiWorkflow: boolean
  }
}

export interface InitOptions {
  projectName?: string
  template?: string
  monorepo?: boolean
  submodules?: boolean
  frontend?: string
  backend?: string
  skipGit?: boolean
  skipInstall?: boolean
  dryRun?: boolean
  verbose?: boolean
}

export interface TemplateConfig {
  name: string
  description: string
  files: string[]
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  scripts?: Record<string, string>
}
