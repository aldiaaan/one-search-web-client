<script setup lang="ts">

const props = withDefaults(defineProps<{
  max?: number;
  current?: number;
  title?: string;
}>(), {})

</script>

<template>
  <div>
    <div class="mb-1 flex justify-between">
      <div class="text-sm font-semibold tracking-tight">{{ title }}</div>
      <div class="text-sm text-gray-500 font-medium tracking-tight">{{ current }}</div>  
    </div>
    <div class="bg-gray-100 relative rounded-lg overflow-hidden h-3">
      <div class="absolute bg-gray-700 left-0 top-0 bottom-0" :style="{ right: `${100 - (current / max * 100)}%` }"></div>
    </div>
  </div>
</template>