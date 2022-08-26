import { ParamsState } from '../features/table'
import { SORT_LIST, ENTRIES_OPTIONS, ORDER_LIST } from './data'

export const sortOptionsIsValid = (sort: string): boolean => {
  return SORT_LIST.includes(sort)
}

export const orderOptionsIsValid = (order: string): boolean => {
  return ORDER_LIST.includes(order)
}

export const entriesOptionsIsValid = (entries: number): boolean => {
  return Object.values(ENTRIES_OPTIONS)
    .map((entry) => entry.value)
    .includes(entries)
}

export const pageOptionsIsValid = (page: string, lastPage: number): boolean => {
  return !isNaN(parseInt(page)) && parseInt(page) > 0 && parseInt(page) <= lastPage
}

export const getParams = (params: URLSearchParams): {[key:string]: string} => {
  const paramsObj:{[key: string]: string} = {}

  for(const [key, value] of Array.from(params.entries())) {
    paramsObj[key] = value
  }

  return paramsObj
}

export const updateURL = (params: ParamsState) => {
  const url = new URL(window.location.origin+window.location.pathname)

  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
  window.history.pushState({}, '', url)
}