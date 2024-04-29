<script setup lang="ts">
import colorsEnum from '@/core/types/enums/colorsEnum'
</script>

<template>
	<v-bottom-navigation elevation="5" :bg-color="colorsEnum.BG_DARK" :grow="true" class="blur-bg">
		<v-btn value="Accueil">
			<!-- L'accueil est le lieu où tout les portfolio apraissent -->
			<v-icon>mdi-history</v-icon>

			<span>Accueil</span>
		</v-btn>

		<v-btn value="Portfolio">
			<!-- Affiche le portfolio de l'utilisateur -->

			<v-icon>mdi-pencil</v-icon>

			<span>Portfolio</span>
		</v-btn>

		<v-btn value="Vidéo">
			<!-- Affiche le portfolio de l'utilisateur -->

			<v-icon>mdi-movie</v-icon>

			<span>Vidéo</span>
		</v-btn>
	</v-bottom-navigation>
</template>

<style scoped>
.blur-bg {
	backdrop-filter: blur(50);
}
</style>
