<script setup lang="ts">

import oneLogo from '@/assets/one-search-engine.png'

const props = withDefaults(defineProps<{
  fullWidth?: boolean
  isLoading?: boolean
}>(), {
  fullWidth: () => false,
  isLoading: () => false
})

</script>
<template>
  <div class="flex gap-3 items-center">
    <img :src="oneLogo" class="h-8 w-8" />
    <p class="tracking-tight text-gray-700 font-bold text-2xl ">ONE</p>
  </div>
</template>