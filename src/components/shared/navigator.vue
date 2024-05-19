<script setup lang="ts">
import colorsEnum from '@/core/types/enums/colorsEnum'
import PageNameEnum from '@/core/types/enums/pageNameEnum';
import router from '@/router';
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/userUserStore';
import RoleEnum from '@/core/types/enums/roleEnum';

const { t } = useI18n()
const userStore = useUserStore(); 
</script>

<template>
	<v-bottom-navigation elevation="5" :bg-color="colorsEnum.BG_DARK" :grow="true" class="blur-bg">
		<v-btn :value="t('navigator.home')" @click="router.push({name : PageNameEnum.HOME})">
			<!-- L'accueil est le lieu où tout les portfolio apraissent -->
			<v-icon>mdi-history</v-icon>

			<span>{{ t('navigator.home') }}</span>
		</v-btn>

		<v-btn v-if="userStore.user?.portfolio_id != null" :value="t('navigator.portfolio')">
			<!-- Affiche le portfolio de l'utilisateur -->

			<v-icon>mdi-pencil</v-icon>

			<span>{{ t('navigator.portfolio') }}</span>
		</v-btn>

		<v-btn v-else @click="router.push({name : PageNameEnum.CREATE_PORTFOLIO})">
			<!-- Permet de créer un portfolio -->

			<v-icon>mdi-invoice-plus</v-icon>

			<span>Créez votre portfolio</span>
		</v-btn>

		<v-btn :value="t('navigator.video')">
			<!-- Affiche le portfolio de l'utilisateur -->

			<v-icon>mdi-movie</v-icon>

			<span>{{ t('navigator.home') }}</span>
		</v-btn>
	</v-bottom-navigation>
</template>

<style scoped>
.blur-bg {
	backdrop-filter: blur(50);
}
</style>
