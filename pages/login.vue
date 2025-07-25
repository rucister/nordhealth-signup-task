<template>

	<!-- Login form -->
	<nord-stack class="auth-stack">
		<nord-card padding="l">
			<h1 slot="header">Sign in to provet cloud</h1>
			<nord-banner v-if=" loginError " variant="danger" class="n-margin-be-l">
				Login failed. Check credentials and try again.
			</nord-banner>
			<form class="login-form" @submit.prevent="handleLogin">
				<nord-stack direction="vertical" gap="m">
					<nord-input id="email" v-model="formData.email" type="email"
						label="Email" placeholder="Enter your email address" autofocus
						expand required :error="errors.email || undefined"
						@blur="handleFieldValidate( 'email' )" />

					<div class="password">
						<PasswordInput id="password" v-model="formData.password"
							placeholder="Enter your password" expand required
							:error="errors.password || undefined"
							@blur="handleFieldValidate( 'password' )" />
						<NuxtLink to="/forgot-password">Forgot password?</NuxtLink>
					</div>

					<nord-button variant="primary" type="submit" size="m"
						:disabled="!isValid">
						Sign In
					</nord-button>
				</nord-stack>
			</form>
		</nord-card>
		<!-- Navigation links -->
		<nord-card class="n-align-center">
			<p>
				New to provet cloud?
				<NuxtLink to="/signup" class="auth-link">Create an account</NuxtLink>
			</p>
		</nord-card>
	</nord-stack>
</template>

<script setup lang="ts">
import { validateEmail, validateRequired } from '~/utils/validation-utils'

// Use unauthenticated layout
definePageMeta( {
	layout: 'unauthenticated',
	middleware: 'notauth',
} )

const authService = useAuth()

// Setup form validation
const {
	formData,
	errors,
	isValid,
	validateAll,
	handleFieldValidate
} = useFormValidation(
	{
		email: '',
		password: ''
	},
	{
		email: [validateRequired, validateEmail],
		password: [validateRequired]
	},
	{ debounce: 300 }
)

useHead( {
	title: 'Sign In - Nordhealth',
	meta: [
		{ name: 'description', content: 'Sign in to your Nordhealth account.' },
	],
} )

// Login handler with validation
const isLoggingIn = ref( false )
const loginError = ref<StandardApiError | null>( null );
const handleLogin = async () => {
	if ( !validateAll() ) {
		return
	}

	isLoggingIn.value = true
	loginError.value = null
	try {
		await authService.login( {
			email: formData.email,
			password: formData.password
		} )
		navigateTo( '/' )
	} catch ( error ) {
		loginError.value = getError( error as StandardFetchError );
	} finally {
		isLoggingIn.value = false
	}

}
</script>
<style scoped>
.password {
	position: relative;
}

.password a {
	text-decoration: none;
	font-size: var(--n-font-size-s);
	position: absolute;
	inset-block-start: 0;
	inset-inline-end: 0;
}
</style>