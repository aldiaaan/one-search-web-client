<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BrokenImageIcon from '@/assets/icons/x.svg'


const props = withDefaults(defineProps<{ src?: string, mode?: "cover" | "fill" }>(), {
  src: () => "",
  mode: () => "cover"
})

const image = ref()
const isLoading = ref(true)
const isError = ref(false)

onMounted(() => {
  image.value.addEventListener("load", () => {
    isLoading.value = false
    isError.value = false
  })
  image.value.addEventListener("error", () => {
    isLoading.value = false
    isError.value = true
  })
})

</script>
<template>
  <div class="h-full w-full">
    <div v-if="isError" class="h-full w-full flex items-center justify-center bg-gray-200">
      <BrokenImageIcon class="text-gray-500" />
    </div>
    <div v-if="isLoading" class="h-full w-full bg-gray-200 animate-pulse" />
    <img ref="image" v-if="!isError" :src="props.src" class="h-full w-full"
      :class="{ 'hidden': isLoading && !isError, 'object-cover': props.mode === 'cover' }" />
  </div>
</template>