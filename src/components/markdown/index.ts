import {html, LitElement, PropertyValueMap} from 'lit'
import {property, state} from 'lit/decorators'
import {cache} from 'lit/directives/cache'
import {unsafeHTML} from 'lit/directives/unsafe-html'
import type MarkdownIt from 'markdown-it'

import {definable} from '../../mixins/definable'
import {Constructor} from '../../mixins/types'

import {androidStyles, base} from './styles'

let md: MarkdownIt
const cacheMap = new Map<string, string>()

/**
 * @element lit-markdown - Markdowm text
 * 
 */
export class LitMarkdown extends definable(LitElement){
  static styles = [
    androidStyles, base,
  ]
  @property({type: String, attribute: true, reflect: true}) codeTheme: 'android' | 'default' = 'android'
  @property({type: String, attribute: true, reflect: true}) src?: string
  @property({type: String, attribute: true}) text?: string
  
  @state() content = ''

  /** @ignore */
  #parseMarkdown(text: string){

    if(!md){
      console.error('Libs not loaded')
      return 
    }
    
    this.content = md.render(text)

    if(this.src){
      cacheMap.set(this.src, this.content)
    }
  }

  /** @ignore */
  async #loadLibs(){
    if(md) return
    const [MD, hljs] = await Promise.all([
      import ('markdown-it'),
      (await import ('highlight.js')).default,
    ])
    
    md = new (MD as unknown as Constructor<MarkdownIt>)({
      breaks: true,
      html: true,
      linkify: true,
      typographer: true,
      langPrefix: 'code language-',
      highlight: (str: string, lang: string) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            const pre = hljs.highlight(str, {language: lang}).value
            const values = pre.split('\n')
            let result = ''
            for(let i = 0; i < values.length; i ++){
              if(i === values.length - 1){
                break
              }
              result += `<span class = "line-counter">${(i + 1)}</span>` + values[i] + '\n'
            }
            return result + `<span class = "lang-name">${lang}</span>`
          } catch (e) {
            console.error(e)
          }
        }
        return ''
      }
    })
  }

  /** @ignore */
  async #renderOnConnect(){
    if(this.src){
      const conntent = cacheMap.get(this.src || '')
      if(conntent){
        this.content = conntent
        return 
      }
    }

    await this.#loadLibs()

    if(this.src){
      fetch(this.src)
        .then(r => r.text())
        .then(r => this.#parseMarkdown(r))
        .catch(console.error)
    }
  }

  connectedCallback(){
    super.connectedCallback()
    this.#renderOnConnect()
  }

  willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>){
    if(_changedProperties.has('text')){
      if(!this.text){
        this.content = ''
      }
      else{
        this.#parseMarkdown(this.text)
      }
    }
  }

  /** @ignore */
  render() {
    return html`<div>${unsafeHTML(this.content)}</div>`
  }

}


declare global {
  interface HTMLElementTagNameMap {
    'lit-markdown': LitMarkdown;
  }
}
