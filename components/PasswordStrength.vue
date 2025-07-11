<template>
	<nord-stack direction="vertical" gap="xs">
		<!-- Strength indicators using simple divs -->
		<nord-stack direction="horizontal" gap="xs">
			<div v-for=" i in 4 " :key="i" class="strength-bar"
				:class="{ 'active': i <= strength }"
				:style="{ '--strength-color': getStrengthColor( i ) }" />
		</nord-stack>

		<!-- Strength label using nord-text -->
		<nord-stack direction="horizontal" gap="xs">
			<div class="strength-label"
				:style="{ '--strength-color': getLabelVariant() }">
				{{ strengthLabels[strength as keyof typeof strengthLabels] }}-{{ strength }}
			</div>
		</nord-stack>
	</nord-stack>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getPasswordStrength } from '~/utils/validation'

const props = defineProps<{
	password: string
}>()

// Calculate strength internally using the validation utility
const strength = computed( () => getPasswordStrength( props.password ) )

const strengthLabels = {
	0: 'Enter a strong password',
	1: 'Weak',
	2: 'Fair',
	3: 'Good',
	4: 'Strong'
}

// Get the color for each strength bar
const getStrengthColor = ( barIndex: number ) => {
	if ( barIndex > strength.value ) return 'var(--n-color-border)'

	switch ( strength.value ) {
		case 1: return 'var(--n-color-status-danger)'
		case 2: return 'var(--n-color-status-warning)'
		case 3: return 'var(--n-color-status-info)'
		case 4: return 'var(--n-color-status-success)'
		default: return 'var(--n-color-border)'
	}
}

const getLabelVariant = () => {
	switch ( strength.value ) {
		case 1: return 'var(--n-color-status-danger)'
		case 2: return 'var(--n-color-status-warning)'
		case 3: return 'var(--n-color-status-info)'
		case 4: return 'var(--n-color-status-success)'
		default: return 'var(--n-color-border)'
	}
}
</script>

<style scoped>
.strength-bar {
	flex: 1;
	height: var(--n-space-xs);
	background-color: var(--n-color-border);
	border-radius: var(--n-border-radius-s);
	transition: background-color 0.2s ease;
}

.strength-bar.active {
	background-color: var(--strength-color);
}

.strength-label {
	color: var(--strength-color);
	font-size: var(--n-font-size-s);
}
</style>