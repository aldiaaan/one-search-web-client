<script setup lang="ts">

defineOptions({
  name: 'OneCard'
})

</script>

<template>
  <div class="border-gray-200 bg-white border rounded-lg">
    <slot />
  </div>
</template>