<script setup lang="ts">

const props = withDefaults(defineProps<{ title?: string; variant?: 'danger' | 'success' | 'normal' }>(), {
  title: () => '',
  variant: () => 'normal'
})

</script>

<template>
  <div class="w-80 flex overflow-hidden drop-shadow-xl bg-white rounded-lg ">
    <div class="w-2 "
      :class="{ 'bg-green-600': variant === 'success', 'bg-gray-700': variant === 'normal', 'bg-red-500': variant === 'danger' }">
    </div>
    <div class="flex-1  h-12 flex items-center px-4 py-3">
      <p class=" text-sm text-gray-900 font-medium">{{ title }}</p>
    </div>
  </div>
</template>