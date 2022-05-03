import { search } from './../svgIcons/index';
import { dropdown, cancel } from '../svgIcons';
import { html, LitElement, css, TemplateResult, nothing, unsafeCSS } from 'lit';
import { formAssociated } from '../mixins/form-associated/index';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import '../button';
import './listbox';
import './group';
import './option';
import { IPropsSelect, TListboxPosition } from './interface';
import type { LitOption } from './option';
import { focusable } from '../mixins/focusable/index';
import { labled } from '../mixins/labled/index';
import { notificatable } from '../mixins/notificatable/index';
import { selectStyles } from './styles';
import { getEventDataset } from 'kailib';
export * from './option';


@customElement("lit-select")
export class LitSelect extends focusable(labled(notificatable(formAssociated(LitElement)))) implements IPropsSelect{
    static get styles (){
        return [...super.elementStyles, selectStyles]
    };
    static get properties(){
        return {
            open: {type: Boolean}
        }
    }
    
    @property({type: Number}) tabindex: number = 0;
    @property({type: Boolean, reflect: true}) multiple: boolean = false;
    @property({type: Boolean, reflect: true}) searchable: boolean = false;
    @property({type: String,}) searchPlaceholder: string = 'search';

    @property({type: String}) listboxPosition: TListboxPosition = 'auto';

    private _optionMap: Set<LitOption> = new Set();
    private _connectedTime = 0;
    public isMenu = false;
    private _open: boolean = false;
    set open(value: boolean){
        if(value === this._open){
            return;
        }
        const oldValue = this._open;
        this._open = value;
        if(value){
            this.searchValue = ''
        }
        this.requestUpdate('open', oldValue);
    }
    get open(){
        return this._open;
    }

    get value(){
        return this.selectedOptions[0]?.value;
    }
    set value(value: string){
        const option = this._optionByValue(value);
        if(!option){
            //Make possible to set value to lit-select on init
            if((Date.now() - this._connectedTime < 20) || !this._connectedTime){
                this._connectedTime = Date.now();
                setTimeout(()=> {
                    this.value = value
                }, 20)
            }
            else{
                console.warn("No option with value:", value);
            }
            return;
        }
        this.selectOption(option)
    }

    private _searchValue = '';
    get searchValue(){
        return this._searchValue;
    }
    set searchValue(value: string){
        this._searchValue = value;
        this.options.forEach(it => {
            it.visability = it.innerText.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        })
        this.requestUpdate();
    }
    
    get length(){
        return this.options.length;
    }    
    get options(){
        return [...this._optionMap.values()]
    }
    get sortedOptions(){
        return [...this.querySelectorAll('lit-option')] as LitOption[]
    }
    
    set selectedIndex(value: number){
        if(value > this.length - 1 || value < 0) return;    
        const option = this.sortedOptions[value];
        if(option){
            this.selectOption(option)
        }
    }
    get selectedIndex(){
        const options = this.sortedOptions;
        for(let i = 0; i < this.length; i ++){
            if(options[i].selected) return i;
        }
        return -1;
    }
    
    get selectedOptions(){
        return this.options.filter(item => item.selected);
    }
    get selectedValues(){
        return this.selectedOptions.map(item => item.value);
    }
    get selectedContent(){
        return this.selectedOptions[0]?.innerHTML || '-'
    }
    private _optionByValue(value: string){
        return this.options.find(item => item.value === value);
    }

    private _selectValue(value: string){
        const option = this._optionByValue(value);
        if(!option){
            console.warn("No option with value:", value);
            return;
        }
        this.selectOption(option);
    }
    private _unSelectValue(value: string){
        const option = this._optionByValue(value);
        if(!option){
            console.warn("No option with value:", value);
            return;
        }
        this.unSelectOption(option);
    }
    selectOption(option: LitOption){
        if(this.multiple){
            option.selected = !option.selected;
        }
        else if (option.selected){
            return;
        }
        else{
            this.selectedOptions.forEach(option => option.selected = false);
            option.selected = true;
        }
        this.requestUpdate();
        this.notify();
        setTimeout(() => this.focus(), 20);
    }
    unSelectOption(option: LitOption){
        option.selected = false;    
        this.requestUpdate();
    }


    private _onOptionChange = (e: CustomEvent) => {
        const option = e.detail as LitOption;
        if(!this.multiple && option.selected){
            return;
        }
        this.selectOption(option);
        if(!this.multiple){
            this.hide();
        }
    }
    private _onOptionSlotChanged = () => {
        this.requestUpdate();
    }
    private _onOptionConnect = (e: CustomEvent) => {
        const option = e.detail as LitOption;
        this._optionMap.add(option);
        option.setSelectHost(this);
        this.requestUpdate();
    }
    
