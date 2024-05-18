<script setup lang="ts">
import router from '@/router';
import { route } from '@/router/helpers';
import { useI18n } from 'vue-i18n'
import PageNameEnum from "@/core/types/enums/pageNameEnum";


const { t } = useI18n()
</script>

<template>
		<v-btn @click="router.push({name : PageNameEnum.REGISTER})" variant="text" prepend-icon="mdi-account">Créer un compte</v-btn>
		<v-btn @click="router.push({name : PageNameEnum.CONNECTION})" variant="text" prepend-icon="mdi-account">Profil utilisateur</v-btn>
</template>
