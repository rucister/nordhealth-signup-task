// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig( {
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	modules: ['@nuxt/eslint'],

	app: {
		rootTag: 'div',
		rootAttrs: {
			class: 'nordhealth-app'
		},
		head: {
			htmlAttrs: {
				class: 'n-reset'
			},
			// Progressive Web App and Favicon Configuration
			link: [
				{ rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
				{ rel: 'icon', href: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
				{ rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
				{ rel: 'manifest', href: '/manifest.json' }
			],
			meta: [
				{ name: 'robots', content: 'noindex, nofollow' },
				{ name: 'theme-color', content: '#401197' },
				{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
				{ name: 'apple-mobile-web-app-title', content: 'AR Signup' }
			]
		}
	},

	runtimeConfig: {
		public: {
			apiBase: '/' // or '/' — MSW API mock intercepts it
		}
	},

	// Global CSS files - only base theme, others loaded dynamically
	css: [
		'@nordhealth/css',
		'@nordhealth/themes/lib/vet.css', // Light theme (base)
		'~/assets/css/main.css'
	],

	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],


	// Configure Vue to recognize Nordhealth custom elements (nord-*)
	vue: {
		compilerOptions: {
			isCustomElement: ( tag: string ) => tag.startsWith( 'nord-' )
		}
	},

	// Ensure client-side rendering as per requirements
	ssr: false
} )