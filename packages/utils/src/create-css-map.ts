import {unsafeCSS} from 'lit'

export type StringOnly<T> = T extends string ? T : never
export type BaseMap = Record<string, string | number | readonly [string | number, string]>

export const createcssMap = <T extends BaseMap, P extends string>(data: T, preffix: P) => {
  const getKey = (key: StringOnly<keyof T>) => unsafeCSS(preffix + key)
  const getVar = (key: StringOnly<keyof T>) => {
    const v = data[key]
    const value = Array.isArray(v) ? v[0] : v
    return unsafeCSS(`var(${preffix + key}, ${value})`)
  }

  return {
    getKey,
    getVar,
  }
}
