<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/parser -->
<template>
	<nord-input
		:id="inputId"
		v-model="inputValue"
		label="Email"
		type="email"
		:placeholder="placeholder"
		:error="error"
		:autofocus="autofocus"
		:expand="expand"
		:required="required"
		@blur="handleBlur"
		@input="handleInput"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
	modelValue?: string
	placeholder?: string
	error?: string
	autofocus?: boolean
	expand?: boolean
	required?: boolean
	validateOnBlur?: boolean
	id?: string
}>(), {
	modelValue: '',
	placeholder: 'Enter your email address',
	error: '',
	autofocus: false,
	expand: false,
	required: true,
	validateOnBlur: true,
	id: 'email'
})

const emit = defineEmits<{
	'update:modelValue': [value: string]
	'blur': []
	'input': []
	'validation-error': [error: string]
}>()

// Generate unique ID if needed
const inputId = computed((): string => props.id)

// Two-way data binding
const inputValue = computed({
	get: (): string => props.modelValue,
	set: (value: string) => emit('update:modelValue', value)
})

// Email validation function
const validateEmail = (email: string): string => {
	if (!email) {
		return 'Email is required'
	}
	
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!emailRegex.test(email)) {
		return 'Please enter a valid email address'
	}
	
	return ''
}

// Handle blur event with optional validation
const handleBlur = (): void => {
	if (props.validateOnBlur) {
		const validationError = validateEmail(inputValue.value)
		emit('validation-error', validationError)
	}
	emit('blur')
}

// Handle input event
const handleInput = (): void => {
	emit('input')
}

// Expose validation function for parent components
defineExpose({
	validate: (): string => validateEmail(inputValue.value)
})
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
