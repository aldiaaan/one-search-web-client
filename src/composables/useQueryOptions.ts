import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default function useQueryOptions(data: { perPage?: number } = { perPage: 20 }) {
  const route = useRoute()

  const page = ref(parseInt((route.query.page as string) || '0'))
  const perPage = ref(data.perPage || 20)
  const query = ref(route.query.query as string)

  const router = useRouter()

  watch(page, () => {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        page: page.value
      }
    })
  })

  return { page, perPage, query }
}
