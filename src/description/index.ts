import { customElement } from 'lit/decorators';
import { LitElement, html, css } from 'lit';


@customElement('description-element')
export class DescriptionElement extends LitElement{
    static styles = css`
    :host{
        display: block;
        padding: 10px 0;
        font-style: italic;
    }
    `;
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'description-element': DescriptionElement;
    }
    
}