<script setup lang="ts">
import OneCard from '@/components/OneCard'
import OneTable from '@/components/OneTable'
import OneTablePagination from '@/components/OneTablePagination'
import OneTextField from '@/components/OneTextField'
import OneSelect from '@/components/OneSelect'
import OneButton from '@/components/OneButton'
import SearchIcon from '@/assets/icons/search.svg'
import { useQueryOptions } from '@/composables'
import { Webpage } from '@/models'
import { useQuery } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useRefQuery } from '@/composables'
import { computed, ref } from 'vue'

const { page, perPage, query } = useQueryOptions()
const countries = useRefQuery<string[]>('countries[]', [] as string[])

const router = useRouter()

const { data, isLoading, isError } = useQuery({
  queryFn: async () => {
    return Webpage.find({
      page: page.value,
      perPage: perPage.value,
      query: query.value,
      countries: countries.value
    })
  },
  queryKey: [page, perPage, query, 'documents', countries],
})

const headers = [
  {
    key: 'id',
    title: 'ID',
    width: 80
  },
  {
    key: 'url',
    title: 'URL'
  },
  {
    key: 'pagerankScore',
    width: 200,
    title: 'Pagerank Score'
  },
  {
    key: 'country',
    width: 100,
    title: 'Country'
  }
]

const ac = computed(() => data.value?.facets.countries)
</script>

<template>
  <div class="container mx-auto px-8 flex flex-col gap-6">
    <OneCard>
      <template #actions>
        <div class="w-60">
          <form @submit.prevent="() => {}">
            <OneTextField v-model="query" placeholder="Search">
              <template #icon>
                <SearchIcon viewBox="0 0 24 24" class="w-4 h-4 text-gray-500" />
              </template>
            </OneTextField>
          </form>
        </div>
        <OneSelect
          :items="[
            {
              value: 5,
              label: '5'
            },
            {
              value: 10,
              label: '10'
            },
            {
              value: 25,
              label: '25'
            },
            {
              value: 50,
              label: '50'
            },
            {
              value: 100,
              label: '100'
            },
            {
              value: 250,
              label: '250'
            }
          ]"
          v-model="perPage"
        >
          <template #button="{ selected }">
            <OneButton class="bg-white border border-gray-200 !text-gray-500">
              Per Page: <span class="text-gray-900 font-semibold ml-1">{{ selected }}</span>
            </OneButton>
          </template>
        </OneSelect>
        <OneSelect
          placeholder="Select Country"
          :width="'240px'"
          :items="data?.facets.countries || []"
          v-model="countries"
          :is-multiple="true"
        >
        </OneSelect>
      </template>
      <OneTable
        :cell-height="64"
        :headers="headers"
        :is-loading="isLoading"
        :items="data?.webpages"
      >
        <template #url="{ item }: { item: Webpage }">
          <div
            role="button"
            @click="
              () =>
                router.push({
                  path: 'DocumentDetailView',
                  query: {
                    url: item.url
                  }
                })
            "
            class="flex cursor-pointer items-center"
          >
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
