<template>
	<div class="theme-switcher">
		<nord-dropdown>
			<nord-button
slot="toggle" variant="plain" size="s"
				:title="`Current theme: ${themeLabels[theme]}`">
				<span>{{ themeIcons[resolvedTheme] }}</span>
				<span class="sr-only">{{ themeLabels[theme] }}</span>
			</nord-button>

			<nord-dropdown-group heading="Interface Theme">
				<nord-dropdown-item
v-for=" ( label, themeKey ) in themeLabels "
					:key="themeKey" @click="handleThemeSelect( themeKey )">
					<span>
						<span>{{ getThemeIcon( themeKey ) }}</span>
						<span>{{ label }}</span>
						<span v-if=" theme === themeKey ">✓</span>
					</span>
				</nord-dropdown-item>
			</nord-dropdown-group>
		</nord-dropdown>
	</div>
</template>

<script setup>
import { useNordTheme } from '~/composables/useNordTheme'

const { theme, resolvedTheme, themeLabels, themeIcons, setTheme } = useNordTheme()

const handleThemeSelect = ( themeKey ) => {
	setTheme( themeKey )
}

const getThemeIcon = ( themeKey ) => {
	return themeIcons[ themeKey ] || '🎨'
}
</script>
