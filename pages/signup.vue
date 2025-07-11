<template>
	<nord-stack
class="auth-stack" gap="l" align-items="center"
		justify-content="center">

		<!-- Signup form -->
		<nord-card padding="l">
			<h1 slot="header">
				Create your account
			</h1>
			<form class="signup-form" @submit.prevent="handleSignup">
				<nord-stack gap="l" direction="vertical">
					<p>
						Join Provet Cloud and get started with our veterinary healthcare
						solutions.
					</p>
					<nord-input
v-model="formData.email" type="email" label="Email"
						placeholder="Enter your email address" :error="errors.email ?? ''"
						autofocus required expand />
					<PasswordInput
v-model="formData.password"
						v-model:show-password="tshowPassword"
						placeholder="Create a secure password" :error="errors.password"
						required />
					<PasswordStrength :password="formData.password" />
					<PasswordInput
v-model="formData.confirmPassword"
						v-model:show-password="tshowPassword"
						placeholder="Confirm your password" :error="errors.confirmPassword"
						required />
					<nord-checkbox
v-model="formData.subscribeToUpdates"
						label="Receive occasional product updates and announcements" />
					<nord-button
variant="primary" type="submit" size="m"
						:loading="isSubmitting">
						Create Account
					</nord-button>
				</nord-stack>
			</form>
		</nord-card>

		<!-- Navigation links -->
		<div class="auth-links">
			<p>
				Already have an account?
				<NuxtLink to="/login" class="auth-link">Sign in here</NuxtLink>
			</p>
		</div>
	</nord-stack>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { validateRequired, validateEmail, validatePassword, validatePasswordConfirmation } from '~/utils/validation'

// Use unauthenticated layout
definePageMeta( {
	layout: "unauthenticated",
} );

useHead( {
	title: "Create Account - Nordhealth",
	meta: [
		{
			name: "description",
			content:
				"Create your Nordhealth account and get started with our veterinary healthcare solutions.",
		},
	],
} );

const tshowPassword = ref( false );

const {
	formData,
	errors,
	validateAll,
} = useFormValidation(
	// Initial form data
	{
		email: "",
		password: "",
		confirmPassword: "",
		subscribeToUpdates: false,
	},
	// Validation configuration - which validation functions to apply to each field
	{
		email: [validateRequired, validateEmail],
		password: [validateRequired, validatePassword],
		confirmPassword: [
			validateRequired,
			( value ) => validatePasswordConfirmation( formData.password )( value )
		],
	}
);

const isSubmitting = ref( false );
// Form submission
const handleSignup = async () => {
	if ( !validateAll() ) {
		return;
	}

	isSubmitting.value = true;

	try {
		// Simulate API call
		await new Promise( resolve => setTimeout( resolve, 1000 ) );

		// In a real app, you would make an API call here
		console.log( "Account created:", formData );

		// Redirect to success page
		await navigateTo( "/success" );
	}
	catch ( error ) {
		console.error( "Signup failed:", error );
		// Handle error (show toast, etc.)
	}
	finally {
		isSubmitting.value = false;
	}
};


</script>
