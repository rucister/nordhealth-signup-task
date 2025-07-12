import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PasswordInput from '~/components/PasswordInput.vue'

/**
 * PasswordInput Component Tests
 * 
 * Testing Strategy:
 * - Focus on testing OUR component logic, not Nord Health web components
 * - Test component props, events, structure, and behavior
 * - Use @nuxt/test-utils for proper Nuxt environment with auto-imports
 * - Nord components are treated as external dependencies (we trust they work)
 * 
 * Note: Vitest coverage excludes Nuxt virtual modules (virtual:nuxt:*) to prevent
 * HTML report generation errors on Windows. These virtual modules exist only in 
 * memory and have encoded paths that cause file system errors.
 */

describe('PasswordInput Component', () => {
  describe('Component Structure', () => {
    it('renders successfully with correct structure', async () => {
      const wrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: '',
          label: 'Password'
        }
      })
      
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.classes()).toContain('password-input')
    })

    it('contains the required Nord components', async () => {
      const wrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: '',
          label: 'Password'
        }
      })
      
      // Check that all required elements are present
      expect(wrapper.find('nord-input').exists()).toBe(true)
      expect(wrapper.find('nord-button').exists()).toBe(true)
      expect(wrapper.find('nord-icon').exists()).toBe(true)
    })

    it('has correct element hierarchy', async () => {
      const wrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: '',
          label: 'Password'
        }
      })
      
      const input = wrapper.find('nord-input')
      const button = input.find('nord-button')
      const icon = button.find('nord-icon')
      
      // Verify the button is inside the input (end slot)
      expect(button.exists()).toBe(true)
      // Verify the icon is inside the button
      expect(icon.exists()).toBe(true)
    })
  })

  describe('Props and State Management', () => {
    it('accepts modelValue prop', async () => {
      const wrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: 'test123',
          label: 'Password'
        }
      })
      
      expect(wrapper.props('modelValue')).toBe('test123')
    })

    it('accepts label prop', async () => {
      const wrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: '',
          label: 'Custom Label'
        }
      })
      
      expect(wrapper.props('label')).toBe('Custom Label')
    })

    it('accepts showPassword prop', async () => {
      const wrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: '',
          showPassword: true
        }
      })
      
      expect(wrapper.props('showPassword')).toBe(true)
    })

    it('uses default label when not provided', async () => {
      const wrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: ''
        }
      })
      
      // The component should use 'Password' as default
      // We can't easily test the rendered attribute but we can verify the prop default
      expect(wrapper.props('label')).toBe('Password')
    })
  })

  describe('Event Handling', () => {
    it('emits update:showPassword when toggle button is clicked', async () => {
      const wrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: '',
          showPassword: false
        }
      })
      
      const button = wrapper.find('nord-button')
      await button.trigger('click')
      
      expect(wrapper.emitted('update:showPassword')).toBeTruthy()
      expect(wrapper.emitted('update:showPassword')?.[0]).toEqual([true])
    })

    it('toggles showPassword state correctly', async () => {
      const wrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: '',
          showPassword: false
        }
      })
      
      const button = wrapper.find('nord-button')
      
      // First click - should emit true
      await button.trigger('click')
      expect(wrapper.emitted('update:showPassword')?.[0]).toEqual([true])
      
      // Second click - should emit false
      await button.trigger('click')
      expect(wrapper.emitted('update:showPassword')?.[1]).toEqual([false])
    })

    it('starts with correct initial showPassword state', async () => {
      const hiddenWrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: '',
          showPassword: false
        }
      })
      
      const visibleWrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: '',
          showPassword: true
        }
      })
      
      expect(hiddenWrapper.props('showPassword')).toBe(false)
      expect(visibleWrapper.props('showPassword')).toBe(true)
    })
  })

  describe('Attribute Inheritance', () => {
    it('accepts additional props for nord-input', async () => {
      const wrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: '',
          placeholder: 'Enter your password',
          required: true,
          disabled: false
        }
      })
      
      // The component should render successfully with additional attributes
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('nord-input').exists()).toBe(true)
    })
  })

  describe('Component Integration', () => {
    it('maintains component integrity with different prop combinations', async () => {
      const wrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: 'mypassword',
          label: 'Enter Password',
          showPassword: true,
          placeholder: 'Type here...',
          required: true
        }
      })
      
      // Component should render with all props
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('nord-input').exists()).toBe(true)
      expect(wrapper.find('nord-button').exists()).toBe(true)
      expect(wrapper.find('nord-icon').exists()).toBe(true)
      
      // Props should be set correctly
      expect(wrapper.props('modelValue')).toBe('mypassword')
      expect(wrapper.props('label')).toBe('Enter Password')
      expect(wrapper.props('showPassword')).toBe(true)
    })

    it('handles edge cases gracefully', async () => {
      // Test with minimal props
      const minimalWrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: ''
        }
      })
      
      expect(minimalWrapper.exists()).toBe(true)
      expect(minimalWrapper.props('label')).toBe('Password') // Default value
      
      // Test with empty string values
      const emptyWrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: '',
          label: ''
        }
      })
      
      expect(emptyWrapper.exists()).toBe(true)
      expect(emptyWrapper.props('label')).toBe('')
    })
  })

  describe('Real-world Usage Scenarios', () => {
    it('simulates typical form usage', async () => {
      const wrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: '',
          label: 'Password',
          placeholder: 'Enter your password',
          required: true
        }
      })
      
      // Should render completely
      expect(wrapper.exists()).toBe(true)
      
      // Should be able to interact with toggle button
      const button = wrapper.find('nord-button')
      await button.trigger('click')
      
      expect(wrapper.emitted('update:showPassword')).toBeTruthy()
    })

    it('handles rapid toggle interactions', async () => {
      const wrapper = await mountSuspended(PasswordInput, {
        props: {
          modelValue: 'password123',
          showPassword: false
        }
      })
      
      const button = wrapper.find('nord-button')
      
      // Rapidly toggle multiple times
      await button.trigger('click') // Show
      await button.trigger('click') // Hide
      await button.trigger('click') // Show
      await button.trigger('click') // Hide
      
      const emissions = wrapper.emitted('update:showPassword')
      expect(emissions).toHaveLength(4)
      expect(emissions?.[0]).toEqual([true])
      expect(emissions?.[1]).toEqual([false]) 
      expect(emissions?.[2]).toEqual([true])
      expect(emissions?.[3]).toEqual([false])
    })
  })
})
