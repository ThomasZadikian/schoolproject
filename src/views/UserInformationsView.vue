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
import { ref } from 'vue';

const { t } = useI18n()
const userStore = useUserStore()
const user = userStore.getUser(); 

const errorVisible = ref(false); 
const errorText = ref(''); 
const errorColor = ref(''); 

const deleteAccount = async () => {
    if (user != null) {
        try {
            const response = await fetch('/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: user.email,
                    lastName: user.last_name,
                })
            });
            if (!response.ok) {
              errorVisible.value = true; 
      errorText.value = ErrorEnum.DELETE_FAILED
      errorColor.value = colorsEnum.WARNING; 
      setTimeout(() => {
        router.go(0); 
      }, 1000)
            }
            userStore.clearUser();
            errorVisible.value = true; 
            errorText.value = ErrorEnum.DELETE_SUCCESS
            errorColor.value = colorsEnum.SUCCESS; 
          setTimeout( async () => {
           await router.push({name : PageNameEnum.HOME});
          },1000)
        } catch (error) {
          errorText.value = ErrorEnum.CONNECTION_NOT_FOUND
      errorColor.value = colorsEnum.WARNING; 
      setTimeout(() => {
        router.go(0); 
      }, 1000)
        }
    } else {
      errorText.value = ErrorEnum.UNAUTHORIZED_ACCESS
      errorColor.value = colorsEnum.WARNING; 
      setTimeout( async() => {
        await router.push({name : PageNameEnum.HOME}); 
      }, 1000)
    }
};


</script>
<template>
    <searchBar></searchBar>
    <error :visible="errorVisible" :message="errorText" :color="errorColor"></error>
    <v-container v-if="user">
      <v-card :color="colorsEnum.BG_CARD">
        <v-card-title>Informations Utilisateur</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="user.last_name" label="Nom de famille" readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="user.first_name" label="Prénom" readonly></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="user.email" label="Email" readonly></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="user.password" label="Mot de passe" type="password" readonly></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="user.bio" label="Bio" readonly></v-textarea>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="user.role" label="Rôle" readonly></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="user.registration_date" label="Date d'inscription" readonly></v-text-field>
            </v-col>
          </v-row>
          <v-btn @click="deleteAccount" variant="tonal">Supprimez votre compte</v-btn>
        </v-card-text>
      </v-card>
    </v-container>
    <v-container v-else>
        <span>Merci de vous connecter</span>
    </v-container>
    <navigator></navigator>
  </template>