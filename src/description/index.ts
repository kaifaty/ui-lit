import { customElement } from 'lit/decorators.js';
import { LitElement, html, css } from 'lit';


/**
 * @cssprop --lit-description-display
 * @cssprop --lit-description-padding
 * @cssprop --lit-description-font-style
 * @cssprop --lit-description-font-size
 * @cssprop --lit-description-line-height
 * 
 */

@customElement('lit-description')
export class LitDescription extends LitElement{
    static styles = css`
    :host{
        display: var(--lit-description-display, block);
        padding: var(--lit-description-padding, 10px 0);
        font-style: var(--lit-description-font-style, normal);
        font-size: var(--lit-description-font-size, 12px);
        line-height: var(--lit-description-line-height, 1.5);
        opacity: 0.6;
    }
    `;
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-description': LitDescription;
    }
    
}