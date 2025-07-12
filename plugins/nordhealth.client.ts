/**
 * Nordhealth Design System Plugin for Nuxt 3
 * 
 * This plugin:
 * 1. Globally registers base Nordhealth components (Button, Input, etc.)
 * 2. Vue configuration for custom elements is handled in nuxt.config.ts
 * 3. TypeScript integration is configured in tsconfig.json for IntelliSense
 * 4. CSS framework and default theme loaded via nuxt.config.ts css array
 * 5. Allows flexibility to import additional components as needed
 */

// Import base components that we want globally available
import '@nordhealth/components/lib/Layout'
import '@nordhealth/components/lib/Header'
import '@nordhealth/components/lib/Stack'
import '@nordhealth/components/lib/Card'
import '@nordhealth/components/lib/Button'
import '@nordhealth/components/lib/Icon'
import '@nordhealth/components/lib/Input'
import '@nordhealth/components/lib/Dropdown'
import '@nordhealth/components/lib/DropdownGroup'
import '@nordhealth/components/lib/DropdownItem'
import '@nordhealth/components/lib/Checkbox'
// Note: Form components might be separate (like nord-form, nord-fieldset, etc.)
// We'll add them as we identify the specific form components needed

export default defineNuxtPlugin((nuxtApp) => {
  // Vue configuration for custom elements is now handled in nuxt.config.ts
  // This ensures proper build-time optimization
  
  // Provide Nordhealth utilities globally (senior-level extensibility)
  nuxtApp.provide('nordhealth', {
    // Theme information for dynamic theming if needed
		theme: 'vet'
	} )
})
