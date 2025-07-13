<template>
	<main class="n-stack-horizontal">
		<ThemeSwitcher />
		<nord-stack class="auth-stack" gap="xl" align-items="center"
			justify-content="center">
			<Logo />
			<slot />
		</nord-stack>
		<DemoInfo />
	</main>
</template>
<script setup lang="ts">
useHead( {
	htmlAttrs: {
		class: 'unauthed',
	},
} )
</script>
<style scoped>
.theme-switcher {
	position: absolute;
	top: 1rem;
	right: 1rem;
	z-index: 10;
}
</style>