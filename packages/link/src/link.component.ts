import {css, html, LitElement} from 'lit'
import {property} from 'lit/decorators.js'
import {ifDefined} from 'lit/directives/if-defined.js'

import {definable, stylable} from '@ui-lit/utils'
import {LitIcon} from '@ui-lit/icon'

import {linkCCSVarsMap, PREFIX} from './styles.map'
import type {LinkTarget} from './types'

export class LitLink extends stylable(definable(LitElement), linkCCSVarsMap, PREFIX) {
  static define(name?: string) {
    LitIcon.define()
    super.define(name)
  }

  static styles = css`
    :host {
      display: inline-block;
      box-sizing: border-box;
      position: relative;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    :host([type='button']) a {
      color: inherit;
    }
    :host(:not([type='button'])) a {
      color: ${this.cssVar('color')};
      ${LitLink.cssKey('color')}: ${this.cssVar('color')};
      text-decoration: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      width: 100%;
    }
    :host::after {
      content: '';
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      background-color: ${this.cssVar('color')};
      height: 1px;
      opacity: 0;
      transition: opacity 0.1s ease;
      border-radius: 2px;
    }
    :host(:not([type='button'])[hover]) a {
      color: ${this.cssVar('color-hover')};
    }
    :host([hover])::after {
      opacity: 1;
      background-color: ${this.cssVar('color-hover')};
    }
    :host(:not([type='button'])[underlined])::after {
      opacity: 1;
    }
  `

  @property({type: String}) href: string | undefined = undefined
  @property({type: String, reflect: true}) type: 'button' | 'link' = 'link'
  @property({type: String}) rel?: string = 'nofollow'
  @property({type: String}) target: LinkTarget = '_self'
  @property({type: Boolean, reflect: true}) underlined = false
  @property({type: String, reflect: true, attribute: true}) tabindex = 0

  render() {
    return html`<a
      @mouseover="${this.#onMouseover}"
      @mouseout="${this.#onMouseout}"
      tabindex="${this.tabindex}"
      target="${this.target}"
      rel="${ifDefined(this.rel)}"
      href="${ifDefined(this.href)}"
      ><slot></slot
    ></a>`
  }
  #onMouseover() {
    if (this.type === 'button') return
    this.setAttribute('hover', '')
  }
  #onMouseout() {
    if (this.type === 'button') return
    this.removeAttribute('hover')
  }
  click() {
    this.shadowRoot?.querySelector('a')?.click()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-link': LitLink
  }
}
