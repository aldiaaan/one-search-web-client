<script setup lang="ts">
import OneButton from '@/components/OneButton';
import OneDialog from '@/components/OneDialog';
import OneMetrics from '@/components/OneMetrics';
import OnePageContent from '@/components/OnePageContent';
import OnePieMetrics from '@/components/OnePieMetrics'
import OneServiceMetrics from '@/components/OneServiceMetrics';
import OneTextField from '@/components/OneTextField';
import { CrawlingService } from '@/models/crawling-service';
import { formatFileSize, formatNumber } from '@/utils';
import { useQuery } from '@tanstack/vue-query';
import { computed, onMounted, ref } from 'vue';

const duration = ref()

const shouldOpenStartServiceDialog = ref(false)

const { data: metrics, isLoading: isLoadingMetrics } = useQuery({
  queryFn: () => CrawlingService.metrics(),
  queryKey: ['crawling-metrics']
})

</script>

<template>
  <div class="container mx-auto px-8 flex flex-col gap-6">

    <OneDialog title="Start a new service" :open="shouldOpenStartServiceDialog"
      @close="(v: boolean) => shouldOpenStartServiceDialog = v">
      <template #body>
        <div class="flex flex-col gap-4">
          <OneTextField v-model="duration" label="Duration (ms)" placeholder="Enter duration in miliseconds" />
        </div>
      </template>
      <template #footer>
        <OneButton @click="() => {

        }">Start</OneButton>
      </template>
    </OneDialog>


    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-2 flex flex-col gap-6">
        <OneServiceMetrics name="Crawling Service"></OneServiceMetrics>
        <OnePieMetrics
          :data="Object.keys(metrics?.domainsStats || {}).reduce((acc, val) => { acc[val] = metrics?.domainsStats[val].length; return acc }, {})">
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
