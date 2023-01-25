import {adoptToElement, createStyle, css, definable, stylable} from '@ui-lit/utils'

import {iconCSSVarMap, PREFIX} from './types'

import type {IconKeys} from './svg-map'

export class LitIcon extends stylable(definable(HTMLElement), iconCSSVarMap, PREFIX) {
  static properties = {
    icon: {type: String, attibute: true},
  }
  static styles = createStyle(css`
    :host {
      cursor: pointer;
      display: inline-block;
      font-weight: normal;
      direction: ltr;
      width: 16px;
      height: 16px;
    }
    .dropdown {
      transform-origin: center;
      transition: transform 0.3s ease;
    }
    :host([opened]) .dropdown {
      transform: rotate(180deg);
    }

    :host([danger]),
    :host([error]) .icon {
      fill: ${LitIcon.cssVar('negative-color')};
    }
    :host([success]) {
      fill: ${LitIcon.cssVar('positive-color')};
    }
    :host([icon='back']),
    :host([icon='arrow-left']) {
      transform-origin: center;
      transform: rotate(90deg);
    }
  `)

  constructor() {
    super()
    adoptToElement(this, [LitIcon.styles])
    this.attachShadow({mode: 'open'})
  }

  attributeChangedCallback(name: string, _: string, newValue: string) {
    if (name === 'icon') {
      this.icon = newValue as IconKeys
    }
  }
  private _icon: IconKeys
  set icon(value: IconKeys) {
    this._icon = value
    this._load()
  }
  get icon() {
    return this._icon
  }

  private _load() {
    if (!this.icon) {
      return Promise.resolve('')
    }
    return fetch('./assets/' + this.icon + '.svg')
      .then((r) => r.text())
      .then((r) => {
        const node = document.createElement('template')
        node.insertAdjacentHTML('afterbegin', r)
        this.shadowRoot.appendChild(node.content)
      })
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'lit-icon': LitIcon
  }
}
