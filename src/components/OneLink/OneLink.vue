<script setup lang="ts">

import { RouterLink } from 'vue-router';

const props = withDefaults(defineProps<{ to: string }>(), {
  to: () => "/"
})

</script>
<template>
  <RouterLink :to="props.to" class="text-blue-700 hover:text-blue-500 font-semibold text-sm flex items-center">
    <slot />
  </RouterLink>
</template>