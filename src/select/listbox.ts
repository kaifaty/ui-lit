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
        const host = (this.parentNode as ShadowRoot).host.shadowRoot?.querySelector(".wrapper");
        const wrapper = this.shadowRoot!.querySelector(".wrapper") as HTMLElement;
        if(!host) return;
        const rect = host!.getBoundingClientRect();
        const topAvailable = rect.top;
        const bottomAvailable = window.visualViewport.height - rect.bottom;
        const floatRight = window.visualViewport.width / 2 - rect.left < 0;
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
            this.style.top = '0';
            this.style.transform = 'translateY(calc(-100% - 1px))';
            if(wrapper){
                wrapper.style.maxHeight = (topAvailable - 2)  + "px";
            }
            this.style.setProperty('--shadow-pos', "-1");
        }
        else{
            this.style.top = host.clientHeight + "px";
            this.style.transform = 'none';
            if(wrapper){
                wrapper.style.maxHeight = (bottomAvailable - 2)  + "px";
            }
            this.style.setProperty('--shadow-pos', "1");
        }

    }
    
    private _onClick = (e: Event) => {
        let clickInOption = false;
        for(const el of e.composedPath()){
            const tag = ((el as HTMLElement).tagName || '').toLowerCase();
            if(tag === 'lit-option'){
                clickInOption = true;
                break;
            }
        }
        if(!clickInOption){
            this.dispatchEvent(new CustomEvent('listboxClose', {
                detail: true,
                composed: true,
                bubbles: true
            }))
        }
        else{
            this._calcPosition();
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