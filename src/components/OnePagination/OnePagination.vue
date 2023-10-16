<script setup lang="ts">
defineOptions({
  name: "OnePagination"
})

const props = withDefaults(defineProps<{
  modelValue?: number
  pages?: number
}>(), {
  modelValue: () => 0,
  pages: () => 0
})

const emits = defineEmits(["update:modelValue"])

</script>
<template>
  <div class="flex gap-2">
    <button :key="n" v-for="n in pages">
      <slot name="button" :index="n - 1" :label="n" :isActive="modelValue === n - 1">
        {{ n }}</slot>
    </button>
  </div>
</template>