import { noselectText } from '../styles/noselect';
import type { SelectItem } from './select-item';
import { classMap } from 'lit/directives/class-map';
import { styleMap } from 'lit/directives/style-map';
import { html, LitElement, css, TemplateResult, nothing, unsafeCSS } from 'lit';
import { formAssociated } from '../form-associated/index';
import { customElement, property, state } from 'lit/decorators';
import { input } from '../styles/input';
import { getEventDataset, isChildOfElement } from 'kailib';
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
export class SelectElement extends formAssociated(LitElement) implements IPropsSelect{
    static styles = css`
    :host{
        display: inline-block;
        position: relative;
    }
    :host(:not([disabled]):focus){
        outline: 1px solid var(--select-outline-focus, #ccc);
    }
    .icon-dropdown{
        margin-left: 10px;
    }
    .selected{
        min-width: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--select-background);
        border: var(--select-border, 1px solid  #ccc);
        padding: var(--select-padding, 5px 10px);
    }
    .items.open{
        display: block;
    }
    .items{
        display: none;
        position: absolute;
        border: var(--select-border, 1px solid #ccc);
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
    `;
    
    private _clickController = new ClickController(this);
    private _keyPressController = new KeyDownController(this);
    private _focusController = new FocusController(this);
    @property({type: Number}) optionsWidth: number = 0;
    @property({type: Number}) optionsHeight: number = 0;
    @property({type: String}) value: string = '';
    @state() open: boolean = false;
    @state() _slot: DocumentFragment | null = null;
    tabIndex = 0;
    
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
    firstUpdated(){
        this._update();
    }
    private _onChanged(e: CustomEvent){
        this.value = e.detail.value;
        this._slot = e.detail.slot;
        this.open = false;
        this.dispatchEvent(new CustomEvent("changed", {
            detail: this.value,
            bubbles: true
        }))
    }
    private _toggle(){
        if(this.disabled) return;
        this.open = !this.open;
    }
    private _selectedTemplate(){
        return html`
        <slot name = "selected">${this._slot}</slot>
        <slot name = "icon">
            <div class = "icon-dropdown"><lit-icon 
                class = "${this.open ? 'dropup' : ''}" 
                icon = "dropdown"></lit-icon></div>
        </slot>
        `;
    }
    render(){
        return html`
        <div class = "selected" 
             @click = "${this._toggle}">
            ${this._selectedTemplate()}
        </div>
        <div class = "items below ${this.open ? 'open' : ''}">
            <slot></slot>
        </div>`;
    }
    private _select(isNext: boolean){            
        if(this.disabled) return;
        if(!this._focusController.focused && !this.open){
            return;
        }        
        const item = this.querySelector(`lit-select-item[value="${this.value}"]`) as SelectItem;
        const select = isNext 
            ? item?.nextElementSibling as (SelectItem | null) 
            : item?.previousElementSibling as (SelectItem | null);

        if(!select) return;
        this.value = select.value;
        if(this.open){
            select.focus();
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
                    this.value = (focused as SelectItem).value;
                    this.open = false;
                }
            }
        }
    }
    handleDocumentClick(e: Event){
        const isChild = isChildOfElement(e.target as HTMLElement, this);
        if(!isChild){
            this.open = false;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-select': SelectElement;
    }
}
