<script setup lang="ts">
import OneSidebar from '@/components/OneSidebar'
import GridIcon from '@/assets/icons/grid.svg'
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
    ]
  },
]

</script>

<template>
  <div class="h-screen flex">
    <OneSidebar :navs="navs" class="flex-shrink-0" />
    <div class="flex-1 ">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
