<script setup lang="ts">
import router from '@/router';
import { route } from '@/router/helpers';
import { useI18n } from 'vue-i18n'
import PageNameEnum from "@/core/types/enums/pageNameEnum";
import { useUserStore } from '@/store/userUserStore';

const userStore = useUserStore(); 

const { t } = useI18n()
const deconnection = () => {
	userStore.clearUser(); 
	router.push({name : PageNameEnum.HOME}); 
}
</script>

<template>
	<div v-if="userStore.getUser() == null">
		<v-btn @click="router.push({name : PageNameEnum.REGISTER})" variant="text" prepend-icon="mdi-account">Créer un compte</v-btn>
		<v-btn @click="router.push({name : PageNameEnum.CONNECTION})" variant="text" prepend-icon="mdi-account">Se connecter</v-btn>
	</div>
	<div v-else>
		<v-btn @click="router.push({name : PageNameEnum.USER_INFORMATIONS})" variant="text" prepend-icon="mdi-account">Profil utilisateur</v-btn>
		<v-btn @click="deconnection" variant="text" prepend-icon="mdi-account">Se déconnecter</v-btn>
	</div>
</template>
