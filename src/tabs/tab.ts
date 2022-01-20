import { buttonCSSVarsNames } from './../button/styles';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { TTabType, LitTabs } from './tabs';
import '../button'
import { focusable } from '../mixins/focusable/index';
import { _vTabs as _v } from './styles';

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
        ${buttonCSSVarsNames.background}: ${_v.background};
        ${buttonCSSVarsNames.color}: ${_v.color};
        height: 32px;
    }
    :host(:not([selected])){
        ${buttonCSSVarsNames.color}: ${_v.colorDefault};
    }
    :host([selected]) .border{
        display: block;
        
    }
    :host([tab]){
        ${buttonCSSVarsNames.border}: none;
    }
    lit-button{
        width: 100%;
        contain: content;
        display: block;
        height: calc(100% - 2px);
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
        background-color: ${_v.color};
        bottom: 0;
        transform-origin: left;
    }
    `;
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
    private _selectNotify(){
        this.dispatchEvent(new CustomEvent('changed', {
            detail: this.value,
            bubbles: true
        }));
    }
    render(){
        return html`
        <lit-button 
            .tabindex = "${0}"
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
