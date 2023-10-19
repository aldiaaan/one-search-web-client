<script setup lang="ts">
  defineOptions({
    name: 'OneIconButton'
  })
</script>

<template>
  <button class="h-10 w-10 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center py-2">
    <slot />
  </button>
</template>