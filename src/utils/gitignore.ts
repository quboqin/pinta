import fs from 'fs-extra'
import path from 'path'

export async function createGitIgnore(projectPath: string): Promise<void> {
  const gitignoreContent = `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
*.lcov
.nyc_output

# Production builds
dist/
build/
.next/
out/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# IDE
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.idea/
*.swp
*.swo
*~
.DS_Store

# Misc
*.pem
.cache/
.turbo/
.vercel/
`

  await fs.writeFile(path.join(projectPath, '.gitignore'), gitignoreContent)
}
