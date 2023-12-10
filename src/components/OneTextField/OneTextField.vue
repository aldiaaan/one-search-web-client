<script setup lang="ts">


defineOptions({
  name: "OneTextField",
});

const props = withDefaults(defineProps<{
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  spellCheck?: boolean;
  type?: 'text' | 'password' | 'number';
  default?: number | string;
  theme?: 'dark' | 'light';
}>(), {
  modelValue: "",
  label: '',
  theme: () => 'light',
  placeholder: '',
  fullWidth: true,
  spellCheck: false,
  type: () => 'text',
  default: () => ''
})

const emits = defineEmits(['update:modelValue'])

</script>

<template>
  <div :class="{ 'w-full': fullWidth }">
    <div class="text-xs font-semibold text-gray-700 mb-2 capitalize" v-if="label">{{ label }}</div>
    <div
      class="w-full bg-white flex text-black-900 items-center text-sm focus-within:border-gray-700 transition-colors px-3 h-10 border-gray-300 border rounded-md overflow-hidden"
      :class="{'bg-gray-500': theme === 'dark'}"
      >
      <div class="flex-shrink-0" :class="{'mr-2': $slots['icon']}">
        <slot name="icon"></slot>
      </div>
      <input :type="type" :spellcheck="spellCheck" :value="modelValue" :placeholder="placeholder"
        @input="emits('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        class="bg-transparent focus:outline-none flex-1" />
    </div>
  </div>
</template>
