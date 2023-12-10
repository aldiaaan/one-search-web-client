<script setup lang="ts">
import OnePageContent from '@/components/OnePageContent'
import DocumentRankingOverviewView from './document-ranking/DocumentRankingOverviewView.vue'
import PageRankingOverviewView from './page-ranking/PageRankingOverviewView.vue'
import CrawlingOverviewViewVue from './crawling/CrawlingOverviewView.vue'
</script>

<template>
  <OnePageContent class="-mx-8 flex flex-col gap-6">
    <div>
      <p class="text-xl font-bold tracking-tight mx-8 mb-6">Page Ranking</p>
      <PageRankingOverviewView></PageRankingOverviewView>
    </div>
    <div>
      <p class="text-xl font-bold tracking-tight mx-8 mb-6">Crawler</p>
      <CrawlingOverviewViewVue></CrawlingOverviewViewVue>
    </div>
    <div>
      <p class="text-xl font-bold tracking-tight mx-8 mb-6">Document Ranking</p>
      <DocumentRankingOverviewView></DocumentRankingOverviewView>
    </div>
  </OnePageContent>
</template>

<style scoped></style>
