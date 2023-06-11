import {
  stylable,
  HoverController,
  withControllers,
  css,
  AccessorParam,
  withProps,
  html,
  createTemplate,
  definable,
} from '@ui-wc/utils'

import {SELECT_PREFIX, selectCSSVarsMap} from '../styles.map'

type ComponentProps = {
  value: string
  selected: boolean
}

export const Base = withControllers(stylable(definable(HTMLElement), selectCSSVarsMap, SELECT_PREFIX))

const value: AccessorParam<string> = {
  defaultValue: '',
  name: 'value',
  set(target, old, value) {
    if (old === value) {
      return false
    }
    queueMicrotask(() => {
      target.dispatchEvent(new CustomEvent<string>('optionValueChanged'))
    })
    return true
  },
  options: {
    attribute: true,
    reflect: true,
  },
}
const selected: AccessorParam<boolean> = {
  defaultValue: false,
  name: 'selected',
  set(_t, old, value) {
    const target = _t as WcOption
    if (old === value) {
      return false
    }
    if (value) {
      queueMicrotask(() => {
        target.dispatchEvent(new CustomEvent<string>('optionSelected', {detail: target.value, composed: true, bubbles: true}))
      })
    }
    return true
  },
  options: {
    attribute: true,
    reflect: true,
  },
}

export const PropsedBase = withProps<ComponentProps, typeof Base>(Base, [value, selected])

const template = createTemplate(html`<slot></slot>`)

export class WcOption extends PropsedBase {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
        min-width: 100px;
        height: 40px;
        cursor: pointer;
        padding: 0 10px;
        background-color: ${this.cssVar('option-background')};
      }
      :host([hover]) {
        background-color: ${this.cssVar('option-background-hover')};
      }
      :host([selected]) {
        background-color: ${this.cssVar('option-background-selected')};
      }
    `,
  ]

  _hoverController = new HoverController(this)
  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
    this.addEventListener('click', () => {
      this.selected = true
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-option': WcOption
  }
  interface HTMLElementEventMap {}
}
