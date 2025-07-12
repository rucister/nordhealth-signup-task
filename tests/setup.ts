// Global test setup for Nuxt environment
import { vi } from 'vitest'

// Setup DOM globals for components that need them
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock console methods for cleaner test output
Object.defineProperty( window, 'console', {
	value: {
		...console,
		warn: vi.fn(),
		error: vi.fn(),
	},
} )
