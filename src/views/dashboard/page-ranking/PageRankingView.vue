<script setup lang="ts">
import OneTabs from '@/components/OneTabs'

const tabs = [
  {
    href: '/dashboard/services/page-ranking/overview',
    key: '/dashboard/services/page-ranking/overview',
    label: 'Overview',
    name: 'PageRankingOverviewView'
  }
]
</script>

<template>
  <div>
    <div class="bg-white">
      <div class="container mx-auto px-8">
        <div class="h-32 flex items-center">
          <p class="text-2xl font-semibold tracking-tight">Page Ranking</p>
        </div>
      </div>
      <div class="-ml-4 border-b border-gray-200">
        <div class="container mx-auto px-8">
          <one-tabs :tabs="tabs"></one-tabs>
        </div>
      </div>
    </div>
    <div class="py-6">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
