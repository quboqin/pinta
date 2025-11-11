import { createPackageJson } from '../packageJson'
import { ProjectConfig } from '../../types'

describe('createPackageJson', () => {
  const baseConfig: ProjectConfig = {
    name: 'test-project',
    description: 'Test project',
    structure: 'standard',
    frontend: {
      framework: 'none',
      typescript: false
    },
    backend: {
      framework: 'none',
      typescript: false
    },
    features: {
      git: true,
      prettier: true,
      eslint: true,
      vscode: true,
      aiWorkflow: true
    }
  }

  it('should create basic package.json', () => {
    const pkg = createPackageJson(baseConfig)

    expect(pkg.name).toBe('test-project')
    expect(pkg.description).toBe('Test project')
    expect(pkg.version).toBe('0.1.0')
    expect(pkg.license).toBe('MIT')
    expect(pkg.scripts).toBeDefined()
    expect(pkg.devDependencies).toBeDefined()
  })

  it('should add React dependencies', () => {
    const config = {
      ...baseConfig,
      frontend: {
        framework: 'react' as const,
        typescript: true
      }
    }
    const pkg = createPackageJson(config)

    expect(pkg.dependencies.react).toBeDefined()
    expect(pkg.dependencies['react-dom']).toBeDefined()
    expect(pkg.devDependencies['@types/react']).toBeDefined()
    expect(pkg.devDependencies['@types/react-dom']).toBeDefined()
  })

  it('should add Express dependencies', () => {
    const config = {
      ...baseConfig,
      backend: {
        framework: 'express' as const,
        typescript: true
      }
    }
    const pkg = createPackageJson(config)

    expect(pkg.dependencies.express).toBeDefined()
    expect(pkg.devDependencies['@types/express']).toBeDefined()
  })

  it('should add NestJS dependencies', () => {
    const config = {
      ...baseConfig,
      backend: {
        framework: 'nestjs' as const,
        typescript: true
      }
    }
    const pkg = createPackageJson(config)

    expect(pkg.dependencies['@nestjs/common']).toBeDefined()
    expect(pkg.dependencies['@nestjs/core']).toBeDefined()
    expect(pkg.dependencies['@nestjs/platform-express']).toBeDefined()
  })

  it('should include test dependencies when code quality tools are enabled', () => {
    const pkg = createPackageJson(baseConfig)

    expect(pkg.devDependencies.jest).toBeDefined()
    expect(pkg.devDependencies['@types/jest']).toBeDefined()
    expect(pkg.devDependencies['ts-jest']).toBeDefined()
  })

  it('should have standard scripts', () => {
    const pkg = createPackageJson(baseConfig)

    expect(pkg.scripts.dev).toBeDefined()
    expect(pkg.scripts.build).toBe('tsc')
    expect(pkg.scripts.test).toBe('jest')
    expect(pkg.scripts.lint).toBeDefined()
  })
})
