<script setup lang="ts">
defineOptions({
  name: 'OneCard'
})
</script>

<template>
  <div class="border-gray-200 bg-white border rounded-lg">
    <div
      v-if="$slots['header']"
      class="px-6 border-b border-gray-200 h-16 text-sm font-semibold flex items-center"
    >
      <slot name="header"></slot>
    </div>
    <div v-if="$slots['actions']" class="py-3 flex gap-3 justify-end px-3 border-b border-gray-200">
      <slot name="actions"></slot>
    </div>
    <slot />
  </div>
</template>
