<script setup lang="ts">
import OneTabs from '@/components/OneTabs';


const tabs = [{
  href: "/dashboard/services/document-ranking/overview",
  key: "/dashboard/services/document-ranking/overview",
  label: "Overview",
  name: 'DocumentRankingOverviewView'
},
// {
//   href: "/dashboard/services/document-ranking/documents",
//   key: "/dashboard/services/document-ranking/documents",
//   label: "Documents",
// },
{
  href: "/dashboard/services/document-ranking/search-logs",

  key: "/dashboard/services/document-ranking/search-logs",
  label: "Search Log",
  name: 'DocumentRankingSearchLogsView'
},

{
  href: "/dashboard/services/document-ranking/words",
  key: "/dashboard/services/document-ranking/words",
  label: "Words",
  name: 'DocumentRankingWordsView'
}]

</script>

<template>
  <div>
    <div class="bg-white">
      <div class="container mx-auto px-8">
        <div class="h-32 flex items-center">
          <p class="text-2xl font-semibold tracking-tight">Document Ranking</p>
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
