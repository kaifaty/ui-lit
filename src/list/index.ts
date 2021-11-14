
import { customElement} from 'lit/decorators';
import { LitElement, html, css } from 'lit';

@customElement('lit-list-item')
export class LitListItem extends LitElement{
    static styles = css`
    :host{
        display: block;
        border-bottom: 1px solid var(--list-border, #999);
        padding: var(--list-padding, 10px 15px);
        
    }
    :host(:hover){
        background-color: var(--list-background-hover, #eee);
    }
    lit-icon{
        margin-right: 10px;
        transform: rotate(-90deg);
        opacity: 0.5;
    }
    `;
    render(){
        return html`<lit-icon icon = "dropdown"></lit-icon> <slot></slot>`;
    }
}
@customElement('lit-list')
export class LitList extends LitElement{
    static styles = css`
    :host{
        display: block;
        font-size: var(--list-font-size);
    }`;
    
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-list-item': LitListItem;
      'lit-list': LitList;
    }
}