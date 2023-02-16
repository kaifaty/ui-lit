import {css, html, LitElement} from 'lit'
import {property} from 'lit/decorators.js'

import {definable, focusable, stylable} from '@ui-wc/utils'
import {LitButton} from '@ui-wc/button'

import {menuCSSMap, PREFIX} from './styles.map'

export class LitMenuItem extends focusable(stylable(definable(LitElement), menuCSSMap, PREFIX)) {
  static styles = css`
    :host {
      ${LitButton.cssKey('background')}: ${LitMenuItem.cssVar('background')};
      ${LitButton.cssKey('background-hover')}: ${LitMenuItem.cssVar('background-hover')};
      ${LitButton.cssKey('color')}: ${LitMenuItem.cssVar('color')};
      ${LitButton.cssKey('outline-focus')}: none;
      ${LitButton.cssKey('ripple')}: ${LitMenuItem.cssVar('ripple')};
      align-items: center;
      display: flex;
      justify-content: space-between;
      min-width: 70px;
      position: relative;
      white-space: nowrap;
    }
    .wrapper {
      padding: 10px;
    }
    lit-button:focus-within {
      background-color: ${LitButton.cssVar('background-focus')};
    }
    lit-button {
      width: 100%;
    }
  `

  @property({type: String}) value = ''
  render() {
    return html`<lit-button @keydown="${this._handleFocus}"
      ><slot slot="icon-before" name="icon-before"></slot><slot></slot
    ></lit-button>`
  }
  private _handleFocus = (e: KeyboardEvent) => {
    let event = ''
    if (e.key === 'ArrowDown') {
      event = 'focusNext'
    } else if (e.key === 'ArrowUp') {
      event = 'focusPrev'
    } else if (e.key === 'Enter' || e.key === ' ') {
      this.dispatchEvent(
        new CustomEvent('menuSelect', {
          detail: this.value,
          composed: true,
          bubbles: true,
        }),
      )
      e.preventDefault()
    }
    if (event) {
      this.dispatchEvent(
        new CustomEvent(event, {
          detail: true,
          bubbles: true,
          composed: true,
        }),
      )
      e.preventDefault()
    }
  }
}
