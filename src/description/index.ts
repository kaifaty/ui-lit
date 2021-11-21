import { customElement } from 'lit/decorators';
import { LitElement, html, css } from 'lit';


@customElement('lit-description')
export class LitDescription extends LitElement{
    static styles = css`
    :host{
        display: block;
        padding: var(--lit-description-padding, 10px 0);
        font-style: italic;
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