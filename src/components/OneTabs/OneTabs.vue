<script setup lang="ts">
import { useLink, useRouter } from 'vue-router';



const props = withDefaults(defineProps<{
  tabs: {
    label?: string;
    key: string;
    href?: string;
  }[]
}>(), {
  tabs: () => []
})

const router = useRouter()

defineOptions({
  name: 'OneTabs'
})
</script>

<template>
  <div class="flex">
    <div :key="tab.key" role="button" @click="() => {
      if (tab.href) {
        router.push(tab.href)
      }
    }" v-for="tab in props.tabs" :to="tab.href" :class="{
  'font-semibold text-gray-900': useLink({
    to: tab.href || '/'
  }).isActive.value
}" class="px-4 text-sm py-4 text-gray-500" :is-on="useLink({
  to: tab.href || '/'
}).isActive.value">
      {{ tab.label }}</div>
  </div>
</template>
