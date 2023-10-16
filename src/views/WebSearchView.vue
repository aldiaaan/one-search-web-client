<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import oneSearchEngineLogo from '@/assets/one-search-engine.png';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?component';
import ChevronUpIcon from '@/assets/icons/chevron-up.svg?component';
import OneLink from '@/components/OneLink';
import { useRequest } from '@/composables';
import { Domain, Webpage } from '@/models';
import { useRouter } from 'vue-router';
import OneSearchInput from '@/components/OneSearchInput'
import OneImage from '@/components/OneImage';


const query = ref()

const router = useRouter()

const domainRequest = useRequest(Domain.find)
const webpageRequest = useRequest(Webpage.find)

onMounted(() => {
  domainRequest.exec({ perPage: 7 })
  webpageRequest.exec({ perPage: 5 })
})


const domains = computed(() => domainRequest.result.value?.domains || []);
const isLoadingDomains = computed(() => domainRequest.isLoading.value);
const webpages = computed(() => webpageRequest.result.value?.webpages || []);
const isLoadingWebpages = computed(() => webpageRequest.isLoading.value);

</script>

<template>
  <div class="searchBackground absolute top-0 left-0 right-0 -z-10 h-[440px]">

  </div>
  <div>

    <nav class="fixed top-0 left-0 right-0 h-20 flex items-center px-12">
      <img :src="oneSearchEngineLogo" class="w-8 h-8" />
    </nav>
    <div class="h-screen pt-20">
      <div class="container mx-auto ">
        <div class="mt-24 px-20 mb-16 ">
          <div class="flex justify-center">
            <OneSearchInput v-model="query" @submit.prevent="() => router.push({
              path: '/search',
              query: {
                query
              }
            })" />
          </div>
        </div>
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2  md:mx-20">
          <div class="hover:cursor-pointer border border-gray-200 rounded-xl bg-white">
            <div class="flex justify-between items-baseline px-4 pt-4 pb-4 mb-4 border-b border-gray-200">
              <p class="font-semibold text-xl tracking-tight">Top Webpage</p>
              <OneLink to="/webpages">
                More
                <ChevronRightIcon width="20" height="20" viewBox="0 0 24 24" />
              </OneLink>

            </div>
            <div class="flex flex-col h-full gap-6 my-4">
              <div class="flex px-4 gap-4" :key="webpage.url" v-for="webpage in webpages">

                <div class="flex-1 min-w-0">
                  <div class="flex items-center mb-2">
                    <div class="w-3 h-3 overflow-hidden mr-2">
                      <img class="w-full h-full object-cover" src="https://kumparan.com/favicon.ico" />
                    </div>
                    <div class="text-xs text-gray-500 truncate text-ellipsis">
                      {{ webpage.url }}
                    </div>
                  </div>
                  <div class="font-medium text-sm leading-5 text-gray-700">
                    {{ webpage.title }} </div>
                </div>
                <OneImage class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden" :src="webpage.image">
                </OneImage>
              </div>
            </div>

          </div>
          <div class="border border-gray-200 rounded-lg  bg-white">
            <div class="flex justify-between items-baseline px-4 pt-4 pb-4 border-b border-gray-200">
              <p class="font-semibold text-xl tracking-tight">Top Domain</p>
              <OneLink to="/webpages">
                More
                <ChevronRightIcon width="20" height="20" viewBox="0 0 24 24" />
              </OneLink>

            </div>
            <div class="flex flex-col flex-1 gap-4 my-4">
              <div class="flex items-center px-4" :key="domain.id" v-for="domain in domains">

                <OneImage class="h-16 w-16 flex items-center justify-center border border-gray-200 rounded-lg"
                  :src="domain.image"> </OneImage>

                <div class="ml-4 flex-1">
                  <div class="font-semibold ">
                    {{ domain.name }}
                  </div>
                  <div class="text-gray-500 text-xs mt-0.5">
                    {{ domain.country }}
                  </div>
                </div>

              </div>
            </div>
          </div>
          <!-- <div role="button" class="hover:cursor-pointer rounded-lg   bg-gray-900 relative p-4">
            <p class="absolute bottom-6 left-6 text-white font-semibold text-3xl">
              Explore Sitemap
            </p>
            <div class="absolute inset-0">
              <svg></svg>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.searchBackground {
  background: rgb(239, 246, 255);
  background: linear-gradient(180deg, rgba(239, 246, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
}
</style>@/components/OneLink