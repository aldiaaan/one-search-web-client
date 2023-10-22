<script setup lang="ts">
import { ref, watchEffect } from 'vue';

defineOptions({
  name: 'OneTable'
})

const props = withDefaults(defineProps<{
  headers: {
    key: string;
    title?: string;
    disableGutter?: boolean;
    width?: string | number;
  }[]
  items?: any[];
  isLoading?: boolean;
  headerOptions?: {
    variant?: 'filled' | 'not-filled'
  },
  cellHeight?: number
}>(), {
  cellHeight: 48,
  headers: () => [],
  items: () => [],
  isLoading: false,
  headerOptions: () => ({
    variant: 'filled' as const
  })
})


const items = ref(props.items);
const headers = ref(props.headers);
const isLoading = ref(props.isLoading);

watchEffect(() => {
  items.value = props.items;
  headers.value = props.headers;
  isLoading.value = props.isLoading;
});

function getTableRowClasses(options: {
  disableGutter?: boolean
}) {
  const { disableGutter = false } = options

  const classes = ['text-sm'];

  if (!disableGutter) {
    classes.push('px-6')
  }

  return classes
}

</script>

<template>
  <table class="w-full">
    <thead class="border-b border-g-100">
      <tr class="text-xs font-medium">
        <th :width="header.width" v-for="header in headers" :key="header.key" class="py-3 px-6 text-start text-gray-500">
          {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody v-if="!isLoading">

      <tr v-for="item, index in items" :key="index" class="border-b border-gray-100">
        <td :style="{ height: `${cellHeight}px` }" :width="headers?.find(header => header.key === key)?.width" :key="key"
          v-for="key in headers?.map(header => header.key)" :class="getTableRowClasses({
            disableGutter: Boolean(headers?.find(header => header.disableGutter && header.key === key))
          })">
          <slot :name="key" :item="item">
            {{ item[key] }}

          </slot>
        </td>
      </tr>

    </tbody>

    <tbody v-else>
      <tr v-for="_, index in 10" :key="index" class="border-b border-gray-100">
        <td :style="{ height: `${cellHeight}px` }" :width="headers?.find(header => header.key === key)?.width" :key="key"
          v-for="key in headers?.map(header => header.key)" :class="getTableRowClasses({
            disableGutter: Boolean(headers?.find(header => header.disableGutter && header.key === key))
          })">
          <div class="w-full h-6 bg-gray-100 animate-pulse rounded-lg"></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
