import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

@customElement("lit-table-row")
export class LitTableRow extends LitElement{
    static styles = css`
    :host{
        display: contents;
    }
    ::slotted(lit-table-header){
        background-color: var(--lit-table-header-background, #f5f5f5);
    }
    :host(:hover) ::slotted(lit-table-cell){
        background-color: var(--lit-table-cell-background-hover, #f5f5f5);
    }
    `;
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-table-row': LitTableRow;
    }
}