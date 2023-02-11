import {definable, css, html, createTemplate, stylable, StyleSheet} from '@ui-lit/utils'
import {LitIcon} from '@ui-lit/icon'

import {linkCCSVarsMap, PREFIX} from './styles.map'
import type {LinkTarget} from './types'
/**
 * 
      @mouseover="${this._onMouseover}"
      @mouseout="${this._onMouseout}"
      tabindex="${this.tabindex}"
      target="${this.target}"
      rel="${ifDefined(this.rel)}"
      href="${ifDefined(this.href)}"
 */
const template = createTemplate(html`
  <a>
    <slot></slot>
  </a>
`)

export class LitLink extends stylable(definable(HTMLElement), linkCCSVarsMap, PREFIX) {
  static define(name?: string) {
    LitIcon.define()
    super.define(name)
  }

  static styles: StyleSheet[] = [
    css`
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
    `,
  ]
  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
  }

  href: string | undefined = undefined
  type: 'button' | 'link' = 'link'
  rel?: string = 'nofollow'
  target: LinkTarget = '_self'
  underlined = false
  tabindex = 0
  /*
  render() {
    return html`<a
      @mouseover="${this._onMouseover}"
      @mouseout="${this._onMouseout}"
      tabindex="${this.tabindex}"
      target="${this.target}"
      rel="${ifDefined(this.rel)}"
      href="${ifDefined(this.href)}"
      ><slot></slot
    ></a>`
  }
  */
  private _onMouseover() {
    if (this.type === 'button') return
    this.setAttribute('hover', '')
  }
  private _onMouseout() {
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
