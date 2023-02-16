import {css, html, LitElement} from 'lit'
import {state} from 'lit/decorators.js'

import {definable} from '@ui-wc/utils'
import {LitButton} from '@ui-wc/button'

import {PREFIX} from './styles.map'
import type {TTheme} from './types'

export class ThemeSwitcher extends definable(LitElement) {
  /** @ignore */
  static define(name?: string) {
    LitButton.define()
    super.define(name)
  }

  /** @ignore */
  static styles = css`
    :host {
      display: inline-block;
      width: 30px;
    }
    lit-button {
      width: 100%;
    }
  `

  @state() theme: TTheme = localStorage.appTheme || 'light'

  /** @ignore */
  connectedCallback(): void {
    super.connectedCallback()
    document.addEventListener('themeHasChanged', this._onChanged as EventListener)
  }

  /** @ignore */
  disconnectedCallback(): void {
    super.disconnectedCallback()
    document.removeEventListener('themeHasChanged', this._onChanged as EventListener)
  }

  /** @ignore */
  private _onChanged = (e: CustomEvent) => {
    this.theme = e.detail
  }

  /** @ignore */
  render() {
    return html`<lit-button @click="${this.#themeChange}">
      <slot><lit-icon icon="${this.theme === 'dark' ? 'sun' : 'moon'}"></lit-icon></slot>
    </lit-button>`
  }

  /** @ignore */
  #themeChange() {
    this.dispatchEvent(
      new CustomEvent('themeSwitch', {
        composed: true,
        bubbles: true,
      }),
    )
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'lit-theme-switcher': ThemeSwitcher
  }
  interface LocaStorage {
    appTheme: string
  }
}
