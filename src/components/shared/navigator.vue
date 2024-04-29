<script setup lang="ts">
import colorsEnum from '@/core/types/enums/colorsEnum'
</script>

<template>
	<v-bottom-navigation elevation="5" rounded="xl" :bg-color="colorsEnum.BG_DARK" :grow="true">
		<v-btn value="Accueil">
			<!-- L'accueil est le lieu où tout les portfolio apraissent -->
			<v-icon>mdi-history</v-icon>

			<span>Recent</span>
		</v-btn>

		<v-btn value="Portfolio">
			<!-- Affiche le portfolio de l'utilisateur -->

			<v-icon>mdi-heart</v-icon>

			<span>Favorites</span>
		</v-btn>

		<v-btn value="Vidéo">
			<!-- Affiche le portfolio de l'utilisateur -->

			<v-icon>mdi-map-marker</v-icon>

			<span>Nearby</span>
		</v-btn>
	</v-bottom-navigation>
</template>
