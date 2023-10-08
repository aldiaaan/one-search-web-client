<script setup lang="ts">

import { RouterLink } from 'vue-router';

</script>
<template>
  <RouterLink class="text-blue-700 hover:text-blue-500 font-semibold text-sm flex items-center">
    <slot />

  </RouterLink>
</template>