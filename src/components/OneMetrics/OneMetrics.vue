<script setup lang="ts">
import { withDefaults } from 'vue'

const props = withDefaults(defineProps<{
  title?: string;
  value?: string | number;
  icon?: string;
  isLoading?: boolean;
}>(), {
  isLoading: () => false,
  title: () => "No Title",
  value: () => "--",
})

defineOptions({
  name: "OneMetrics",
});

</script>

<template>
  <div class="border flex-col border-gray-200 rounded-lg bg-white h-36 flex">
    <div class="flex-1 px-4 flex items-center">
      <div class="flex items-center justify-center h-8 w-8 bg-gray-100 rounded-lg">
        <slot name="icon" />
      </div>
    </div>
    <div class="py-3 px-4 items-center">
      <p class="font-bold tracking-tight text-2xl">{{ props.isLoading ? '--' : props.value }}</p>
      <div class="flex items-center justify-between mt-1">
        <p class="text-sm font-medium text-gray-500">{{ props.title }}</p>
      </div>
    </div>
  </div>
</template>
