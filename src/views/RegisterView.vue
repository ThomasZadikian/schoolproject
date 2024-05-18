<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import searchBar from '@/components/shared/searchBar.vue'
import navigator from '@/components/shared/navigator.vue'
import type { RegistrationUser } from '@/core/models/userModel'
import { ref, type Ref } from 'vue';
import router from '@/router';
import PageNameEnum from '@/core/types/enums/pageNameEnum';
const { t } = useI18n()

const formData: Ref<RegistrationUser> = ref({
      last_name: '',
      first_name: '',
      email: '',
      password: '',
      bio: '',
      registration_date: new Date()
    });

    // Méthode pour soumettre le formulaire
const submitForm = async () => {
  formData.value.registration_date = new Date(); 
    const response = await fetch('/api/users', {
      method: 'POST', 
      headers: {
        'Content-Type':'application/json'
      }, 
      body: JSON.stringify(formData.value)
    }); 
    if(!response.ok) {
      throw new Error('Erreur lors de la requête POST');
    }
    const responseData = await response.json();
    console.log('Réponse du serveur :', responseData);

    await new Promise(resolve => setTimeout(resolve, 1000));

    router.push({ name: PageNameEnum.HOME });

}

</script>

<template>
    <searchBar></searchBar>
    <v-form @submit.prevent="submitForm">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field v-model="formData.last_name" label="Nom"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field v-model="formData.first_name" label="Prénom"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="formData.email" label="Email" type="email"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="formData.password" label="Mot de passe" type="password"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea v-model="formData.bio" label="Bio"></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn type="submit" color="primary">Enregistrer</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <navigator></navigator>
  </template>
  
