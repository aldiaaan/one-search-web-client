<script setup lang="ts">

import { ref, withDefaults } from 'vue'
import OneBadge from '../OneBadge';
import OneCard from '../OneCard';
import { OneErrorState } from '../OneState'

defineOptions({
  name: "OneServiceMetrics",
});

const props = withDefaults(defineProps<{
  name?: string;
  status?: boolean;
  isRunning?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isStopping?: boolean;
  highlights?: { title?: string | number; value?: string | number }[]
}>(), {
  name: () => "Unknown",
  status: () => false,
  isRunning: () => false,
  highlights: () => [],
  isError: () => false,
  isStopping: () => false
})

// watchEffect(() => {
//   isRunning.value = props.isRunning
// })

const emits = defineEmits(["update:status", "start", "stop"])

</script>

<template>
  <OneCard>
    <div class="px-4 py-4 border-b h-16 border-gray-200 flex items-center">
      <div>
        <div class="flex items-baseline">
          <p class="text-sm font-semibold">
            {{ props.name }}

          </p>
          <one-badge v-if="props.isRunning" class="bg-green-100 ml-2 text-green-600">Running</one-badge>
        </div>
      </div>
      <div class="ml-auto" v-if="props.isRunning">
        <button @click="emits('stop')" :disabled="isStopping">
          <p :class="{'text-gray-300': isStopping}" class="text-red-600 text-sm font-semibold">{{isStopping ? 'Stopping' : 'Stop'}}</p>
        </button>
      </div>

    </div>
    <div class="p-4 grid grid-cols-2 gap-4" v-if="props.isRunning">
      <div v-for="h in highlights" :key="h.title">
        <p class="text-sm text-gray-500">
          {{ h.title }}
        </p>
        <p class="mt-1 text-2xl text-gray-900 font-bold tracking-tight">
          {{ h.value }}
        </p>

      </div>
    </div>
    <div class="gap-4 p-4 bg-opacity-50 grid grid-cols-4" v-else-if="props.isLoading">
      <div  :key="i" v-for="i in 8">
        <div class="bg-gray-100 h-16 rounded-lg"></div>
      </div>
    </div>
    <div v-else-if="props.isError">
      <OneErrorState></OneErrorState>
    </div>
    <div v-else class="flex p-4 bg-gray-50 bg-opacity-50 h-64 items-center justify-center">
      <div>
        <p class="font-medium text-sm text-gray-700">Service is currently offline,
          <span role="button" @click.prevent="emits('start')"
            class="text-blue-600 cursor-pointer font-semibold">Start</span> new one.
        </p>
      </div>
    </div>
  </OneCard>
</template>
