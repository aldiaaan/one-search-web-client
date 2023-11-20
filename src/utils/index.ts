import * as dayjs from 'dayjs'
import * as relative from 'dayjs/plugin/relativeTime'

// @ts-ignore
dayjs.extend(relative)
// @ts-ignore

export function isDev() {
  return import.meta.env.DEV
}

export function isNumber(value: any) {
  return typeof value === 'number' && isFinite(value)
}

export function formatElapsedTime(start: number): string {
  // @ts-ignore
  return dayjs.unix(start).fromNow()
}

export function formatFileSize(bytes: number = 0, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)

  return bytes.toFixed(dp) + ' ' + units[u]
}

export function formatNumber(n: number = 0): string {
  return n.toLocaleString('en-US')
}

export * from './countries'
