import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TSelectItem } from './interface';
import { mobileAndTabletCheck } from 'kailib';
import { scrollbar } from '../styles/scrollbar';




@customElement("lit-listbox")
export class ListBox extends LitElement{
    static styles = [css`
    :host{
        display: none;
        box-sizing: border-box;
        position: absolute;
        isolation: isolate;
        box-sizing: border-box;
    }
    :host([open]){
        display: block;
    }
    .wrapper{
        overflow-y: auto;
        overflow-x: hidden;
        border: var(--lit-listbox-border, 1px solid #eee);
        color: var(--lit-listbox-color, hsl(246, 15%, 5%));
        box-shadow: var(--lit-listbox-shadow, 3px 3px 3px rgba(0,0,0,0.3));
        background-color: var(--lit-listbox-background);

    }
    :host([mobile][open]) {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.45);
        z-index: 1;
    }
    :host([mobile]) .wrapper{
        border-radius: 10px;
        min-width: 280px;
        max-width: 90%;
        max-height: 50%;
        margin: 0 auto;
        border: none;
        color: var(--lit-listbox-mobile-color, hsl(246, 15%, 99%));
        background-color: var(--lit-listbox-mobile-background, hsl(246, 15%, 18%));
        box-shadow: var(--lit-border-mobile-shadow, 3px 3px 3px rgba(0,0,0,0.3));

    }
    :host([mobile]){
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
    }`, 
    scrollbar];
    @property({type: Boolean, reflect: true}) open: boolean = false;    
    @property({type: Boolean, reflect: true}) mobile: boolean = mobileAndTabletCheck();
    

    private _calcPosition(){
        if(!this.isConnected || this.mobile) return;
        const rect = (this.parentNode as ShadowRoot).querySelector('lit-button')!.getBoundingClientRect();
        const topAvailable = rect.top;
        const bottomAvailable = window.visualViewport.height - rect.bottom;
        this.style.minWidth = rect.width + "px"; 

        const wrapper = this.shadowRoot!.querySelector(".wrapper") as HTMLElement;            
        if(topAvailable > bottomAvailable){
            this.style.top = 'initial';
            this.style.bottom = rect.height + "px";
            if(wrapper){
                wrapper.style.maxHeight = (topAvailable - 2)  + "px";
            }
        }
        else{
            this.style.top = rect.height + "px";
            this.style.bottom = 'initial';
            if(wrapper){
                wrapper.style.maxHeight = (bottomAvailable - 2)  + "px";
            }
        }
    }
    
    private _onClick = (e: Event) => {
        const wrapper = this.shadowRoot?.querySelector("wrapper");
        if(!e.composedPath().find(it => it === wrapper)){
            this.open = false
            this.dispatchEvent(new CustomEvent('listboxClose', {
                detail: true,
                composed: true,
                bubbles: true
            }))
        }

    }
    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(_changedProperties.has('open')){
            this._calcPosition();
        }
    }
    protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
        setTimeout(() => {
            if(_changedProperties.has('open')){
                if(this.open){
                    document.addEventListener("click", this._onClick);
                }
                else{
                    document.removeEventListener("click", this._onClick);
                }
            }
        })
    }

    render(){
        if(!this.open) return nothing;
        return html`<div class = "wrapper ff-scrollbar"><slot></slot></div>`;
    }
}