<script setup lang="ts">
import OneCard from '@/components/OneCard';
import OneTable from '@/components/OneTable';
import OneTablePagination from '@/components/OneTablePagination';
import { useQueryOptions } from '@/composables';
import { Webpage } from '@/models';
import { useQuery } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

const { page, perPage, query } = useQueryOptions()

const router = useRouter()

const { data, isLoading, isError } = useQuery({
  queryFn: async () => {
    return Webpage.find({
      page: page.value,
      perPage: perPage.value,
      query: query.value
    })
  },
  queryKey: [page, perPage, query, 'documents']
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
  <div class="container mx-auto px-8 flex flex-col gap-6">
    <OneCard>
      <OneTable :cell-height="64" :headers="headers" :is-loading="isLoading" :items="data?.webpages">
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
  </div>
</template>