import {css, html, LitElement} from 'lit'
import {property} from 'lit/decorators.js'

import {definable} from '@ui-wc/utils'

export class ListOptGroup extends definable(LitElement) {
  static styles = css`
    :host {
      display: block;
    }
    label {
      display: block;
    }
  `
  @property({type: Boolean, reflect: true}) disabled = false
  @property({type: String}) label = ''
  render() {
    return html` <label>
      ${this.label}
      <slot></slot>
    </label>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-opt-group': ListOptGroup
  }
}
