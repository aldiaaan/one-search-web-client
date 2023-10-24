<script setup lang="ts">
import OneCard from '@/components/OneCard';
import OneButton from '@/components/OneButton';
import OneTextField from '@/components/OneTextField';
import OneSelect from '@/components/OneSelect';
import OneTable from '@/components/OneTable';
import OneTablePagination from '@/components/OneTablePagination';
import { useQueryOptions } from '@/composables';
import SearchIcon from '@/assets/icons/search.svg';
import { useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query';
import { Domain } from '@/models';

const { page, perPage, query } = useQueryOptions({ perPage: 25 })
const router = useRouter()

const { data, isLoading, isError } = useQuery({
  queryFn: () => {
    return Domain.find({
      page: page.value,
      perPage: perPage.value,
      query: query.value
    })
  },
  queryKey: [page, perPage, query, 'domains-list']
})

const headers = [{
  key: 'index',
  title: '#'
},
{
  key: 'name',
  title: 'Name'
}, {
  key: 'country',
  title: 'Country'
}, {
  key: 'totalPages',
  title: 'Pages'
}]

</script>

<template>
  <div class="container mx-auto px-8 flex flex-col gap-6">
    <OneCard>
      <div class="py-3 flex gap-3 justify-end px-3 border-b border-gray-200">
        <div class="w-60">
          <form @submit.prevent="() => { }">
            <OneTextField v-model="query" class="h-9" placeholder="Search">
              <template #icon>
                <SearchIcon viewBox="0 0 24 24" class="w-4 h-4 text-gray-500" />
              </template>
            </OneTextField>
          </form>
        </div>
        <OneSelect :items="[{
          value: 5,
          label: '5'
        }, {
          value: 10,
          label: '10'
        }, {
          value: 25,
          label: '25'
        }, {
          value: 50,
          label: '50'
        }, {
          value: 100,
          label: '100'
        }, {
          value: 250,
          label: '250'
        }]" v-model="perPage">
          <template #button="{ selected }">
            <OneButton class="bg-white border border-gray-200 h-9 !text-gray-500">
              Per Page: <span class="text-gray-900 font-semibold ml-1">{{ selected }}</span>
            </OneButton>
          </template>
        </OneSelect>
      </div>
      <OneTable :is-loading="isLoading"
        :items="data?.domains?.map((d, index) => ({ ...d, index: index + 1 + (perPage * page) }))" :headers="headers">
      </OneTable>
      <div class="px-6 py-4 flex justify-end">
        <OneTablePagination v-model="page" :per-page="perPage" :total="data?.pagination.total">

        </OneTablePagination>

      </div>
    </OneCard>
  </div>
</template>