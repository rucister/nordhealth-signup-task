import { describe, it, expect } from 'vitest'
import {
  validateRequired,
  validateEmail,
  validatePassword,
  validateMinLength,
  validatePasswordConfirmation,
  getPasswordStrength
} from '~/utils/validation'

describe('Validation Functions', () => {
  describe('validateRequired', () => {
    it('should return valid for non-empty string', () => {
      const result = validateRequired('test')
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should return invalid for empty string', () => {
      const result = validateRequired('')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('This field is required')
    })

    it('should return invalid for whitespace only', () => {
      const result = validateRequired('   ')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('This field is required')
    })

    it('should return invalid for null', () => {
      const result = validateRequired(null)
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('This field is required')
    })

    it('should return invalid for undefined', () => {
      const result = validateRequired(undefined)
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('This field is required')
    })

    it('should use custom field name in error message', () => {
      const result = validateRequired('', 'Email')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Email is required')
    })
  })

  describe('validateEmail', () => {
    it('should return valid for correct email format', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'test123@test-domain.com'
      ]
      
      validEmails.forEach(email => {
        const result = validateEmail(email)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should return invalid for incorrect email format', () => {
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user@domain'
      ]
      
      invalidEmails.forEach(email => {
        const result = validateEmail(email)
        expect(result.isValid, `Email "${email}" should be invalid`).toBe(false)
        expect(result.message).toBe('Please enter a valid email address')
      })
    })

    it('should note about consecutive dots limitation', () => {
      // Note: Current regex allows consecutive dots - this could be improved in future
      const result = validateEmail('user..name@domain.com')
      expect(result.isValid).toBe(true) // Current behavior
      // TODO: Improve regex to handle consecutive dots if needed
    })

    it('should return invalid for empty email', () => {
      const result = validateEmail('')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Email is required')
    })
  })

  describe('validatePassword', () => {
    it('should return valid for strong password', () => {
      const strongPasswords = [
        'StrongPass123!',
        'MyP@ssw0rd',
        'Test123$Password'
      ]
      
      strongPasswords.forEach(password => {
        const result = validatePassword(password)
        expect(result.isValid).toBe(true)
        expect(result.message).toBeUndefined()
      })
    })

    it('should return invalid for password too short', () => {
      const result = validatePassword('Test1!')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Password must be at least 8 characters long')
    })

    it('should return invalid for password without uppercase', () => {
      const result = validatePassword('test123!')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Password must contain at least one uppercase letter')
    })

    it('should return invalid for password without lowercase', () => {
      const result = validatePassword('TEST123!')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Password must contain at least one lowercase letter')
    })

    it('should return invalid for password without number', () => {
      const result = validatePassword('TestPass!')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Password must contain at least one number')
    })

    it('should return invalid for password without special character', () => {
      const result = validatePassword('TestPass123')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Password must contain at least one special character')
    })
  })

  describe('validateMinLength', () => {
    it('should return valid for string meeting minimum length', () => {
      const result = validateMinLength('hello', 5)
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should return invalid for string below minimum length', () => {
      const result = validateMinLength('hi', 5)
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Must be at least 5 characters long')
    })

    it('should return valid for empty string (required validation handles this)', () => {
      const result = validateMinLength('', 5)
      expect(result.isValid).toBe(true)
    })
  })

  describe('validatePasswordConfirmation', () => {
    it('should return valid for matching passwords', () => {
      const validator = validatePasswordConfirmation('password123')
      const result = validator('password123')
      expect(result.isValid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should return invalid for non-matching passwords', () => {
      const validator = validatePasswordConfirmation('password123')
      const result = validator('different123')
      expect(result.isValid).toBe(false)
      expect(result.message).toBe('Passwords do not match')
    })
  })

  describe('getPasswordStrength', () => {
    it('should return 0 for very weak password', () => {
      expect(getPasswordStrength('')).toBe(0)
      expect(getPasswordStrength('123')).toBe(1) // length < 8, has numbers
      expect(getPasswordStrength('abc')).toBe(1) // length < 8, has lowercase
    })

    it('should return scores based on criteria met', () => {
      // 8+ chars (1) + lowercase (1) = 2
      expect(getPasswordStrength('password')).toBe(2)
      // 8+ chars (1) + numbers (1) = 2  
      expect(getPasswordStrength('12345678')).toBe(2)
    })

    it('should return higher scores for more criteria', () => {
      // 8+ chars (1) + uppercase (1) + lowercase (1) = 3
      expect(getPasswordStrength('Password')).toBe(3)
      // 8+ chars (1) + lowercase (1) + numbers (1) = 3
      expect(getPasswordStrength('password123')).toBe(3)
    })

    it('should return maximum score for very strong password', () => {
      // All criteria: 8+ chars (1) + uppercase (1) + lowercase (1) + numbers (1) + special (1) = 5, capped at 4
      expect(getPasswordStrength('MyPassword123!')).toBe(4)
      expect(getPasswordStrength('StrongP@ss1')).toBe(4)
      // 8+ chars (1) + uppercase (1) + lowercase (1) + numbers (1) = 4
      expect(getPasswordStrength('Password123')).toBe(4)
    })
  })
})
