<script setup lang="ts">
import colorsEnum from '@/core/types/enums/colorsEnum'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
	<v-bottom-navigation elevation="5" :bg-color="colorsEnum.BG_DARK" :grow="true" class="blur-bg">
		<v-btn :value="t('navigator.home')">
			<!-- L'accueil est le lieu où tout les portfolio apraissent -->
			<v-icon>mdi-history</v-icon>

			<span>{{ t('navigator.home') }}</span>
		</v-btn>

		<v-btn :value="t('navigator.portfolio')">
			<!-- Affiche le portfolio de l'utilisateur -->

			<v-icon>mdi-pencil</v-icon>

			<span>{{ t('navigator.portfolio') }}</span>
		</v-btn>

		<v-btn :value="t('navigator.video')">
			<!-- Affiche le portfolio de l'utilisateur -->

			<v-icon>mdi-movie</v-icon>

			<span>{{ t('navigator.home') }}</span>
		</v-btn>
	</v-bottom-navigation>
</template>

<style scoped>
.blur-bg {
	backdrop-filter: blur(50);
}
</style>
