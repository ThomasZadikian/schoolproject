<script lang="ts" setup></script>

<script lang="ts">
export default { name: "DefaultLayout" };
</script>

<template>
  <v-main>
    <v-container>
      <slot></slot>
    </v-container>
  </v-main>
</template>
