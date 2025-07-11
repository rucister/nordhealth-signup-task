<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="logo-container">
		<img :src="logoSrc" alt="Provet Cloud" class="provet-cloud-logo" width="197" height="28">
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNordTheme } from '~/composables/useNordTheme'

const { resolvedTheme } = useNordTheme()

/**
 * Determine which logo to use based on current resolved theme
 * Dark logo for light themes, white logo for dark themes
 */
const logoSrc = computed(() => {
	const baseURL = useRuntimeConfig().app.baseURL || '/'

	const isDarkTheme = resolvedTheme.value === 'dark' || resolvedTheme.value === 'dark-hc'
	const logoFileName = isDarkTheme
		? 'Provet Cloud_logo_white_header.svg'
		: 'Provet Cloud_logo_dark_header.svg'

	// Ensure proper path joining with base URL
	return `${baseURL.replace(/\/$/, '')}/${logoFileName}`
})

</script>