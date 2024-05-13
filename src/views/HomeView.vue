<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import searchBar from '@/components/shared/searchBar.vue'
import card from '@/components/shared/card.vue'
import navigator from '@/components/shared/navigator.vue'
import upsert from '@/database/upsertQueries'

const upsertDataTest = async () => {
	try {
		upsert('test', {
			testName: 'ExampleTest',
    		testAge: 30,
    		testDate: new Date('2024-05-05'),
    		testVarchar: 'example'
		})
	} catch(error) {
		console.error(error); 
	}
}
const { t } = useI18n()
// Des stores (pinia) remplaceront fakeData
const fakeData = {
	card1: {
		title: 'Je suis la carte 01',
		image: 'https://picsum.photos/200/300',
	},
	card2: {
		title: 'Je suis la carte 02',
		image: 'https://picsum.photos/200/400',
	},
	card3: {
		title: 'Je suis la carte 03',
		image: 'https://picsum.photos/210/300',
	},
	card4: {
		title: 'Je suis la carte 04',
		image: 'https://picsum.photos/250/300',
	},
	card5: {
		title: 'Je suis la carte 05',
		image: 'https://picsum.photos/205/300',
	},
	card6: {
		title: 'Je suis la carte 06',
		image: 'https://picsum.photos/236/300',
	},
	card7: {
		title: 'Je suis la carte 07',
		image: 'https://picsum.photos/200/305',
	},
}
</script>

<template>
	<searchBar></searchBar>
	<v-button @click="upsertDataTest">Ajouter une donnée</v-button>
	<div class="d-flex flex-wrap">
		<!-- Un onClick redirigera vers la page de détail de la carte -->
		<card v-for="data in fakeData" :title="data.title" :image="data.image"></card>
	</div>
	<navigator></navigator>
</template>
