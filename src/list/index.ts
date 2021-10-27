
import { customElement} from 'lit/decorators';
import { LitElement, html, css } from 'lit';

@customElement('list-item')
export class ListItem extends LitElement{
    static styles = css`
    :host{
        display: block;
        border-bottom: 1px solid var(--list-border, #999);
        padding: var(--list-padding, 10px 15px);
        
    }
    :host(:hover){
        background-color: var(--list-background-hover, #eee);
    }
    icon-element{
        margin-right: 10px;
        transform: rotate(-90deg);
        opacity: 0.5;
    }
    `;
    render(){
        return html`<icon-element icon = "dropdown"></icon-element> <slot></slot>`;
    }
}
@customElement('list-element')
export class ListElement extends LitElement{
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
      'list-item': ListItem;
      'list-element': ListElement;
    }
}