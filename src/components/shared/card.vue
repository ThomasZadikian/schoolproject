<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	title: string
	subtitle: string
	content: string
}>()
</script>

<template>
	<v-card border="sm" width="30%" height="450" :hover="true">
		<v-card-title>{{ props.title }}</v-card-title>
		<v-card-subtitle>{{ props.subtitle }}</v-card-subtitle>
		<v-card-text>{{ props.content }}</v-card-text>
	</v-card>
</template>
