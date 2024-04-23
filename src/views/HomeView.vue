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
}
</script>

<template>
	<searchBar></searchBar>
	<container v-for="data in fakeData">
		<card :title="data.title" :subtitle="data.subtitle" :content="data.content"></card>
	</container>
</template>
