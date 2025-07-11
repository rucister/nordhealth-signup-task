import { useColorMode } from '@vueuse/core'

export type NordTheme = 'light' | 'dark' | 'light-hc' | 'dark-hc' | 'auto'

export const useNordTheme = () => {
	// VueUse color mode with custom Nordhealth themes
	const mode = useColorMode({
		attribute: 'data-nord-theme',
		modes: {
			light: 'light',
			dark: 'dark',
			'light-hc': 'light-hc',
			'dark-hc': 'dark-hc',
			auto: 'auto'
		} as Record<string, string>,
		storageKey: 'nordhealth-theme',
		initialValue: 'auto'
	})

	// Theme to CSS file mapping
	const themeFiles = {
		light: 'vet.css',
		dark: 'vet-dark.css',
		'light-hc': 'vet-high-contrast.css',
		'dark-hc': 'vet-dark-high-contrast.css'
	}

	// Get system theme preference
	const getSystemTheme = (): 'light' | 'dark' => {
		if (typeof window === 'undefined') return 'light'
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	}

	// Resolve actual theme (handle 'auto' mode)
	const resolvedTheme = computed(() => {
		if (mode.value === 'auto') {
			return getSystemTheme()
		}
		return mode.value as Exclude<NordTheme, 'auto'>
	})

	// Apply theme by switching CSS files
	const applyTheme = (theme: Exclude<NordTheme, 'auto'>) => {
		if (typeof document === 'undefined') return

		// Remove existing dynamic theme links
		const existingThemes = document.querySelectorAll('link[data-nord-theme-file]')
		existingThemes.forEach(link => link.remove())

		// For light theme, rely on the static import from plugin
		if (theme === 'light') {
			return
		}

		// For non-light themes, load dynamically
		const themeFile = themeFiles[theme]
		const link = document.createElement('link')
		link.rel = 'stylesheet'
		link.href = `/_nuxt/node_modules/@nordhealth/themes/lib/${themeFile}`
		link.setAttribute('data-nord-theme-file', theme)

		// Insert after CSS framework
		const head = document.head
		const cssFramework = document.querySelector('link[href*="@nordhealth/css"]')

		if (cssFramework) {
			cssFramework.insertAdjacentElement('afterend', link)
		} else {
			head.appendChild(link)
		}
	}

	// Watch for theme changes and apply them
	watch(resolvedTheme, (newTheme) => {
		applyTheme(newTheme)
	}, { immediate: true })

	// Listen for system theme changes when in auto mode
	if (typeof window !== 'undefined') {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		mediaQuery.addEventListener('change', () => {
			if (mode.value === 'auto') {
				applyTheme(getSystemTheme())
			}
		})
	}

	// Theme display names for UI
	const themeLabels = {
		light: 'Light',
		dark: 'Dark',
		'light-hc': 'Light High Contrast',
		'dark-hc': 'Dark High Contrast',
		auto: 'Auto (System)'
	}

	// Theme icons for UI
	const themeIcons = {
		light: '☀️',
		dark: '🌙',
		'light-hc': '🔆',
		'dark-hc': '🌚',
		auto: '⚡'
	}

	return {
		theme: mode,
		resolvedTheme: readonly(resolvedTheme),
		themeLabels,
		themeIcons,
		setTheme: (newTheme: NordTheme) => { mode.value = newTheme as any }
	}
}
