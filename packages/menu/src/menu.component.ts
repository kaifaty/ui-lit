import {mobileAndTabletCheck} from '@kaifat/utils'
import {css, html, LitElement} from 'lit'
import {property} from 'lit/decorators.js'

import {definable, stylable} from '@ui-wc/utils'
import {LitButton} from '@ui-wc/button'
import {LitSelect} from '@ui-wc/select'

import {LitMenuItem} from './item.component'
import {menuCSSMap, PREFIX} from './styles.map'

export class LitMenu extends stylable(definable(LitElement), menuCSSMap, PREFIX) {
  static define(name?: string) {
    LitButton.define()
    LitSelect.define()
    LitMenuItem.define()
    super.define(name)
  }

  static styles = css`
    :host {
      display: inline-block;
      ${LitButton.cssKey('height')}: ${LitMenu.cssVar('height')};
      ${LitButton.cssKey('justify')}: start;
    }
    :host([mobile]) {
      ${LitButton.cssKey('height')}: ${LitMenu.cssVar('mobile-height')};
    }
    lit-select {
      width: 100%;
    }
  `
  @property({type: String}) label = ''
  @property({type: Boolean, reflect: true}) mobile: boolean = mobileAndTabletCheck()

  protected render() {
    return html` <lit-select @changed="${this.#onMenuSelect}" .isMenu="${true}">
      <div slot="selected"><slot name="label">${this.label}</slot></div>
      <slot></slot>
    </lit-select>`
  }
  /** ignore */
  #onMenuSelect() {
    const el = this.shadowRoot?.querySelector('lit-select')
    el?.hide()
    el?.focus()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-menu': LitMenu
  }
}
