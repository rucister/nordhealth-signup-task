import { useColorMode } from '@vueuse/core'
// Import theme URLs - Vite will resolve these to production-safe paths
import vetUrl from '@nordhealth/themes/lib/vet.css?url'
import vetDarkUrl from '@nordhealth/themes/lib/vet-dark.css?url'
import vetHcUrl from '@nordhealth/themes/lib/vet-high-contrast.css?url'
import vetDarkHcUrl from '@nordhealth/themes/lib/vet-dark-high-contrast.css?url'

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

	// Theme URL mapping - production-safe paths from Vite
	const themeUrls = {
		light: vetUrl,
		dark: vetDarkUrl,
		'light-hc': vetHcUrl,
		'dark-hc': vetDarkHcUrl
	}

	// Apply theme by loading CSS dynamically
	const applyTheme = (theme: Exclude<NordTheme, 'auto'>) => {
		if (typeof document === 'undefined') return

		// Remove existing theme links
		const existingLinks = document.querySelectorAll( 'link[data-nord-theme]' )
		existingLinks.forEach( link => link.remove() )

		// Add new theme link
		const link = document.createElement('link')
		link.rel = 'stylesheet'
		link.href = themeUrls[theme]
		link.setAttribute( 'data-nord-theme', 'true' )
		document.head.appendChild( link )
	}

	// Watch for theme changes and apply them
	watch(resolvedTheme, (newTheme) => {
		applyTheme(newTheme)
	}, { immediate: true })

	// Note: No preloading needed - theme files are small (~3KB each)
	// and modern browsers cache them efficiently after first load

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
