import {HEADER_PREFIX} from './styles.map'
import {definable, stylable, css} from '@ui-wc/utils'

/**
 *
 * @element wc-header - UI wc header element
 *
 * Level:
 * @attr {"1" | "2" | "3" | "4" | "5" | "6" } [level="1"] - Level of header
 *
 * Center:
 * @attr {boolean} [center=false] - Align to center
 *
 * Right:
 * @attr {boolean} [right=false] - Align to right
 *
 * @cssprop [--wc-header-font-family=inherit] - header font family
 * @cssprop [--wc-header-(1-6)-font-weight=bold] - width of text for each level
 * @cssprop [--wc-header-(1-6)-font-size=Math.round(10 * (3 - N * 0.4)) / 10)] - size of text for each level
 * @cssprop [--wc-header-(1-6)-margin=2.5rem 0 1rem 0] - margin for each level
 *
 */

export class WcHeader extends stylable(definable(HTMLElement), {}, '') {
  static styles = [
    css`
      :host {
        display: block;
        font-family: var(${HEADER_PREFIX}font-family, inherit);
      }
      :host([center]) {
        text-align: center;
      }
      :host([right]) {
        text-align: right;
      }
    `,
    ...[1, 2, 3, 4, 5, 6].map(
      (it) =>
        css`
          :host([level='${String(it)}']) {
            font-weight: var(${HEADER_PREFIX}${String(it)}-font-weight, bold);
            margin: var(${HEADER_PREFIX}${String(it)}-margin, 2.5rem 0 1rem 0);
            font-size: var(${HEADER_PREFIX}${String(it)}-font-size, ${String(Math.round(10 * (3 - it * 0.4)) / 10)}rem);
          }
        `,
    ),
  ]
  constructor() {
    super()
    this.shadowRoot.innerHTML = `<slot></slot>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'wc-header': WcHeader
  }
}
