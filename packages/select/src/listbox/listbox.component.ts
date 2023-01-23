import {mobileAndTabletCheck} from '@kaifat/utils'
import {css, html, LitElement, nothing} from 'lit'
import {property} from 'lit/decorators.js'

import {definable, scrollbar, stylable} from '@ui-lit/utils'
import {LitButton} from '@ui-lit/button'
import {PREFIX, selectCSSVars} from '../styles.map'
import type {TListboxPosition} from '../types'

export class ListBox extends stylable(definable(LitElement), selectCSSVars, PREFIX) {
  static styles = [
    css`
      :host {
        ${LitButton.cssKey('border')}: none;
        --shadow-pos: -1;
        background: ${ListBox.cssVar('option-background')};
        box-sizing: border-box;
        box-sizing: border-box;
        display: none;
        position: absolute;
        z-index: 30;
      }
      :host([open]) {
        display: block;
      }
      .wrapper {
        border: ${ListBox.cssVar('listbox-border')};
        box-shadow: 2px calc(2px * var(--shadow-pos)) 6px ${ListBox.cssVar('listbox-shadow')};
        height: ${ListBox.cssVar('listbox-height')};
        max-height: ${ListBox.cssVar('listbox-max-height')};
        overflow-x: hidden;
        overflow-y: auto;
      }
      :host([mobile]) .wrapper {
        ${LitButton.cssKey('background')}: ${ListBox.cssVar('fullscreen-background')};
        border-radius: 5px;
        border: none;
        box-shadow: 3px 3px 3px ${ListBox.cssVar('fullscreen-shadow')};
        color: ${ListBox.cssVar('fullscreen-color')};
        margin: 0 auto;
        max-height: 50%;
        max-width: 90%;
        min-width: 280px;
      }
      :host([mobile]) {
        align-items: center;
        background-color: ${ListBox.cssVar('fullscreen-overlay-background')};
        display: none;
        height: 100vh;
        justify-content: center;
        left: 0;
        position: fixed;
        top: 0;
        width: 100vw;
        z-index: 1;
      }
      :host([mobile][open]) {
        display: flex;
      }
    `,
    scrollbar,
  ]

  @property({type: String}) position: TListboxPosition = 'auto'
  @property({type: Boolean, reflect: true}) open = false
  @property({type: Boolean, reflect: true}) mobile: boolean = mobileAndTabletCheck()

  /** @ignore */
  #calcPosition() {
    if (!this.isConnected || this.mobile) return
    const host = (this.parentNode as ShadowRoot).host.shadowRoot?.querySelector('.wrapper')
    const wrapper = this.shadowRoot!.querySelector('.wrapper') as HTMLElement
    if (!host) return
    const rect = host!.getBoundingClientRect()
    const topAvailable = rect.top
    const bottomAvailable = (window.visualViewport?.height || window.innerHeight) - rect.bottom
    const floatRight = (window.visualViewport?.width || window.innerWidth) / 2 - rect.left < 0

    this.style.minWidth = rect.width + 'px'
    if (floatRight) {
      this.style.right = '0'
      this.style.left = 'initial'
    } else {
      this.style.right = 'initial'
      this.style.left = '0'
    }
    if (topAvailable > bottomAvailable && this.position === 'auto') {
      this.style.top = '0'
      this.style.transform = 'translateY(calc(-100% - 1px))'
      if (wrapper) {
        wrapper.style.maxHeight = topAvailable - 2 + 'px'
      }
      this.style.setProperty('--shadow-pos', '-1')
    } else {
      this.style.top = host.clientHeight + 'px'
      this.style.transform = 'none'
      if (wrapper) {
        wrapper.style.maxHeight = bottomAvailable - 2 + 'px'
      }
      this.style.setProperty('--shadow-pos', '1')
    }
  }

  private _onClick = (e: Event) => {
    let clickInOption = false
    for (const el of e.composedPath()) {
      const tag = ((el as HTMLElement).tagName || '').toLowerCase()
      if (tag === 'lit-option') {
        clickInOption = true
        break
      }
    }
    if (!clickInOption) {
      this.dispatchEvent(
        new CustomEvent('listboxClose', {
          detail: true,
          composed: true,
          bubbles: true,
        }),
      )
    } else {
      this.#calcPosition()
    }
  }

  /** @ignore */
  willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
    if (_changedProperties.has('open')) {
      this.#calcPosition()
    }
  }

  /** @ignore */
  updated(_changedProperties: Map<string | number | symbol, unknown>): void {
    setTimeout(() => {
      if (_changedProperties.has('open')) {
        if (this.open) {
          document.addEventListener('click', this._onClick)
        } else {
          document.removeEventListener('click', this._onClick)
        }
      }
    })
  }

  /** @ignore */
  render() {
    if (!this.open) return nothing
    return html`<div class="wrapper ff-scrollbar"><slot></slot></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-listbox': ListBox
  }
}
