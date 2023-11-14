import axios, { type GenericAbortSignal } from 'axios'
import { ErrorCode, ONE_API_ROOT_URL } from './constants'
import { SnackbarManager } from '@/components/OneSnackbar'

const _axios = axios.create({
  baseURL: ONE_API_ROOT_URL
})

_axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.code === ErrorCode.INVALID_CREDENTIALS) {
      if (window) {
        window.location.href = '/login'
      }
    }
    if (error.response.data.code) {
      SnackbarManager.add({
        duration: 4000,
        title: error.response.data.message,
        variant: 'danger'
      })
    }
  }
)

export async function request<T>(props: {
  method?: 'POST' | 'GET' | 'DELETE'
  body?: any
  url?: string
  params?: any
  signal?: GenericAbortSignal
}) {
  const authToken = localStorage.getItem('user-auth-token')
  const headers = {}

  if (authToken) {
    Object.assign(headers, { 'X-Auth-Token': authToken })
  }

  const x = await _axios({
    signal: props.signal,
    method: props.method,
    data: props.body,
    url: props.url || '/',
    params: props.params || {},
    headers
  })

  return x.data as T
}

export function delay<T = any>(data?: T, time: number = 500): Promise<T> {
  return new Promise((resolve) =>
    setTimeout(() => {
      if (data) {
        resolve(data)
      }
    }, time)
  ) as Promise<T>
}
