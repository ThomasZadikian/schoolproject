<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import searchBar from '@/components/shared/searchBar.vue'
import card from '@/components/shared/card.vue'

const { t } = useI18n()
// Des stores (pinia) remplaceront fakeData
const fakeData = {
	card1: {
		title: 'Je suis la carte 01',
		subtitle: 'Je suis le sous titre de la carte 01',
		content: 'Je suis le contenu de cette carte',
	},
	card2: {
		title: 'Je suis la carte 02',
		subtitle: 'Je suis le sous titre de la carte 02',
		content: 'Je suis le contenu de cette carte',
	},
}
</script>

<template>
	<searchBar></searchBar>
	<div v-for="data in fakeData" class="d-flex align-center justify-center">
		<card :title="data.title" :subtitle="data.subtitle" :content="data.content"></card>
	</div>
</template>
