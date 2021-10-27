import { customElement, property } from 'lit/decorators';
import { LitElement, html, css } from 'lit';

@customElement("tree-item")
export class TreeItem extends LitElement{
    static styles = css`
    :host{
        display: block;
        padding: 5px 10px;
        cursor: pointer;
    }
    :host([selected]){
        background-color: var(--treeitem-selected-background, rgba(0, 0, 0, 0.1));
        color: var(--treeitem-selected-color, #f700ff);
    }
    `;
    @property() value: string = '';

    connectedCallback(){
        super.connectedCallback();
        this.addEventListener('click', this._onClick);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this.removeEventListener('click', this._onClick);
    }

    updateSelection(selected: string){
        const isSelected = selected === this.value;
        if(this.hasAttribute('selected') !== isSelected){
            isSelected 
                ? this.setAttribute('selected', '')
                : this.removeAttribute('selected');
        }
        if(isSelected){
            this.dispatchEvent(new CustomEvent('subviewSelected', {
                detail: isSelected,
                bubbles: true
            }))
        }
         
    }
    private _onClick(){
        this.dispatchEvent(new CustomEvent("changed", {
            detail: this.value,
            bubbles: true
        }))
    }
    render(){
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'tree-item': TreeItem;
    }
    
}