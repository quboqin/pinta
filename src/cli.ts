#!/usr/bin/env node

import { Command } from 'commander'
import { initCommand } from './commands/init'
import { version } from '../package.json'

const program = new Command()

program
  .name('pinta')
  .description('A CLI tool for quick setup of AI-driven project frameworks')
  .version(version)

// Init command - create a new project
program
  .command('init')
  .description('Initialize a new AI-driven project')
  .argument('[project-name]', 'Name of the project')
  .option('-t, --template <template>', 'Project template to use')
  .option('-d, --target-directory <path>', 'Target directory where the project will be created')
  .option('--monorepo', 'Use monorepo structure')
  .option('--submodules', 'Use git submodules structure')
  .option('--frontend <framework>', 'Frontend framework (react, vue, angular, etc.)')
  .option('--backend <framework>', 'Backend framework (express, nestjs, fastify, etc.)')
  .option('--skip-git', 'Skip git initialization')
  .option('--skip-install', 'Skip dependency installation')
  .option('--dry-run', 'Show what would be generated without creating files')
  .option('-v, --verbose', 'Show detailed output')
  .action(initCommand)

// Parse command line arguments
program.parse(process.argv)
