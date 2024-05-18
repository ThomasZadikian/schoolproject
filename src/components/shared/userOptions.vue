<script setup lang="ts">
import router from '@/router';
import { route } from '@/router/helpers';
import { useI18n } from 'vue-i18n'
import PageNameEnum from "@/core/types/enums/pageNameEnum";
import { useUserStore } from '@/store/userUserStore';
import colorsEnum from '@/core/types/enums/colorsEnum';

const userStore = useUserStore(); 

const { t } = useI18n()
const deconnection = () => {
	userStore.clearUser(); 
	router.push({name : PageNameEnum.HOME}); 
}
</script>

<template>
	<div v-if="userStore.getUser() == null">
		<v-btn @click="router.push({name : PageNameEnum.REGISTER})" variant="flat" :color="colorsEnum.BG_DARK" prepend-icon="mdi-account-plus-outline" class="mx-2">Créer un compte</v-btn>
		<v-btn @click="router.push({name : PageNameEnum.CONNECTION})" variant="flat" :color="colorsEnum.BG_DARK" prepend-icon="mdi-account-reactivate" class="mx-2">Se connecter</v-btn>
	</div>
	<div v-else>
		<v-btn @click="router.push({name : PageNameEnum.USER_INFORMATIONS})" variant="flat" :color="colorsEnum.BG_DARK" prepend-icon="mdi-account" class="mx-2" >Profil utilisateur</v-btn>
		<v-btn @click="deconnection" variant="flat" :color="colorsEnum.BG_DARK" prepend-icon="mdi-account-off" class="mx-2">Se déconnecter</v-btn>
	</div>
</template>
