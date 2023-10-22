<script setup lang="ts">
import OneMetrics from '@/components/OneMetrics'
import OneTable from '@/components/OneTable';
import OneImage from '@/components/OneImage';
import OneCard from '@/components/OneCard';
import { useQueryOptions } from '@/composables';
import { Word } from '@/models';
import { useQuery } from '@tanstack/vue-query';
import { Endpoints } from '@/api';

const { page, perPage, query } = useQueryOptions({
  perPage: 10
})


const { data, isLoading, isError } = useQuery({
  queryFn: async () => {
    return Word.getMostSearchedWords({
      page: page.value,
      perPage: perPage.value,
      query: query.value
    })
  },
  queryKey: [page, perPage, query]
})

const headers = [{
  key: 'index',
  title: '#',
  width: 60
}, {
  title: 'Word',
  key: 'value'
},
{
  title: 'Frequency',
  key: 'frequency'
}]

</script>

<template>
  <div class="container mx-auto px-8 flex flex-col gap-6">

    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2 flex flex-col gap-6">
        <div class="border border-gray-200 rounded-lg  bg-white">
          <div class="flex justify-between items-center h-16 px-6 border-b border-gray-200">
            <p class="font-semibold tracking-tight text-sm">Most Searched Keywords</p>
            <!-- <OneLink to="/webpages">
          More
        </OneLink> -->

          </div>
          <div class="flex flex-col flex-1 gap-4">
            <OneTable :is-loading="isLoading" :headers="headers"
              :items="data?.words.map((h, index) => ({ ...h, index: (perPage * page) + index + 1 }))"></OneTable>
          </div>
        </div>
        <OneCard>
          <div class="h-96">
            <OneImage :src="Endpoints.WORDCLOUD"></OneImage>
          </div>
        </OneCard>
      </div>
      <div class="flex flex-col gap-6">
        <one-metrics title="Unique Words" :value="9999" icon="message-circle"></one-metrics>
        <one-metrics title="Documents" :value="9999" icon="bookmark"></one-metrics>
      </div>
    </div>
  </div>
</template>