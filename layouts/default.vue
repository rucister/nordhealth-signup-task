<template>
	<nord-layout>
		<!-- Application header -->
		<nord-header slot="header" class="app-header">
			<Logo />
			<h1 class="n-typescale-l">Dashboard</h1>

			<div slot="end" style="display: flex; align-items: center; gap: 1rem;">
				<ThemeSwitcher />
				<nord-button variant="plain" size="s" @click="logout">
					Logout
				</nord-button>
			</div>
		</nord-header>

		<!-- Main content slot -->
		<slot />
	</nord-layout>
</template>

<script setup lang="ts">
const { logout } = useAuth()
</script>
