<script setup lang="ts">
import router from '@/router';
import { useI18n } from 'vue-i18n'
import PageNameEnum from "@/core/types/enums/pageNameEnum";
import { useUserStore } from '@/store/userUserStore';
import colorsEnum from '@/core/types/enums/colorsEnum';
import RoleEnum from '@/core/types/enums/roleEnum';

const userStore = useUserStore(); 


const { t } = useI18n()
const deconnection = async () => {
	await userStore.clearUser(); 
	router.go(0); 
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
	<v-btn v-if="userStore.user?.role === RoleEnum.ADMIN" @click="console.log('Amène à la page gestion')" variant="flat" :color="colorsEnum.WARNING" prepend-icon="mdi-account-plus-outline" class="my-2 mx-2">Gestion des utilisateurs</v-btn>

</template>
