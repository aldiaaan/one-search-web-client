<script setup lang="ts">

defineOptions({
  name: "OneBadge",
});


</script>

<template>
  <span class="focus:outline-none px-2.5 py-1 rounded-full text-xs font-medium ">
    <slot />
  </span>
</template>
