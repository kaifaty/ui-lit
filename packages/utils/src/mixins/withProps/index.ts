import type {Constructor} from '@ui-wc/types'

export type AccessorParam<T> = {
  name: string
  defaultValue: T
  set?: (target: HTMLElement, oldValue: T, value: T) => boolean
  get?: (target: HTMLElement, value: T) => void
  options?: {
    attribute?: boolean
    reflect?: boolean
  }
}

const defineAttr = (target: HTMLElement, name: string, value: unknown) => {
  if (typeof value === 'string') {
    target.setAttribute(name, value)
  }
  if (typeof value === 'boolean') {
    if (value) {
      target.setAttribute(name, '')
    } else {
      target.removeAttribute(name)
    }
  }
}

export const defindeAccessors = <T>(target: HTMLElement, data: AccessorParam<T>) => {
  let currentValue = data.defaultValue
  Object.defineProperty(target, data.name, {
    configurable: true,
    get() {
      if (data.get) {
        return data.get(target, currentValue)
      }
      return currentValue
    },
    set(newValue: T) {
      let curr = currentValue
      if (data.get) {
        curr = data.get(target, currentValue) as any
      }
      if (data.set) {
        if (!data.set(target, curr, newValue)) {
          return
        }
      } else if (currentValue === newValue) {
        return
      }
      currentValue = newValue

      if (data.options?.reflect && data.options?.attribute) {
        defineAttr(target, data.name, newValue)
      }
    },
  })
  if (data.options?.reflect && data.options?.attribute && data.defaultValue) {
    defineAttr(target, data.name, data.defaultValue)
  }
}

export const withProps = <P extends Record<string, unknown>, T extends Constructor<HTMLElement> = Constructor<HTMLElement>>(
  superClass: T,
  props: AccessorParam<any>[],
) => {
  const data = new Map(props.map((it) => [it.name, it]))
  return class WithProps extends superClass {
    static observedAttributes = props.filter((it) => it.options?.attribute).map((it) => it.name)
    constructor(...args: any[]) {
      super(...args)
      props.forEach((entry) => {
        defindeAccessors(this, entry)
      })
    }
    attributeChangedCallback(prop: string, old: string, value: string) {
      const opts = data.get(prop)
      if (opts && value != old) {
        if (typeof opts.defaultValue === 'boolean') {
          //@ts-ignore
          this[prop] = typeof value === 'string'
        } else {
          //@ts-ignore
          this[prop] = value
        }
      }
    }
  } as any as T & Constructor<P>
}

export const createGetParams =
  <T>(options: AccessorParam<T>['options']) =>
  <T>(
    name: string,
    defaultValue: T,
    accessors?: {
      set?: AccessorParam<T>['set']
      get?: AccessorParam<T>['get']
    },
  ): AccessorParam<T> => ({
    name: name,
    defaultValue: defaultValue,
    options,
    ...accessors,
  })
