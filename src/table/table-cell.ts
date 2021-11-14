import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

@customElement("lit-table-cell")
export class LitTableCell extends LitElement{
    static styles = css`
    :host{
        display: block;
        padding: var(--cell-padding, 0 15px);
        transition: background-color 0.3s ease;
        height: var(--row-height, 30px);
        display: inline-flex;
        align-items: center;
    }
    `;
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-table-cell': LitTableCell;
    }
}