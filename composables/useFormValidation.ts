import { ref, reactive, computed, readonly, watch, type Ref, type ComputedRef } from 'vue'
import { debounce, type FormErrors, type ValidationResult } from '~/utils/validation'

export type ValidationFunction = (value: any) => ValidationResult

export interface FieldValidationConfig {
  [fieldName: string]: ValidationFunction[]
}

export interface ValidationOptions {
  debounce?: number
}

export interface FormValidationReturn {
  /** Reactive form data object - bind to your form inputs */
  formData: Record<string, any>
  /** Readonly errors object - field names mapped to error messages or null */
  errors: Readonly<Ref<FormErrors>>
  /** Readonly validation state indicator - true when validateAll() is running */
  isValidating: Readonly<Ref<boolean>>
  /** Readonly computed property - true when form has no validation errors */
  isValid: ComputedRef<boolean>
  /** Readonly computed property - true when form has any validation errors */
  hasErrors: ComputedRef<boolean>
  /** Validate single field with given value - returns true if valid */
  validateField: (field: string, value: any) => boolean
  /** Validate entire form - returns true if all fields are valid */
  validateAll: () => boolean
  /** Handle field blur validation - call from @blur event handler */
  handleFieldValidate: (field: string) => void
  /** Clear validation error for specific field */
  clearError: (field: string) => void
  /** Reset form to initial state and clear all errors */
  resetForm: () => void
}

// Helper functions
const hasErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).some(error => error !== null)
}

const clearFieldError = (errors: FormErrors, field: string): FormErrors => {
  return { ...errors, [field]: null }
}

/**
 * Form validation composable with real-time validation and debouncing
 * 
 * @param initialData - Initial form data object
 * @param validationConfig - Configuration mapping field names to validation functions
 * @param options - Validation options (debounce timing)
 * @returns Form state and validation methods
 * 
 * @example
 * ```typescript
 * const { formData, errors, isValid, validateAll, handleFieldValidate } = useFormValidation(
 *   { email: '', password: '' },
 *   {
 *     email: [validateRequired, validateEmail],
 *     password: [validateRequired, validateMinLength(8)]
 *   },
 *   { debounce: 300 }
 * )
 * ```
 */
export const useFormValidation = (
  initialData: Record<string, any> = {},
  validationConfig: FieldValidationConfig = {},
  options: ValidationOptions = {
    debounce: 100
  }
): FormValidationReturn => {
  // Reactive form state
  const formData = reactive({ ...initialData })
  const errors = ref<FormErrors>({})
  const isValidating = ref(false)
  const validationTimeouts: Record<string, NodeJS.Timeout> = {}

  /**
   * Validate entire form using configured validation functions
   */
  const validateForm = (data: Record<string, any>): FormErrors => {
    const currentErrors: FormErrors = {}

    Object.keys(validationConfig).forEach(fieldName => {
      if (data[fieldName] !== undefined) {
        const validationFunctions = validationConfig[fieldName]
        
        // Run validation functions until first error
        for (const validationFn of validationFunctions) {
          const result = validationFn(data[fieldName])
          if (!result.isValid) {
            currentErrors[fieldName] = result.message || 'Invalid value'
            break
          }
        }
        
        // No errors found
        if (!currentErrors[fieldName]) {
          currentErrors[fieldName] = null
        }
      }
    })

    return currentErrors
  }

  /**
   * Validate single field directly
   */
  const validateField = (field: string, value: any) => {
    if (!validationConfig[field]) return true
    
    const validationFunctions = validationConfig[field]
    
    // Run validation functions until first error
    for (const validationFn of validationFunctions) {
      const result = validationFn(value)
      if (!result.isValid) {
        errors.value[field] = result.message || 'Invalid value'
        return false
      }
    }
    
    // Clear error if validation passes
    errors.value[field] = null
    return true
  }

  // Debounced validation to avoid excessive validation calls
  const debouncedValidation = debounce((fieldName: string, value: any) => {
    validateField(fieldName, value)
  }, options.debounce || 300)

  // Setup real-time validation watchers for each configured field
  Object.keys(validationConfig).forEach(fieldName => {
    watch(
      () => formData[fieldName],
      (newValue) => {
        // Cancel previous validation
        if (validationTimeouts[fieldName]) {
          clearTimeout(validationTimeouts[fieldName])
        }
        
        // Start debounced validation
        debouncedValidation(fieldName, newValue)
      },
      { immediate: false }
    )
  })

  /**
   * Validate all form fields and return overall validity
   */
  const validateAll = () => {
    isValidating.value = true
    const formErrors = validateForm(formData)
    errors.value = formErrors
    isValidating.value = false
    return !hasErrors(formErrors)
  }

  /**
   * Validate field on blur event - call from @blur handler
   */
  const handleFieldValidate = (field: string) => {
    validateField(field, formData[field])
  }

  /**
   * Clear error for specific field
   */
  const clearError = (field: string) => {
    errors.value = clearFieldError(errors.value, field)
  }

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    // Clean up pending validations
    Object.values(validationTimeouts).forEach(timeout => {
      clearTimeout(timeout)
    })
    
    // Reset form data to initial values
    Object.keys(formData).forEach(key => {
      formData[key] = initialData[key] || ''
    })
    
    // Clear all errors
    errors.value = {}
  }

  // Computed properties for form state
  const hasFormErrors = computed(() => hasErrors(errors.value))
  const isValid = computed(() => !hasFormErrors.value)

  return {
    // Reactive form state
    formData,
    errors: readonly(errors),
    isValidating: readonly(isValidating),
    isValid,
    hasErrors: hasFormErrors,
    
    // Validation methods
    validateField,
    validateAll,
    handleFieldValidate,
    clearError,
    resetForm
  }
}