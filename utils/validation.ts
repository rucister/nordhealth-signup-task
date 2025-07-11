export interface ValidationResult {
  isValid: boolean
  message?: string
}

export interface FormErrors {
  [key: string]: string | null
}

/**
 * Email validation with detailed error messages
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email || email.trim() === '') {
    return { isValid: false, message: 'Email is required' }
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' }
  }

  return { isValid: true }
}

/**
 * Password strength validation with detailed requirements
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password || password.trim() === '') {
    return { isValid: false, message: 'Password is required' }
  }

  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' }
  }

  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!hasUppercase) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' }
  }

  if (!hasLowercase) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' }
  }

  if (!hasNumbers) {
    return { isValid: false, message: 'Password must contain at least one number' }
  }

  if (!hasSpecialChar) {
    return { isValid: false, message: 'Password must contain at least one special character' }
  }

  return { isValid: true }
}

/**
 * Calculate password strength score (0-4)
 */
export const getPasswordStrength = (password: string): number => {
  let strength = 0
  
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[a-z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++
  
  return Math.min(strength, 4)
}

/**
 * Get password strength label
 */
export const getPasswordStrengthLabel = (strength: number): string => {
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']
  return labels[strength] || 'Very Weak'
}

/**
 * Required field validation utility
 */
export const validateRequired = (value: any, fieldName = 'This field'): ValidationResult => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { isValid: false, message: `${fieldName} is required` }
  }
  return { isValid: true }
}

/**
 * Minimum length validation utility
 */
export const validateMinLength = (value: string, minLength: number): ValidationResult => {
  if (!value) return { isValid: true } // Let required handle empty values
  
  if (value.length < minLength) {
    return { isValid: false, message: `Must be at least ${minLength} characters long` }
  }
  return { isValid: true }
}

/**
 * Debounce utility function
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }) as T
}

/**
 * Password confirmation validation
 */
export const validatePasswordConfirmation = (originalPassword: string) => {
  return (confirmPassword: string): ValidationResult => {
    if (!confirmPassword || confirmPassword.trim() === '') {
      return { isValid: false, message: 'Please confirm your password' }
    }

    if (confirmPassword !== originalPassword) {
      return { isValid: false, message: 'Passwords do not match' }
    }

    return { isValid: true }
  }
}