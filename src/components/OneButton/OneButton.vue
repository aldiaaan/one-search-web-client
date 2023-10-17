<script setup lang="ts">

import OneThreeDotsLoader from '@/components/OneLoaders/ThreeDots.vue'

const props = withDefaults(defineProps<{
  fullWidth?: boolean
  isLoading?: boolean
}>(), {
  fullWidth: () => false,
  isLoading: () => false
})

</script>
<template>
  <button
    class="text-sm px-4 flex justify-center focus:outline-gray-700 outline-offset-2 items-center h-10 py-2.5 rounded-lg bg-gray-900 font-medium text-white"
    :class="{ 'w-full': fullWidth }">
    <slot v-if="!isLoading"></slot>
    <OneThreeDotsLoader v-else></OneThreeDotsLoader>
  </button>
</template>