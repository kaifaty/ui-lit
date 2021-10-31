import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';

@customElement("select-item")
export class SelectItem extends LitElement{
    static styles = css`
    :host{
        display: block;
        padding: var(--select-padding, 5px 10px);
        cursor: pointer;
    }
    
    :host(:focus){
        outline: 2px solid var(--select-outline-focus, #ccc);
    }
    :host(:hover){
        background-color: var(--option-hover, #eee);
    }
    `;
    @property({type: String}) value: string = '';
    tabIndex = 0;
    
    connectedCallback(){
        super.connectedCallback();
        this.addEventListener('click', this._onClick);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this.removeEventListener('click', this._onClick);
    }
    getConent(): DocumentFragment{
        const fragment = document.createDocumentFragment();
        this.childNodes.forEach(it => {
            fragment.appendChild(it.cloneNode(true));
        })
        return fragment;
    }
    private _onClick(){
        this.dispatchEvent(new CustomEvent('selectChanged', {
            detail: {
                value: this.value,
                slot: this.getConent()
            },
            bubbles: true,
            
        }))
    }
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'select-item': SelectItem;
    }
}
