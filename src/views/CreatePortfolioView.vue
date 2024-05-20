<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import searchBar from '@/components/shared/searchBar.vue'
import navigator from '@/components/shared/navigator.vue'
import { useUserStore } from '@/store/userUserStore';
import colorsEnum from '@/core/types/enums/colorsEnum';
import router from '@/router';
import PageNameEnum from '@/core/types/enums/pageNameEnum';
import error from '@/components/shared/error.vue';
import ErrorEnum from '@/core/types/enums/errorEnum';
import { ref, type Ref } from 'vue';
import type { PortFolioModel } from '@/core/models/portfolioModel';

const { t } = useI18n()
const userStore = useUserStore()
const user = userStore.getUser(); 
const errorVisible = ref(false); 
const errorText = ref(''); 
const errorColor = ref(''); 

const formData: Ref<PortFolioModel> = ref({
    user_id : 0 ,
    title : '',
    description: '',
})

let data; 

const createValidation = async () => {
    if (user != null) {
      formData.value.user_id = user.user_id; 
        try {
            const response = await fetch('/api/createPortfolio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData.value)
            })
            if (!response.ok) {
              errorVisible.value = true; 
              errorText.value = ErrorEnum.DELETE_FAILED
              errorColor.value = colorsEnum.WARNING; 
            } else {
              errorVisible.value = true; 
              errorText.value = ErrorEnum.DELETE_SUCCESS
              errorColor.value = colorsEnum.SUCCESS;
              data = await response.json(); 
              userStore.retrieveUserPortfolioId(data.portfolio_id); 
              setTimeout(async() => {
                await router.push({name : PageNameEnum.HOME})
              }, 1000);
            }
        } catch (error) {
          errorText.value = ErrorEnum.CONNECTION_NOT_FOUND
          errorColor.value = colorsEnum.WARNING; 
        }
    } else {
      errorText.value = ErrorEnum.UNAUTHORIZED_ACCESS
      errorColor.value = colorsEnum.WARNING; 
      setTimeout( async() => {
        await router.push({name : PageNameEnum.HOME}); 
      }, 1000)
    }
};
console.log(user)
</script>
<template>
    <searchBar></searchBar>
    <error :visible="errorVisible" :message="errorText" :color="errorColor"></error>
    <v-container v-if="userStore.user != null">
      <v-card :color="colorsEnum.BG_CARD">
        <v-card-title>Informations Utilisateur</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="formData.title" label="Titre de votre portfolio"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="formData.description" label="Décrivez-nous votre portfolio"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="userStore.user.user_id" label="ID de l'utilisateur" readonly></v-text-field>
            </v-col>
            </v-row>
        </v-card-text>
        <v-btn @click="createValidation" :color="colorsEnum.BG_CARD" class="mx-2 my-2">Créez votre portfolio</v-btn>
      </v-card>
    </v-container>
    <v-container v-else>
        <span>Merci de vous connecter pour créer votre portfolio</span>
    </v-container>
    <navigator></navigator>
  </template>