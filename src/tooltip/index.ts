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
    }
    `;
    @property({type: Number}) width: number = 220;
    @property({type: Number}) height: number = 30;
    @property({type: String}) align: string = 'left';
    @state() opened: boolean = false;
    @state() top: number = 0;
    @state() left: number = 0;
    
    /*
    get isMobile(){

    }*/

    connectedCallback(){
        super.connectedCallback();
    }
    disconnectedCallback(){
        super.disconnectedCallback();
    }
    willUpdate(){
        if(this.opened){
            const data = this.getPosition();
            this.left = data.left;
            this.top = data.top;
        }
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
    public open(){
        this.opened = true;
    }
    public close(){
        this.opened = false;
    }
    private _onTooltipUpdated = (e: CustomEvent) => {
        this.width = e.detail.width;
        this.height = e.detail.height;
    }
    private _onClick = () => {
        if(this.opened){
            this.close();
        }
        else{
            this.open();
        }
    }
    private checkTop (rect: DOMRect) {
        return rect.y - this.height < 0
    };
    private checkRight (rect: DOMRect) { 
        return rect.x + rect.width + this.width < window.innerWidth - 10
    };
    private checkLeft (rect: DOMRect) {
        return rect.x - this.width > 10;
    }

    getTop = (rect: DOMRect) => this.checkTop(rect) ? rect.height : -this.height;
    getLeft = (rect: DOMRect) => {
        if(this.checkRight(rect)){
            return rect.width;
        }
        else if(this.checkLeft(rect)) {
            return -this.width;
        }
        else {
            return 10 - rect.x;
        }
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
