import {definable, css, html, createTemplate, stylable, createGetParams, withProps} from '@ui-wc/utils'
import {WcIcon} from '@ui-wc/icon'

import {linkCCSVarsMap, PREFIX} from './styles.map'
import type {LinkTarget} from './types'

type Type = 'button' | 'link'
type Href = string | null

type Props = {
  type: Type
  href: Href
  rel?: string
}

const template = createTemplate(html`
  <a id="link">
    <slot></slot>
  </a>
`)

const hover = Symbol()
const unhover = Symbol()

const getParam = createGetParams({attribute: true})

const href = getParam<string | null>('href', null, {
  set(target, _, value) {
    target.querySelector<HTMLLinkElement>('#link').href = value
    return true
  },
})
const type = getParam<Type>('type', 'link')
const rel = getParam<Href>('rel', 'nofollow', {
  set(target, _, value) {
    target.querySelector<HTMLLinkElement>('#link').rel = value
    return true
  },
})
const target = getParam<LinkTarget>('target', '_self', {
  set(target, _, value) {
    target.querySelector<HTMLLinkElement>('#link').target = value
    return true
  },
})

const underlined = getParam<boolean>('underlined', false)
const tabindex = getParam<number>('tabIndex', 0)

const Basic = stylable(definable(HTMLElement), linkCCSVarsMap, PREFIX)
const WcLinkBase = withProps<Props, typeof Basic>(Basic, [href, underlined, tabindex, target, rel, type])

/**
 * @element wc-link - link element
 *
 *
 * @attr {boolean} [underlined=false] - has link undeline or not
 *
 *
 * === type ===
 * @attr {button | link} [type=link] - type of link
 *
 * === tabIndex ===
 * @attr {number} [tabIndex=0] - Tab index
 *
 * === target ===
 * @attr {_blank | _parent | _self | _top} [target=_self] - Target for `link`. Work with `href` prop.
 *
 * === href ===
 * @attr {string | null} [href=null] - Button can be `link` if href defined
 *
 *
 */
export class WcLink extends WcLinkBase {
  static define(name?: string) {
    WcIcon.define()
    super.define(name)
  }

  static styles = [
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
        ${this.cssKey('color')}: ${this.cssVar('color')};
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
    this.addEventListener('mouseover', this[hover].bind(this))
    this.addEventListener('mouseout', this[unhover].bind(this))
    this.addEventListener('touchstart', this[hover].bind(this))
    this.addEventListener('touchend', this[unhover].bind(this))
  }

  [hover]() {
    if (this.type === 'button') return
    this.setAttribute('hover', '')
  }
  [unhover]() {
    if (this.type === 'button') return
    this.removeAttribute('hover')
  }

  click() {
    this.shadowRoot?.querySelector('a')?.click()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-link': WcIcon
  }
}
