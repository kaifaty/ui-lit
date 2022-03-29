import { live } from 'lit/directives/live.js';
import { LitElement, html, css, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { formAssociated } from '../mixins/form-associated/index';
import type { FormAssociated } from '../mixins/form-associated/interface';
import '../icon';
import { input } from '../styles/input';
import { createRef, ref, Ref } from 'lit/directives/ref.js';
import { labled } from '../mixins/labled';
import { focusable } from '../mixins/focusable/index';
import { Focusable } from '../mixins/focusable/inderface';
import { notificatable } from '../mixins/notificatable/index';
import { isiOS } from 'kailib';

const _isIOS = isiOS();

export type TInputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'

export type TFileldTypes = 'text' | 'password' | 'date'

export interface TextProps extends FormAssociated, Focusable{
    size: number,
    minlength: number,
    maxlength: number,
    readonly: boolean,
    useCancelButton: boolean,
    spellcheck: boolean,
    placeholder: string,
    inputmode: TInputMode,
    pattern: string,
    value: string ,
    icon: string | TemplateResult,
    type: TFileldTypes,
}

@customElement("lit-textfield")
export class LitTextField extends focusable(labled(notificatable(formAssociated(LitElement)))) implements TextProps{
    static get styles (){
        return [
            super.elementStyles,
            input
        ]
    };

    static get properties(){        
        return {
            ...super.properties,
            value: {type: String},
        }
    }

    @property({type: Number}) size: number = 0;
    @property({type: Number}) minlength: number = NaN;
    @property({type: Number}) maxlength: number = NaN;
    @property({type: Boolean}) spellcheck: boolean = false;
    
    @property({type: String}) pattern: string = '';
    @property({type: String}) placeholder: string = '';
    @property({type: String}) autocomplete: 'on' | 'off' | 'current-password' = 'off';
    @property({type: String}) inputmode: TInputMode = 'text';
    @property({type: String}) type: TFileldTypes = 'text';

    @property({type: Boolean}) useCancelButton: boolean = false;
    @property() icon: string | TemplateResult = '';
    
    private _selectionBeforeRender = 0;
    private _inputRef: Ref<HTMLInputElement> = createRef();

    @state() hiddenPassword = true

    get selectionStart(){
        return this._inputRef.value?.selectionStart  || 0;
    }
    get valueAsDate(){
        return new Date(this.value);
    }
    set valueAsDate(value: Date){
        if(this.type === 'date'){
            this.value = (value).toISOString().substring(0, 10);
        }
    }

    get valueAsNumber(){
        if(this.type === 'date'){
            return this.value ? (new Date(this.value)).getTime() : 0;
        }
        return Number(this.value);
    }
    set valueAsNumber(value: number){
        if(this.type === 'date'){
            this.value = (new Date(value)).toISOString().substring(0, 10);
        }
        else{
            this.value = value.toString();
        }
    }

    private _value: string = '';
    get value(){
        return this._value;
    }
    set value(value: string){
        const oldValue = this._value;
        this._value = value;
        this.requestUpdate('value', oldValue);
    }
    
    private _getType(){
        if(this.type === 'password'){
            return this.hiddenPassword ? 'password' : 'text'
        }
        return this.type
    }

    public validate(){
        if(this.type === 'date'){
            return;
        }
        super.validate();
        if (!isNaN(this.minlength)) {
            if (this.value && this.value.length < this.minlength) {
                this.setValidity({ tooShort: true });
            }
            else if (this.validity.tooShort) {
                this.setValidity({ tooShort: false });
            }
        }
        if (!isNaN(this.maxlength)) {
            if (this.value && this.value.length > this.maxlength) {
                this.setValidity({ tooLong: true });
            }
            else if (this.validity.tooLong) {
                this.setValidity({ tooLong: false });
            }
        }
        if (this.pattern) {
            const patten = (new RegExp(this.pattern));
            if (this.value && !patten.test(this.value)) {
                this.setValidity({ patternMismatch: true });
            }
            else if (this.validity.patternMismatch) {
                this.setValidity({ patternMismatch: false });
            }
        }
    }
    private _iconslotTemplate(){
        if(!this.useCancelButton) {
            if(this.type === 'password'){
                return html`<div class = "icon toggle-password" 
                            @click = "${this.toggleHiddenPassword}">
                    <lit-icon icon = "${this.hiddenPassword ? 'show' : 'hide'}"></lit-icon>
                </div>`;
            }

            return html`
            <div class = "icon">
                <slot name = icon></slot>
            </div>`;
        };
        if(!this.value) return nothing;
        return html`<lit-icon 
                        @click = "${this._clearValue}"
                        icon = "cancel" 
                        danger
                        class = "icon cancel"></lit-icon>`;
    }
    render(){
        return html`
        ${super.render()}
        <div class = "wrapper" >
            <input type = "${this._getType()}" 
                ${ref(this._inputRef)}
                autocomplete = "on"
                placeholder = "${this.placeholder}"
                spellcheck = "${this.spellcheck}"
                inputmode = "${this.inputmode}"
                ?readonly = "${this.readonly}"
                ?disabled = "${this.disabled}"
                size = "${this.size}"
                @input = "${this._onInput}" 
                @change = "${this._onChange}"
                @click = "${this._onClick}"
                .value = ${live(this.value)}>
            ${this._iconslotTemplate()}
        </div>`;
    }
    private _onClick(e: Event){
        e.stopPropagation();
    }
    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        super.willUpdate(_changedProperties);
        this._selectionBeforeRender = this.selectionStart;
    }
    updated(_changedProperties: Map<string | number | symbol, unknown>){
        super.updated(_changedProperties);
        if(this._selectionBeforeRender !== this.selectionStart && !_isIOS){
            this._inputRef.value?.setSelectionRange(this._selectionBeforeRender, this._selectionBeforeRender);
        }
        this.validate();
    }
     
    private _clearValue(){
        this.value = '';
        this.notify();
    }

    private toggleHiddenPassword(e: Event){
        this.hiddenPassword = !this.hiddenPassword;
    }
    private _onChange(e: Event){
        this.reportValidity();
        this.notify();
    }
    private _onInput(e: Event){      
        this.value = (e.target as HTMLInputElement).value as string;
        this.notify();
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-textfield': LitTextField;
    }
}
