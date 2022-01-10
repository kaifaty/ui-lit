import { styleMap } from 'lit/directives/style-map.js';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { isChildOfElement, isClickInElement } from 'kailib';

@customElement('tooltip-item')
export class TooltimItem extends LitElement{
    static styles = css`
    :host{
        display: block;    
        top: 0;
        left: 0;
        padding: 8px 10px;
        box-sizing: border-box;
        border-radius: 5px;
        background-color: var(--lit-tooltip-background, white);
        color: var(--lit-tooltip-color);
        min-width: 100px;
        min-height: 40px;
        opacity: 0;
        font-size: var(--lit-tooltip-font-size, 12px);
        font-weight: var(--lit-tooltip-weight, normal);
        transition: opacity 0.3s ease-out;
        box-shadow: 0 0 8px var(--lit-tooltip-shadow, rgba(0,0,0,0.5));
        position: fixed;
        isolation: isolate;
    }
    div{
        max-width: 320px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    :host(.visible){
        opacity: 1;
    }
    lit-icon{
        position: absolute;
        right: -8px;
        top: -8px;
        border-radius: 12px;
        padding: 2px;
        color: #fff;
        background: rgba(0,0,0,0.7);
        box-shadow: 0 0 6px rgba(0,0,0,0.5);
        
    }
    `;
    @property({type: Object}) props: Record<string, string> | null = null;

    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(_changedProperties.has('props') && this.props){
            this.style.top = this.props.top;
            this.style.bottom = this.props.bottom;
            this.style.left = this.props.left;
            this.style.right = this.props.right;
        }
    }

    firstUpdated(){
        setTimeout(() => {
           this.classList.add('visible');
           document.addEventListener('click', this._onClick)
        }, 1);
    }
    private _onClick = (e: Event) => {
        if(!isClickInElement(e, this)){
            document.removeEventListener('click', this._onClick);
            this._onClose();
        }
    }
    
    render(){
        return html`
        <div style = ""><slot></slot></div>
        <lit-icon 
            @click = "${this._onClose}"
            icon = "cancel"></lit-icon>`;
    }
    private _onClose(){
        this.dispatchEvent(new CustomEvent("close"))
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'tooltip-item': TooltimItem;
    }
}
