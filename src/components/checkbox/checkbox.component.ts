import {html, svg} from 'lit'
import {property} from 'lit/decorators.js'

import {definable, labled} from '../../mixins'
import {LitFormAssoc} from '../../nesting'
import {noselect} from '../../styles/noselect'

import {checkboxStyles, switcherStyles} from './styles'
import {PREFIX} from './styles.map'
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
 * #CSS
 * @cssprop [--lit-checkbox-checkbox-background=#fff] - Background color of checkbox
 * @cssprop [--lit-checkbox-checkbox-border=1px solid #999] - Border of checkbox
 * @cssprop [--lit-checkbox-checkmark-color=hsl(100, 65%, 5%)] - Checkmark color
 * @cssprop [--lit-checkbox-checkmark-shadow-hover=0 0 2px #999] - checkmark-shadow-hover
 * @cssprop [--lit-checkbox-switcher-control-background=#fff] - switcher-control-background
 * @cssprop [--lit-checkbox-switcher-control-shadow=1px 1px 2px rgba(0,0,0,0.6)] - switcher-control-shadow
 * @cssprop [--lit-checkbox-switcher-off-background=hsl(0, 65%, 50%)] - Disabled switcher color
 * @cssprop [--lit-checkbox-switcher-on-background=hsl(110, 65%, 50%)] - Enabled switcher color
 * @cssprop [--lit-checkbox-switcher-shadow=inset 1px 1px 2px rgba(0,0,0,0.7)] - Shadow of switcher circle
 * #CSS
 */

export class LitCheckbox extends labled(definable(LitFormAssoc)) {
  static styles = [noselect, checkboxStyles, switcherStyles]

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
