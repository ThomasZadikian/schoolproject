<script setup lang="ts"></script>

<template>
    <v-bottom-navigation elevation="5" rounded="xl" >
  <v-btn value="recent">
    <v-icon>mdi-history</v-icon>

    <span>Recent</span>
  </v-btn>

  <v-btn value="favorites">
    <v-icon>mdi-heart</v-icon>

    <span>Favorites</span>
  </v-btn>

  <v-btn value="nearby">
    <v-icon>mdi-map-marker</v-icon>

    <span>Nearby</span>
  </v-btn>
</v-bottom-navigation>
</template>