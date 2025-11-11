/**
 * Validation utilities for user inputs
 */

/**
 * Sanitize project name to be valid for npm packages and directories
 */
export function sanitizeProjectName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-_]/g, '') // Remove invalid characters
    .replace(/^[-_]+/, '') // Remove leading hyphens/underscores
    .replace(/[-_]+$/, '') // Remove trailing hyphens/underscores
}

/**
 * Validate project name
 */
export function validateProjectName(name: string): {
  valid: boolean
  error?: string
  sanitized?: string
} {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Project name cannot be empty' }
  }

  const sanitized = sanitizeProjectName(name)

  if (sanitized.length === 0) {
    return {
      valid: false,
      error: 'Project name contains only invalid characters'
    }
  }

  if (sanitized.length < 2) {
    return {
      valid: false,
      error: 'Project name must be at least 2 characters long',
      sanitized
    }
  }

  // Check if name starts with a number (invalid for npm packages)
  if (/^\d/.test(sanitized)) {
    return {
      valid: false,
      error: 'Project name cannot start with a number',
      sanitized
    }
  }

  // Reserved npm package names
  const reserved = ['node_modules', 'favicon.ico']
  if (reserved.includes(sanitized)) {
    return {
      valid: false,
      error: `"${sanitized}" is a reserved name`,
      sanitized
    }
  }

  return { valid: true, sanitized }
}

/**
 * Check if a path is safe (no directory traversal)
 */
export function isSafePath(inputPath: string): boolean {
  const normalized = inputPath.replace(/\\/g, '/')
  return !normalized.includes('../') && !normalized.includes('/..')
}
