import type {Definable} from '../definable/index'
import type {Constructor} from '@ui-wc/types'
import {createcssMap} from '../../create-css-map'
import {adoptToElement, WCStyleSheet} from '../../helpers/css-stylesheet'

type StringOnly<T> = T extends string ? T : never
type Data = Record<string, string | number | readonly [string | number, string]>

type MaybeStyled = {
  styles?: WCStyleSheet[]
}

type Styleble<D extends Data, T extends Constructor<HTMLElement>> = T & {
  styles: WCStyleSheet[]
  readonly prefix: string
  readonly dataDefault: D
  readonly data: {
    getVar: (name: StringOnly<keyof D>) => string
    getKey: (name: StringOnly<keyof D>) => string
  }
  cssVar(name: StringOnly<keyof D>): string
  cssKey(name: StringOnly<keyof D>): string
}

export const stylable = <D extends Data, T extends Definable<Constructor<HTMLElement>> & MaybeStyled>(
  Element: T,
  data: D,
  prefix: string,
): Styleble<D, T> => {
  return class LitStylable extends Element {
    static styles: WCStyleSheet[] = [...(Element.styles || [])]
    static prefix: string = prefix
    static get dataDefault() {
      return data
    }
    static readonly data = createcssMap(data, this.prefix)

    static cssVar(name: StringOnly<keyof D>, defaultValue?: string) {
      return this.data.getVar(name, defaultValue)
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
