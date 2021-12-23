import { noselectText } from '../styles/noselect';
import { styleMap } from 'lit/directives/style-map';
import { unsafeHTML } from 'lit/directives/unsafe-html';
import { html, LitElement, css, TemplateResult, nothing, unsafeCSS } from 'lit';
import { formAssociated } from '../form-associated/index';
import { customElement, property, state } from 'lit/decorators';
import { isClickInElement } from 'kailib';
import { scrollbar } from '../styles/scrollbar';
import { FormAssociatedProps } from '../form-associated/interface';
import { FocusController } from '../controllers/FocusContriller';


export type TSelectItem = {
    content: string | TemplateResult
    value: string
}


export interface IPropsSelect extends FormAssociatedProps{
    items: TSelectItem[],
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
    .item{
        display: block;
        padding: var(--lit-select-padding, 5px 10px);
        cursor: pointer;
        background-color: var(--lit-select-item-background, #fff);
    }
    .item:focus{
        outline: 2px solid var(--lit-select-outline-focus, #ccc);
    }
    .item:hover{
        background-color: var(--lit-select-item-background-hover, #eee);
    }
    `, scrollbar];
    
    private _focusController = new FocusController(this);
    @property({type: Array}) items: TSelectItem[] = [];
    @property({type: Number}) optionsWidth: number = 0;
    @property({type: Number}) optionsHeight: number = 0;
    @property({type: String}) value: string = '';
    @property({type: String}) staticLabel: string | TemplateResult = '';
    @state() open: boolean = false;
    
    tabIndex = 0;
    
    _clickHandleFn: Function | null = null;
    _keyHandleFn: Function | null = null;

    setValue(value: string){
        this.value = value;
        this.dispatchEvent(new CustomEvent("changed", {
            detail: this.value,
            bubbles: true
        }));
        this._hide();
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
        const selected = this.items.filter(it => it.value == this.value)[0];
        return html`
        <slot name = "selected">
            ${selected ? selected.content : '-' }
        </slot>
        <slot name = "icon">
            <div class = "icon-dropdown"><lit-icon 
                class = "${this.open ? 'dropup' : ''}" 
                icon = "dropdown"></lit-icon></div>
        </slot>`;
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
            ${this.items.map(it => 
                html`<div class = "item "
                          tabIndex = "0"
                          data-value = "${it.value}"
                          @click = "${() => this.setValue(it.value)}" >${it.content}</div>`
            )}
        </div>`;
    }

    private _select(isNext: boolean){            
        if(this.disabled) return;
        if(!this._focusController.focused && !this.open){
            return;
        }        
        const item = this.shadowRoot!.querySelector(`.item[data-value="${this.value}"]`) as HTMLElement;
        const select = isNext 
            ? item?.nextElementSibling as (HTMLElement | null) 
            : item?.previousElementSibling as (HTMLElement | null);

        if(!select) return;

        this.value = select.dataset!.value!;

        if(this.open){
            select.focus();
        }
    }

    private handleClick(e: Event){
        if(!isClickInElement(e, this)){
            this._hide()
        }
    }

    private handlekeyDown(e: KeyboardEvent){
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
                const focused = this.shadowRoot!.querySelector(".item:focus");
                const value = (focused as HTMLElement)?.dataset.value;
                if(value){
                    this.setValue(value);
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
