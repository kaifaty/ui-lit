import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';


@customElement('tooltip-item')
export class TooltimItem extends LitElement{
    static styles = css`
    :host{
        display: inline-block;    
        position: absolute;
        top: 0;
        left: 0;
        padding: 4px 10px;
        box-sizing: border-box;
        border: 1px solid var(--tooltip-border, #333);
        border-radius: 5px;
        background-color: var(--tooltip-background, white);
        color: var(--tooltip-color);
        max-width: 280px;
        opacity: 0;
        z-index: 1;
        font-size: var(--tooltip-font-size, 12px);
        font-weight: var(--tooltip-weight, normal);
        transition: opacity 0.3s ease-out;
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
    }
    `;
    firstUpdated(){
        setTimeout(() => {
           this.dispatch();
           this.classList.add('visible');
        }, 1)
    }
    
    render(){
        return html`
            <slot></slot>
            <lit-icon 
                @click = "${this._onClose}"
                icon = "cancel"></lit-icon>`;
    }
    updated(){
        this.dispatch();
    }
    private dispatch(){
        this.dispatchEvent(new CustomEvent('tooltipUpdated', {
            detail: {
                width: this.clientWidth,
                height: this.clientHeight
            }
        }))
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
