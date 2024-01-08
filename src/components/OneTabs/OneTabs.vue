<script setup lang="ts">
import { useLink, useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    tabs: {
      label?: string
      key: string
      href?: string
      keepQuery?: boolean
      name?: string
    }[]
  }>(),
  {
    tabs: () => []
  }
)

const router = useRouter()

defineOptions({
  name: 'OneTabs'
})
</script>

<template>
  <div class="flex">
    <div
      :key="tab.key"
      role="button"
      @click="
        () => {
          if (tab.name) {
            router.push({
              name: tab.name,
              query: router.currentRoute.value.query
            })
            return
          }
          if (tab.href) {
            router.push({
              path: tab.href,
              query: router.currentRoute.value.query
            })
          }
        }
      "
      v-for="tab in props.tabs"
      :to="tab.href"
      :class="{
        'font-semibold text-gray-900': useLink({
          to: {
            name: tab.name
          }
        }).isActive.value
      }"
      class="px-4 text-sm py-4 text-gray-500"
      :is-on="
        useLink({
          to: {
            name: tab.name
          }
        }).isActive.value
      "
    >
      {{ tab.label }}
    </div>
  </div>
</template>
