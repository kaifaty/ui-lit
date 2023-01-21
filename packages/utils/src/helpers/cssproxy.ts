import {css, CSSResultOrNative, unsafeCSS} from 'lit'

export const makeCSSProxy = <T extends object>(data: T, prefix = '') => {
  return new Proxy(data, {
    get: (target, prop, receiver) => {
      if (prop in target) {
        const value = Reflect.get(target, prop, receiver)
        const _default = value && typeof value === 'object' && 'default' in value ? ', ' + value.default : ''
        return unsafeCSS(`var(${prefix + (value as any).name + _default})`)
      } else {
        console.warn('undefined prop', prop)
        return css``
      }
    },
  }) as Record<keyof T, CSSResultOrNative>
}

export const makeCSSNameProxy = <T extends object>(data: T, prefix = '') => {
  return new Proxy(data, {
    get: (target, prop, receiver) => {
      if (prop in target) {
        const value = Reflect.get(target, prop, receiver) as any
        return unsafeCSS(prefix + value.name)
      } else {
        console.warn('undefined prop', prop)
        return css``
      }
    },
  }) as Record<keyof T, CSSResultOrNative>
}
