import { sanitizeProjectName, validateProjectName, isSafePath } from '../validation'

describe('validation utilities', () => {
  describe('sanitizeProjectName', () => {
    it('should convert to lowercase', () => {
      expect(sanitizeProjectName('MyProject')).toBe('myproject')
    })

    it('should replace spaces with hyphens', () => {
      expect(sanitizeProjectName('my project')).toBe('my-project')
    })

    it('should remove invalid characters', () => {
      expect(sanitizeProjectName('my@project!')).toBe('myproject')
    })

    it('should remove leading and trailing hyphens', () => {
      expect(sanitizeProjectName('-my-project-')).toBe('my-project')
    })

    it('should handle multiple spaces', () => {
      expect(sanitizeProjectName('my   project')).toBe('my-project')
    })

    it('should allow hyphens and underscores in the middle', () => {
      expect(sanitizeProjectName('my_cool-project')).toBe('my_cool-project')
    })
  })

  describe('validateProjectName', () => {
    it('should accept valid project names', () => {
      const result = validateProjectName('my-project')
      expect(result.valid).toBe(true)
      expect(result.sanitized).toBe('my-project')
    })

    it('should reject empty names', () => {
      const result = validateProjectName('')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('cannot be empty')
    })

    it('should reject names with only invalid characters', () => {
      const result = validateProjectName('@@@')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('invalid characters')
    })

    it('should reject names shorter than 2 characters', () => {
      const result = validateProjectName('a')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('at least 2 characters')
    })

    it('should reject names starting with a number', () => {
      const result = validateProjectName('123project')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('cannot start with a number')
    })

    it('should reject reserved names', () => {
      const result = validateProjectName('node_modules')
      expect(result.valid).toBe(false)
      expect(result.error).toContain('reserved')
    })

    it('should sanitize and validate', () => {
      const result = validateProjectName('My Cool Project')
      expect(result.valid).toBe(true)
      expect(result.sanitized).toBe('my-cool-project')
    })
  })

  describe('isSafePath', () => {
    it('should accept safe paths', () => {
      expect(isSafePath('my-project')).toBe(true)
      expect(isSafePath('projects/my-project')).toBe(true)
    })

    it('should reject paths with directory traversal', () => {
      expect(isSafePath('../my-project')).toBe(false)
      expect(isSafePath('projects/../../../etc')).toBe(false)
      expect(isSafePath('projects/..\\..\\..\\etc')).toBe(false)
    })

    it('should handle windows-style paths', () => {
      expect(isSafePath('projects\\my-project')).toBe(true)
    })
  })
})
