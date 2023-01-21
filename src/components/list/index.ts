
import {css, html, LitElement, svg} from 'lit'
import {customElement} from 'lit/decorators.js'

const icon = svg`<svg class = "icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6478 4.33496L9.07642 12.5955C8.45304 13.3512 7.492 13.3512 6.8946 12.5955L0.323172 4.33496C-0.300204 3.5532 0.0114841 2.95385 0.972523 2.95385H14.9985C15.9855 2.95385 16.2712 3.5532 15.6478 4.33496Z" fill="white"/>
</svg>`
@customElement('lit-list-item')
export class LitListItem extends LitElement{
    static styles = css`
    :host{
        display: block;
        padding: var(--lit-list-padding, 10px 15px);    
        border-bottom: 1px solid var(--lit-list-border, #fff);    
    }
    :host(:last-child){
        border: none;
    }
    :host(:hover){
        background-color: var(--lit-list-background-hover, #36062c);
    }
    .icon{
        width: 10px;
        height: 10px;
        margin-right: 10px;
        transform: rotate(-90deg);
        fill: var(--lit-list-border, #fff);
    }
    `
    render(){
        return html`${icon} <slot></slot>`
    }
}

@customElement('lit-list')
export class LitList extends LitElement{
    static styles = css`
    :host{
        display: block;
        font-size: var(--lit-list-font-size);
    }
    `
    
    render(){
        return html`<slot></slot>`
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-list-item': LitListItem;
      'lit-list': LitList;
    }
}