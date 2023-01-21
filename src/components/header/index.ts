import {css, html, LitElement} from 'lit'

import {definable} from '../../mixins/definable'


/**
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
 */

export class LitHeader extends definable(LitElement){
    static styles = [
        css`
        :host{
            display: block;
            font-family: var(--lit-header-font-family, inherit);
        }
        :host([center]){
            text-align: center;
        }
        :host([right]){
            text-align: right;
        }
        `,
        ...[1, 2, 3, 4, 5, 6].map(it => 
        css`:host([level="${it}"]){
            font-weight: var(--lit-header-${it}-font-weight, bold);
            margin: var(--lit-header-${it}-margin, 2.5rem 0 1rem 0);
            font-size: var(--lit-header-${it}-font-size, ${Math.round(10 * (3 - it * 0.4)) / 10}rem);
        }`)
    ]

    render(){
        return html`<slot></slot>`
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-header': LitHeader;
    }
    
}
