<script setup lang="ts">

defineOptions({
  name: 'OneCard'
})

</script>

<template>
  <div class="border-gray-200 bg-white border overflow-hidden rounded-lg">
    <div v-if="$slots['header']" class="px-6 border-b border-gray-200 h-16 text-sm font-semibold flex items-center">
      <slot name="header"></slot>
    </div>
    <slot />
  </div>
</template>