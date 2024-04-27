<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import searchBar from '@/components/shared/searchBar.vue'
import card from '@/components/shared/card.vue'
import navigator from '@/components/shared/navigator.vue'
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
	card3: {
		title: 'Je suis la carte 03',
		subtitle: 'Je suis le sous titre de la carte 02',
		content: 'Je suis le contenu de cette carte',
	},
	card4: {
		title: 'Je suis la carte 04',
		subtitle: 'Je suis le sous titre de la carte 02',
		content: 'Je suis le contenu de cette carte',
	},
	card5: {
		title: 'Je suis la carte 05',
		subtitle: 'Je suis le sous titre de la carte 02',
		content: 'Je suis le contenu de cette carte',
	}, 
	card6: {
		title: 'Je suis la carte 06',
		subtitle: 'Je suis le sous titre de la carte 02',
		content: 'Je suis le contenu de cette carte',
	}, 
	card7: {
		title: 'Je suis la carte 07',
		subtitle: 'Je suis le sous titre de la carte 02',
		content: 'Je suis le contenu de cette carte',
	}, 
}
</script>

<template>
	<searchBar></searchBar>
	<div class="d-flex flex-wrap">
			<!-- Un onClick redirigera vers la page de détail de la carte -->
			<card v-for="data in fakeData" :title="data.title" :subtitle="data.subtitle" :content="data.content"></card>
	</div>
	<navigator></navigator>
</template>