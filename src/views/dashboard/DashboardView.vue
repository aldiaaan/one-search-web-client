<script setup lang="ts">
import OneSidebar from '@/components/OneSidebar'
import OneNavbar from '@/components/OneNavbar'
import GridIcon from '@/assets/icons/grid.svg'
import LayersIcon from '@/assets/icons/layers.svg'
import FileText from '@/assets/icons/file-text.svg'
import UserIcon from '@/assets/icons/user.svg'
import { RouterView } from 'vue-router'

const navs = [
  {
    title: "Menu",
    routes: [
      {
        title: "Overview",
        to: "/dashboard/overview",
        name: "DashboardOverviewView",
        icon: GridIcon
      },
      {
        title: "Staff",
        to: "/dashboard/staff",
        name: "DashboardStaffListView",
        icon: UserIcon
      },
      {
        title: "Documents",
        to: "/dashboard/documents/list",
        name: "DocumentListView",
        icon: FileText
      },
    ]
  }, {
    title: "Services",
    routes: [
      {
        title: "Document Ranking",
        to: "/dashboard/services/document-ranking",
        icon: LayersIcon,
        name: 'DocumentRankingView'
      },
      {
        title: "Crawling",
        to: "/dashboard/services/crawling",
        icon: LayersIcon,
        name: 'CrawlingView'
      }, {
        title: "Page Ranking",
        to: "/dashboard/services/page-ranking",
        icon: LayersIcon,
        name: 'PageRankingView'
      },
    ]
  },
]

</script>

<template>
  <div class="h-screen flex pt-16">
    <OneNavbar></OneNavbar>
    <OneSidebar :navs="navs" class="flex-shrink-0" />
    <div class=" bg-gray-50 flex-1 overflow-auto relative bg-opacity-50">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
