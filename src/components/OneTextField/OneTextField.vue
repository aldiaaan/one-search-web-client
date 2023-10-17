<script setup lang="ts">


defineOptions({
  name: "OneTextField",
});

const props = withDefaults(defineProps<{
  modelValue?: string;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  spellCheck?: boolean
}>(), {
  modelValue: "",
  label: '',
  placeholder: '',
  fullWidth: true,
  spellCheck: false
})

const emits = defineEmits(['update:modelValue'])

</script>

<template>
  <div :class="{ 'w-full': fullWidth }" class="">
    <div class="text-xs font-semibold text-gray-700 mb-2 capitalize" v-if="label">{{ label }}</div>
    <div
      class="w-full text-black-900 text-sm focus-within:border-gray-700 transition-colors px-3.5 py-2 border-gray-300 border rounded-md overflow-hidden">
      <input :spellcheck="spellCheck" :value="modelValue" :placeholder="placeholder"
        @input="emits('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        class="focus:outline-none w-full" />
    </div>
  </div>
</template>
