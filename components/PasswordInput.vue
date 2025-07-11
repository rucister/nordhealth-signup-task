<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<nord-input v-model="value" v-bind="$attrs" :key="showPassword.toString()"
		:label="label" :type="showPassword ? 'text' : 'password'" expand class="password-input">
		<nord-button slot="end" variant="plain" type="button" size="s"
			@click="togglePasswordVisibility">
			<nord-icon
				:name="showPassword ? 'interface-edit-on' : 'interface-edit-off'"></nord-icon>
		</nord-button>
	</nord-input>
</template>

<script setup lang="ts">

const { label = 'Password' } = defineProps<{
	label?: string
}>()
// Password visibility state
const value = defineModel<string>( { default: '', required: true } )
const showPassword = defineModel<boolean>( 'showPassword', { default: false } )
const index = ref( 0 )

// Toggle password visibility
const togglePasswordVisibility = (): void => {
	showPassword.value = !showPassword.value
	index.value += 1 // Force re-render by changing the key
}

</script>
<style scopped>
.password-input nord-button[slot="end"]{
	padding-right: 0.25rem;
}
</style>