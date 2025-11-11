import fs from 'fs-extra'
import path from 'path'

export async function setupVSCode(projectPath: string): Promise<void> {
  const vscodeDir = path.join(projectPath, '.vscode')
  await fs.ensureDir(vscodeDir)

  // Create settings.json
  const settings = {
    'editor.formatOnSave': true,
    'editor.defaultFormatter': 'esbenp.prettier-vscode',
    'editor.codeActionsOnSave': {
      'source.fixAll.eslint': 'explicit'
    },
    'typescript.tsdk': 'node_modules/typescript/lib',
    'typescript.enablePromptUseWorkspaceTsdk': true,
    'files.exclude': {
      '**/.git': true,
      '**/.DS_Store': true,
      '**/node_modules': true,
      '**/dist': true,
      '**/build': true
    },
    'search.exclude': {
      '**/node_modules': true,
      '**/dist': true,
      '**/build': true,
      '**/coverage': true
    }
  }

  await fs.writeJson(path.join(vscodeDir, 'settings.json'), settings, { spaces: 2 })

  // Create extensions.json
  const extensions = {
    recommendations: [
      'esbenp.prettier-vscode',
      'dbaeumer.vscode-eslint',
      'ms-vscode.vscode-typescript-next',
      'formulahendry.auto-rename-tag',
      'christian-kohler.path-intellisense',
      'visualstudioexptteam.vscodeintellicode',
      'usernamehw.errorlens'
    ]
  }

  await fs.writeJson(path.join(vscodeDir, 'extensions.json'), extensions, { spaces: 2 })

  // Create launch.json
  const launch = {
    version: '0.2.0',
    configurations: [
      {
        type: 'node',
        request: 'launch',
        name: 'Debug Program',
        skipFiles: ['<node_internals>/**'],
        program: '${workspaceFolder}/src/index.ts',
        preLaunchTask: 'tsc: build - tsconfig.json',
        outFiles: ['${workspaceFolder}/dist/**/*.js']
      }
    ]
  }

  await fs.writeJson(path.join(vscodeDir, 'launch.json'), launch, { spaces: 2 })
}
