import {definable, css, html, stylable} from '@ui-wc/utils'
import {panelCSSVars, PANEL_PREFIX} from './styles.map'

export class WcPanel extends stylable(definable(HTMLElement), panelCSSVars, PANEL_PREFIX) {
  static styles = [
    css`
      :host {
        display: block;
        background-color: ${this.cssVar('background')};
        color: ${this.cssVar('color')};
        padding: ${this.cssVar('padding')};
        border: ${this.cssVar('border')};
      }
      :host([danger]) {
        background-color: ${this.cssVar('danger-background')};
        color: ${this.cssVar('danger-color')};
        border: ${this.cssVar('danger-border')};
      }
      :host([success]) {
        background-color: ${this.cssVar('success-background')};
        color: ${this.cssVar('success-color')};
        border: ${this.cssVar('success-border')};
      }
    `,
  ]
  constructor() {
    super()
    this.shadowRoot.innerHTML = html`<slot></slot>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'wc-panel': WcPanel
  }
}
