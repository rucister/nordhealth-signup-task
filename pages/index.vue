<template>
	<div class="auth-container">
		<div class="auth-card">
			<h1>Welcome to Nordhealth</h1>
			<p>You are successfully logged in!</p>

			<div class="user-actions">
				<p>What would you like to do?</p>

				<div class="action-buttons">
					<nord-button variant="primary" @click="logout">
						Logout
					</nord-button>

					<NuxtLink to="/theme-test" class="auth-link test">
						🎨 Test VET Theme
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// Apply authentication middleware to protect this route
definePageMeta( {
	middleware: 'auth'
} )

// Landing page - entry point for authentication flow
useHead( {
	title: 'Welcome - Nordhealth',
	meta: [
		{ name: 'description', content: 'Sign in to your Nordhealth account or create a new one.' }
	]
} )

// Logout function
const logout = () => {
	// Remove authentication flag
	localStorage.removeItem( 'nordhealth_authenticated' )

	// Redirect to login page
	navigateTo( '/login' )
}
</script>