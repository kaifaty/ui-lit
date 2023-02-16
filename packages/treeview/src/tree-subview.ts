import {definable, createTemplate, html, AccessorParam, css, withProps, stylable} from '@ui-wc/utils'

import {TREEVIEW_PREFIX, treeviewStyleMap} from './styles.map'

const template = createTemplate(html`
  <div id="label">
    <wc-icon></wc-icon>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10L12 15L17 10H7Z" />
    </svg>
    <span id="label-text"></span>
  </div>
  <div class="content">
    <slot></slot>
  </div>
`)

const label: AccessorParam<string> = {
  name: 'label',
  defaultValue: '',
  options: {
    attribute: true,
  },
  set(target, _, value) {
    target.querySelector('#label-text').textContent = value
    return true
  },
}
const opened: AccessorParam<boolean> = {
  name: 'opened',
  defaultValue: true,
  options: {
    attribute: true,
    reflect: true,
  },
}

type Props = {
  opened: boolean
  label: string
}
const Basic = stylable(definable(HTMLElement), treeviewStyleMap, TREEVIEW_PREFIX)
const BaseTreesubview = withProps<Props, typeof Basic>(Basic, [label, opened])

export class LitTreeSubview extends BaseTreesubview {
  static styles = [
    css`
      :host {
        display: block;
      }
      .label {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 5px 10px;
      }
      .content {
        margin-left: 25px;
      }
      lit-icon {
        margin-right: 5px;
      }
      :host(:not([opened])) .content {
        display: none;
      }
      :host([selected]) .label {
        color: ${this.cssVar('item-color-selected')};
      }
    `,
  ]
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.append(template.content.cloneNode(true))
  }
  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('subviewSelected', this._onSelected as EventListener)
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('subviewSelected', this._onSelected as EventListener)
  }
  private _onSelected(e: CustomEvent) {
    this.updateSelection(e.detail)
  }
  updateSelection(isSelected: boolean) {
    if (this.hasAttribute('selected') !== isSelected) {
      isSelected ? this.setAttribute('selected', '') : this.removeAttribute('selected')
    }
  }
  private _toggle() {
    this.opened = !this.opened
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-tree-subview': LitTreeSubview
  }
}
