<script setup lang="ts">

import { Dialog, TransitionRoot, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/vue'

defineOptions({
  name: 'OneDialog'
})

const props = withDefaults(defineProps<{
  open: boolean;
  title: string;
}>(), {
  open: () => false,
  title: () => "No Title"
})



</script>

<template>
  <TransitionRoot :show="props.open" v-bind="$attrs" as="template">
    <Dialog class="z-50">
      <!-- Wrap your backdrop in a `TransitionChild`. -->
      <TransitionChild as="template" enter="duration-200" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-80 z-50" />
      </TransitionChild>

      <!-- Wrap your panel in a `TransitionChild`. -->
      <TransitionChild as="template" enter="duration-200 " enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100" leave="duration-200" leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95">
        <DialogPanel
          class="fixed z-50 top-1/2 rounded-lg overflow-hidden -translate-y-1/2 left-1/2 max-w-[80vh] -translate-x-1/2 w-[460px]  bg-white">
          <div class="flex flex-col h-full">
            <div class="bg-blue-600 flex items-center h-32 px-6 text-xl font-semibold tracking-tight text-white">
              <!-- <div
                class="flex-shrink-0 text-blue-600 h-8 mb-2 w-8 flex items-center justify-center rounded-lg bg-blue-50">
                <one-icon name="tool" :height="16" :width="16"></one-icon>
              </div> -->
              <div class="flex-1">
                <DialogTitle>{{ props.title }}</DialogTitle>
                <!-- <div class="text-gray-500 text-sm tracking-normal leading-6 font-normal">
                  Fill the form to start new service</div> -->
              </div>
            </div>
            <div class="bg-white p-6 pb-8">
              <slot name="body"></slot>
            </div>
            <div class="py-4 flex px-6 items-center border-t border-gray-200 justify-end">
              <slot name="footer"></slot>
            </div>
          </div>
        </DialogPanel>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>
