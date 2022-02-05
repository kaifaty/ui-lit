import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map';
import { LitElement, html, css, nothing } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import './tooltip-item';
import { getRootRalitive } from '../helpers/getRalative';
import { scrollbar } from '../styles/scrollbar';

export interface ITooltipProps {

}

@customElement('lit-tooltip')
export class ToolTip extends LitElement{
    static styles = [css`
    :host{
        display: inline-block;
        cursor: pointer;
        position: relative;
    }
    `, scrollbar];
    @state() opened: boolean = false;
    

    private _tooltipTemplate(){
        if(!this.opened){
            return nothing;
        }
        const styles = {
            ...this.getPosition(),
        }
        return html`
        <tooltip-item
            class = "ff-scrollbar"
            @close = "${this.close}"
            
            style = "${styleMap(styles)}"><slot name = "tooltip"></slot></tooltip-item>`;
    }
    render(){
        return [
                this._tooltipTemplate(),
                html`<div @click = "${this._onClick}"
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
    private _onClick = () => {
        if(this.opened){
            this.close();
        }
        else{
            this.open();
        }
    }
    
    getPosition = () => {
        const targetRect = this.getBoundingClientRect();
        const awailableWidth = window.visualViewport.width;
        const awailableHeight = window.visualViewport.height
        
        const x = (targetRect.x) //|| rect.x;
        const y = (targetRect.y) //|| rect.y;

        const availableTop = y;
        const availableBottom = awailableHeight - y;
        const availableLeft = x;
        const availableRight = awailableWidth - x;
        return {
            top: availableTop < availableBottom ? (availableTop + targetRect.height) + `px` : "initial",
            bottom: availableTop > availableBottom ? availableBottom + `px` : "initial",
            maxHeight: availableTop < availableBottom ? (availableBottom - 10) + `px` : (availableTop - 10) + `px`,

            left: availableLeft < availableRight ? (availableLeft + targetRect.width) + `px` : 'initial',
            right: availableLeft > availableRight ? (availableRight + 10) + `px` : 'initial', 
            maxWidth: availableLeft < availableRight ? (availableRight - targetRect.width - 10)  + `px` : (availableLeft - 10) + 'px'
        };
        
    }
    
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-tooltip': ToolTip;
    }
}
