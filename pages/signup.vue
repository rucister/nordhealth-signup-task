<template>
	<nord-stack class="auth-stack" gap="l" align-items="center"
		justify-content="center">

		<!-- Signup form -->
		<nord-card padding="l">
			<h1 slot="header">
				Create your account
			</h1>

			<!-- Form for signing up -->
			<form v-if=" !signupError " class="signup-form"
				@submit.prevent="handleSignup">
				<nord-stack gap="l" direction="vertical">
					<p>
						Join Provet Cloud and get started with our veterinary healthcare
						solutions.
					</p>
					<nord-input id="email" name="email" v-model="formData.email"
						type="email" label="Email" placeholder="Enter your email address"
						:error="errors.email ?? ''" :disabled="isSubmitting" autofocus
						required expand />
					<PasswordInput id="password" v-model="formData.password"
						v-model:show-password="tshowPassword"
						placeholder="Create a secure password" :error="errors.password"
						:disabled="isSubmitting" required />
					<PasswordStrength :password="formData.password" />
					<PasswordInput id="confirmPassword" v-model="formData.confirmPassword"
						v-model:show-password="tshowPassword"
						placeholder="Confirm your password" :error="errors.confirmPassword"
						:disabled="isSubmitting" required />
					<nord-checkbox v-model="formData.subscribeToUpdates"
						label="Receive occasional product updates and announcements"
						:disabled="isSubmitting" />
					<nord-button variant="primary" type="submit" size="m"
						:loading="isSubmitting">
						Create Account
					</nord-button>
				</nord-stack>
			</form>

			<!-- Error state -->
			<nord-stack v-if=" signupError " gap="l" class="error-block">
				<nord-banner variant="danger">
					{{ signupError.message }}
				</nord-banner>
				<nord-button @click="resetSignup">Try again</nord-button>
			</nord-stack>
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
import { validateRequired, validateEmail, validatePassword, validatePasswordConfirmation } from '~/utils/validation-utils'

// Use unauthenticated layout
definePageMeta( {
	layout: "unauthenticated",
	middleware: "notauth",
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
	resetForm
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


const { signup } = useAuth()

const isSubmitting = ref( false );
const signupError = ref<StandardApiError | null>( null );
// Form submission
const handleSignup = async () => {
	// * Breake the flow if validation fails
	if ( !validateAll() ) {
		return;
	}

	isSubmitting.value = true;

	try {
		// Simulate API call
		await signup( {
			email: formData.email,
			password: formData.password,
			passwordConfirmation: formData.confirmPassword,
			subscribeToUpdates: formData.subscribeToUpdates
		} );
	}
	catch ( error ) {
		signupError.value = getError( error as StandardFetchError );
	}
	finally {
		isSubmitting.value = false;
	}
};

const resetSignup = () => {
	resetForm();
	signupError.value = null;
};


</script>
<style scoped>
.error-message {
	--n-color-text: var(--n-color-text-error);
	color: var(--n-color-text-error);
}
</style>