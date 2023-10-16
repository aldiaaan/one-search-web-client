import axios, { type GenericAbortSignal } from 'axios'
import { ONE_API_ROOT_URL } from './constants'

const _axios = axios.create({
  baseURL: ONE_API_ROOT_URL
})

export async function request<T>(props: {
  method?: 'POST' | 'GET'
  body?: any
  url?: string
  params?: any
  signal?: GenericAbortSignal
}) {
  const x = await _axios({
    signal: props.signal,
    method: props.method,
    data: props.body,
    url: props.url || '/',
    params: props.params || {}
  })

  return x.data as T
}

