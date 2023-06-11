import {WcCheckbox} from '@ui-wc/checkbox'
import {WcTreeview} from '@ui-wc/treeview'
import {WcHeader} from '@ui-wc/header'
import {WcPanel} from '@ui-wc/panel'
import {WcIcon} from '@ui-wc/icon'

import {css, html, createTemplate} from '@ui-wc/utils'

import {BaseApiViewer, Categories, CATEGORIES} from './base.component'

const template = createTemplate(html`
  <div class="wrapper">
    <wc-treeview id="names"></wc-treeview>
    <section id="content">
      <wc-header level="4">Preview: <span id="selectedName">[Not selected]</span></wc-header>
      <wc-panel id="preview"></wc-panel>
      <ul id="categories">
        ${CATEGORIES.map((item) => {
          return html`<li class="cat" data-value="${item[0]}">${item[1]}</li>`
        }).join('')}
      </ul>
      <div id="category-content"></div>
    </section>
  </div>
`)
type ChangedInfo = {
  type: string
  name: string
  hasProp: boolean
}
const getChangedInfo = (target: HTMLElement): ChangedInfo => {
  return {
    type: target.dataset.type,
    name: target.dataset.name,
    hasProp: target.dataset.hasProp === 'true',
  }
}

const slotChanged = Symbol()
const stringPropChanged = Symbol()
const boolenPropChanged = Symbol()
const onChanger = Symbol()
const initEvents = Symbol()
const cssPropChanged = Symbol()

export class WcApiViewer extends BaseApiViewer {
  static define() {
    WcCheckbox.define()
    WcTreeview.define()
    WcHeader.define()
    WcPanel.define()
    WcIcon.define()
    super.define()
  }
  static styles = [
    css`
      :host {
        display: block;
      }
      .wrapper {
        display: grid;
        grid-template-columns: 180px auto;
        gap: 30px;
      }
      .slotwrapper {
        display: flex;
        align-items: center;
      }
      #preview {
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #content wc-header {
        margin-top: 0;
      }
      #categories {
        display: grid;
        grid-auto-flow: column;
        gap: 10px;
        margin: 0;
        padding: 0;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        color: #666;
      }
      th {
        border-bottom: 1px solid #555;
        padding: 24px 12px;
      }
      tr:nth-child(2) td {
        padding: 24px 12px 12px 12px;
      }
      td {
        padding: 10px 12px;
      }
      th.left {
        text-align: left;
      }
      input,
      select {
        min-width: 120px;
      }
      #category-content td {
        min-width: 80px;
      }

      #category-content .description {
        width: 100%;
      }
      .highlight {
        color: #eee;
        padding: 4px 6px;
        background-color: #222;
        border-radius: 5px;
      }
      li {
        list-style: none;
        cursor: pointer;
        padding: 20px 12px;
        margin: 0;
      }
      .cat[selected] {
        color: hsl(310, 80%, 60%);
      }
    `,
  ]
  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
    this[initEvents]()
  }
  [initEvents]() {
    /**
     * Choose of component
     */
    this.addEventListener('changed', ((e: CustomEvent<string>) => {
      this.selectedName = e.detail
    }) as EventListener)

    /**
     * Choose of category of component info
     */
    this.shadowRoot.querySelector('.wrapper').addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('cat')) {
        this.selectedCategory = target.dataset.value as Categories
      }
    })

    /**
     * Watching of props change
     */
    const content = this.shadowRoot.querySelector('#category-content')
    content.addEventListener('changed', this[onChanger].bind(this))
    content.addEventListener('change', this[onChanger].bind(this))
  }

  /** @ignore */
  [onChanger](e: Event | CustomEvent) {
    if (!this.previewElement) {
      return
    }
    const target = e.target as HTMLElement
    if (!target.classList.contains('changer')) {
      return
    }

    const data = getChangedInfo(target)
    if (data.type === 'boolean') {
      this[boolenPropChanged](data, (e as CustomEvent).detail.checked)
    }
    if (data.type === 'string') {
      this[stringPropChanged](data, (target as HTMLInputElement).value)
    }
    if (data.type === 'slot') {
      this[slotChanged](data.name, (target as HTMLInputElement).value)
    }
    if (data.type === 'css') {
      this[cssPropChanged](data.name, (target as HTMLInputElement).value)
    }
  }

  /** @ignore */
  [cssPropChanged](name: string, value: string) {
    this.previewElement.style.setProperty(name, value)
  }

  /**  @ignore */
  [slotChanged](name: string, value: string) {
    if (!name) {
      this.previewElement.innerHTML = value
    } else {
      this.previewElement.querySelector(`[slot="${name}"]`)?.remove()
      this.previewElement.insertAdjacentHTML('afterbegin', html`<span class="slotwrapper" slot="${name}">${value}</span>`)
    }
  }

  /**  @ignore */
  [stringPropChanged]({hasProp, name}: ChangedInfo, value: string) {
    if (!hasProp) {
      this.previewElement.setAttribute(name, value)
    } else {
      ;(this.parentElement as any)[name] = value
    }
  }

  /**  @ignore */
  [boolenPropChanged]({hasProp, name}: ChangedInfo, value: boolean) {
    if (!hasProp) {
      if (value) {
        this.previewElement.setAttribute(name, '')
      } else {
        this.previewElement.removeAttribute(name)
      }
      return
    }
    ;(this.previewElement as any)[name] = value
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-api-viewer': WcApiViewer
  }
}
