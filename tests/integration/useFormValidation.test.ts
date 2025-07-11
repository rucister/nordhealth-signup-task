import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useFormValidation } from '~/composables/useFormValidation'
import { validateRequired, validateEmail, validatePassword, validatePasswordConfirmation } from '~/utils/validation'

// Mock the debounce utility
vi.mock('~/utils/validation', async () => {
  const actual = await vi.importActual('~/utils/validation')
  return {
    ...actual,
    debounce: vi.fn((fn, delay) => {
      // For testing, return the function immediately without debouncing
      return fn
    })
  }
})

describe('useFormValidation Composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with provided form data and no errors', () => {
    const initialData = { email: '', password: '' }
    const validationConfig = {
      email: [validateRequired, validateEmail],
      password: [validateRequired, validatePassword]
    }

    const { formData, errors, isValid } = useFormValidation(initialData, validationConfig)

    expect(formData).toEqual(initialData)
    expect(errors.value).toEqual({})
    expect(isValid.value).toBe(true) // Should be true initially when no validation has run
  })

  it('should validate all fields correctly', () => {
    const initialData = { email: 'test@example.com', password: 'StrongPass123!' }
    const validationConfig = {
      email: [validateRequired, validateEmail],
      password: [validateRequired, validatePassword]
    }

    const { formData, errors, isValid, validateAll } = useFormValidation(initialData, validationConfig)

    validateAll()

    expect(errors.value.email).toBeNull()
    expect(errors.value.password).toBeNull()
    expect(isValid.value).toBe(true)
  })

  it('should handle validation errors correctly', () => {
    const initialData = { email: 'invalid-email', password: 'weak' }
    const validationConfig = {
      email: [validateRequired, validateEmail],
      password: [validateRequired, validatePassword]
    }

    const { errors, isValid, validateAll } = useFormValidation(initialData, validationConfig)

    validateAll()

    expect(errors.value.email).toBe('Please enter a valid email address')
    expect(errors.value.password).toBe('Password must be at least 8 characters long')
    expect(isValid.value).toBe(false)
  })

  it('should validate individual fields with handleFieldValidate', () => {
    const initialData = { email: '', password: '' }
    const validationConfig = {
      email: [validateRequired, validateEmail],
      password: [validateRequired, validatePassword]
    }

    const { formData, errors, handleFieldValidate } = useFormValidation(initialData, validationConfig)

    // Update form data and validate email field
    formData.email = 'test@example.com'
    handleFieldValidate('email')

    expect(errors.value.email).toBeNull()
    expect(errors.value.password).toBeUndefined() // Should not be validated yet
  })

  it('should handle empty required fields', () => {
    const initialData = { email: '', password: '' }
    const validationConfig = {
      email: [validateRequired, validateEmail],
      password: [validateRequired, validatePassword]
    }

    const { errors, validateAll } = useFormValidation(initialData, validationConfig)

    validateAll()

    expect(errors.value.email).toBe('This field is required')
    expect(errors.value.password).toBe('This field is required')
  })

  it('should work with password confirmation validation', () => {
    const initialData = { password: 'MyPassword123!', confirmPassword: 'MyPassword123!' }
    const validationConfig = {
      password: [validateRequired, validatePassword],
      confirmPassword: [validateRequired, validatePasswordConfirmation('MyPassword123!')]
    }

    const { errors, isValid, validateAll } = useFormValidation(initialData, validationConfig)

    validateAll()

    expect(errors.value.password).toBeNull()
    expect(errors.value.confirmPassword).toBeNull()
    expect(isValid.value).toBe(true)
  })

  it('should detect password confirmation mismatch', () => {
    const initialData = { password: 'MyPassword123!', confirmPassword: 'DifferentPassword123!' }
    const validationConfig = {
      password: [validateRequired, validatePassword],
      confirmPassword: [validateRequired, validatePasswordConfirmation('MyPassword123!')]
    }

    const { errors, isValid, validateAll } = useFormValidation(initialData, validationConfig)

    validateAll()

    expect(errors.value.password).toBeNull()
    expect(errors.value.confirmPassword).toBe('Passwords do not match')
    expect(isValid.value).toBe(false)
  })

  it('should handle fields with single validation function', () => {
    const initialData = { name: '' }
    const validationConfig = {
      name: [validateRequired] // Should be an array
    }

    const { errors, validateAll } = useFormValidation(initialData, validationConfig)

    validateAll()

    expect(errors.value.name).toBe('This field is required')
  })

  it('should handle fields with multiple validation functions', () => {
    const initialData = { email: 'short' }
    const validationConfig = {
      email: [validateRequired, validateEmail]
    }

    const { errors, validateAll } = useFormValidation(initialData, validationConfig)

    validateAll()

    // Should stop at first failing validation
    expect(errors.value.email).toBe('Please enter a valid email address')
  })

  it('should update isValid reactively when errors change', () => {
    const initialData = { email: '' }
    const validationConfig = {
      email: [validateRequired, validateEmail]
    }

    const { formData, errors, isValid, handleFieldValidate } = useFormValidation(initialData, validationConfig)

    expect(isValid.value).toBe(true) // Initially true when no validation has run

    // Add valid email
    formData.email = 'test@example.com'
    handleFieldValidate('email')

    expect(isValid.value).toBe(true)

    // Make email invalid
    formData.email = 'invalid-email'
    handleFieldValidate('email')

    expect(isValid.value).toBe(false)
  })

  it('should handle non-existent field validation gracefully', () => {
    const initialData = { email: '' }
    const validationConfig = {
      email: [validateRequired, validateEmail]
    }

    const { handleFieldValidate } = useFormValidation(initialData, validationConfig)

    // Should not throw error for non-existent field
    expect(() => handleFieldValidate('nonExistentField')).not.toThrow()
  })
})
