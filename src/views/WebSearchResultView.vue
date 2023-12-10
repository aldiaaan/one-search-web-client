<script setup lang="ts">
import oneSearchLogo from '@/assets/one-search-engine.png'
import OneSearchInput from '@/components/OneSearchInput'
import OneTabs from '@/components/OneTabs'
import OnePagination from '@/components/OnePagination'
import { useRequest, useQueryOptions } from '@/composables'
import { AnalyticsService, Webpage } from '@/models'
import { computed, onMounted, onUpdated, watch } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'WebSearchResultView'
})

const { page, perPage, query } = useQueryOptions()
const searchRequest = useRequest((args) => {
  AnalyticsService.trackQuery(query.value)
  return Webpage.overallSimilaritySearch(args)
})
const router = useRouter()

onMounted(() => {
  searchRequest.exec({
    page: page.value,
    perPage: perPage.value,
    query: query.value
  })
})

watch(page, () => {
  searchRequest.exec({
    page: page.value,
    perPage: perPage.value,
    query: query.value
  })
})

const webpages = computed(() => searchRequest.result.value?.webpages || [])
const isLoadingWebpages = computed(() => searchRequest.isLoading.value)
const pagination = computed(() => searchRequest.result.value?.pagination)
const tabs = [
  {
    key: 'result',
    href: '/search',
    label: 'Result'
  },
  {
    key: 'sitemap-3d',
    href: '/sitemap/3d',
    label: 'Sitemap',
    keepQuery: true
  }
]
</script>

<template>
  <div class="border-b border-gray-200">
    <div class="pt-4 container mx-auto flex">
      <div class="mr-4 mt-1">
        <img :src="oneSearchLogo" class="h-10 w-10" />
      </div>
      <div class="flex-1 flex flex-col ml-8">
        <div>
          <OneSearchInput
            @submit.prevent="
              () => {
                router.push({
                  path: '/search',
                  query: {
                    query
                  }
                })

                searchRequest.exec({
                  page,
                  perPage,
                  query
                })
              }
            "
            v-model="query"
            class="h-10"
          ></OneSearchInput>
        </div>
        <div class="ml-2">
          <OneTabs :tabs="tabs"></OneTabs>
        </div>
      </div>
    </div>
  </div>
  <div class="container my-6 mx-auto">
    <div class="ml-28 flex flex-col gap-8" v-if="!isLoadingWebpages">
      <a
        :href="webpage.url"
        target="_blank"
        v-for="webpage in webpages"
        :key="webpage.id"
        class="max-w-[560px]"
      >
        <p class="font-semibold tracking-tight text-blue-600">{{ webpage.title }}</p>
        <p class="truncate text-ellipsis text-xs text-gray-500 mt-0.5">{{ webpage.url }}</p>

        <p class="text-sm text-gray-900 mt-2 h-16 overflow-hidden">{{ webpage.content }}</p>
      </a>
    </div>
    <div class="ml-28 flex flex-col gap-8" v-else>
      <div :key="index" v-for="(_, index) in 10">
        <div class="h-6 w-[280px] bg-gray-200 animate-pulse rounded-lg"></div>
        <div class="flex flex-col gap-2 mt-4">
          <div class="h-3 w-[520px] bg-gray-200 animate-pulse rounded-lg"></div>
          <div class="h-3 w-[500px] bg-gray-200 animate-pulse rounded-lg"></div>
          <div class="h-3 w-[380px] bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
  <div class="my-10">
    <div class="container mx-auto px-24">
      <OnePagination :pages="pagination?.pages" v-model="page">
        <template #button="{ isActive, index }: { isActive: boolean; index: number }">
          <button
            @click="() => (page = index)"
            :class="{ 'bg-gray-200 text-gray-900 font-semibold': isActive }"
            class="text-gray-500 text-sm h-10 w-10 flex items-center justify-center hover:bg-gray-200 transition-colors rounded-full cursor-pointer"
          >
            {{ index + 1 }}
          </button>
        </template>
      </OnePagination>
    </div>
  </div>
</template>

<style></style>
