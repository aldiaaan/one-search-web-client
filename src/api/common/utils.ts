import axios from 'axios'
import { ONE_API_ROOT_URL } from './constants'

const _axios = axios.create({
  baseURL: ONE_API_ROOT_URL
})

async function request<T>(props: {
  method?: 'POST' | 'GET'
  body?: any
  url?: string
  params?: any
}) {
  const x = await _axios({
    method: props.method,
    data: props.body,
    url: props.url || '/',
    params: props.params || {}
  })

  return x.data as T
}

export default request
