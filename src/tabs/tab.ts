import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { TTabType, LitTabs } from './tabs';
import '../button'
import { focusable } from '../mixins/focusable/index';
import { tabStyles } from './styles';



@customElement('lit-tab')
export class LitTab extends focusable(LitElement){
    static styles = tabStyles;
    @property({type: String}) value = "";
    @property({type: Boolean, reflect: true}) selected = false;
    @property({type: String, reflect: true}) type: TTabType = 'button';
    
    private _tabsHost: LitTabs | null = null;
    //private _keyPressController = new KeyDownController(this);
    private _currentX = 0;
    private _prevRect?: DOMRect | null = null;
    private _currentWidthScale = 1

    @state() active: boolean = false;

    setTabsHost(value: LitTabs){
        this._tabsHost = value;
    }
    connectedCallback(){
        super.connectedCallback();
        this.dispatchEvent(new CustomEvent('tabConnected', {
            detail: this,
            bubbles: true
        }))
    }
    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {        
        if(_changedProperties.has("selected") && this.selected && this._prevRect){
            const rect = this.getBoundingClientRect();
            this._currentX = (this._prevRect?.x || 0) - rect.x;      
            this._currentWidthScale = Math.round(this._prevRect.width / rect.width * 1e2) / 1e2;
        }
    }

    disconnectedCallback(){
        super.disconnectedCallback();
        this._tabsHost?.disconncetTab(this);
    }
    setSelection(value: boolean, prevRect?: DOMRect | null){
        this._prevRect = prevRect;
        this.selected = value;
    }
    private _selectNotify(e: Event){
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('changed', {
            detail: this.value,
            bubbles: true
        }));
    }
    private _prevent(e: Event){
        e.preventDefault();
    }

    render(){
        return html`
        <lit-button 
            .tabindex = "${-1}"
            @mousedown = "${this._prevent}" 
            @click = "${this._selectNotify}" 
            ?borderless = "${this.type === 'tab'}">
            <slot></slot>
        </lit-button>
        <div class = "border ${this.active ? 'active' : ''}" 
             style = "transform: translateX(${this._currentX}px)  scaleX(${this._currentWidthScale});"></div>`;
    }
    protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(this.selected){
            if(!this.active){
                setTimeout(() => this.active = true, 10);
            }
        }
        else{
            this.active = false;
        }
    }
    /*
    private _handlekeyDown = (e: KeyboardEvent) => {
        if(e.key === "ArrowRight"){
            (this.nextElementSibling as LitTab | null)?.focus?.()
        }
        if(e.key === "ArrowLeft"){
            (this.previousElementSibling as LitTab | null)?.focus?.()
        }
        if(e.key === "Enter" || e.key === " "){
            this._selectNotify();
        }
    }*/
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-tab': LitTab;
    }
}
