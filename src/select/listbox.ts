import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { mobileAndTabletCheck } from 'kailib';
import { scrollbar } from '../styles/scrollbar';
import { listboxStyles } from './styles';




@customElement("lit-listbox")
export class ListBox extends LitElement{
    static styles = [listboxStyles, scrollbar];
    @property({type: Boolean, reflect: true}) open: boolean = false;    
    @property({type: Boolean, reflect: true}) mobile: boolean = mobileAndTabletCheck();
    

    private _calcPosition(){
        if(!this.isConnected || this.mobile) return;
        const rect = (this.parentNode as ShadowRoot).host!.getBoundingClientRect();
        const topAvailable = rect.top;
        const bottomAvailable = window.visualViewport.height - rect.bottom;
        const floatRight = window.visualViewport.width / 2 - rect.left < 0;
        const wrapper = this.shadowRoot!.querySelector(".wrapper") as HTMLElement;   

        this.style.minWidth = rect.width + "px"; 

        if(floatRight){
            this.style.right = '0';
            this.style.left = 'initial';
        }
        else{
            this.style.right = 'initial';
            this.style.left = '0';
        }
        if(topAvailable > bottomAvailable){
            this.style.top = 'initial';
            this.style.bottom = rect.height + "px";
            if(wrapper){
                wrapper.style.maxHeight = (topAvailable - 2)  + "px";
            }
            this.style.setProperty('--shadow-pos', "-1");
        }
        else{
            this.style.top = rect.height + "px";
            this.style.bottom = 'initial';
            if(wrapper){
                wrapper.style.maxHeight = (bottomAvailable - 2)  + "px";
            }
            this.style.setProperty('--shadow-pos', "1");
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