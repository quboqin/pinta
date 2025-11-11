import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import { ProjectGenerator } from '../ProjectGenerator'
import { ProjectConfig } from '../../types'

// Mock execa to avoid ES module issues in Jest
jest.mock('execa', () => ({
  execa: jest.fn().mockResolvedValue({ stdout: '', stderr: '' })
}))

describe('ProjectGenerator', () => {
  let tempDir: string

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pinta-test-'))
  })

  afterEach(async () => {
    await fs.remove(tempDir)
  })

  describe('Standard Project Structure', () => {
    it('should generate a standard project structure', async () => {
      const config: ProjectConfig = {
        name: 'test-project',
        description: 'Test project',
        structure: 'standard',
        frontend: { framework: 'react', typescript: true },
        backend: { framework: 'express', typescript: true },
        features: {
          git: false, // Skip git for tests
          prettier: true,
          eslint: true,
          vscode: true,
          aiWorkflow: true
        }
      }

      // Override cwd for testing
      const originalCwd = process.cwd
      process.cwd = () => tempDir

      const generator = new ProjectGenerator(config)
      await generator.generate()

      // Restore cwd
      process.cwd = originalCwd

      const projectPath = path.join(tempDir, 'test-project')

      // Check if main directories exist
      expect(await fs.pathExists(path.join(projectPath, 'src'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, 'docs'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, 'tests'))).toBe(true)

      // Check if frontend directories exist
      expect(await fs.pathExists(path.join(projectPath, 'src/components'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, 'src/pages'))).toBe(true)

      // Check if backend directories exist
      expect(await fs.pathExists(path.join(projectPath, 'src/routes'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, 'src/controllers'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, 'src/services'))).toBe(true)

      // Check if configuration files exist
      expect(await fs.pathExists(path.join(projectPath, 'package.json'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, '.gitignore'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, '.prettierrc'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, '.eslintrc.json'))).toBe(true)

      // Check if VS Code configuration exists
      expect(await fs.pathExists(path.join(projectPath, '.vscode/settings.json'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, '.vscode/extensions.json'))).toBe(true)

      // Check if documentation files exist
      expect(await fs.pathExists(path.join(projectPath, 'docs/uncle-bob.md'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, 'docs/PRD.md'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, 'docs/architecture.md'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, 'docs/plan.md'))).toBe(true)

      // Check if README exists
      expect(await fs.pathExists(path.join(projectPath, 'README.md'))).toBe(true)
    })

    it('should create package.json with correct dependencies', async () => {
      const config: ProjectConfig = {
        name: 'test-project',
        structure: 'standard',
        frontend: { framework: 'react', typescript: true },
        backend: { framework: 'express', typescript: true },
        features: {
          git: false,
          prettier: true,
          eslint: true,
          vscode: true,
          aiWorkflow: false
        }
      }

      const originalCwd = process.cwd
      process.cwd = () => tempDir

      const generator = new ProjectGenerator(config)
      await generator.generate()

      process.cwd = originalCwd

      const projectPath = path.join(tempDir, 'test-project')
      const packageJson = await fs.readJson(path.join(projectPath, 'package.json'))

      expect(packageJson.name).toBe('test-project')
      expect(packageJson.dependencies.react).toBeDefined()
      expect(packageJson.dependencies.express).toBeDefined()
      expect(packageJson.devDependencies['@types/react']).toBeDefined()
      expect(packageJson.devDependencies['@types/express']).toBeDefined()
    })
  })

  describe('Monorepo Structure', () => {
    it('should generate a monorepo structure', async () => {
      const config: ProjectConfig = {
        name: 'test-monorepo',
        structure: 'monorepo',
        frontend: { framework: 'react', typescript: true },
        backend: { framework: 'nestjs', typescript: true },
        features: {
          git: false,
          prettier: false,
          eslint: false,
          vscode: false,
          aiWorkflow: false
        }
      }

      const originalCwd = process.cwd
      process.cwd = () => tempDir

      const generator = new ProjectGenerator(config)
      await generator.generate()

      process.cwd = originalCwd

      const projectPath = path.join(tempDir, 'test-monorepo')

      // Check if monorepo directories exist
      expect(await fs.pathExists(path.join(projectPath, 'packages'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, 'apps'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, 'apps/frontend'))).toBe(true)
      expect(await fs.pathExists(path.join(projectPath, 'apps/backend'))).toBe(true)

      // Check if turbo.json exists
      expect(await fs.pathExists(path.join(projectPath, 'turbo.json'))).toBe(true)

      // Check package.json has workspaces
      const packageJson = await fs.readJson(path.join(projectPath, 'package.json'))
      expect(packageJson.workspaces).toBeDefined()
      expect(packageJson.workspaces).toContain('packages/*')
      expect(packageJson.workspaces).toContain('apps/*')
    })
  })

  describe('Submodules Structure', () => {
    it('should generate a submodules structure', async () => {
      const config: ProjectConfig = {
        name: 'test-submodules',
        structure: 'submodules',
        frontend: { framework: 'none', typescript: false },
        backend: { framework: 'none', typescript: false },
        features: {
          git: false,
          prettier: false,
          eslint: false,
          vscode: false,
          aiWorkflow: false
        }
      }

      const originalCwd = process.cwd
      process.cwd = () => tempDir

      const generator = new ProjectGenerator(config)
      await generator.generate()

      process.cwd = originalCwd

      const projectPath = path.join(tempDir, 'test-submodules')

      // Check if setup script exists
      expect(await fs.pathExists(path.join(projectPath, 'setup-submodules.sh'))).toBe(true)

      // Check if script is executable
      const stats = await fs.stat(path.join(projectPath, 'setup-submodules.sh'))
      // Check if user execute bit is set (0o100)
      expect(stats.mode & 0o100).toBeTruthy()
    })
  })
})
