<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import searchBar from '@/components/shared/searchBar.vue'
import navigator from '@/components/shared/navigator.vue'

const { t } = useI18n()
import { useUserStore } from '@/store/userUserStore';
import colorsEnum from '@/core/types/enums/colorsEnum';

const userStore = useUserStore()
const user = userStore.getUser(); 

</script>
<template>
    <searchBar></searchBar>
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
        </v-card-text>
      </v-card>
    </v-container>
    <v-container v-else>
        <span>Merci de vous connecter</span>
    </v-container>
    <navigator></navigator>
  </template>