<script setup lang="ts">

import { User } from '@/models';
import { useQuery } from '@tanstack/vue-query';
import OneSidebarAccountBar from './OneSidebarAccountBar.vue'
import { useLink, useRouter } from 'vue-router'

const router = useRouter()

const props = withDefaults(defineProps<{
  navs?: { title?: string, key?: string, routes?: { key?: string; title?: string; to: string; icon: any }[] }[]
}>(), {
  navs: () => []
})

defineOptions({
  name: 'OneSidebar'
})

</script>

<template>
  <div class="w-[280px] h-full border-r border-gray-200 flex flex-col">
    <div class="px-5 py-4 flex flex-col gap-3 flex-1">

      <div :key="nav.key" v-for="nav in navs">
        <div class="text-gray-500 font-medium text-sm text-opacity-75 tracking-tight mb-2">{{ nav.title }}</div>
        <div class="flex flex-col gap-1">
          <div v-for="route in nav.routes" :key="route.key" role="button" @click="router.push({
            path: route.to
          })" class="flex items-center py-2 px-3 rounded-lg" :class="{
  'bg-gray-100': useLink({
    to: route.to
  }).isActive.value
}">
            <span class="mr-3">
              <component :is="route.icon" viewBox="0 0 24 24" :width="16" :height="16" class="h-4 w-4 text-inherit" />
            </span>
            <div class="text-gray-900 font-medium text-sm">{{ route.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <OneSidebarAccountBar></OneSidebarAccountBar> -->
  </div>
</template>

<style scoped></style>
