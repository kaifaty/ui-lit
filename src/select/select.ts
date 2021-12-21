import { noselectText } from '../styles/noselect';
import type { LitSelectItem } from './select-item';
import { classMap } from 'lit/directives/class-map';
import { styleMap } from 'lit/directives/style-map';
import { html, LitElement, css, TemplateResult, nothing, unsafeCSS } from 'lit';
import { formAssociated } from '../form-associated/index';
import { customElement, property, state } from 'lit/decorators';
import { input } from '../styles/input';
import { getEventDataset, isChildOfHost, isClickInElement } from 'kailib';
import { ClickController } from '../controllers/ClickController';
import { KeyDownController } from '../controllers/KeyController';
import { calcPositionForPopup } from '../helpers/position';
import { scrollbar } from '../styles/scrollbar';
import { FormAssociatedProps } from '../form-associated/interface';
import { FocusController } from '../controllers/FocusContriller';


export type TSelectItem = {
    text: string | TemplateResult
    value: string
}

export interface IPropsSelect extends FormAssociatedProps{
    // items: TSelectItem[],
    disabled: boolean
    optionsWidth: number
    optionsHeight: number
}

@customElement("lit-select")
export class LitSelect extends formAssociated(LitElement) implements IPropsSelect{
    static styles = [css`
    :host{
        display: inline-block;
        position: relative;
    }
    :host(:not([disabled]):focus){
        outline: 1px solid var(--lit-select-outline-focus, #ccc);
    }
    .icon-dropdown{
        margin-left: 10px;
    }
    .selected{
        min-width: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--lit-select-background);
        border: 1px solid  var(--lit-select-border,  #ccc);
        padding: var(--lit-select-padding, 5px 10px);
        cursor: pointer;
    }
    .items.open{
        display: block;
    }
    .items{
        display: none;
        position: absolute;
        border: 1px solid var(--lit-select-border, #ccc);
        background-color: var(--lit-select-item-background);
        z-index: var(--lit-select-items-zindex, 20);
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
    }
    .items.above{
        top: 0;
        transform: translateY(-100%);
    }
    .items.below{
        bottom: 0;
        transform: translateY(100%);
    }
    :host([disabled]){
        opacity: 0.5;
        ${unsafeCSS(noselectText)};
    }
    `, scrollbar];
    
    //private _clickController = new ClickController(this);
    private _focusController = new FocusController(this);
    @property({type: Number}) optionsWidth: number = 0;
    @property({type: Number}) optionsHeight: number = 0;
    @property({type: String}) value: string = '';
    @property({type: String}) staticLabel: string | TemplateResult = '';
    @state() open: boolean = false;
    @state() _slot: DocumentFragment | null = null;
    tabIndex = 0;
    
    _clickHandleFn: Function | null = null;
    _keyHandleFn: Function | null = null;

    connectedCallback(){
        super.connectedCallback();
        this.addEventListener('selectChanged', this._onChanged as EventListener);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this.removeEventListener('selectChanged', this._onChanged as EventListener);
    }

    private _update(){
        this.querySelectorAll("lit-select-item").forEach(it => {
            if(it.value === this.value){
                this._slot = it.getConent();
            }
        })
    }
    willUpdate(){
        this._update();
    }
    firstUpdated(d: any){
        super.firstUpdated(d);
        this._update();
    }
    private _onChanged(e: CustomEvent){
        this.value = e.detail.value;
        this._slot = e.detail.slot;
        this._hide()
        this.dispatchEvent(new CustomEvent("changed", {
            detail: this.value,
            bubbles: true
        }))
    }

    private _toggle(){
        if(this.disabled) return;
        if(this.open){
            this._hide();
        }
        else{
            this._show();
        }
    }

    private _hide = () => {
        this.open = false;
        document.removeEventListener('click', this._clickHandleFn as EventListener);
        this._clickHandleFn = null;
    }

    private _show = () => {
        this.open = true;
        if(!this._clickHandleFn){
            this._clickHandleFn = (e: Event) => this.handleClick(e);
            document.addEventListener('click', this._clickHandleFn as EventListener);
        }
        if(!this._keyHandleFn){
            this._keyHandleFn = (e: KeyboardEvent) => this.handlekeyDown(e)            
            document.addEventListener('keydown', this._keyHandleFn as EventListener);
        }
    }

    private _selectedTemplate(){
        return html`
        ${
            this.staticLabel 
                ? this.staticLabel
                : (this._slot 
                    ? html`<div>${this._slot}</div>` 
                    : html`<slot name = "selected">-</slot>`)
        }
        <slot name = "icon">
            <div class = "icon-dropdown"><lit-icon 
                class = "${this.open ? 'dropup' : ''}" 
                icon = "dropdown"></lit-icon></div>
        </slot>
        `;
    }
    render(){
        const stylesData = {
            height: this.optionsHeight ? this.optionsHeight + "px" : 'initial',
            width: this.optionsWidth ? this.optionsWidth + "px" : '100%'
        };
        
        return html`
        <div class = "selected" 
             @click = "${this._toggle}">
            ${this._selectedTemplate()}
        </div>
        <div style = "${styleMap(stylesData)}" 
             class = "items ff-scrollbar below ${this.open ? 'open' : ''}" >
            <slot></slot>
        </div>`;
    }

    private _select(isNext: boolean){            
        if(this.disabled) return;
        if(!this._focusController.focused && !this.open){
            return;
        }        
        const item = this.querySelector(`lit-select-item[value="${this.value}"]`) as LitSelectItem;
        const select = isNext 
            ? item?.nextElementSibling as (LitSelectItem | null) 
            : item?.previousElementSibling as (LitSelectItem | null);

        if(!select) return;
        this.value = select.value;
        if(this.open){
            select.focus();
        }
    
    }

    handleClick(e: Event){
        if(!isClickInElement(e, this)){
            this._hide()
        }
    }
    handlekeyDown(e: KeyboardEvent){
        if(e.key === "ArrowDown"){
            this._select(true)
        }
        if(e.key === "ArrowUp"){
            this._select(false)
        }
        if(e.key === "Enter"){
            if(this._focusController.focused && this.open === false){
                this.open = true;
            }
            else if(this.open){
                const focused = this.querySelector("lit-select-item:focus");
                if(focused){
                    this.value = (focused as LitSelectItem).value;
                    this._hide()
                }
            }
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-select': LitSelect;
    }
}
