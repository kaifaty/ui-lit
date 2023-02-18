import type {Declaration, JavaScriptModule, Package} from 'custom-elements-manifest/schema'

import {WcCheckbox} from '@ui-wc/checkbox'
import {WcTreeview} from '@ui-wc/treeview'
import {WcHeader} from '@ui-wc/header'

import {withProps, definable, createGetParams, css, html, createTemplate, stylable} from '@ui-wc/utils'
import {getDeclarations, loadCEMJson} from './utils/cem'

type Props = {
  isLoading: boolean
  data: Package | null
  selectedName: string
  src: string | null
}

type ApiViewerElement = HTMLElement & Props

const formatName = (v: string) => {
  return v.replace('Wc', '')
}
const getParam = createGetParams({attribute: true, reflect: true})
const getStateProp = createGetParams({})

const isLoading = getStateProp<boolean>('isLoading', false)
const data = getStateProp<Package | null>('data', null)

const STORAGE_KEY = 'wc-apiviewer-'
const save2storage = (src: string, data: Package) => {
  localStorage.setItem(STORAGE_KEY + src, JSON.stringify(data))
}
const restore = (src: string) => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY + src)) as Package
  } catch {
    return null
  }
}
const lastName = localStorage.getItem(STORAGE_KEY + 'name')
const onDataChange = (target: ApiViewerElement, data: Package) => {
  const declarations = getDeclarations(data)
  renderNames(target, declarations)
}

const renderNames = (target: ApiViewerElement, data: Declaration[]) => {
  target.shadowRoot.querySelector('#names').innerHTML = data
    .map((item) => {
      return html`<wc-tree-item value="${item.name}">${formatName(item.name)}</wc-tree-item>`
    })
    .join('')
}
const selectedName = getParam<string>('selectedName', lastName, {
  set(target, _, value) {
    if (value) {
      localStorage.setItem(STORAGE_KEY + 'name', value)
      queueMicrotask(() => {
        target.shadowRoot.querySelector('#selectedName').textContent = formatName(value)
      })
    }

    return true
  },
})

const srcParam = getParam<null | string>('src', null, {
  set(target, _, value) {
    const t = target as ApiViewerElement
    t.isLoading = true
    const restored = restore(value)
    if (restored) {
      queueMicrotask(() => {
        onDataChange(t, restored)
        t.shadowRoot.querySelector('wc-treeview').value = lastName
      })
    }

    loadCEMJson(value).then((res) => {
      console.log(res)
      t.data = res
      if (res) {
        onDataChange(t, res)
        save2storage(value, res)
      }
      t.isLoading = false
    })
    return true
  },
})

const Base = stylable(definable(HTMLElement), {}, '--wc-apiviewer-')
const BaseApiViewer = withProps<Props, typeof Base>(Base, [isLoading, selectedName, data, srcParam])

const template = createTemplate(html`
  <div class="wrapper">
    <wc-treeview id="names"></wc-treeview>
    <section id="content">
      <wc-header level="4">Preview: <span id="selectedName">[Not selected]</span></wc-header>
      <div class="preview"></div>
    </section>
  </div>
`)

export class WcApiViewer extends BaseApiViewer {
  static define() {
    WcCheckbox.define()
    WcTreeview.define()
    WcHeader.define()
    super.define()
  }
  static styles = [
    css`
      :host {
      }
      .wrapper {
        display: grid;
        grid-template-columns: 180px auto;
        gap: 30px;
      }
      .preview {
        height: 250px;
        background: #fff;
      }
      #content wc-header {
        margin-top: 0;
      }
    `,
  ]
  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
    this.addEventListener('changed', ((e: CustomEvent<string>) => {
      this.selectedName = e.detail
    }) as EventListener)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-api-viewer': WcApiViewer
  }
}
