<script setup lang="ts">
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import OneButton from '../OneButton';
import ChevronDownIcon from '@/assets/icons/chevron-down.svg'
import CheckIcon from '@/assets/icons/check.svg'
import { ref, watch } from 'vue';

const props = withDefaults(defineProps<{
  items?: {
    value: string | number;
    label?: string;
    onClick?: () => void;
    variant?: 'normal' | 'danger' | 'success'
  }[];
  placeholder?: string;
  width?: string | number;
  modelValue?: string | number | string[];
  isMultiple?: boolean;
  label?: string;
}>(), {
  items: () => [],
  isMultiple: () => false,
  width: () => '100%',
  label: () => ''
})

const emits = defineEmits(["update:modelValue"])

const value = ref(props.modelValue)

watch(value, () => {
  emits('update:modelValue', value.value)
})

</script>

<template>
  <Listbox :multiple="isMultiple" v-model="value">
    <div class="relative">
      <div class="text-xs ml-0.5 font-semibold text-gray-700 mb-2 capitalize" v-if="label">{{ label }}</div>

      <ListboxButton as="template">
        <slot name="button" :selected="value">
          <div :class="{ '!text-gray-400': !value }"
            class="w-full flex cursor-pointer items-center text-sm focus-within:border-gray-700 transition-colors px-3 py-2 border-gray-200 border rounded-md overflow-hidden">
            {{ items.find(item => item.value === value)?.label || placeholder || 'Enter value' }}
            <div class="ml-auto">
              <ChevronDownIcon class="text-gray-700 w-5 h-5" viewBox="0 0 24 24" />
            </div>
          </div>
        </slot>
      </ListboxButton>

      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions :style="{ 'width': width }"
          class="z-10 drop-shadow-xl p-2 absolute right-0 mt-2 origin-top-right rounded-md bg-white border border-gray-200 focus:outline-none">
          <ListboxOption v-slot="{ active, selected }" v-for="item in items" :key="item.value" :value="item.value"
            as="template">
            <slot name="item" :selected="selected" :active="active">
              <button class="h-8 cursor-pointer text-sm rounded-lg w-full hover:bg-gray-100 px-2 flex items-center">
                <p>{{ item.label }}</p>
                <CheckIcon v-if="selected" class="ml-auto text-blue-600 h-4 w-4" viewBox="0 0 24 24" />
              </button>
            </slot>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>