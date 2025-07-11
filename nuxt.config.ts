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
			}
		}
	},

	// Global CSS files
	css: [
		'@nordhealth/css',
		'@nordhealth/themes/lib/vet.css',
		'~/assets/css/main.css'
	],


	// Configure Vue to recognize Nordhealth custom elements (nord-*)
	vue: {
		compilerOptions: {
			isCustomElement: ( tag: string ) => tag.includes( '-' )
		}
	},

	// Ensure client-side rendering as per requirements
	ssr: false
} )