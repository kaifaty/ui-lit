import { classMap } from 'lit/directives/class-map';
import { html, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators';

@customElement("tree-subview")
export class TreeSubView extends LitElement{
    static styles = css`
    :host{
        display: block;
    }
    .label{
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 5px 10px;
    }
    .content{
        margin-left: 25px;
    }
    lit-icon{
        margin-right: 5px;
    }
    :host(:not([opened])) .content{
        display: none;
    }
    :host([selected]) .label{
        color: var(--treeitem-selected-color, tomato);
    }
    `;
    @property({type: String}) label: string = '';
    @property({type: Boolean, reflect: true}) opened: boolean = true;
    
    connectedCallback(){
        super.connectedCallback();
        this.addEventListener('subviewSelected', this._onSelected as EventListener);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this.removeEventListener('subviewSelected', this._onSelected as EventListener);
    }
    private _onSelected(e: CustomEvent){
        this.updateSelection(e.detail);
    }
    updateSelection(isSelected: boolean){
        if(this.hasAttribute('selected') !== isSelected){
            isSelected 
                ? this.setAttribute('selected', '') 
                : this.removeAttribute('selected');
        }
    }
    private _iconTemplate(){
        const data = {
            dropup: this.opened,
            "icon-before": true
        }
        return html`<lit-icon 
                        icon = "dropdown" 
                        class = "${classMap(data)}"></lit-icon>`;
    }
    private _toggle(){
        this.opened = !this.opened;
    }
    render(){
        return html`
            <div class = "label" 
                 @click = "${this._toggle}">${this._iconTemplate()}${this.label}</div>
            <div class = "content"><slot></slot></div>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'tree-subview': TreeSubView;
    }
}