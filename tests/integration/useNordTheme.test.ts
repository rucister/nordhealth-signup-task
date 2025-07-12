import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { useNordTheme } from '../../composables/useNordTheme'

// Mock VueUse useColorMode
const mockColorMode = {
  value: 'auto',
  store: vi.fn(),
  system: 'light' as 'light' | 'dark'
}

vi.mock('@vueuse/core', () => ({
  useColorMode: vi.fn(() => mockColorMode)
}))

// Mock DOM elements
const mockDocument = {
  querySelectorAll: vi.fn(),
  createElement: vi.fn(),
  head: {
    appendChild: vi.fn()
  }
}

const mockLink = {
  rel: '',
  href: '',
  as: '',
  setAttribute: vi.fn(),
  remove: vi.fn()
}

const mockMediaQuery = {
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn()
}

// Mock window.matchMedia
const mockMatchMedia = vi.fn(() => mockMediaQuery)

describe('useNordTheme', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks()
    
    // Setup DOM mocks
    Object.defineProperty(global, 'document', {
      value: mockDocument,
      writable: true
    })
    
    Object.defineProperty(global, 'window', {
      value: {
        matchMedia: mockMatchMedia
      },
      writable: true
    })
    
    // Setup createElement mock
    mockDocument.createElement.mockReturnValue(mockLink)
    mockDocument.querySelectorAll.mockReturnValue([])
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should initialize with correct default values', () => {
    const { theme, themeLabels, themeIcons } = useNordTheme()
    
    expect(theme).toBeDefined()
    expect(themeLabels).toEqual({
      light: 'Light',
      dark: 'Dark',
      'light-hc': 'Light High Contrast',
      'dark-hc': 'Dark High Contrast',
      auto: 'Auto (System)'
    })
    expect(themeIcons).toEqual({
      light: '☀️',
      dark: '🌙',
      'light-hc': '🔆',
      'dark-hc': '🌚',
      auto: '⚡'
    })
  })

  it('should provide setTheme function', () => {
    const { setTheme } = useNordTheme()
    
    expect(typeof setTheme).toBe('function')
    
    setTheme('dark')
    expect(mockColorMode.value).toBe('dark')
  })

  it('should provide resolvedTheme computed property', () => {
    const { resolvedTheme } = useNordTheme()
    
    expect(resolvedTheme).toBeDefined()
    // resolvedTheme should be a computed ref (readonly in runtime)
    expect(typeof resolvedTheme.value).toBe('string')
  })

  it('should setup system theme detection', () => {
    useNordTheme()
    
    // Should setup media query listener for system theme changes
    expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
    expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should handle all theme modes', () => {
    const { setTheme } = useNordTheme()
    
    // Test all theme modes
    const themes = ['light', 'dark', 'light-hc', 'dark-hc', 'auto'] as const
    
    themes.forEach(theme => {
      setTheme(theme)
      expect(mockColorMode.value).toBe(theme)
    })
  })

  it('should handle DOM manipulation for theme switching', () => {
    // Mock existing theme links
    const existingLink = { remove: vi.fn() }
    mockDocument.querySelectorAll.mockReturnValue([existingLink])
    
    const { setTheme } = useNordTheme()
    
    // Trigger theme change
    setTheme('dark')
    
    // Should query for existing theme links
    expect(mockDocument.querySelectorAll).toHaveBeenCalledWith('link[data-nord-theme]')
    
    // Should remove existing links
    expect(existingLink.remove).toHaveBeenCalled()
    
    // Should create new link element
    expect(mockDocument.createElement).toHaveBeenCalledWith('link')
    
    // Should set link attributes
    expect(mockLink.setAttribute).toHaveBeenCalledWith('data-nord-theme', 'true')
    
    // Should append to head
    expect(mockDocument.head.appendChild).toHaveBeenCalledWith(mockLink)
  })

  it('should handle server-side rendering gracefully', () => {
    // Mock server environment (no document)
    Object.defineProperty(global, 'document', {
      value: undefined,
      writable: true
    })
    Object.defineProperty(global, 'window', {
      value: undefined,
      writable: true
    })
    
    // Should not throw errors in SSR environment
    expect(() => {
      const { setTheme } = useNordTheme()
      setTheme('dark')
    }).not.toThrow()
  })

  it('should validate theme URLs are imported correctly', () => {
    // This test ensures that our Vite ?url imports are working
    // We can't test the actual import resolution, but we can ensure the structure is correct
    const { setTheme } = useNordTheme()
    
    // The composable should be able to handle all theme types without errors
    expect(() => setTheme('light')).not.toThrow()
    expect(() => setTheme('dark')).not.toThrow()
    expect(() => setTheme('light-hc')).not.toThrow()
    expect(() => setTheme('dark-hc')).not.toThrow()
  })

  it('should integrate properly with VueUse useColorMode', () => {
    const { theme } = useNordTheme()
    
    // Should use the mocked useColorMode
    expect(theme).toBe(mockColorMode)
  })
})
