<script setup lang="ts">
import ForceGraph3D from '3d-force-graph'
import { Endpoints } from '@/api'
import { onMounted, ref, type Ref } from 'vue'
import { useQueryOptions, useRefQuery } from '@/composables'
import { useRoute, useRouter } from 'vue-router'
import OneTextField from '@/components/OneTextField'
import OneSelect from '@/components/OneSelect'
import qs from 'qs'
import OneNavbar from '@/components/OneNavbar'
import { useQuery } from '@tanstack/vue-query'
import { Webpage } from '@/models'

const route = useRoute()
const query = ref(route.query.query as string)
const countries = useRefQuery<string[]>('countries[]', [])

const router = useRouter()
const $graph = ref<any>(null)

const {
  data: webpages,
  isLoading,
  isError
} = useQuery({
  queryFn: async () => {
    return Webpage.find({
      page: 0,
      perPage: 1,
      query: query.value,
      countries: countries.value
    })
  },
  queryKey: [query, 'documents', countries]
})

onMounted(() => {
  const graph = ForceGraph3D()
  $graph.value = graph
  // @ts-ignore
  graph(document.getElementById('3d-sitemap'))
    .jsonUrl(
      `${Endpoints.SITEMAP_3D}?${qs.stringify(
        {
          query: query.value,
          'countries[]': countries.value
        },
        { indices: false }
      )}`
    )
    .nodeLabel('id')
    // @ts-ignore
    .nodeColor((node) => (node.group === 2 ? '#dc2626' : '#fef3c7'))
    // @ts-ignore
    .linkWidth((link) => (link.source.group === 2 && link.target.group === 2 ? 3 : 0))
    // @ts-ignore
    .linkColor((link) => (link.source.group === 2 && link.target.group === 2 ? '#22c55e' : '#fff'))
    .enableNodeDrag(false)
    .warmupTicks(200) // Adjust number of iterations to taste
    .cooldownTicks(0)
    .onNodeClick((node) => {
      if (node) {
        // @ts-ignore
        if (node.group === 2) {
          graph.linkWidth(graph.linkWidth())
          graph.linkColor(graph.linkColor())
        }
      }
    })
})

function refreshGraph() {
  if ($graph.value) {
    $graph.value.jsonUrl(
      `${Endpoints.SITEMAP_3D}?${qs.stringify({
        query: query.value,
        countries: countries.value
      })}`
    )
  }
}
</script>

<template>
  <div class="h-screen" id="3d-sitemap"></div>
  <div class="absolute left-0 top-0 right-0 flex justify-end bg-transparent">
    <div class="px-4 py-4 flex justify-end">
      <OneNavbar>
        <template #actions>
          <form
            class="flex gap-4"
            @submit.prevent="
              () => {
                router.replace({
                  path: '/sitemap/3d',
                  query: {
                    query,
                    'countries[]': countries
                  }
                })
                refreshGraph()
              }
            "
          >
            <div class="w-56">
              <OneTextField v-model="query"></OneTextField>
            </div>
            <div>
              <OneSelect
                placeholder="Select countries"
                width="320px"
                :is-multiple="true"
                class="bg-white"
                v-model="countries"
                :items="webpages?.facets.countries || []"
              ></OneSelect>
            </div>
          </form>
        </template>
      </OneNavbar>
    </div>
  </div>
</template>