    optionDisconnect = (option: LitOption) => {
        this._optionMap.delete(option);
        this.requestUpdate();
    }


    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(!this._optionMap.size){
            this.setAttribute("empty", "");
        }
        else{
            this.removeAttribute("empty");
        }
    }

    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('optionConnected', this._onOptionConnect as EventListener);
        this.addEventListener('optionSlotChanged', this._onOptionSlotChanged as EventListener);
        this.addEventListener('optionChange', this._onOptionChange as EventListener);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('optionConnected', this._onOptionConnect as EventListener);
        this.removeEventListener('optionSlotChanged', this._onOptionSlotChanged as EventListener);
        this.removeEventListener('optionChange', this._onOptionChange as EventListener);
    }


    private _toggle(){
        if(this.disabled) return;
        if(this.open){
            this.hide();
        }
        else{
            this.show();
            if(this.multiple){
                this.shadowRoot?.querySelector("input")?.focus();
            }
        }
    }

    hide(){
        if(!this.open) return;
        this.open = false;
    }

    show(){
        if(this.open) return;
        this.open = true;
    }

    private _clickCancel(e: Event){
        const v = getEventDataset(e, '.cancel', 'value')!
        this._unSelectValue(v);
        this.notify();
        e.stopPropagation();
    }

    private _getSlotElements = (slot = this.shadowRoot!.querySelector(`.slot`)): any => {
        const elements = (slot as HTMLSlotElement)?.assignedElements();
        if(elements[0] instanceof HTMLSlotElement){
            return this._getSlotElements(elements[0]);
        }
        return elements.reduce((acc, v) => {
            if([`lit-menu-item`, `lit-option`].includes(v.tagName.toLowerCase())){
                acc.push(v as HTMLElement);
            }
            else{
                v.querySelectorAll('lit-menu-item, lit-option')
                 .forEach(n => acc.push(n as HTMLElement))
            }
            return acc;
        }, [] as HTMLElement[]);
    }

    private _onSearchValue(e: Event){
        const value = (e.target as HTMLInputElement).value;
        this.searchValue = value;
        this.style.setProperty("--input-width", this.searchValue.length * 8 + "px");
    }
    private _onSeatchClick(e: Event){
        e.stopPropagation()
    }
    private _contentTemplate(){
        if(this.multiple){
            return this.selectedOptions.map(option => {
                if(!option) return "";
                return html`<button class = "button" ?disabled = "${option.disabled}">
                    ${unsafeHTML(option.innerHTML)}
                    <span 
                        class = "cancel"
                        data-value = "${option.value}"
                        @click = "${this._clickCancel}" >
                        ${cancel()}
                    </span>
                </button>`;
            });
        }
        return html`<slot name = "selected">${unsafeHTML(this.selectedOptions[0]?.innerHTML || '-')}</slot>`;
    }
    private _searchTamplate(){
        if(!this.searchable) return nothing;
        return html`<div class = "search-wrapper"><input .value = "${this.searchValue}"
                            @click = "${this._onSeatchClick}"
                            @input = "${this._onSearchValue}"
                            placeholder = "${this.multiple ? "" : this.searchPlaceholder}"
                            type = "text" /></div>`;
    }
    private _containerTemplate(data: TemplateResult){
        if(this.multiple){
            return html`
            <div class = "wrapper"
                 tabindex = "0"
                 @keydown = "${this._handlekeyDown}"
                 @click = "${this._toggle}">
                ${data}
            </div>`;
        }
        return html`<lit-button 
                        @keydown = "${this._handlekeyDown}"
                        @click = "${this._toggle}">
                        <div class = "wrapper">${data}</div>    
                    </lit-button>`
    }
    private _wrapperTemplate(){
        return this._containerTemplate(html`
        ${this._contentTemplate()}
        ${this.multiple ? this._searchTamplate() : nothing}
        <div class = "icon-wrapper">
            ${
                this.multiple && this.searchable && this.open 
                    ? search()
                    : dropdown(this.open)
            }
        </div>`);
    }

    render(){        
        return html`
        ${super.render()}
        ${this._wrapperTemplate()}
        <lit-listbox 
            .position = "${this.listboxPosition}"
            @focusNext = "${this._focusNext}"
            @focusPrev = "${this._focusPrev}"
            @listboxClose = "${this.hide}"
            .open = "${this.open}">
            ${this.multiple ? nothing : this._searchTamplate()}
            <slot></slot> 
        </lit-listbox>`;
    }


    private _focusNext(e: CustomEvent){
        (document.activeElement?.nextElementSibling as HTMLElement)?.focus();
    }

    private _focusPrev(e: CustomEvent){
        (document.activeElement?.previousElementSibling as HTMLElement)?.focus();
    }

    private _handlekeyDown = (e: KeyboardEvent) => {    
        if(e.key === "Enter" || e.key === " "){
            this._toggle();
        }
        if(e.key === "ArrowDown"){
            if(this.isMenu){
                const d = this._getSlotElements();
                d[this.selectedIndex + 1]?.focus();
            }
            else{
                this.selectedIndex = this.selectedIndex + 1;
            }
            e.preventDefault();
        }
        if(e.key === "ArrowUp"){
            this.selectedIndex = this.selectedIndex - 1;
            e.preventDefault();
        }
        if(e.key === "Escape"){
            this.hide();
        }
        if(e.key === "Tab"){
            if(this.open){
                this.hide();
                e.preventDefault();
            }
        }
    }

    notify(){
        this.dispatchEvent(new CustomEvent('changed', {
            detail: this.value,
            bubbles: true,
            composed: true
        }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-select': LitSelect;
    }
}
