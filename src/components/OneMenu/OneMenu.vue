<script setup lang="ts">

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

defineOptions({
  name: 'OneMenu'
})

const props = withDefaults(defineProps<{
  items?: {
    key: string | number;
    label?: string;
    onClick?: () => void;
    variant?: 'normal' | 'danger' | 'success'
  }[]
}>(), {
  items: () => []
})

</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton as="template">
      <slot></slot>
    </MenuButton>
    <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
      <MenuItems
        class="z-10 drop-shadow-xl p-2 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white border border-gray-200 focus:outline-none">
        <MenuItem v-for="item in items" v-slot="{ active }" :key="item.key">
        <slot :name="item.key" :active="active">
          <button class="h-8 text-sm rounded-lg w-full hover:bg-gray-100 px-2 flex items-center" @click="item.onClick">
            {{ item.label }}
          </button>
        </slot>
        </MenuItem>
      </MenuItems>
    </Transition>

  </Menu>
</template>