<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";

const route = useRoute();

/*
 * Get the route layout
 */
const layout = computed(() => {
  const layout: string = route?.meta?.layout as string;
  if (layout) {
    return `${layout}Layout`;
  }
  return "div";
});
</script>

<template>
  <Suspense>
    <v-app>
      <component :is="layout">
        <RouterView />
      </component>
    </v-app>
  </Suspense>
</template>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>
