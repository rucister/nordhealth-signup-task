import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig( {
  test: {
		environment: 'nuxt',
    globals: true,
		setupFiles: ['./tests/setup.ts'],
		// Coverage configuration
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html', 'lcov'],
			reportsDirectory: './coverage',
			exclude: [
				'coverage/**',
				'dist/**',
				'packages/*/test{,s}/**',
				'**/*.d.ts',
				'**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
				'**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
				'tests/**',
				'node_modules/**',
				'.nuxt/**',
				'public/**',
				// Exclude Nuxt virtual modules to prevent HTML report generation errors
				// These virtual modules (like virtual:nuxt:*) exist only in memory and have 
				// complex encoded paths that cause file system errors on Windows when 
				// generating HTML coverage reports
				'**/virtual:*/**',
				'**/*virtual*',
				// Exclude configuration files from coverage
				// Config files don't contain business logic requiring tests
				'**/nuxt.config.ts',
				'**/eslint.config.*'
				// Note: Plugins included in coverage for visibility but testing optional
				// unless they contain complex business logic
			],
			// Coverage thresholds to enforce quality
			thresholds: {
				global: {
					branches: 80,
					functions: 80,
					lines: 80,
					statements: 80
				}
			}
		},
		// Test timeout
		testTimeout: 10000
  }
})
