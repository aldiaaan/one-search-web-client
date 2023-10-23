<script setup lang="ts">
import OneTable from '@/components/OneTable';
import { useRoute, useRouter } from 'vue-router';
import OneBadge from '@/components/OneBadge';
import OneCard from '@/components/OneCard';
import OneTablePagination from '@/components/OneTablePagination'
import OnePageContent from '@/components/OnePageContent';
import { useQuery } from '@tanstack/vue-query';
import { Webpage, Word } from '@/models';
import { useQueryOptions } from '@/composables';

const route = useRoute()

const router = useRouter()

const { page, perPage, query } = useQueryOptions({ perPage: 25 })

const { data, isLoading: isLoadingWebpages } = useQuery({
  queryFn: () => Word.getOccurrences({
    page: page.value,
    perPage: perPage.value,
    word: route.query.word as string
  }),
  queryKey: [page, perPage, query, route.query.word]
})


const headers = [{
  key: 'id',
  title: 'ID',
  width: 80
}, {
  key: 'url',
  title: 'URL'
}]


</script>

<template>
  <div>
    <div class="bg-white">
      <div class="container mx-auto px-8">
        <div class="h-32 flex items-center">
          <div>
            <p class="text-2xl font-semibold tracking-tight">{{ route.query.word || "Unknown" }}</p>
            <div class="mt-2">
              <OneBadge class=" bg-blue-50 font-medium text-blue-600">Word</OneBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OnePageContent>
      <OneCard>
        <template #header>
          Occurrences
        </template>
        <OneTable :cell-height="64" :headers="headers" :is-loading="isLoadingWebpages" :items="data?.webpages">
          <template #url="{ item }: { item: Webpage }">
            <div role="button" @click="() => router.push({
              path: '/dashboard/documents',
              query: {
                url: item.url
              }
            })" class=" flex cursor-pointer items-center">
              <div>
                <p class="font-semibold">{{ item.title }}</p>
                <p class="text-sm text-gray-500">{{ item.url }}</p>
              </div>
            </div>
          </template>
        </OneTable>
        <div class="px-6 py-4 flex justify-end">
          <OneTablePagination v-model="page" :per-page="perPage" :total="data?.pagination.total" />

        </div>
      </OneCard>
    </OnePageContent>
  </div>
</template>

<style scoped></style>
