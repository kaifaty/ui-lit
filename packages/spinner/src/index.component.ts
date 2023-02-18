import {definable, css, html, stylable, createTemplate} from '@ui-wc/utils'

import {PREFIX, spinnerCSSVars} from './styles.vars'

export interface ISipnnerProps {
  fullscreen: boolean
  fullContent: boolean
  small: boolean
  big: boolean
}
const template = createTemplate(html`
  <svg class="spinner" viewBox="0 0 50 50">
    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
  </svg>
`)

/**
 * @element wc-spinner - spinner element
 *
 * @attr {pulsor} [type=pulsor] - type of spinne
 * @attr {large | small | normal | fullcontent | fullscreen} [size=normal]
 */
export class WcSpinner extends stylable(definable(HTMLElement), spinnerCSSVars, PREFIX) {
  static styles = [
    css`
      :host {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        contain: content;
        width: 30px;
        height: 30px;
      }

      :host([size='small']) {
        width: 15px;
        height: 15px;
      }
      :host([size='large']) {
        width: 50px;
        height: 50px;
      }
      .spinner {
        animation: rotate 2s linear infinite;
        width: 100%;
        height: 100%;
      }
      .path {
        stroke: ${this.cssVar('color')};
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
      }
      @keyframes rotate {
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes dash {
        0% {
          stroke-dasharray: 1, 150;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -35;
        }
        100% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -124;
        }
      }
    `,
  ]
  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'wc-spinner': WcSpinner
  }
}
