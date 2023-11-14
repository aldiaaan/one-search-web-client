<script setup lang="ts">
import OneSidebar from '@/components/OneSidebar'
import GridIcon from '@/assets/icons/grid.svg'
import LayersIcon from '@/assets/icons/layers.svg'
import UserIcon from '@/assets/icons/user.svg'
import { RouterView } from 'vue-router'

const navs = [
  {
    title: "Menu",
    routes: [
      {
        title: "Overview",
        to: "/dashboard",
        icon: GridIcon
      },
      {
        title: "Staff",
        to: "/dashboard/staff",
        icon: UserIcon
      },
    ]
  }, {
    title: "Services",
    routes: [
      {
        title: "Document Ranking",
        to: "/dashboard/services/document-ranking",
        icon: LayersIcon
      },
      {
        title: "Crawling",
        to: "/dashboard/services/crawling",
        icon: LayersIcon
      }, {
        title: "Page Ranking",
        to: "/dashboard/services/page-ranking",
        icon: LayersIcon
      },
    ]
  },
]

</script>

<template>
  <div class="h-screen flex">
    <OneSidebar :navs="navs" class="flex-shrink-0" />
    <div class="flex-1 h-screen bg-gray-50 relative bg-opacity-50">
      <div class="w-full h-full overflow-auto">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
