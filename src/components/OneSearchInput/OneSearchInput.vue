<script setup lang="ts">
import SearchIcon from '@/assets/icons/search.svg?component';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?component';

import { ref } from 'vue';

defineOptions({
  name: "OneSearchInput"
})

const props = withDefaults(defineProps<{ modelValue?: string }>(), {
  modelValue: () => ""
})

const emits = defineEmits(["update:modelValue"])

const isFocused = ref(false);

function handleInputFocus() {
  isFocused.value = true;
}

function handleInputBlur() {
  isFocused.value = false;
}

</script>
<template>
  <form
    class="w-full flex bg-white  items-center focus-within:border-blue-600  transition-all h-12 border rounded-full overflow-hidden pl-6 pr-5 border-gray-200">
    <input :value="props.modelValue" spellcheck="false"
      @input="event => emits('update:modelValue', (event.target as HTMLInputElement).value)" v-focus-on-mount
      @blur="handleInputBlur" @focus="handleInputFocus" class="w-full h-full focus:outline-none"
      placeholder="Search Anything" />
    <div class="relative w-8 h-8">
      <Transition leave-to-class="opacity-0" leave-from-class="opacity-1" enter-active-class="opacity-1"
        enter-from-class="opacity-0">
        <SearchIcon v-if="!isFocused"
          class="text-gray-500 transition-all absolute inset-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
      </Transition>
      <Transition leave-to-class="opacity-0" leave-from-class="opacity-1" enter-active-class="rotate-0 opacity-1"
        enter-from-class="opacity-0 rotate-180">

        <ArrowRightIcon v-if="isFocused"
          class="transition-all text-gray-900  absolute inset-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-inherit" />
      </Transition>
    </div>
  </form>
</template>