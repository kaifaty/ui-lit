import { search } from './../svgIcons/index';
import { dropdown, cancel } from '../svgIcons';
import { button } from './../button/styles';
import { html, LitElement, css, TemplateResult, nothing, unsafeCSS } from 'lit';
import { formAssociated } from '../mixins/form-associated/index';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import '../button';
import './listbox';
import './group';
import './option';
import { IPropsSelect } from './interface';
import type { LitOption } from './option';
import { focusable } from '../mixins/focusable/index';
import { labled } from '../mixins/labled/index';
import { notificatable } from '../mixins/notificatable/index';
import { selectStyles } from './styles';
import { getEventDataset } from 'kailib';


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

    
    public isMenu = false;
    private _open: boolean = false;
    set open(value: boolean){
        if(value === this._open){
            return;
        }
        const oldValue = this._open;
        this._open = value;
        if(value){
            this.setSearchValue('');
        }
        this.requestUpdate('open', oldValue);
    }
    get open(){
        return this._open;
    }

    private _values: Set<string> = new Set();

    private _toggleInValues(value: string){
        if(this._values.has(value)){
            this._values.delete(value);
        }
        else{
            this._values.add(value);
        }
    }

    private _setInValues(value: string){
        this._values.clear();
        this._values.add(value);
    }
    private _value: string = ''
    get value(){
        return this.selectedOptions[0]?.value;
    }
    set value(value: string){
        this._value = value;
        this._setValue?.(value, false);
    }

    @state() options: LitOption[] = [];
    private seatchValue = '';

    setSearchValue(value: string){
        this.seatchValue = value;
        this.options.forEach(it => {
            it.visability = it.innerText.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        })
        this.requestUpdate();
    }
    

    set selectedIndex(value: number){
        if(value > this.length - 1 || value < 0) return;
        this._setValue(this.options[value].value)
    }
    get selectedIndex(){
        for(let i = 0; i < this.length; i ++){
            if(this.options[i].value === this.value) return i;
        }
        return -1;
    }
    get selectedOptions(){
        return this.options.filter(it => it.selected);
    }
    get selectedValues(){
        return [...this._values.values()].filter(it => it);
    }
    get selectedContent(){
        return this.selectedOptions[0]?.innerHTML || '-'
    }

    private _setValue = (value: string, notify = true) => {     
        if(this.multiple){
            this._toggleInValues(value);
            if(this.searchable){
                setTimeout(() => {
                    this.shadowRoot?.querySelector("input")?.focus();
                })
            }
        }
        else{
            this._setInValues(value);
            this.hide();
        }
        this.options.forEach(it => it.selected = this._values.has(it.value));
        this.requestUpdate();
        this.setSearchValue("");
        if(notify){ 
            this.notify()
        }
    }

    private _optionSelect = (e: CustomEvent) => {        
        this._setValue(e.detail);
    }

    private _optionConnect = (e: CustomEvent) => {
        const option = e.detail;
        option.setSelectHost(this);
        this.options.push(option);
        if(option.value === this._value){
            option.selected = true; 
        }
        if(option.selected){
            this._setValue(option.value);
        }

        this.requestUpdate()
        
    }

    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(!this._values.size){
            this.setAttribute("empty", "");
        }
        else{
            this.removeAttribute("empty");
        }
    }
    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('optionConnected', this._optionConnect as EventListener);
        this.addEventListener('optionSelect', this._optionSelect as EventListener);
        this.addEventListener('slotChanged', this._slotChanged as EventListener);
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('optionConnected', this._optionConnect as EventListener);
        this.removeEventListener('optionSelect', this._optionSelect as EventListener);
        this.removeEventListener('slotChanged', this._slotChanged as EventListener);
    }

    optionDisconnect = (option: LitOption) => {
        const index = this.options.indexOf(option);
        if(~index){
            this.options.splice(index, 1);
        }
    }

    get length(){
        return this.options.length;
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
        this._setValue(v, true);
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
        this.setSearchValue((e.target as HTMLInputElement).value);
        this.style.setProperty("--input-width", this.seatchValue.length * 8 + "px");
    }
    private _onSeatchClick(e: Event){
        e.stopPropagation()
    }
    private _contentTemplate(){
        if(this.multiple){
            return [...this._values.values()].map(value => {
                const option = this.options.filter(it => it.value === value)[0];
                if(!option) return "";
                return html`<button class = "button">
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
        return html`<slot name = "selected">${unsafeHTML(this.selectedContent)}</slot> `;
    }
    private _searchTamplate(){
        if(!this.searchable) return nothing;
        return html`<div class = "search-wrapper"><input .value = "${this.seatchValue}"
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
            @focusNext = "${this._focusNext}"
            @focusPrev = "${this._focusPrev}"
            @listboxClose = "${this.hide}"
            .open = "${this.open}">
            ${this.multiple ? nothing : this._searchTamplate()}
            <slot></slot> 
        </lit-listbox>`;
    }

    private _slotChanged = () => {
        this.requestUpdate();
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
