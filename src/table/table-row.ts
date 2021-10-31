import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';

@customElement("table-row")
export class TableRow extends LitElement{
    static styles = css`
    :host{
        display: contents;
    }
    ::slotted(table-header){
        background-color: var(--table-header-background, #f5f5f5);
    }
    :host(:hover) ::slotted(table-cell){
        background-color: var(--table-cell-background-hover, #f5f5f5);
    }
    `;
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'table-row': TableRow;
    }
}