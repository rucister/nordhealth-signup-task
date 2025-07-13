<template>
	<div class="auth-container">
		<nord-empty-state v-if=" showWelcome ">
			<h1>Welcome to Provet Cloud</h1>
			<p>You have successfully registered!</p>
			<div class="user-actions">
				<nord-stack direction="horizontal" class="action-buttons">
					<nord-button variant="primary">
						View profile
					</nord-button>
					<nord-button variant="default" @click="logout">
						Logout
					</nord-button>
				</nord-stack>
			</div>
		</nord-empty-state>
		<nord-empty-state v-else>
			<h1>Welcome Back</h1>
			<p>You are successfully logged in!</p>
			<div class="user-actions">
				<div class="action-buttons">
					<nord-button @click="logout">
						Logout
					</nord-button>
				</div>
			</div>
		</nord-empty-state>
	</div>
</template>

<script setup lang="ts">
import '@nordhealth/components/lib/EmptyState'
// Apply authentication middleware to protect this route
definePageMeta( {
	middleware: 'auth'
} )

// Landing page - entry point for authentication flow
useHead( {
	title: 'Dashboard - Provet Cloud',
} )

const { logout } = useAuth()

const showWelcome = computed( () => {
	return useRoute().query.welcome === 'true'
} )

</script>