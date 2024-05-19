<script setup lang="ts">
const props = defineProps<{
    visible:boolean, 
    message: string, 
    color?: string, 
}>(); 
</script>

<template>
	<v-snackbar v-model="props.visible" :color="props.color" open-delay="100" close-delay="100" close-on-content-click :timeout="1000" location="top right" timer>
      {{ props.message }}
    </v-snackbar>
</template>