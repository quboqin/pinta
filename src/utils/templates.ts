import fs from 'fs-extra'
import path from 'path'
import { ProjectConfig } from '../types'

export async function copyTemplate(
  templateName: string,
  destPath: string,
  config: ProjectConfig
): Promise<void> {
  const templatePath = path.join(__dirname, '../templates', templateName)

  if (!(await fs.pathExists(templatePath))) {
    return
  }

  const files = await fs.readdir(templatePath)

  for (const file of files) {
    const filePath = path.join(templatePath, file)
    const stat = await fs.stat(filePath)

    if (stat.isFile() && file.endsWith('.template')) {
      const content = await fs.readFile(filePath, 'utf-8')
      const processedContent = processTemplate(content, config)
      const outputFileName = file.replace('.template', '')
      await fs.writeFile(path.join(destPath, outputFileName), processedContent)
    }
  }
}

function processTemplate(content: string, config: ProjectConfig): string {
  return content
    .replace(/\{\{projectName\}\}/g, config.name)
    .replace(/\{\{description\}\}/g, config.description || '')
    .replace(/\{\{author\}\}/g, '')
}

export function getTsConfigForFramework(
  framework: string,
  isBackend: boolean
): Record<string, unknown> {
  const baseConfig = {
    compilerOptions: {
      target: 'ES2022',
      module: isBackend ? 'commonjs' : 'ESNext',
      lib: ['ES2022'],
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      resolveJsonModule: true,
      moduleResolution: 'node'
    }
  }

  switch (framework) {
    case 'react':
      return {
        ...baseConfig,
        compilerOptions: {
          ...baseConfig.compilerOptions,
          jsx: 'react-jsx',
          lib: ['ES2022', 'DOM', 'DOM.Iterable']
        },
        include: ['src']
      }
    case 'vue':
      return {
        ...baseConfig,
        compilerOptions: {
          ...baseConfig.compilerOptions,
          jsx: 'preserve',
          lib: ['ES2022', 'DOM', 'DOM.Iterable']
        },
        include: ['src', 'src/**/*.vue']
      }
    case 'next':
      return {
        ...baseConfig,
        compilerOptions: {
          ...baseConfig.compilerOptions,
          jsx: 'preserve',
          lib: ['ES2022', 'DOM', 'DOM.Iterable'],
          incremental: true,
          plugins: [{ name: 'next' }],
          paths: {
            '@/*': ['./src/*']
          }
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules']
      }
    case 'express':
    case 'nestjs':
    case 'fastify':
    case 'koa':
      return {
        ...baseConfig,
        compilerOptions: {
          ...baseConfig.compilerOptions,
          outDir: './dist',
          rootDir: './src',
          declaration: true,
          sourceMap: true
        },
        include: ['src/**/*'],
        exclude: ['node_modules', 'dist']
      }
    default:
      return baseConfig
  }
}
