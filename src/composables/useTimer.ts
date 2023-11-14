import { formatElapsedTime } from '@/utils'
import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue'

export default function useTimer(options: { startTime?: Ref<number> } = {}) {
  const { startTime = 0 } = options
  // const now = Math.floor(new Date().getTime() / 1000)
  const val = ref(startTime)
  const handle = ref(null)

  if (options.startTime) {
    watch(options.startTime, async (newValue, oldValue) => {
      val.value = newValue
    })
  }

  onMounted(() => {
    // @ts-ignore
    handle.value = setInterval(() => {
      val.value = val.value + 1
    }, 1000)
  })

  onUnmounted(() => {
    if (handle.value) {
      clearInterval(handle.value)
    }
  })

  return val
}
