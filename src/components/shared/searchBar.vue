<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import colorsEnum from '@/core/types/enums/colorsEnum'
import userOptions from './userOptions.vue';
import error from './error.vue';

const { t } = useI18n()
const searchInput = ref()

const search = (searchInput: string) => {
	// Create here the search logic
}

let visibel = false
</script>

<template>
	<v-container class="d-flex align-center justify-center">
		<v-text-field
			class="me-5 mt-1"
			variant="solo"
			v-model="searchInput"
			prepend-inner-icon="mdi-alert"
			:label="t('pages.home.search')"
			placeholder="..."
			:bg-color="colorsEnum.BG_CARD"
		></v-text-field>
		<v-btn
			class="mb-5"
			variant="elevated"
			@click="search(searchInput)"
			:color="colorsEnum.BG_CARD"
			>{{ t('pages.home.button.searchButton') }}</v-btn
		>
	</v-container>
	<userOptions></userOptions>
</template>
