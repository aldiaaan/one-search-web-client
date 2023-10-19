<script setup lang="ts">


defineOptions({
  name: "OneTextField",
});

const props = withDefaults(defineProps<{
  modelValue?: string;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  spellCheck?: boolean;
  type?: 'text' | 'password'
}>(), {
  modelValue: "",
  label: '',
  placeholder: '',
  fullWidth: true,
  spellCheck: false,
  type: () => 'text'
})

const emits = defineEmits(['update:modelValue'])

</script>

<template>
  <div :class="{ 'w-full': fullWidth }" class="bg-white">
    <div class="text-xs font-semibold text-gray-700 mb-2 capitalize" v-if="label">{{ label }}</div>
    <div
      class="w-full flex text-black-900 items-center text-sm focus-within:border-gray-700 transition-colors px-3 py-2 border-gray-300 border rounded-md overflow-hidden">
      <div class="flex-shrink-0" :class="{'mr-2': $slots['icon']}">
        <slot name="icon"></slot>
      </div>
      <input :type="type" :spellcheck="spellCheck" :value="modelValue" :placeholder="placeholder"
        @input="emits('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        class="focus:outline-none flex-1" />
    </div>
  </div>
</template>
