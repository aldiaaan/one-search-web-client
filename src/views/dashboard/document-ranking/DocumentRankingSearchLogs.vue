<script setup lang="ts">
import OneTable from '@/components/OneTable'
import OneCard from '@/components/OneCard'
import OneTablePagination from '@/components/OneTablePagination'
import { useQueryOptions } from '@/composables'
import { Word } from '@/models'
import { useQuery } from '@tanstack/vue-query'

const { page, perPage, query } = useQueryOptions({
  perPage: 20
})

const { data, isLoading, isError } = useQuery({
  queryFn: async () => {
    return Word.getSearchLogs({
      page: page.value,
      perPage: perPage.value,
      query: query.value
    })
  },
  queryKey: [page, perPage, query, 'search-logs']
})

const headers = [
  {
    key: 'index',
    title: '#'
  },
  {
    title: 'Word',
    key: 'value'
  },
  {
    title: 'IP Address',
    key: 'ip',
    width: 160
  },
  {
    title: 'User Agent',
    key: 'ua',
    width: 520
  },
  {
    title: 'Date',
    key: 'date',
    width: 320
  }
]
</script>

<template>
  <div class="container mx-auto px-8 flex flex-col gap-6">
    <OneCard>
      <OneTable
        :is-loading="isLoading"
        :items="data?.words?.map((h, index) => ({ ...h, index: perPage * page + index + 1 }))"
        :headers="headers"
      ></OneTable>
      <div class="px-6 py-4 flex justify-end">
        <OneTablePagination v-model="page" :per-page="perPage" :total="data?.pagination.total" />
      </div>
    </OneCard>
  </div>
</template>
