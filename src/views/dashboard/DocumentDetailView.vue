<script setup lang="ts">
import { Endpoints } from '@/api';
import OneBadge from '@/components/OneBadge';
import OneCard from '@/components/OneCard';
import OneImage from '@/components/OneImage';
import OnePageContent from '@/components/OnePageContent';
import OneTabs from '@/components/OneTabs';
import { useRoute } from 'vue-router';

const route = useRoute()

const url = route.query.url
const wordcloudImageUrl = `${Endpoints.DOCUMENT_WORD_CLOUDS}?url${url}`

</script>

<template>
  <div>
    <div class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-8">
        <div class="h-32 flex items-center">
          <div>
            <p class="text-2xl font-semibold tracking-tight">{{ route.query.url }}</p>
            <div class="mt-2">
              <OneBadge class=" bg-blue-50 font-medium text-blue-600">Document</OneBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OnePageContent>
      <OneCard class="h-[460px]">
        <template #header>
          Wordclouds
        </template>
        <OneImage mode="contain" :src="wordcloudImageUrl"></OneImage>
      </OneCard>
    </OnePageContent>
  </div>
</template>