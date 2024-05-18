<script setup lang="ts">
import searchBar from '@/components/shared/searchBar.vue'; 
import navigator from '@/components/shared/navigator.vue'; 
import colorsEnum from '@/core/types/enums/colorsEnum';
import { ref, type Ref } from 'vue';
import type { User, UserLogin } from '@/core/models/userModel';
import router from '@/router';
import PageNameEnum from '@/core/types/enums/pageNameEnum';
import { useUserStore } from '@/store/userUserStore';

const formData: Ref<UserLogin> = ref({
  email: "", 
  password: ""
})

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
          throw new Error('Erreur lors de la connexion');
        }
        const data: User = await response.json();
        userStore.setUser(data);

        router.push({name: PageNameEnum.HOME})
      } catch (error) {
        console.error('Erreur de connexion:', error);
      }
    }; 
</script>

<template>
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