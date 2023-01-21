import {createcssMap, pascal2kebabCase, StringOnly} from '@kai/utils'
import type {CSSResult, LitElement} from 'lit'

import type {Definable} from '../definable'
import {Constructor} from '../types'

type Data = Record<string, string | number | readonly [string | number, string]>

type Styleble<D extends Data, T extends Constructor<LitElement>> = T & {
  readonly prefix: string
  readonly dataDefault: D
  readonly data: {
    getVar: (name: StringOnly<keyof D>) => CSSResult
    getKey: (name: StringOnly<keyof D>) => CSSResult
  }
  cssVar(name: StringOnly<keyof D>): CSSResult
  cssKey(name: StringOnly<keyof D>): CSSResult
}


export const stylable = <D extends Data, T extends Definable<Constructor<LitElement>>>(litEl: T, data: D, prefix: string): Styleble<D, T> => {
  return class LitStylable extends litEl{
    static prefix: string = prefix
    static get dataDefault(){
      return data
    }
    static readonly data = createcssMap(data, this.prefix)

    static cssVar(name: StringOnly<keyof D>){

      return this.data.getVar(name)
    }

    static cssKey(name: StringOnly<keyof D>){
      return this.data.getKey(name)
    }
  }
}