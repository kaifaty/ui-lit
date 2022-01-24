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
    @property({type: Boolean}) multiple: boolean = false;
    //@property({type: String}) type: 'select-one' | 'select-multiple' = 'select-one';

    
    public isMenu = false;
    private _open: boolean = false;
    set open(value: boolean){
        if(value === this._open){
            return;
        }
        const oldValue = this._open;
        this._open = value;
        this.requestUpdate('open', oldValue);
    }
    get open(){
        return this._open;
    }

    private _value: string = '';
    get value(){
        return this._value
    }
    set value(value: string){
        this._setValue?.(value, false);
    }

    @state() options: LitOption[] = [];

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
    get selectedContent(){
        const selected = this.options.find(it => it.selected);
        if(selected){
            return selected.innerHTML;
        }
        return '-'
    }

    private _setValue = (value: string, notify = true) => {        
        if(value === this.value){
            return;
        }
        this._value = value;
        const exist = this.options.find(it => it.value === value);
        if(!exist) return;
        this.options.forEach(it => it.selected = it.value === value)
        this.requestUpdate()
        if(notify){
            this.dispatchEvent(new CustomEvent('changed', {
                detail: value,
                bubbles: true,
                composed: true
            }));
        }
    }

    private _optionSelect = (e: CustomEvent) => {
        this.open = false;
        this._setValue(e.detail);
    }

    private _optionConnect = (e: CustomEvent) => {
        const option = e.detail;
        option.setSelectHost(this);
        this.options.push(option);
        if(this.value){
            if(option.value === this.value){
                option.selected = true
            }
            else{
                option.selected = false
            }
        }
        else if(option.selected){
            this.value = option.value;
        }
        this.requestUpdate()
        
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
        if(this.open) this.hide();
        else this.show();
    }

    hide(){
        if(!this.open) return;
        this.open = false;
    }
    show(){
        if(this.open) return;
        this.open = true;
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

    render(){        
        return html`
        ${super.render()}
        <lit-button 
            between
            .tabindex = "${this.tabindex}"
            aria-expanded = "${this.open}"
            class = "selected" 
            @keydown = "${this._handlekeyDown}"
            @click = "${this._toggle}">
            <slot name = "selected">
                ${unsafeHTML(this.selectedContent)}
            </slot>
            <lit-icon 
                slot = "icon-after"
                icon = "${this.open ? 'dropup' : 'dropdown'}" 
            ></lit-icon>
        </lit-button>
        <lit-listbox 
            @focusNext = "${this._focusNext}"
            @focusPrev = "${this._focusPrev}"
            @listboxClose = "${this.hide}"
            .open = "${this.open}">
            <slot class = "slot"></slot>
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
            this.open = !this.open;
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
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-select': LitSelect;
    }
}
