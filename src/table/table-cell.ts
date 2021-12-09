import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';

@customElement("lit-table-cell")
export class LitTableCell extends LitElement{
    static styles = css`
    :host{
        padding: var(--lit-cell-padding, 0 15px);
        transition: background-color 0.3s ease;
        height: var(--row-height, 30px);
        display: flex;
        align-items: center;
    }
    :host(.half-hidden){
        opacity: 0.5;
    }
    :host([align = center]){
        justify-content: center;
    }
    :host([align = right]){
        justify-content: right;
    }
    `;
    
    @property({type: String, reflect: true}) align: string = 'left';
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-table-cell': LitTableCell;
    }
}