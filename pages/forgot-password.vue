<template>
	<nord-stack class="auth-stack" gap="l" align-items="center"
		justify-content="center">
		<nord-card padding="l">
			<h1 slot="header">
				Reset password
			</h1>

			<!-- Success banner -->
			<nord-banner v-if=" showSuccessBanner " variant="success"
				class="n-margin-be-l">
				Reset request was successful. If the provided email exists in our
				system, you will receive a password reset link shortly.
				Please check your inbox and follow the instructions to reset your
				password.
			</nord-banner>

			<!-- Form for requesting password reset -->
			<nord-banner v-if=" showErrorBanner " variant="danger"
				class="n-margin-be-l">
				{{ forgotError?.message }}
			</nord-banner>

			<nord-button v-if=" showSuccessBanner || showErrorBanner "
				variant="default" type="submit" size="m" :loading="isSubmitting"
				@click="resetForgotPassword">
				Resend Link
			</nord-button>

			<!-- Forgot password form -->
			<form v-if=" !showSuccessBanner && !showErrorBanner "
				class="forgot-password-form" @submit.prevent="handleForgotPassword">
				<nord-stack gap="l" direction="vertical">
					<p>
						Enter your email address to receive a password reset link.
					</p>
					<nord-input id="email" v-model="formData.email" name="email"
						type="email" label="Email" placeholder="Enter your email address"
						required expand :error="errors.email" />
					<nord-button variant="primary" type="submit" size="m"
						:loading="isSubmitting">
						Send Reset Link
					</nord-button>
				</nord-stack>
			</form>
		</nord-card>

		<!-- Navigation links -->
		<div class="auth-links">
			<p>
				<NuxtLink to="/login" class="auth-link">Back to login</NuxtLink>
			</p>
		</div>
	</nord-stack>
</template>

<script setup lang="ts">
definePageMeta( {
	layout: 'unauthenticated',
	middleware: "notauth",
} );

const {
	formData,
	errors,
	validateAll,
	resetForm
} = useFormValidation(
	// Initial form data
	{
		email: "",
	},
	// Validation configuration - which validation functions to apply to each field
	{
		email: [validateRequired, validateEmail],
	}
);

const { forgotPassword } = useAuth()

const isSubmitting = ref( false );
const forgotError = ref<StandardApiError | null>( null );

const showSuccessBanner = ref( false )

const showErrorBanner = computed( () => {
	return ( forgotError.value && forgotError.value.code !== 404 && forgotError.value.code !== 200 )
} );

const handleForgotPassword = async (): Promise<void> => {
	// * Breake the flow if validation fails
	if ( !validateAll() ) {
		return;
	}

	isSubmitting.value = true;
	forgotError.value = null;

	try {
		await forgotPassword( {
			email: formData.email,
		} );
		resetForm();
	} catch ( error ) {
		forgotError.value = getError( error as StandardFetchError );
		showSuccessBanner.value = forgotError.value.code === 404
	} finally {
		isSubmitting.value = false;
	}
};

const resetForgotPassword = () => {
	resetForm();
	forgotError.value = null;
	showSuccessBanner.value = false;
};

</script>

<style scoped></style>