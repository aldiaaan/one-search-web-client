import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default function useQueryOptions(data: { perPage?: number } = { perPage: 25 }) {
  const route = useRoute()

  const page = ref(parseInt((route.query.page as string) || '0'))
  const perPage = ref(data.perPage)
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

  watch([perPage, query], () => {
    page.value = 0
  })

  return { page, perPage, query }
}
