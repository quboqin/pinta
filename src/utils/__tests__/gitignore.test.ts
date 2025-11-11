import fs from 'fs-extra'
import path from 'path'
import { createGitIgnore } from '../gitignore'
import os from 'os'

describe('createGitIgnore', () => {
  let tempDir: string

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pinta-test-'))
  })

  afterEach(async () => {
    await fs.remove(tempDir)
  })

  it('should create .gitignore file', async () => {
    await createGitIgnore(tempDir)

    const gitignorePath = path.join(tempDir, '.gitignore')
    const exists = await fs.pathExists(gitignorePath)
    expect(exists).toBe(true)
  })

  it('should include node_modules in .gitignore', async () => {
    await createGitIgnore(tempDir)

    const gitignorePath = path.join(tempDir, '.gitignore')
    const content = await fs.readFile(gitignorePath, 'utf-8')
    expect(content).toContain('node_modules/')
  })

  it('should include common build directories', async () => {
    await createGitIgnore(tempDir)

    const gitignorePath = path.join(tempDir, '.gitignore')
    const content = await fs.readFile(gitignorePath, 'utf-8')
    expect(content).toContain('dist/')
    expect(content).toContain('build/')
  })

  it('should include IDE directories', async () => {
    await createGitIgnore(tempDir)

    const gitignorePath = path.join(tempDir, '.gitignore')
    const content = await fs.readFile(gitignorePath, 'utf-8')
    expect(content).toContain('.vscode')
    expect(content).toContain('.idea/')
    expect(content).toContain('.DS_Store')
  })

  it('should include environment files', async () => {
    await createGitIgnore(tempDir)

    const gitignorePath = path.join(tempDir, '.gitignore')
    const content = await fs.readFile(gitignorePath, 'utf-8')
    expect(content).toContain('.env')
  })
})
