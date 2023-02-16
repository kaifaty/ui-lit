import {mobileAndTabletCheck} from '@kaifat/utils'
import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import {definable, focusable, stylable} from '@ui-wc/utils'
import {LitButton} from '@ui-wc/button'
import type {LitSelect} from '../select/select.component'
import {PREFIX, selectCSSVars} from '../styles.map'

const options: [LitOption, string][] = []

/*
setInterval(() => {
  options.forEach((item) => {
    if (item[1] !== item[0].textContent) {
      item[0].notify()
      item[1] = item[0].textContent || ''
    }
  })
}, 600)
*/

@customElement('lit-option')
export class LitOption extends focusable(stylable(definable(LitElement), selectCSSVars, PREFIX)) {
  static styles = css`
    :host {
      display: block;
      ${LitButton.cssKey('color')}: ${LitOption.cssVar('option-color')};
      ${LitButton.cssKey('background')}: ${LitOption.cssVar('option-background')};
      ${LitButton.cssKey('background-hover')}: ${LitOption.cssVar('option-background-hover')};
      ${LitButton.cssKey('ripple')}: ${LitOption.cssVar('option-ripple')};
      ${LitButton.cssKey('height')}: ${LitOption.cssVar('height')};
    }
    :host([mobile]) {
      ${LitButton.cssKey('height')}: ${LitOption.cssVar('mobile-height')};
    }
    :host([selected]) span::after {
      width: 8px;
      height: 8px;
      background-color: ${LitOption.cssVar('option-circle-color')};
    }
    :host span::after {
      content: '';
      border-radius: 8px;
      width: 8px;
      height: 8px;
      position: absolute;
      top: 2px;
      left: 2px !important;
    }
    :host(:not([visability])) {
      display: none;
    }

    :host([disabled]) {
      pointer-events: none;
    }
    lit-button {
      display: block;
      width: 100%;
      height: ${LitOption.cssVar('height')};
      ${LitButton.cssKey('outline-focus')}: none;
    }
    :host(:not([selected])) lit-button:hover span::after,
    :host(:not([selected])) lit-button[pressed] span::after {
      opacity: 0.3;
      background-color: ${LitOption.cssVar('option-circle-color')};
    }
    :host(:not([selected])) lit-button[pressed] span::after {
      opacity: 0.5;
    }
    span {
      border-radius: 12px;
      border: 2px solid ${LitOption.cssVar('option-circle-color')};
      display: inline-block;
      height: 12px;
      margin-left: 15px;
      position: relative;
      width: 12px;
    }
  `

  // @property({type: Boolean, reflect: true}) disabled: boolean = false;
  @property({type: Boolean, reflect: true}) selected = false
  @property({type: Boolean, reflect: true}) disabled = false
  @property({type: String}) label = ''
  @property({type: String}) value = ''
  @property({type: Boolean, reflect: true}) visability = true
  @property({type: Boolean, reflect: true}) mobile: boolean = mobileAndTabletCheck()
  private _selectHost: LitSelect | null = null

  public setSelectHost(host: LitSelect) {
    this._selectHost = host
  }
  connectedCallback(): void {
    super.connectedCallback()
    setTimeout(() => {
      options.push([this, this.textContent || ''])
    })
    this.dispatchEvent(
      new CustomEvent('optionConnected', {
        bubbles: true,
        composed: true,
        detail: this,
      }),
    )
  }
  disconnectedCallback(): void {
    super.disconnectedCallback()
    options.filter((item) => item[0] !== this)
    this._selectHost?.optionDisconnect(this)
  }
  updated(_changedProperties: Map<string | number | symbol, unknown>): void {
    this.ariaLabel = this.label || this.textContent || ''
    if (_changedProperties.has('selected')) {
      if (this.selected) {
        setTimeout(() => {
          this.toggleSelect()
        })
      }
    }
  }
  render() {
    return html`<lit-button
      ?disabled="${this.disabled}"
      @click="${this.toggleSelect}"
      between
      borderless
      tabIndex="1"
      @focus="${this._focus}"
      @blur="${this._blur}"
    >
      <slot @slotchange="${this.notify}"></slot> <span slot="icon-after"></span
    ></lit-button>`
  }

  private toggleSelect() {
    this.dispatchEvent(
      new CustomEvent('optionChange', {
        composed: true,
        bubbles: true,
        detail: this,
      }),
    )
  }
  private _focus() {
    document.addEventListener('keydown', this._handleFocus)
  }
  private _blur() {
    document.removeEventListener('keydown', this._handleFocus)
  }
  private _handleFocus = (e: KeyboardEvent) => {
    let event = ''
    if (e.key === 'ArrowDown') {
      event = 'focusNext'
    } else if (e.key === 'ArrowUp') {
      event = 'focusPrev'
    }
    if (event) {
      this.dispatchEvent(
        new CustomEvent(event, {
          detail: true,
          bubbles: true,
          composed: true,
        }),
      )
    }
  }

  notify() {
    this.dispatchEvent(
      new CustomEvent('optionSlotChanged', {
        composed: true,
        bubbles: true,
      }),
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-option': LitOption
  }
}
