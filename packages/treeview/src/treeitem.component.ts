import {createTemplate, definable, css, stylable, noselect} from '@ui-wc/utils'

import {treeviewStyleMap, TREEVIEW_PREFIX} from './styles.map'

const template = createTemplate(`<slot></slot>`)

const BaseTreeitem = stylable(definable(HTMLElement), treeviewStyleMap, TREEVIEW_PREFIX)

/**
 * @element wc-tree-item
 *
 * @attr {string | null} [value=null] = value of tree item
 * @attr {string} [selected=null] = is tree item selected
 */
export class WcTreeItem extends BaseTreeitem {
  static styles = [
    noselect,
    css`
      :host {
        display: block;
        cursor: pointer;
        font-size: 1.4rem;
        line-height: 1.5rem;
        color: ${this.cssVar('color')};
        padding: 6px 12px;
      }
      :host(:hover) {
        background-color: ${this.cssVar('background-color-hover')};
      }
      :host([selected]) {
        background-color: ${this.cssVar('background-color-selected')};
        color: ${this.cssVar('color-selected')};
      }
    `,
  ]
  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
    this.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('changed', {
          detail: this.getAttribute('value'),
          bubbles: true,
          composed: true,
        }),
      )
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-tree-item': WcTreeItem
  }
  interface HTMLElementEventMap {
    treeitemSelection: CustomEvent<boolean>
  }
}
