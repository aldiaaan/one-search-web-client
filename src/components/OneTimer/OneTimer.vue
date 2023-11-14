<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { formatElapsedTime } from '@/utils'

const props = withDefaults(defineProps<{
  // unix
  startTime: number;
  max?: number;
}>(), {
  max: () => 0,
  startTime: () => 0
})

const num = ref(props.startTime)
const handle = ref()

defineOptions({
  name: 'OneTime'
})


onMounted(() => {
  handle.value = setInterval(() => {
    num.value = num.value + 1000
  }, 1000)

})

onUnmounted(() => {
  clearTimeout(handle.value)
})

</script>


<template>
  <slot name="duration" :duration="num">
  </slot>
</template>
