import {css, html, LitElement, nothing} from 'lit'
import {unsafeSVG} from 'lit/directives/unsafe-svg'
import {property} from 'lit/decorators/property'
import {until} from 'lit/directives/until'

import {definable, stylable} from '@ui-lit/utils'

import {iconCSSVarMap, PREFIX} from './styles.map'

import {iconsMap, IconKeys} from './assets'

export class LitIcon extends stylable(definable(LitElement), iconCSSVarMap, PREFIX) {
  static styles = css`
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
      fill: ${this.cssVar('negative-color')};
    }
    :host([success]) {
      fill: ${this.cssVar('positive-color')};
    }
    :host([icon='back']),
    :host([icon='arrow-left']) {
      transform-origin: center;
      transform: rotate(90deg);
    }
  `

  @property({type: String, reflect: true}) icon: IconKeys | '' = ''
  private _load() {
    if (!this.icon) {
      return Promise.resolve('')
    }
    return fetch(iconsMap[this.icon])
      .then((r) => r.text())
      .then(unsafeSVG)
  }

  render() {
    if (!this.icon) {
      return nothing
    }
    return html`${until(this._load(), nothing)}`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'lit-icon': LitIcon
  }
}
