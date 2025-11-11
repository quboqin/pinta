import fs from 'fs-extra'
import path from 'path'
import { MCPServer } from '../types'

interface MCPServerConfig {
  command: string
  args: string[]
  env?: Record<string, string>
}

interface MCPConfig {
  mcpServers: Record<string, MCPServerConfig>
}

/**
 * Get MCP server configuration for a specific server type
 */
function getMCPServerConfig(serverType: MCPServer): MCPServerConfig {
  const configs: Record<MCPServer, MCPServerConfig> = {
    filesystem: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-filesystem', './']
    },
    github: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-github'],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: '<your-github-token>'
      }
    },
    context7: {
      command: 'npx',
      args: ['-y', '@context7/mcp-server']
    },
    git: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-git', '--repository', './']
    },
    fetch: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-fetch']
    },
    postgres: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-postgres'],
      env: {
        POSTGRES_CONNECTION_STRING: '<your-postgres-connection-string>'
      }
    },
    sqlite: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-sqlite', '--db-path', './data.db']
    }
  }

  return configs[serverType]
}

/**
 * Install selected MCP servers into the project
 */
export async function installMCPServers(projectPath: string, servers: MCPServer[]): Promise<void> {
  if (!servers || servers.length === 0) {
    return
  }

  console.log('\n🔌 Setting up MCP Servers...\n')

  // Create .claude directory
  const claudeDir = path.join(projectPath, '.claude')
  await fs.ensureDir(claudeDir)

  // Build MCP config
  const mcpConfig: MCPConfig = {
    mcpServers: {}
  }

  for (const server of servers) {
    console.log(`   📦 Configuring ${server} MCP server...`)
    mcpConfig.mcpServers[server] = getMCPServerConfig(server)
  }

  // Write mcp-config.json
  const configPath = path.join(claudeDir, 'mcp-config.json')
  await fs.writeJson(configPath, mcpConfig, { spaces: 2 })

  // Create README for MCP configuration
  const readmeContent = generateMCPReadme(servers)
  const readmePath = path.join(claudeDir, 'MCP-README.md')
  await fs.writeFile(readmePath, readmeContent)

  console.log('\n✅ MCP Servers configured successfully!')
  console.log(`📄 Configuration saved to: .claude/mcp-config.json`)
  console.log(`📖 Documentation: .claude/MCP-README.md\n`)
}

/**
 * Generate README documentation for installed MCP servers
 */
function generateMCPReadme(servers: MCPServer[]): string {
  const serverDescriptions: Record<MCPServer, string> = {
    filesystem: 'Provides file system access for reading and writing files.',
    github:
      'Enables interaction with GitHub repositories, issues, and pull requests. Requires GITHUB_PERSONAL_ACCESS_TOKEN.',
    context7: 'Provides access to up-to-date documentation and code examples for libraries.',
    git: 'Allows Git operations like commit history, diffs, and branch management.',
    fetch: 'Enables fetching content from URLs and web APIs.',
    postgres: 'Provides PostgreSQL database access. Requires POSTGRES_CONNECTION_STRING.',
    sqlite: 'Enables SQLite database operations with local database files.'
  }

  let readme = `# MCP Servers Configuration

This project has been configured with the following Model Context Protocol (MCP) servers:

`

  servers.forEach((server) => {
    readme += `## ${server}\n\n`
    readme += `${serverDescriptions[server]}\n\n`

    // Add configuration notes for servers requiring environment variables
    if (server === 'github') {
      readme += `**Configuration Required:**
- Set your GitHub Personal Access Token in the environment variable \`GITHUB_PERSONAL_ACCESS_TOKEN\`
- You can generate a token at: https://github.com/settings/tokens

`
    } else if (server === 'postgres') {
      readme += `**Configuration Required:**
- Set your PostgreSQL connection string in the environment variable \`POSTGRES_CONNECTION_STRING\`
- Format: \`postgresql://user:password@host:port/database\`

`
    }
  })

  readme += `## Usage

These MCP servers are configured in \`.claude/mcp-config.json\` and will be automatically available when using Claude Code in this project.

For more information about MCP servers, visit:
- https://modelcontextprotocol.io
- https://github.com/modelcontextprotocol

## Environment Variables

If your MCP servers require environment variables (like GitHub token or database connection strings), you can set them in:
- Your shell profile (\`.bashrc\`, \`.zshrc\`, etc.)
- A \`.env\` file (make sure to add it to \`.gitignore\`)
- Your system environment variables

`

  return readme
}

/**
 * Get list of available MCP servers with descriptions
 */
export function getAvailableMCPServers(): Array<{ name: MCPServer; description: string }> {
  return [
    { name: 'filesystem', description: 'File system access for reading/writing files' },
    { name: 'github', description: 'GitHub API integration (requires token)' },
    { name: 'context7', description: 'Access to library documentation and examples' },
    { name: 'git', description: 'Git operations and repository management' },
    { name: 'fetch', description: 'Fetch content from URLs and web APIs' },
    { name: 'postgres', description: 'PostgreSQL database access (requires connection string)' },
    { name: 'sqlite', description: 'SQLite database operations' }
  ]
}
