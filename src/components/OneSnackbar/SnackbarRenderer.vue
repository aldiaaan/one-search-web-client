<script setup lang="ts">
import { __snackbars } from './SnackbarManager'
import OneSnackbar from './OneSnackbar.vue'

</script>

<template>
  <slot />
  <!-- <div>{{ __snackbars }}</div> -->
  <div data-component-name="SnackbarRenderer" class="fixed inset-0 pointer-events-none">
    <div class="absolute top-20 right-8 flex flex-col gap-2">
      <TransitionGroup enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform translate-x-12 opacity-0" enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transition duration-400 ease-in" leave-from-class="transform opacity-100"
        leave-to-class="transform  opacity-0">
        <OneSnackbar v-for="snackbar in __snackbars" :key="snackbar.id" :title="snackbar.title"
          :variant="snackbar.variant" />
      </TransitionGroup>
    </div>
  </div>
</template>