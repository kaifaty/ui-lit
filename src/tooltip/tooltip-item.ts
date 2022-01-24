import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { isClickInElement } from 'kailib';
import { tooltipStyles } from './styles';

@customElement('tooltip-item')
export class TooltimItem extends LitElement{
    static styles = tooltipStyles;
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
