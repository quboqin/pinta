import { ProjectConfig } from '../types'

interface PackageJson {
  name: string
  version: string
  description: string
  main: string
  scripts: Record<string, string>
  keywords: string[]
  author: string
  license: string
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
}

export function createPackageJson(config: ProjectConfig): PackageJson {
  const packageJson: PackageJson = {
    name: config.name,
    version: '0.1.0',
    description: config.description || '',
    main: 'dist/index.js',
    scripts: {
      dev: 'ts-node src/index.ts',
      build: 'tsc',
      test: 'jest',
      lint: 'eslint src/**/*.ts',
      'lint:fix': 'eslint src/**/*.ts --fix',
      format: 'prettier --write "src/**/*.ts"'
    },
    keywords: [],
    author: '',
    license: 'MIT',
    dependencies: {},
    devDependencies: {
      '@types/node': '^20.10.5',
      typescript: '^5.3.3',
      'ts-node': '^10.9.2'
    }
  }

  // Add framework-specific dependencies
  if (config.frontend?.framework === 'react') {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      react: '^18.2.0',
      'react-dom': '^18.2.0'
    }
    if (config.frontend.typescript) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        '@types/react': '^18.2.0',
        '@types/react-dom': '^18.2.0'
      }
    }
  }

  if (config.backend?.framework === 'express') {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      express: '^4.18.2'
    }
    if (config.backend.typescript) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        '@types/express': '^4.17.21'
      }
    }
  }

  if (config.backend?.framework === 'nestjs') {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      '@nestjs/common': '^10.0.0',
      '@nestjs/core': '^10.0.0',
      '@nestjs/platform-express': '^10.0.0',
      'reflect-metadata': '^0.1.13',
      rxjs: '^7.8.1'
    }
  }

  // Add testing dependencies
  if (config.features.eslint || config.features.prettier) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      jest: '^29.7.0',
      '@types/jest': '^29.5.11',
      'ts-jest': '^29.1.1'
    }
  }

  return packageJson
}
