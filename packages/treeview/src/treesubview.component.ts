import {definable, createTemplate, html, AccessorParam, css, withProps, stylable} from '@ui-wc/utils'
import {WcIcon} from '@ui-wc/icon'
import {TREEVIEW_PREFIX, treeviewStyleMap} from './styles.map'

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

const template = createTemplate(html`
  <div id="label">
    <wc-icon icon="dropdown"></wc-icon>
    <span id="label-text"></span>
  </div>
  <div class="content">
    <slot></slot>
  </div>
`)

export class WcTreeSubview extends BaseTreesubview {
  static define() {
    WcIcon.define()
    super.define()
  }
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
      wc-icon {
        margin-right: 5px;
      }
      :host(:not([opened])) .content {
        display: none;
      }
      :host([selected]) .label {
        color: ${this.cssVar('color-selected')};
      }
    `,
  ]
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.append(template.content.cloneNode(true))
    this.addEventListener('treeitemSelection', ((e: CustomEvent<boolean>) => {
      if (e.detail) {
        this.setAttribute('selected', '')
      } else {
        this.removeAttribute('selected')
      }
    }) as EventListener)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-tree-subview': WcTreeSubview
  }
}
