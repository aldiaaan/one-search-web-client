import { computed, onMounted, ref } from 'vue'

type Unpromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never

export default function useRequest<TRequestFn extends (...args: any) => any, TRequestError>(
  fetcher: TRequestFn,
  options: {
    onFinished?: (result: ReturnType<TRequestFn>) => void
    fetchOnMount?: boolean
  } = {
    onFinished: () => {},
    fetchOnMount: true
  }
) {
  const isLoading = ref<boolean>(false)
  const error = ref<any>()
  const isError = computed(() => Boolean(error))
  const result = ref<Unpromise<ReturnType<TRequestFn>>>()

  onMounted(() => {
    if (options.fetchOnMount) {
      wrappedFetcher()
    }
  })

  const wrappedFetcher = (
    args?: any,
    requestOptions?: {
      onFinished?: (result: ReturnType<TRequestFn>) => void
    }
  ) => {
    isLoading.value = true
    const onFinished = requestOptions?.onFinished || options?.onFinished
    fetcher(args)
      .then((data: ReturnType<TRequestFn>) => {
        result.value = data
        onFinished?.(data)
      })
      .catch((err: TRequestError) => {
        error.value = err
        console.log(err)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  return {
    fetch: wrappedFetcher as TRequestFn,
    result: result,
    isLoading,
    isError,
    error
  }
}
