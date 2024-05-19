<script setup lang="ts">
import searchBar from '@/components/shared/searchBar.vue'; 
import navigator from '@/components/shared/navigator.vue'; 
import colorsEnum from '@/core/types/enums/colorsEnum';
import { ref, type Ref } from 'vue';
import type { User, UserLogin } from '@/core/models/userModel';
import router from '@/router';
import PageNameEnum from '@/core/types/enums/pageNameEnum';
import { useUserStore } from '@/store/userUserStore';
import error from '@/components/shared/error.vue';
import ErrorEnum from '@/core/types/enums/errorEnum';

const formData: Ref<UserLogin> = ref({
  email: "", 
  password: ""
})

const errorVisible = ref(false); 
const errorText = ref(''); 
const errorColor = ref(''); 

const userStore = useUserStore()
const login = async () => { 
  try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.value.email,
            password: formData.value.password
          })
        });
        if (!response.ok) {
          errorVisible.value = true; 
          errorText.value = ErrorEnum.LOGIN_INVALID
          errorColor.value = colorsEnum.WARNING; 
        }
        const data: User = await response.json();
        userStore.setUser(data);
        errorVisible.value = true; 
        errorText.value = ErrorEnum.CONNECTION_SUCCESS; 
        errorColor.value = colorsEnum.SUCCESS; 

        setTimeout(() => {
          router.push({name: PageNameEnum.HOME})
        }, 1000)
      } catch (error) {
        errorVisible.value = true; 
        errorText.value = ErrorEnum.CONNECTION_NOT_FOUND; 
        errorColor.value = colorsEnum.WARNING; 

      }
    }; 
</script>

<template>
  <error :visible="errorVisible" :message="errorText" :color="errorColor"></error>
  <search-bar></search-bar>
    <v-container>
      <v-card :color="colorsEnum.BG_CARD" class="mx-auto" max-width="400">
        <v-card-title class="primary">
          <span class="headline">Connexion</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field v-model="formData.email" label="Email" type="email" required></v-text-field>
            <v-text-field v-model="formData.password" label="Mot de passe" type="password" required></v-text-field>
            <v-btn type="submit" color="primary">Se connecter</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
    <navigator></navigator>
  </template>