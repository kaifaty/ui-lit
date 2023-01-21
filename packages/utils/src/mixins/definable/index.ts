import {pascal2kebabCase} from '@kaifat/utils'
import type {LitElement} from 'lit'

import {Constructor} from '../types.js'

export type Definable<T extends Constructor<LitElement>> = T & {
  define(name?: string): void
}

export const definable = <T extends Constructor<LitElement>>(litEl: T): Definable<T> => {
  return class LitDefinable extends litEl {
    static define(name: string = pascal2kebabCase(this.name)) {
      if (!customElements.get(name)) {
        customElements.define(name, this)
      }
    }
  }
}
