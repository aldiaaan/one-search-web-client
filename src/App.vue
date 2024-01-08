<script setup lang="ts">
import SnackbarRenderer from './components/OneSnackbar/SnackbarRenderer.vue';

</script>

<template>
  <div class="antialiased text-gray-900 relative">
    <RouterView />
  </div>
  <SnackbarRenderer />
</template>
