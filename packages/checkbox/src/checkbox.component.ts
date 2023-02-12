import {
  definable,
  stylable,
  FormAssociated,
  html,
  css,
  withProps,
  AccessorParam,
  createTemplate,
  ILabled,
  labled,
} from '@ui-lit/utils'

import {PREFIX, checkboxCCSVarsMap} from './styles.map'
import {CheckboxEvents, TCheckboxType, TCkeckboxValue} from './types'

type ComponentProps = {
  value: TCkeckboxValue
  type: TCheckboxType
  checked: boolean
}

const template = createTemplate(html`
  <div role="checkbox" aria-checked="false" class="noselect" id="content">
    <svg
      class="checkmark"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.2276 7.56922L7.33116 12.2454L12.7864 3.33211" />
    </svg>
    <span class="control"></span>
  </div>
`)

const checkbox: AccessorParam<boolean> = {
  defaultValue: false,
  name: 'checked',
  options: {
    attribute: true,
    reflect: true,
  },
  get(target) {
    return (target as FormAssociated).value === 'on'
  },
  set: (target, old, newValue) => {
    if (old === newValue) {
      return false
    }
    ;(target as FormAssociated).value = newValue ? 'on' : 'off'
    return true
  },
}

const value: AccessorParam<TCkeckboxValue> = {
  defaultValue: 'off',
  name: 'value',
  options: {
    attribute: true,
    reflect: true,
  },
  set(target, old, value) {
    if (old === value) {
      return
    }
    const content = target.querySelector<HTMLDivElement>('#content')
    if (content) {
      content.ariaChecked = value === 'on' ? 'true' : 'false'
      content.ariaLabel = ((target as ILabled).labels[0].textContent || '').trim()
    }
    return true
  },
}

const type: AccessorParam<TCheckboxType> = {
  defaultValue: 'switcher',
  name: 'type',
  options: {
    attribute: true,
    reflect: true,
  },
}

const Base = labled(stylable(definable(FormAssociated), checkboxCCSVarsMap, PREFIX))
const PropsedBase = withProps<ComponentProps, typeof Base>(Base, [checkbox, type, value])

/**
 * # Lit checkbox-switcher
 *
 * ## Examples
 * ```html
 * <lit-checkbox type = "checkbox"></lit-checkbox>
 * ````
 * <lit-checkbox type = "checkbox"></lit-checkbox>
 *
 *
 * ```html
 * //Switcher is defaul type
 * <lit-checkbox></lit-checkbox>
 * ````
 * <lit-checkbox></lit-checkbox>
 *
 * @element lit-checkbox - UI Lit button element
 *
 * @prop {'on' | 'off'} - Value of checkbox/switcher
 *
 * @CSS
 * @cssprop [--lit-checkbox-checkbox-background=#fff] - Background color of checkbox
 * @cssprop [--lit-checkbox-checkbox-border=1px solid #999] - Border of checkbox
 * @cssprop [--lit-checkbox-checkmark-color=hsl(100, 65%, 5%)] - Checkmark color
 * @cssprop [--lit-checkbox-checkmark-shadow-hover=0 0 2px #999] - checkmark-shadow-hover
 * @cssprop [--lit-checkbox-switcher-control-background=#fff] - switcher-control-background
 * @cssprop [--lit-checkbox-switcher-control-shadow=1px 1px 2px rgba(0,0,0,0.6)] - switcher-control-shadow
 * @cssprop [--lit-checkbox-switcher-off-background=hsl(0, 65%, 50%)] - Disabled switcher color
 * @cssprop [--lit-checkbox-switcher-on-background=hsl(110, 65%, 50%)] - Enabled switcher color
 * @cssprop [--lit-checkbox-switcher-shadow=inset 1px 1px 2px rgba(0,0,0,0.7)] - Shadow of switcher circle
 * @CSS
 */

export class WCCheckbox extends PropsedBase {
  static styles = [
    ...PropsedBase.styles,
    css`
      .checkmark {
        stroke: ${this.cssVar('checkmark-color')};
        stroke-width: 2;
        width: 100%;
        height: 100%;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.1s ease-in;
      }
      :host([type='checkbox']) #content {
        background-color: ${this.cssVar('checkbox-background')};
        border: ${this.cssVar('checkbox-border')};
        cursor: pointer;
        height: var(--control-size);
        position: relative;
        width: var(--control-size);
      }
      :host([type='checkbox']) #content:hover {
        box-shadow: ${this.cssVar('checkmark-shadow-hover')};
      }
      :host([type='checkbox'][value='on']) .checkmark {
        visibility: visible;
        opacity: 1;
      }
      :host([type='checkbox'][value='off']) .checkmark {
        visibility: visible;
      }
      :host {
        contain: content;
        display: inline-block;
        padding: 3px;
        box-sizing: border-box;
        --control-size: 17px;
        --offset: calc((var(--switcher-height) - var(--control-size)) / 2);
        --switcher-height: 16px;
        --switcher-width: 34px;
      }

      :host([type='switcher']) #content {
        border-radius: var(--switcher-height);
        box-shadow: ${this.cssVar('switcher-shadow')};
        cursor: pointer;
        height: var(--switcher-height);
        position: relative;
        transition: background-color ease 0.2s;
        width: var(--switcher-width);
      }

      :host([type='switcher']) .control {
        background-color: ${this.cssVar('switcher-control-background')};
        border-radius: 100%;
        box-shadow: ${this.cssVar('switcher-control-shadow')};
        height: var(--control-size);
        left: var(--offset);
        position: absolute;
        top: -1px;
        transition: transform ease 0.2s;
        width: var(--control-size);
      }

      :host([type='switcher'][value='on']) #content {
        background-color: ${this.cssVar('switcher-on-background')};
      }

      :host([type='switcher']) #content {
        background-color: ${this.cssVar('switcher-off-background')};
      }

      :host([type='switcher'][value='on']) .control {
        transform: translateX(calc(var(--switcher-width) - var(--control-size) + 1px));
      }
    `,
  ]

  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
    this.attachInternals()
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.click)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.click)
  }

  toggle() {
    if (this.readonly || this.disabled) return
    this.checked = !this.checked
    //this.value = this.value === 'on' ? 'off' : 'on'
    this.notify()
  }
  click = () => {
    this.toggle()
  }

  /** @ignore*/
  notify() {
    this.dispatchEvent(
      new CustomEvent<CheckboxEvents['changed']>('changed', {
        bubbles: true,
        detail: {
          value: this.value,
          checked: this.checked,
        },
      }),
    )
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'wc-checkbox': WCCheckbox
  }
}
