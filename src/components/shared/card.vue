<script setup lang="ts">
import colorsEnum from '@/core/types/enums/colorsEnum'

const props = defineProps<{
	title: string
	image: string
}>()
</script>

<template>
	<v-card
		:border="false"
		rounded="xl"
		width="30%"
		height="350"
		:hover="true"
		class="mx-3 my-5"
		:color="colorsEnum.BG_CARD"
	>
		<v-card-title>{{ props.title }}</v-card-title>
		<!-- Définir le style dans la balise correpondante plus tard -->
		<img class="image-card" alt="" :src="props.image"></img>
	</v-card>
</template>

<style scoped>
.image-card {
	width: 100%; 
	height: 100%; 
	border-radius: 5px;
}
</style>