<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()
const searchInput = ref()

const search = (searchInput: string) => {
	// Create here the search logic
}
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
		></v-text-field>
		<v-btn class="mb-5" variant="elevated" @click="search(searchInput)">{{
			t('pages.home.button.searchButton')
		}}</v-btn>
	</v-container>
</template>
