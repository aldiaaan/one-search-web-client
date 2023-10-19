<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';



const props = withDefaults(defineProps<{
  modelValue: number;
  total?: number;
  perPage: number;
}>(), {
  modelValue: () => 0,
  perPage: () => 0,
})

const emit = defineEmits(['update:modelValue'])

const router = useRouter()

const isAbleToNext = computed(() => (props.modelValue + 1) * props.perPage < (props.total || 0))
const isAbleToPrevious = computed(() => props.modelValue > 0)

defineOptions({
  name: 'OneSimplePagination'
})

</script>

<template>
  <div class="flex items-center">
    <p class="text-gray-900 font-medium text-sm">
      {{ modelValue * perPage }} - {{ Math.min((modelValue + 1) * perPage, total || 0) }} <span
        class="font-normal text-gray-500">of {{ total ||
          "--"
        }}</span>
    </p>
    <div class="mx-3 w-[1px] bg-gray-200 h-full"></div>
    <div class="flex text-sm gap-2">
      <button :disabled="!isAbleToPrevious" @click="() => {

        router.push({

          query: {

            ...router.currentRoute.value.query,
            page: modelValue - 1
          }
        })
        emit('update:modelValue', modelValue - 1);
      }">
         <p :class="{ 'text-gray-500 cursor-not-allowed': !isAbleToPrevious }" >
         Previous</p>
      </button><button class="text-sm" :disabled="!isAbleToNext" @click="() => {
        router.push({
          query: {

            ...router.currentRoute.value.query,
            page: modelValue + 1
          }
        })
        emit('update:modelValue', modelValue + 1)

      }">
        
        <p  :class="{ 'text-gray-500 cursor-not-allowed': !isAbleToNext }" >Next</p>
      </button>
    </div>
  </div>
</template>
