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



@customElement("lit-select")
export class LitSelect extends focusable(labled(notificatable(formAssociated(LitElement)))) implements IPropsSelect{
    static get styles (){
        return [
            ...super.elementStyles, 
            css`
        :host{
            display: inline-block;
            position: relative;
            color: var(--lit-select-color, black);
        }
        .wrapper{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        lit-button{
            width: 100%;
            min-width: 70px;
        }

        `, ]
    };
    static get properties(){
        return {
            open: {type: Boolean}
        }
    }
    
    @property({type: Number}) tabindex: number = 0;
    @property({type: Boolean}) multiple: boolean = false;
    //@property({type: String}) type: 'select-one' | 'select-multiple' = 'select-one';
    private _keyboardEventSet = false;

    private _open: boolean = false;
    set open(value: boolean){
        if(value === this._open){
            return;
        }
        if(!this._keyboardEventSet && value){
            document.addEventListener('keydown', this._handlekeyDown as EventListener);
            this._keyboardEventSet = false;
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

    get selectedContent(){
        const selected = this.options.find(it => it.selected);
        if(selected){
            return selected.innerHTML
        }
        return '-'
    }

    private _setValue = (value: string, notify = true) => {
        
        if(value === this.value){
            return;
        }
        const exist = this.options.find(it => it.value === value);
        if(!exist) return;
        this._value = value;
        this.options.forEach(it => {
            if(it.value === value){
                it.selected = true;
            }
            else{
                it.selected = false;
            }
        })
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
    }
    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('optionConnected', this._optionConnect as EventListener);
        this.removeEventListener('optionSelect', this._optionSelect as EventListener);
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

    move(forward = true){
        let index = this.options.findIndex(it => it.selected);
        index += forward ? 1 : -1;
        if(index < 0) index = 0;
        if(index > this.options.length - 1) index = this.options.length - 1;

        this._setValue(this.options[index].value);
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
        if(!this.open) return;
        this.open = false;
    }

    private _show = () => {
        if(this.open) return;
        this.open = true;
    }

    render(){        
        return html`
        ${super.render()}
        <lit-button 
            between
            .tabindex = "${this.tabindex}"
            aria-expanded = "${this.open}"
            class = "selected" 
            @focus = "${this._onFocus}"
            @blur = "${this._onBlur}"
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
            @listboxClose = "${this._onCloseByListbox}"
            .open = "${this.open}">
            <slot></slot>
        </lit-listbox>
        `;
    }

    private _onFocus(){
        if(this._keyboardEventSet) return;
        document.addEventListener('keydown', this._handlekeyDown as EventListener);
        this._keyboardEventSet = true;
    }

    private _onBlur(){
        document.removeEventListener('keydown', this._handlekeyDown as EventListener);
        this._keyboardEventSet = false;
    }

    private _onCloseByListbox(e: CustomEvent){
        this.open = false;
    }

    private _handlekeyDown = (e: KeyboardEvent) => {
        if(e.key === "Enter" || e.key === " "){
            this.open = !this.open;
        }
        if(e.key === "ArrowDown"){
            this.move()
        }
        if(e.key === "ArrowUp"){
            this.move(false)
        }
        if(e.key === "Escape"){
            this.open = false;
        }
        if(e.key === "Tab"){
            if(this.open){
                this._hide();
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
