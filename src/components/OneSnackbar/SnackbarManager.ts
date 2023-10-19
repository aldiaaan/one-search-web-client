import { ref } from 'vue'

export const __snackbars = ref<Snackbar[]>([])
const timeoutHandles = []
let __id = 0

export type Snackbar = {
  title?: string
  variant?: 'danger' | 'normal' | 'success'
  id?: number | string
  duration?: number
}

export class SnackbarManager {
  static add(snackbar: Snackbar) {
    const id = __id++
    __snackbars.value.push({ ...snackbar, id })
    setTimeout(() => {
      SnackbarManager.remove({ id })
    }, snackbar.duration || 4000)
    return id
  }

  static remove(snackbar: Snackbar) {
    __snackbars.value = __snackbars.value.filter((s) => s.id !== snackbar.id)
  }
}
