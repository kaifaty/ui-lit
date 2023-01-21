import {pascal2kebabCase} from '@kai/utils'
import type {Declaration, JavaScriptModule, Package} from 'custom-elements-manifest/schema'
import {css, html, LitElement, nothing, PropertyValueMap} from 'lit'
import {createRef, ref} from 'lit-html/directives/ref'
import {property, state} from 'lit/decorators'
import {html as statichtml, unsafeStatic} from 'lit/static-html'

import {definable} from '../../mixins/definable'
import {scrollbar} from '../../styles'
import {CheckboxEvents} from '../checkbox/types'
import {LitDescription} from '../description'
import {LitMarkdown} from '../markdown'
import {LitTabs} from '../tabs'
import {LitTextfield} from '../textfield'
import {LitTreeItem, LitTreeView} from '../treeview'


LitTreeView.define()
LitTreeItem.define()
LitDescription.define()
LitTextfield.define()
LitMarkdown.define()
LitTabs.define()


type Key = keyof typeof values

const values = {
  'doc': 'Doc',
  'attrs': 'Attributes',
  'props': 'Properties',
  'cssprops': 'CSS Properties',
  'events': 'Events',
  'slots': 'Slots',
} as const

const setTargetValue = <T extends LitElement | undefined>(targetEl: () => T, key: string, value: unknown) => {
  const target = targetEl() as any
  if(target && target[key] !== undefined){
    target[key] = value
  }
}

const createTypedComponent = <T extends LitElement | undefined>(
  type: string, 
  defaulValue: string | undefined, 
  name: string,
  docElement: () => T
) => {
  if(defaulValue === undefined && !(type.includes('null') || type.includes('undefined'))){
    return 'readonly'
  }
  if(type.includes('string')){
    const el = document.createElement('lit-textfield')
    el.value = defaulValue || ''
    el.addEventListener('changed', (e: CustomEvent<string>) => {
      setTargetValue(docElement, name, e.detail)
    })
    return el
  }

  if(type === 'boolean'){
    const el = document.createElement('lit-checkbox')
    el.checked = defaulValue === 'true'
    el.addEventListener('changed', (e: CustomEvent<CheckboxEvents['changed']>) => {
      setTargetValue(docElement, name, e.detail.checked)
    })
    return el
  }
  return defaulValue
}

const getDeclarations = (data: Package | null) => {
  const res: Declaration[] = []
  data?.modules?.forEach(item => item.declarations?.forEach(item => res.push(item)))
  return res
}

export class LitWcViewer extends definable(LitElement){
  static styles = [
    scrollbar,
    css`
  :host{
    display: block;
    width: 100%;
  }
  table{
    width: 100%;
  }
  lit-tree-item{
    font-size: 1.2em;
    font-weight: bold;
  }
  lit-description{
    padding-left: 15px;
    font-size: 0.8em;
  }
  .name{
    font-size: 1em;
    padding: 10px 0;
  }
  .wrapper{
    display: flex;
    width: 100%;
  }
  nav{
    padding-right: 50px;
    width: 180px;
  }
  main{
    flex: 1 1 auto;
    width: calc(100% - 230px);
    display: grid;
    gap: 3em;
  }
  .preview{
    padding: 40px;
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  `
  ]
  @property({type: String, reflect: true, attribute: true}) src = ''
  @state() tab: Key = 'props'
  @state() data: Package | null = null
  ref = createRef<LitElement>()

  @state() changedCSSProps: Record<string, string> = {}
  @state() selectedTagName = ''

  declarations:  Declaration[] = []
  declarationsMap: Record<string, Declaration> = {}

  get selectedDeclaration(){
    return this.declarationsMap[this.selectedTagName]
  }
  get description(){
    return this.selectedDeclaration?.description ?? nothing
  }
  async #loadFile(){
    const response = await fetch(this.src)
    this.data = await response.json()
  }

  connectedCallback(){
    super.connectedCallback()
    this.#loadFile()
  }
  willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    if(_changedProperties.has('data')){
      this.declarations = getDeclarations(this.data)
      this.declarationsMap = this.declarations.reduce<Record<string, Declaration>>((acc, v) => {
        acc[pascal2kebabCase(v.name)] = v
        return acc
      }, {})
    }
  }
  
  #changedPage(e: CustomEvent<Key>){
    this.selectedTagName = e.detail
  }

  #changedTab(e: CustomEvent<Key>){
    this.tab = e.detail
  }

  #props(){
    console.log(this.selectedDeclaration)
    const data = []
    return html`
    <table>
      ${data.map(item => {
        return html`<tr>
          <td>${item.name}</td>
          <td>${createTypedComponent(item.type, item.default, item.name, () => this.ref?.value)}</td>
          <td>${item.type}</td>
        </tr>`
      })}
    </table>
    `
  }

  #cssprops(){
    const data =  [] // this.data?.tags[0]?.cssProperties ??
    return html`<table>
      ${data.map(item => {
      return html`<tr>
        <td>
          <div class = "name">${item.name}</div>
          <lit-description>${item.description}</lit-description>
        </td>
        <td>
          <lit-textfield 
              @changed = "${(e: CustomEvent<string>) => this.#cssChanged(e.detail, item.name)}" 
              value = "${item.default.replace(/(")/g, '')}"></lit-textfield></td>
      </tr>`
    })}
    </table>`
  }
  #cssStyles(){
    return Object.keys(this.changedCSSProps).map(key => {
      return `${key}: ${this.changedCSSProps[key]}; `
    })
  }
  #cssChanged(value: string, name: string){
    this.changedCSSProps = {
      ...this.changedCSSProps,
      [name]: value
    }
  }

  #contentTemplate(){
    let content
    if(this.tab === 'props'){
      content = this.#props()
    }
    if(this.tab === 'cssprops'){
      content = this.#cssprops()
    }
    if(this.tab === 'doc'){
      return html`<lit-markdown .text = "${this.description as string}"></lit-markdown>`
    }
    return html`
    <div class = "preview">${this.#tagTemplate()}</div>
    <div>${content}</div>
    `
  }
  #tagTemplate(){
    if(!this.selectedTagName){
      return 'Tag not selected'
    }
    return statichtml`<${unsafeStatic(this.selectedTagName)} ${ref(this.ref)}>${this.selectedTagName}</${unsafeStatic(this.selectedTagName)}>`
  }

  render() {
    const declarations = this.declarations
    return html`
    <div class = "wrapper">
      <style>
        :host{
          ${this.#cssStyles()}
        }
      </style>
      <nav>
        <lit-tree-view .value = "${this.selectedTagName}" @changed = "${this.#changedPage}">
          ${declarations.map(key => {
            const value = pascal2kebabCase(key.name)
            return html`<lit-tree-item .value = "${value}">${pascal2kebabCase(value)}</lit-tree-item>`
          })}
        </lit-tree-view>  
      </nav>
      <main>
        <lit-tabs value = "${this.tab}" @changed = "${this.#changedTab}">
            ${Object.keys(values).map(key => {
              return html`<lit-tab value = "${key}">${values[key as Key]}</lit-tab>`
            })}
        </lit-tabs>
        <div> 
          ${this.#contentTemplate()}
        </div>
        
      </main>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-wc-viewer': LitWcViewer;
  }
}
