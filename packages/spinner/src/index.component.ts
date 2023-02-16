import {definable, css, html, stylable, createTemplate} from '@ui-wc/utils'

import {PREFIX, spinnerCSSVars} from './styles.vars'

export interface ISipnnerProps {
  fullscreen: boolean
  fullContent: boolean
  small: boolean
  big: boolean
}
const template = createTemplate(html`
  <div class="lds-spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <div class="pulsor">
    <div class="bounce bounce1"></div>
    <div class="bounce bounce2"></div>
  </div>
`)

/**
 * @element wc-spinner - spinner element
 *
 * @attr {boolean} [big=false] - is big size
 * @attr {boolean} [small=false] - is small size
 * @attr {boolean} [fullcontent=false] - stratch to parent size
 * @attr {boolean} [fullscreen=false] - stratch to fullscreen
 * @attr {bounce | ring | spinner} [type=bounce] - type of spinner
 */
export class WcSpinner extends stylable(definable(HTMLElement), spinnerCSSVars, PREFIX) {
  static styles = [
    css`
      :host {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
      :host([fullscreen]) {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        height: 100vh;
        width: 100%;
        background-color: ${this.cssVar('background')};
      }
      :host([fullContent]) {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        height: 100%;
        width: 100%;
        background-color: ${this.cssVar('background')};
      }
      :host(.container) {
        display: flex;
        height: 100%;
        width: 100%;
      }
      .pulsor {
        width: 30px;
        height: 30px;
        position: relative;
      }
      :host([small]) .pulsor {
        width: 15px;
        height: 15px;
      }
      :host([big]) .pulsor {
        width: 50px;
        height: 50px;
      }
      .bounce {
        contain: content;
        background-color: ${this.cssVar('color')};
        width: 100%;
        height: 100%;
        border-radius: 50%;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-animation: sk-bounce 1.5s infinite ease-in-out;
        animation: sk-bounce 1.5s infinite ease-in-out;
      }
      .bounce2 {
        -webkit-animation-delay: -1s;
        animation-delay: -1s;
      }

      .lds-spinner {
        color: official;
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }
      .lds-spinner div {
        transform-origin: 40px 40px;
        animation: lds-spinner 1.2s linear infinite;
      }
      .lds-spinner div:after {
        content: ' ';
        display: block;
        position: absolute;
        top: 3px;
        left: 37px;
        width: 6px;
        height: 18px;
        border-radius: 20%;
        background: #fff;
      }
      .lds-spinner div:nth-child(1) {
        transform: rotate(0deg);
        animation-delay: -1.1s;
      }
      .lds-spinner div:nth-child(2) {
        transform: rotate(30deg);
        animation-delay: -1s;
      }
      .lds-spinner div:nth-child(3) {
        transform: rotate(60deg);
        animation-delay: -0.9s;
      }
      .lds-spinner div:nth-child(4) {
        transform: rotate(90deg);
        animation-delay: -0.8s;
      }
      .lds-spinner div:nth-child(5) {
        transform: rotate(120deg);
        animation-delay: -0.7s;
      }
      .lds-spinner div:nth-child(6) {
        transform: rotate(150deg);
        animation-delay: -0.6s;
      }
      .lds-spinner div:nth-child(7) {
        transform: rotate(180deg);
        animation-delay: -0.5s;
      }
      .lds-spinner div:nth-child(8) {
        transform: rotate(210deg);
        animation-delay: -0.4s;
      }
      .lds-spinner div:nth-child(9) {
        transform: rotate(240deg);
        animation-delay: -0.3s;
      }
      .lds-spinner div:nth-child(10) {
        transform: rotate(270deg);
        animation-delay: -0.2s;
      }
      .lds-spinner div:nth-child(11) {
        transform: rotate(300deg);
        animation-delay: -0.1s;
      }
      .lds-spinner div:nth-child(12) {
        transform: rotate(330deg);
        animation-delay: 0s;
      }

      .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }
      .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
      }
      .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
      }
      .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
      }
      .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
      }

      @keyframes lds-spinner {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      @-webkit-keyframes sk-bounce {
        0%,
        100% {
          -webkit-transform: scale(0);
        }
        50% {
          -webkit-transform: scale(1);
        }
      }
      @keyframes sk-bounce {
        0%,
        100% {
          transform: scale(0);
          -webkit-transform: scale(0);
        }
        50% {
          transform: scale(1);
          -webkit-transform: scale(1);
        }
      }

      @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ]
  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
  }
  // @property({type: Boolean, attribute: true, reflect: true}) big = false
  // @property({type: Boolean, attribute: true, reflect: true}) small = false
  // @property({type: Boolean, attribute: true, reflect: true}) fullContent = false
  // @property({type: Boolean, attribute: true, reflect: true}) fullscreen = false
  // @property({type: String, attribute: true, reflect: true}) type: 'bounce' | 'ring' | 'spinner' = 'bounce'
}
declare global {
  interface HTMLElementTagNameMap {
    'wc-spinner': WcSpinner
  }
}
