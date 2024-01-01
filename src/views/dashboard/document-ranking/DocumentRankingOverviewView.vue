<script setup lang="ts">
import OneMetrics from '@/components/OneMetrics'
import OneTable from '@/components/OneTable';
import OneImage from '@/components/OneImage';
import OneCard from '@/components/OneCard';
import OneServiceMetrics from '@/components/OneServiceMetrics';
import { useQueryOptions } from '@/composables';
import { DocumentRankingService, Webpage, Word } from '@/models';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { Endpoints } from '@/api';
import OneDialog from '@/components/OneDialog';
import { computed, ref } from 'vue';
import OneButton from '@/components/OneButton';
import OneSelect from '@/components/OneSelect';
import { useTimer } from '@/composables'

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
  queryKey: [page, perPage, query, 'most-searched']
})

const { mutate: startDocumentRanking, isLoading: isLoadingStartDocumentRanking, isError: isErrorDocumentRanking } = useMutation({
  mutationFn: DocumentRankingService.start,
  onSettled: () => {
    refetchDocumentRankingStatus()
  }
})

const { data: totalWords, isLoading: isLoadingTotalWords } = useQuery({
  queryFn: async () => {
    const x = await Word.find()

    return x.pagination.total
  },
  queryKey: ['words-total']
})

const { data: totalDocuments, isLoading: isLoadingTotalDocuments } = useQuery({
  queryFn: async () => {
    const x = await Webpage.find()

    return x.pagination.total
  },
  queryKey: ['documents-total']
})


const { mutate: stopDocumentRanking, isLoading: isLoadingStopDocumentRanking, isError: isErrorStopDocumentRanking } = useMutation({
  mutationFn: async () => {
    return DocumentRankingService.stop()
  },
  onSettled: () => {
    refetchDocumentRankingStatus()
  }
})

const { data: documentRankingStatus, isLoading: isLoadingStartDocumentRankingStatus, isError: isErrorDocumentRankingStatus, refetch: refetchDocumentRankingStatus } = useQuery({
  queryFn: () => {
    return DocumentRankingService.status()
  },
  refetchInterval: 2000
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

const shouldOpenStartDocumentRankingDialog = ref(false)
const algorithm = ref('tfidf')
const useGST = ref('false')
const startTime = computed(() => documentRankingStatus.value?.service.startTime)


</script>

<template>
  <OneDialog :open="shouldOpenStartDocumentRankingDialog" title="Start New Service"
    @close="() => shouldOpenStartDocumentRankingDialog = false">
    <template #body>
      <div class="flex flex-col gap-4">
        <OneSelect label="Algorithm" v-model="algorithm" :items="[{
          value: 'tfidf',
          label: 'TF-IDF'
        }, {
          value: 'inverted-indexer',
          label: 'Inverted Indexer'
        }]"></OneSelect>
        <OneSelect v-model="useGST" label="Use GST" v-if="algorithm === 'inverted-indexer'" :items="[{
          value: 'true',
          label: 'Yes'
        }, {
          value: 'false',
          label: 'No'
        }]"></OneSelect>
      </div>
    </template>
    <template #footer>
      <OneButton class="w-20" :is-loading="isLoadingStartDocumentRanking" @click="() => startDocumentRanking({
        algorithm,
        useGST
      }, {
        onSettled: () => { shouldOpenStartDocumentRankingDialog = false }
      })">Start</OneButton>
    </template>
  </OneDialog>
  <div class="container mx-auto px-8 flex flex-col gap-6">

    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2 flex flex-col gap-6">
        <OneServiceMetrics @stop="stopDocumentRanking" :is-running="documentRankingStatus?.service.status === 'RUNNING'"
          @start="() => shouldOpenStartDocumentRankingDialog = true"
          :is-loading="isLoadingStartDocumentRanking || isLoadingStopDocumentRanking" name="Document Ranking Service"
          :highlights="[{
            title: 'Algorithm',
            value: documentRankingStatus?.service.algorithm
          }, {
            title: 'Time Elapsed',
            value: '????'
          }]"></OneServiceMetrics>
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
        <OneMetrics title="Unique Words" :value="totalWords" :is-loading="isLoadingTotalWords"></OneMetrics>
        <OneMetrics title="Documents" :value="totalDocuments" :is-loading="isLoadingTotalWords"></OneMetrics>
      </div>
    </div>
  </div>
</template>