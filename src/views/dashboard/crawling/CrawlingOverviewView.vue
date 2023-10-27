<script setup lang="ts">
import OneButton from '@/components/OneButton';
import OneDialog from '@/components/OneDialog';
import OneMetrics from '@/components/OneMetrics';
import OnePageContent from '@/components/OnePageContent';
import OnePieMetrics from '@/components/OnePieMetrics'
import OneSelect from '@/components/OneSelect';
import OneServiceMetrics from '@/components/OneServiceMetrics';
import OneTextField from '@/components/OneTextField';
import { CrawlingService } from '@/models/crawling-service';
import { formatFileSize, formatNumber } from '@/utils';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { computed, onMounted, ref } from 'vue';

const duration = ref(0)
const cpus = ref(0)

const shouldOpenStartServiceDialog = ref(false)

const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
  queryFn: CrawlingService.metrics,
  queryKey: ['crawling-metrics']
})

const { data: availableCPUs, isLoading: isLoadingAvailableCPUs } = useQuery({
  queryFn: CrawlingService.getAvaiableCPUs,
  queryKey: ['crawling-cpus']
})

const { data: status, isLoading: isLoadingStatus, refetch: refetchStatus } = useQuery({
  queryFn: CrawlingService.status,
  queryKey: ['crawling-status'],
  refetchInterval: 1000
})

const { mutate: start, isLoading: isLoadingStart } = useMutation({
  mutationFn: CrawlingService.start,
  onSettled: () => {
    refetchStatus()
  }
})


const { mutate: stop, isLoading: isLoadingStop } = useMutation({
  mutationFn: CrawlingService.stop,
  onSettled: () => {
    refetchStatus()
  }
})

</script>

<template>
  <div class="container mx-auto px-8 flex flex-col gap-6">

    <OneDialog title="Start a new service" :open="shouldOpenStartServiceDialog"
      @close="(v: boolean) => shouldOpenStartServiceDialog = false">
      <template #body>
        <div class="flex flex-col gap-4">
          <OneTextField v-model="duration" label="Duration (ms)" placeholder="Enter duration in miliseconds" />
          <OneSelect v-model="cpus" max-height="160px" label="Threads" :items="Array.from({ length: availableCPUs || 0 }).map((_, index) => ({
            value: index + 1,
            label: index + 1
          }))"></OneSelect>
        </div>
      </template>
      <template #footer>
        <OneButton :is-loading="isLoadingStart" class="w-20" @click="() => {
          start({
            duration, threads: cpus
          }, {
            onSettled: () => {
              shouldOpenStartServiceDialog = false
            }
          })
        }">Start</OneButton>
      </template>
    </OneDialog>


    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2 flex flex-col gap-6">
        <OneServiceMetrics :highlights="[{ title: 'Threads', value: status?.service.threads }]"
          :is-running="status?.service.status === 'RUNNING'" @stop="stop"
          @start="() => shouldOpenStartServiceDialog = true" name="Crawling Service">
        </OneServiceMetrics>
        <OnePieMetrics
          :data="Object.keys(metrics?.domainsStats || {}).reduce((acc, val) => { acc[val] = metrics?.domainsStats[val].length || 0; return acc }, {} as Record<string, number>)">
        </OnePieMetrics>
      </div>
      <div class="flex flex-col gap-6">
        <OneMetrics title="Storage Used" :is-loading="isLoadingMetrics"
          :value="formatFileSize(metrics?.totalWebpagesSize)"></OneMetrics>
        <OneMetrics title="Webpages" :is-loading="isLoadingMetrics" :value="formatNumber(metrics?.totalWebpages)">
        </OneMetrics>
        <OneMetrics title="Domains" :is-loading="isLoadingMetrics" :value="formatNumber(metrics?.totalDomains)">
        </OneMetrics>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
