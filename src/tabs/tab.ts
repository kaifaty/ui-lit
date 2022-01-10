import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { TTabType, LitTabs } from './tabs';
import '../button'
import { focusable } from '../mixins/focusable/index';

/**
 * --lit-tab-color Tab color
 * --lit-tab-color-default Inactive tab color 
 * --lit-tab-background Tab background color
 * --lit-tab-font-weight Tab font weight
 * --lit-tab-border Tab border color
 * --lit-tab-padding Tab padding
 * 
 */

@customElement('lit-tab')
export class LitTab extends focusable(LitElement){
    static styles = css`
    :host{
        display: block;
        flex: 1 0 auto;
        position: relative;
    }
    :host(:not([selected])){
        --lit-button-color: var(--lit-tab-color-default, #666);
    }
    :host([selected]) .border{
        display: block;
    }
    lit-button{
        width: 100%;
        contain: content;
        display: block;
    }
    .active.border{
        transform: none !important; 
        transition: 250ms transform cubic-bezier(0.4, 0, 0.2, 1);
    }
    .border{
        display: none;
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--lit-theme-primary, hsl(264, 100%, 66%));
        bottom: -2px;
    }
    `;
    @property({type: String}) value = "";
    @property({type: Boolean, reflect: true}) selected = false;
    @property({type: String, reflect: true}) type: TTabType = 'button';
    
    private _tabsHost: LitTabs | null = null;
    //private _keyPressController = new KeyDownController(this);
    private _currentX = 0;
    private _prevRect?: DOMRect | null = null;

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
            this._currentX = (this._prevRect?.x || 0) - this.getBoundingClientRect().x;            
        }
    }

    disconnectedCallback(){
        super.disconnectedCallback();
        this._tabsHost?.disconncetTab(this);
    }
    setSelect(value: boolean, prevRect?: DOMRect | null){
        this._prevRect = prevRect;
        this.selected = value;
    }
    private _selectNotify(){
        this.dispatchEvent(new CustomEvent('changed', {
            detail: this.value,
            bubbles: true
        }));
    }
    render(){
        return html`
        <lit-button 
            .tabindex = "${this.selected ? 0 : -1}"
            @click = "${this._selectNotify}" 
            @focus = "${this._onFocus}"
            @blur = "${this._onBlur}"
            ?borderless = "${this.type === 'tab'}">
            <slot></slot>
        </lit-button>
        <div class = "border ${this.active ? 'active' : ''}" 
             style = "transform: translateX(${this._currentX}px);"></div>`;
    }
    private _onFocus(){
        document.addEventListener('keydown', this.handlekeyDown);
    }
    private _onBlur(){
        document.removeEventListener('keydown', this.handlekeyDown);
    }
    protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(this.selected){
            if(!this.active){
                setTimeout(() => this.active = true);
            }
        }
        else{
            this.active = false;
        }
    }
    handlekeyDown = (e: KeyboardEvent) => {
        if(e.key === "ArrowRight"){
            (this.nextElementSibling as LitTab | null)?.focus?.()
        }
        if(e.key === "ArrowLeft"){
            (this.previousElementSibling as LitTab | null)?.focus?.()
        }
        if(e.key === "Enter" || e.key === " "){
            this._selectNotify();
        }
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-tab': LitTab;
    }
}
