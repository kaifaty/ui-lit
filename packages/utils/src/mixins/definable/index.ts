import {pascal2kebabCase} from '@kaifat/utils'

import type {Constructor} from '@ui-wc/types'

export type Definable<T extends Constructor<HTMLElement>> = T & {
  define(name?: string): void
}

export const definable = <T extends Constructor<HTMLElement>>(litEl: T): Definable<T> => {
  return class LitDefinable extends litEl {
    static define(name: string = pascal2kebabCase(this.name)) {
      if (!customElements.get(name)) {
        customElements.define(name, this)
      }
    }
  }
}
