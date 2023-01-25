import type {Constructor} from '@ui-lit/types'

export type AccessorParams = {
  name: string
  defaultValue: unknown
  options?: {
    attribute?: boolean
    reflect?: boolean
  }
}

export const defindeAccessors = <T>(target: HTMLElement, name: string, value: T) => {
  Object.defineProperty(target, name, {
    get() {
      return value
    },
    set(newValue: T) {
      console.log({newValue})
      if (value === newValue) {
        return
      }
      value = newValue
    },
  })
}

export const withProps = <
  P extends Record<string, unknown>,
  T extends Constructor<HTMLElement> = Constructor<HTMLElement>,
>(
  superClass: T,
  props: AccessorParams[],
) => {
  const data = new Map(props.map((it) => [it.name, it]))
  return class WithProps extends superClass {
    static observedAttributes = props.filter((it) => it.options?.attribute).map((it) => it.name)
    constructor(...args: any[]) {
      super(...args)
      props.forEach((entry) => {
        defindeAccessors(this, entry.name, entry.defaultValue)
      })
    }
    attributeChangedCallback(prop: string, old: string, value: string) {
      console.log(prop, old, value)
      if (data.has(prop) && value !== old) {
        //@ts-ignore
        this[prop] = value
        console.log(prop)
      }
    }
  } as any as T & Constructor<P>
}
