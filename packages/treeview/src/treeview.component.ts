import {definable, createTemplate, stylable, withProps, AccessorParam, css} from '@ui-wc/utils'

const value: AccessorParam<string> = {
  name: 'value',
  defaultValue: '',
  set(target, _, value) {
    queueMicrotask(() => {
      target.querySelectorAll('lit-tree-subview').forEach((it) => {
        it.updateSelection(false)
      })
      target.querySelectorAll('lit-tree-item').forEach((it) => {
        it.updateSelection(value)
      })
    })
    return true
  },
}
const BaseTreeview = withProps<{value: string}>(stylable(definable(HTMLElement), {}, ''), [value])

const template = createTemplate(`<slot></slot>`)

const onChanged = Symbol()

export class WcTreeview extends BaseTreeview {
  static styles = [
    css`
      :host {
        display: block;
        font-size: var(--lit-treeview-font-size, 14px);
        color: var(--lit-treeitem-color, inherit);
        --icon-color: var(--lit-treeitem-color, inherit);
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
    this.addEventListener('changed', this[onChanged] as EventListener)
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('changed', this[onChanged] as EventListener)
  }
  [onChanged] = (e: CustomEvent<string>) => {
    this.value = e.detail
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-tree-view': WcTreeview
  }
}
