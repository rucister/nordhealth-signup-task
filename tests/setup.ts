// Global test setup
import { vi } from 'vitest'

// Mock Nuxt auto-imports for testing
;(globalThis as any).navigateTo = vi.fn()
;(globalThis as any).useRouter = vi.fn(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  go: vi.fn(),
  back: vi.fn(),
  forward: vi.fn()
}))

// Mock Vue Router for component tests
;(globalThis as any).useRoute = vi.fn(() => ({
  params: {},
  query: {},
  path: '/',
  fullPath: '/',
  name: null,
  meta: {}
}))

// Setup DOM globals
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
