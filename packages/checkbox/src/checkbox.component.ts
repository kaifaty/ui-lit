import {html, svg, css} from 'lit'
import {property} from 'lit/decorators.js'

import {definable, stylable, LitFormAssoc, noselect, labled} from '@ui-lit/utils'

import {PREFIX, checkboxCCSVarsMap} from './styles.map'
import {CheckboxEvents, TCheckboxType, TCkeckboxValue} from './types'

const checkmark = svg`
<svg class = "checkmark" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.2276 7.56922L7.33116 12.2454L12.7864 3.33211" />
</svg>`

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

export class LitCheckbox extends labled(stylable(definable(LitFormAssoc), checkboxCCSVarsMap, PREFIX)) {
  static styles = [
    noselect,
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
        --control-size: 16px;
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
        top: 0;
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
        transform: translateX(calc(var(--switcher-width) - var(--control-size)));
      }
    `,
  ]

  @property({type: String, reflect: true}) type: TCheckboxType = 'switcher'

  static get properties() {
    return {
      ...super.properties,
      value: {type: String},
      name: {type: String},
      checked: {type: Boolean},
    }
  }
  get checked() {
    return this.value === 'on'
  }
  set checked(value: boolean) {
    this.value = value ? 'on' : 'off'
  }

  /** @ignore */
  private _value: TCkeckboxValue = 'off'

  /**
   * @prop {'on' | 'off'} - Value of checkbox/switcher
   */
  get value() {
    return this._value
  }
  set value(value: TCkeckboxValue) {
    const oldValue = this._value
    if (oldValue === value) return
    this._value = value
    this.setAttribute('value', value)
    this.requestUpdate('value', oldValue)
  }

  toggle() {
    if (this.readonly || this.disabled) return
    this.checked = !this.checked
    this.notify()
  }
  click() {
    this.toggle()
  }

  /** @ignore*/
  render() {
    return html` <div
      role="checkbox"
      aria-checked="${this.checked}"
      aria-label="${(this.labels[0]?.textContent || '').trim()}"
      class="noselect"
      id="content"
      @click="${this.click}"
    >
      ${checkmark}<span class="control"></span>
    </div>`
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
    'lit-checkbox': LitCheckbox
  }
}
