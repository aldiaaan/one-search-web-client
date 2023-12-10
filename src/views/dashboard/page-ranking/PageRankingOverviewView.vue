<script setup lang="ts">
import OneMetrics from '@/components/OneMetrics'
import OneTable from '@/components/OneTable'
import OneServiceMetrics from '@/components/OneServiceMetrics'
import OneDialog from '@/components/OneDialog'
import { ref } from 'vue'
import OneButton from '@/components/OneButton'
import OneTextField from '@/components/OneTextField'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { PageRankingService } from '@/models/page-ranking-service'
import { formatFileSize, formatNumber } from '@/utils'
import { Webpage } from '@/models'

const {
  data: metrics,
  isLoading: isLoadingMetrics,
  isError: isErrorMetrics
} = useQuery({
  queryKey: ['page-ranking-metrics'],
  queryFn: PageRankingService.metrics
})

const {
  data: status,
  isLoading: isLoadingStatus,
  refetch: refetchStatus,
  isError: isErrorStatus
} = useQuery({
  queryKey: ['page-ranking-status'],
  queryFn: PageRankingService.status,
  refetchInterval: 3000
})

const {
  data: topWebpages,
  isLoading: isLoadingTopWebpages,
  isError: isErrorTopWebpages
} = useQuery({
  queryKey: ['top-webpages'],
  queryFn: () => {
    return Webpage.find({
      sorts: {
        pagerank: 'DESC'
      }
    })
  }
})

const { mutate: start, isLoading: isLoadingStart } = useMutation({
  mutationFn: PageRankingService.start,
  onSettled: () => refetchStatus()
})

const { mutate: stop, isLoading: isLoadingStop } = useMutation({
  mutationFn: PageRankingService.stop,
  onSettled: () => refetchStatus()
})

const shouldOpenStartDocumentRankingDialog = ref(false)
const iterations = ref(20)
const dampingFactor = ref(0.8)

const headers = [
  {
    key: 'index',
    title: 'Rank',
    width: 50
  },
  {
    key: 'url',
    title: 'URL',
    height: 64
  }
]
</script>

<template>
  <OneDialog
    :open="shouldOpenStartDocumentRankingDialog"
    title="Start New Service"
    @close="() => (shouldOpenStartDocumentRankingDialog = false)"
  >
    <template #body>
      <div class="flex flex-col gap-4">
        <OneTextField v-model="iterations" label="Iterations" type="number"></OneTextField>
        <OneTextField v-model="dampingFactor" label="Damping Factor" type="number"></OneTextField>
      </div>
    </template>
    <template #footer>
      <OneButton
        class="w-20"
        @click="
          () => {
            start({
              iterations,
              dampingFactor
            })
            shouldOpenStartDocumentRankingDialog = false
          }
        "
        :is-loading="isLoadingStart"
        >Start</OneButton
      >
    </template>
  </OneDialog>
  <div class="container mx-auto px-8 flex flex-col gap-6">
    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2 flex flex-col gap-6">
        <OneServiceMetrics
          :is-stopping="isLoadingStop"
          :is-error="isErrorStatus"
          :highlights="[
            {
              title: 'Iteration',
              value: `${status?.iteration} of ${status?.maxIterations}`
            },
            {
              title: 'Start Time',
              value: status?.startTime
            }
          ]"
          @stop="stop"
          name="Page Ranking Service"
          :is-running="status?.status === 'RUNNING'"
          :is-loading="isLoadingStatus"
          @start="() => (shouldOpenStartDocumentRankingDialog = true)"
        >
        </OneServiceMetrics>
        <div class="border border-gray-200 rounded-lg bg-white">
          <div class="flex justify-between items-center h-16 px-6 border-b border-gray-200">
            <p class="font-semibold tracking-tight text-sm">Top Webpages</p>
          </div>
          <div class="flex flex-col flex-1 gap-4">
            <OneTable
              :is-loading="isLoadingTopWebpages"
              :headers="headers"
              :items="topWebpages?.webpages.map((h, index) => ({ ...h, index: index + 1 }))"
            >
              <template #url="{ item }">
                <div>
                  <p class="font-semibold">{{ item.title }}</p>
                  <p class="text-xs text-gray-500">{{ item.url }}</p>
                </div>
              </template>
            </OneTable>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <OneMetrics
          title="Disk Usage"
          :value="formatFileSize(metrics?.fileSize)"
          :is-loading="isLoadingMetrics"
        >
        </OneMetrics>
        <OneMetrics
          title="Total Linking"
          :value="formatNumber(metrics?.totalLinking)"
          :is-loading="isLoadingMetrics"
        >
        </OneMetrics>
        <OneMetrics
          title="Total Nodes"
          :value="formatNumber(metrics?.totalNodes)"
          :is-loading="isLoadingMetrics"
        >
        </OneMetrics>
        <OneMetrics
          title="Page Rank Vector Size"
          :value="metrics?.vectorSize"
          :is-loading="isLoadingMetrics"
        >
        </OneMetrics>
      </div>
    </div>
  </div>
</template>
