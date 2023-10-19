import axios, { type GenericAbortSignal } from 'axios'
import { ONE_API_ROOT_URL } from './constants'

const _axios = axios.create({
  baseURL: ONE_API_ROOT_URL
})

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

  console.log(x)

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
