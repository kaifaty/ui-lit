import type {Definable} from '../definable/index.js'
import type {Constructor} from '@ui-lit/types'
import {createcssMap} from '../../create-css-map.js'
import {adoptToElement} from '../../helpers/css-stylesheet.js'

type StringOnly<T> = T extends string ? T : never
type Data = Record<string, string | number | readonly [string | number, string]>

type Styleble<D extends Data, T extends Constructor<HTMLElement>> = T & {
  styles: StyleSheet[]
  readonly prefix: string
  readonly dataDefault: D
  readonly data: {
    getVar: (name: StringOnly<keyof D>) => string
    getKey: (name: StringOnly<keyof D>) => string
  }
  cssVar(name: StringOnly<keyof D>): string
  cssKey(name: StringOnly<keyof D>): string
}

export const stylable = <D extends Data, T extends Definable<Constructor<HTMLElement>>>(
  litEl: T,
  data: D,
  prefix: string,
): Styleble<D, T> => {
  return class LitStylable extends litEl {
    static styles: StyleSheet[] = []
    static prefix: string = prefix
    static get dataDefault() {
      return data
    }
    static readonly data = createcssMap(data, this.prefix)

    static cssVar(name: StringOnly<keyof D>) {
      return this.data.getVar(name)
    }

    static cssKey(name: StringOnly<keyof D>) {
      return this.data.getKey(name)
    }
    shadowRoot = this.attachShadow({mode: 'open'})
    constructor(...args: any) {
      super(...args)
      //@ts-ignore
      const styles = this.constructor.styles as string[] | string

      adoptToElement(this, Array.isArray(styles) ? styles : [styles])
    }
  }
}
