import { ref, watch, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isNumeric } from '@/utils'

export default function useRefQuery<T>(name: string, defaultValue: any) {
  const route = useRoute()
  const router = useRouter()
  // const defaultValue = isNumeric(route.query[name] as string)
  //   ? parseFloat(route.query[name] as string)
  //   : (route.query[name] as string)

  const value = ref(route.query[name] || defaultValue)

  watch(value, () => {
    router.replace({
      path: route.path,
      query: {
        ...route.query,
        [name]: value.value
      }
    })
  })

  return value as Ref<T>
}
