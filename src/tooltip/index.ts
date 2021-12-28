import { styleMap } from 'lit/directives/style-map';
import { classMap } from 'lit/directives/class-map';
import { LitElement, html, css, nothing } from 'lit';
import { customElement, state, property } from 'lit/decorators';
import './tooltip-item';

export interface ITooltipProps {

}

@customElement('lit-tooltip')
export class ToolTip extends LitElement{
    static styles = css`
    :host{
        display: inline-block;
        position: relative;
    }
    `;
    @property({type: Number}) width: number = 160;
    @property({type: Number}) height: number = 30;
    @property({type: String}) align: string = 'left';
    @state() opened: boolean = false;
    @state() top: number = 0;
    @state() left: number = 0;
    connectedCallback(){
        super.connectedCallback();
    }
    disconnectedCallback(){
        super.disconnectedCallback();
    }
    private _tooltipTemplate(){
        if(!this.opened){
            return nothing;
        }
        const styles = {
           //  width: this.width + "px",
           //  height: this.height + "px",
            top: this.top + "px",
            left: this.left + "px",
            textAlign: this.align,
        }
        return html`
        <tooltip-item 
            .opened = "${this.opened}"
            @close = "${this.close}"
            @tooltipUpdated = "${this._onTooltipUpdated}"
            style = "${styleMap(styles)}"><slot name = "tooltip"></slot></tooltip-item>`;
    }
    render(){
        return [
                this._tooltipTemplate(),
                html`<div 
                    @click = "${this._onClick}"
                    id = "content">
                    <slot></slot>
                </div>`
            ]
    }
    willUpdate(){
        if(this.opened){
            const data = this.getPosition();
            this.left = data.left;
            this.top = data.top;
        }
    }
    private close(){
        this.opened = false;
    }
    _onTooltipUpdated = (e: CustomEvent) => {
        this.width = e.detail.width;
        this.height = e.detail.height;
    }
    _onClick = () => {
        this.opened = !this.opened;
        //this.getPosition();
    }
    checkTop = (rect: DOMRect) => rect.y - this.height < 0;
    checkRight = (rect: DOMRect) => rect.x + this.width < window.innerWidth - 10;

    getTop = (rect: DOMRect) => this.checkTop(rect) ? rect.height : -this.height;
    getLeft = (rect: DOMRect) => {
        if(this.checkRight(rect)){
            return rect.width
        }
        if(this.width + rect.width > window.innerWidth){
            return -this.width + rect.width
        }

        return -this.width;
    };
    
    getPosition = () => {
        const rect = this.shadowRoot!.querySelector("#content")!.getBoundingClientRect();

        return {
            top: this.getTop(rect), 
            left: this.getLeft(rect)
        };
        
    }
    
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-tooltip': ToolTip;
    }
}
