import { noselectText } from './../styles/noselect';
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

@customElement("select-element")
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
        border: 1px solid var(--select-border, #ccc);
        padding: var(--select-padding, 5px 10px);
    }
    .items.open{
        display: block;
    }
    .items{
        display: none;
        position: absolute;
        border: 1px solid var(--select-border, #ccc);
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
        this.querySelectorAll("select-item").forEach(it => {
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
            <div class = "icon-dropdown"><icon-element 
                class = "${this.open ? 'dropup' : ''}" 
                icon = "dropdown"></icon-element></div>
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
        const item = this.querySelector(`select-item[value="${this.value}"]`) as SelectItem;
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
                const focused = this.querySelector("select-item:focus");
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
      'select-element': SelectElement;
    }
}

@customElement("select-element_")
export class SelectElement_ extends formAssociated(LitElement) implements IPropsSelect{
    static styles = [
        input, 
        scrollbar,
        css`
        :host{
            display: inline-block;
            min-width: 80px;
        }
        .content{
            display: grid;
            background-color: var(--select-background);
            border: 1px solid var(--select-border, #ccc);
            grid-template-columns: auto auto;
            padding: var(--select-padding, 5px 10px);
            cursor: pointer;
        }
        .content:focus{
            outline: 1px solid var(--select-outline-focus, #ccc);
        }
        .options.open{
            display: block;
        }
        .options{
            position: absolute;
            display: none;
            border: 1px solid var(--select-border, #ccc);
            box-sizing: border-box;
            overflow-y: auto;
        }
        .option{
            cursor: pointer;
            padding: var(--option-padding, 5px 10px);
        }
        .option:focus, 
        .option:hover{
            background-color: var(--option-hover, #ccc);
        }
        .disabled{
            opacity: 0.5;
        }
        .icon-dropdown{
            display: flex;
            align-items: center;
            justify-content: end;
        }`
    ];
    @property({type: Array}) items: TSelectItem[] = [];
    @property({type: String}) value: string = '';
    @property({type: Number}) optionsWidth: number = 0;
    @property({type: Number}) optionsHeight: number = 0;
    @state() open: boolean = false;
    private _clickController = new ClickController(this);
    private _keyPressController = new KeyDownController(this);
    private _isFocus = false;
    private _focusTime = 0;
    private _focusedOption: string = '';
    private _optionsPosition = {x: 0, y: 0};

    selected(){
        return this.items.filter(it => this.value === it.value)[0];
    }
    currentOption(){
        return this.items.findIndex(it => it.value === this.value);
    }
    firstUpdated(){
        if(!this.optionsWidth){
            this.optionsWidth = this.clientWidth;
        }
    }
    willUpdate(){
        if(this.open){
            this._optionsPosition = calcPositionForPopup(this, {width: this.optionsWidth, height: this.optionsHeight || 40});
        }
    }
    private _contentTemplate(){
        if(!this.open) return nothing;
        const optionsClass = {
            options: true,
            "ff-scrollbar": true,
            open: this.open,

        }
        const optionStyles = {
            width: this.optionsWidth + "px",
            height: (this.optionsHeight ? this.optionsHeight + "px" : "initial"),
            //transform: `translate(0, 100%);`
            left: this._optionsPosition.x + "px",
            top: this._optionsPosition.y + "px"
        };
        return html`<div
            style = "${styleMap(optionStyles)}"
            class = "${classMap(optionsClass)}">${this.items.map((it, i) => {
            const className = {
                selected: this.value === it.value,
                option: true,
                ['value-' + it.value]: true
            };
            return html`<div 
                tabindex = "0"
                data-index = "${i}"
                data-value = "${it.value}"
                @click = "${this._handleSelectClick}" 
                @focus = "${this._handleOptionFocus}" 
                class = "${classMap(className)}">${it.text}</div>`
        })}</div>`;
    }
    focus(){
        (this.shadowRoot?.querySelector(".content") as HTMLElement)?.focus();
    }
    render(){
        return html`
        <div 
            @click = "${this.handleClick}"
            tabindex = "0"
            class = "content">
            <div>${this.selected()?.text || '-'}</div>
            <slot name = "icon">
                <div class = "icon-dropdown"><icon-element 
                    class = "${this.open ? 'dropup' : ''}" 
                    icon = "dropdown"></icon-element></div>
            </slot>
        </div>
        ${this._contentTemplate()}`;
    }
    
    updated(p: Map<string, unknown>){
        super.updated(p);
        if(this.open){
            (this.shadowRoot?.querySelector(".value-" + this.value) as HTMLElement)?.focus()
        }
    }
    
    setValue(value: string){
        this.value = value;
        this.focus();
    }
    nextSelect(){
        let current = this.currentOption();
        current++;
        if(current > this.items.length - 1){
            current = 0;
        }
        this.setValue(this.items[current].value);
    }
    prevSelect(){
        let current = this.currentOption();
        current--;
        if(current < 0){
            current = this.items.length - 1;
        }
        this.setValue(this.items[current].value);
    }
    private _handleOptionFocus(e: Event){
        this._focusedOption = (e.target as HTMLElement).dataset.value!;
    }
    private _handleSelectClick(e: Event){
        this.setValue(getEventDataset(e, '.option', 'value')!);
        this.open = false;
        e.stopPropagation();
    }  
    handlekeyDown(e: KeyboardEvent){
        if(e.key === "ArrowDown"){
            this.nextSelect();
        }
        if(e.key === "ArrowUp"){
            this.prevSelect();
        }
        if(e.key === "Enter"){
            if(this.open){                
                this.setValue(this._focusedOption)
                this.open = false;
            }
            else{
                this.open = true;
            }
        }
    }
    handleDocumentClick(e: Event){
        const isChild = isChildOfElement(e.target as HTMLElement, this);
        if(!isChild){
            this.open = false;
        }
    }
    private handleClick(){
        this.open = !this.open;
    }
}

