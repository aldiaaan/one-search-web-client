<script setup lang="ts">
import oneSearchEngineLogo from '@/assets/one-search-engine.png';
import SearchIcon from '@/assets/icons/search.svg?component';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?component';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg?component';
import ChevronUpIcon from '@/assets/icons/chevron-up.svg?component';
import OneLink from '@/components/one-link';
import { computed, ref } from 'vue';
import { useRequest } from '@/composables';
import Api from '@/api';

const isFocused = ref(false);

function handleInputFocus() {
  isFocused.value = true;
}

function handleInputBlur() {
  isFocused.value = false;
}

const domainRequest = useRequest(Api.Domain.fetchDomains)

const domains = computed(() => domainRequest.result.value?.data || []);
const isLoadingDomains = computed(() => domainRequest.isLoading.value);

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
        <div class="mt-24 px-10 mb-16 ">
          <div class="flex justify-center">
            <div
              class="w-full flex bg-white  items-center focus-within:outline focus-within:outline-2 outline-2 outline outline-transparent focus-within:outline-blue-600 transition-all h-12 border rounded-full overflow-hidden pl-6 pr-5 border-gray-200">
              <input v-focus-on-mount @blur="handleInputBlur" @focus="handleInputFocus"
                class="w-full h-full focus:outline-none" placeholder="Search Anything" />
              <div class="relative w-8 h-8">
                <Transition leave-to-class="opacity-0" leave-from-class="opacity-1" enter-active-class="opacity-1"
                  enter-from-class="opacity-0">
                  <SearchIcon v-if="!isFocused"
                    class="text-gray-500 transition-all absolute inset-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
                </Transition>
                <Transition leave-to-class="opacity-0" leave-from-class="opacity-1"
                  enter-active-class="rotate-0 opacity-1" enter-from-class="opacity-0 rotate-180">

                  <ArrowRightIcon v-if="isFocused"
                    class="transition-all text-gray-900  absolute inset-0 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-inherit" />
                </Transition>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-3 md:grid-cols-3  md:mx-10">
          <div class="hover:cursor-pointer border border-gray-200 rounded-xl bg-white">
            <div class="flex justify-between items-baseline px-4 pt-4 pb-4 mb-4 border-b border-gray-200">
              <p class="font-semibold text-xl tracking-tight">Top Webpage</p>
              <OneLink to="/webpages">
                More
                <ChevronRightIcon width="20" height="20" viewBox="0 0 24 24" />
              </OneLink>

            </div>
            <div class="flex flex-col h-full gap-6">
              <div class="flex px-4 gap-4">

                <div class="flex-1 min-w-0">
                  <div class="flex items-center mb-2">
                    <div class="w-3 h-3 overflow-hidden mr-2">
                      <img class="w-full h-full object-cover" src="https://kumparan.com/favicon.ico" />
                    </div>
                    <div class="text-xs text-gray-500 truncate text-ellipsis">
                      kumparan.com
                    </div>
                  </div>
                  <div class="font-medium text-sm leading-5 text-gray-700">
                    Akan Investasi Rp 381 T di Rempang, Kalau Lambat Xinyi Group Bisa Kabur ke Johor
                  </div>
                </div>
                <div class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                  <img class="h-full w-full object-cover"
                    src="https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01ha8v8krmtpfpeze87e9xnwvf.jpg" />
                </div>
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
                <div class="h-16 w-16 flex items-center justify-center border border-gray-200 rounded-lg">
                  <div class="w-10 h-10 overflow-hidden">
                    <img class="w-full h-full object-cover" :src="domain.image" />
                  </div>
                </div>
                <div class="ml-4 flex-1">
                  <div class="font-semibold ">
                    {{ domain.name }}
                  </div>
                  <div class="text-gray-500 text-xs mt-0.5">
                    Indonesia
                  </div>
                </div>
                <div class="flex-shrink-0 text-green-500 w-8 flex justify-center items-center">
                  <div class="">
                    <ChevronUpIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="button" class="hover:cursor-pointer rounded-lg   bg-gray-900 relative p-4">
            <p class="absolute bottom-6 left-6 text-white font-semibold text-3xl">
              Explore Sitemap
            </p>
            <div class="absolute inset-0">
              <svg></svg>
            </div>
          </div>
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
</style>