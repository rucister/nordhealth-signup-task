<template>
	<div class="demo-info">
		<!-- <h2 class="demo-title">Demo Information</h2>
		<p class="demo-description">
			This demo showcases the Nordhealth AR application with a focus on user authentication and theme customization.
			Feel free to explore the features and functionalities.
		</p>
		<p class="demo-note">
			Note: This is a demo environment. Some features may be limited or not fully functional.
		</p> -->
		<nord-popout id="example" position="block-start">
			<nord-card class="demo-info-card">
				<h2 slot="header">Demo Information</h2>
				<nord-stack gap="m">
					<p>This demo showcases for the Nordhealth signup task.</p>
					<nord-divider />
					<nord-stack>
						<h4>Signup Page</h4>
						<p>
							You can simmulate existing user error by using the following
							credentials:
						</p>
						<p>
							<strong>Email:</strong> already@exists.com
							<br>
							<strong>Password:</strong>
							any_password
						</p>
					</nord-stack>
					<nord-divider />

					<nord-stack>
						<h4>Login Page</h4>
						<div>You can sign in using the following credentials:</div>
						<div>
							<strong>Email:</strong> test@example.com
							<br>
							<strong>Password:</strong> password123
						</div>
					</nord-stack>
					<nord-divider />

					<nord-stack>
						<h4>Forgot Password</h4>
						<div>You can simmulate successful forgot password using below email:</div>
						<div>
							<strong>Email:</strong> test@example.com
						</div>
					</nord-stack>
					<nord-divider />
					<nord-banner>
						<p>
							The api simmulation may randomly return an error 500 from time to time.
						</p>
					</nord-banner>

				</nord-stack>
			</nord-card>
		</nord-popout>
		<nord-button variant="plain" size="l" square aria-controls="example">
			<nord-icon name="interface-info" size="l" label="Options" />
		</nord-button>
	</div>
</template>

<script setup lang="ts">
import '@nordhealth/components/lib/Divider'
</script>

<style scoped>
.demo-info {
	position: fixed;
	bottom: 1rem;
	right: 1rem;
	z-index: 1000;
}

.demo-info-card {
	max-width: 300px;
}
</style>