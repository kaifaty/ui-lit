import {definable, createTemplate, stylable, withProps, html, AccessorParam, css} from '@ui-wc/utils'
import {treeviewStyleMap, TREEVIEW_PREFIX} from './styles.map'
import {WcTreeItem} from './treeitem.component'
import {WcTreeSubview} from './treesubview.component'

const update = (target: HTMLElement, value: string) => {
  target.querySelectorAll('wc-tree-item')?.forEach((it) => {
    it.removeAttribute('selected')
  })
  target.querySelectorAll<WcTreeItem>(`wc-tree-item[value="${value}"]`)?.forEach((it) => {
    it.setAttribute('selected', '')
  })
}

const value: AccessorParam<string> = {
  name: 'value',
  defaultValue: '',
  set(target, _, value) {
    update(target, value)
    return true
  },
  options: {
    attribute: true,
    reflect: true,
  },
}
const Base = stylable(definable(HTMLElement), treeviewStyleMap, TREEVIEW_PREFIX)

const BaseTreeview = withProps<{value: string}, typeof Base>(Base, [value])

const template = createTemplate(html`<slot></slot>`)

export class WcTreeview extends BaseTreeview {
  static define() {
    WcTreeItem.define()
    WcTreeSubview.define()
    super.define()
  }
  static styles = [
    css`
      :host {
        display: block;
        font-size: ${this.cssVar('font-size')};
        color: ${this.cssVar('color')};
      }
    `,
  ]
  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
    this.addEventListener('changed', ((e: CustomEvent<string>) => {
      this.value = e.detail
    }) as EventListener)
    let t = 0

    this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => {
      clearInterval(t)
      t = window.setTimeout(() => {
        update(this, this.value)
      })
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-treeview': WcTreeview
  }
}
