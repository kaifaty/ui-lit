import { LitElement, html, css, nothing, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { formAssociated } from '../form-associated/index';
import type { FormAssociated } from '../form-associated/interface';
import '../icon';
import { input } from '../styles/input';
import { createRef, ref, Ref } from 'lit/directives/ref.js';

export type TInputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'

export type TFileldTypes = 'text' | 'password' | 'date'

export interface TextProps extends FormAssociated{
    size: number,
    minlength: number,
    maxlength: number,
    readonly: boolean,
    useCancelButton: boolean,
    spellcheck: boolean,
    autofocus: boolean,
    placeholder: string,
    inputmode: TInputMode,
    pattern: string,
    value: string ,
    icon: string | TemplateResult,
    type: TFileldTypes,
}

@customElement("lit-textfield")
export class LitTextField extends formAssociated(LitElement) implements TextProps{
    static get styles (){
        return input
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
    @property({type: Boolean}) autofocus: boolean = false;
    
    @property({type: String}) pattern: string = '';
    @property({type: String}) placeholder: string = '';
    @property({type: String}) inputmode: TInputMode = 'text';
    @property({type: String}) type: TFileldTypes = 'text';

    @property({type: Boolean}) useCancelButton: boolean = false;
    @property() icon: string | TemplateResult = '';
    inputRef: Ref<HTMLInputElement> = createRef();

    @state() hiddenPassword = true

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

    _value: string = '';
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

    public connectedCallback(): void {
        super.connectedCallback();
        this.findLabel()?.appendConnectedField(this);
    }
    public disconnectedCallback(){
        super.disconnectedCallback();
        this.findLabel()?.removeConnectedField(this);
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
                return html`<div class = "icon" @click = "${this.toggleHiddenPassword}">
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
                        @click = "${this.clearValue}"
                        icon = "cancel" 
                        class = "danger icon"></lit-icon>`;
    }
    render(){
        return html`
        ${super.render()}
        <div class = "wrapper" >
            <input type = "${this._getType()}" 
                   placeholder = "${this.placeholder}"
                   spellcheck = "${this.spellcheck}"
                   inputmode = "${this.inputmode}"
                   ?autofocus = "${this.autofocus}"
                   ?readonly = "${this.readonly}"
                   ?disabled = "${this.disabled}"
                   size = "${this.size}"
                   @input = "${this._onInput}" 
                   @change = "${this._onChange}"
                   ${ref(this.inputRef)}
                   .value = "${this.value}">
            ${this._iconslotTemplate()}
        </div>`;
    }
    updated(_changedProperties: Map<string | number | symbol, unknown>){
        super.updated(_changedProperties);
        this.validate();
    }
    firstUpdated(props: Map<string | number | symbol, unknown>){
        super.firstUpdated(props);
        if(this.autofocus){
            setTimeout(() => this.focus());
        }
    }
    
    focus(){
        this.inputRef.value?.focus();
        this.inputRef.value?.setSelectionRange(this.value.length, this.value.length);

    }
    private clearValue(){
        this.value = '';
        this.dispatchEvent(new CustomEvent("changed", {
            detail: this.value,
            bubbles: true,
        }));
    }

    private toggleHiddenPassword(e: Event){
        this.hiddenPassword = !this.hiddenPassword;
    }
    private _onChange(e: Event){
        this.reportValidity();
        this.dispatchEvent(new CustomEvent("change", {
            detail: this.value,
            bubbles: true,
        }));
    }
    private _onInput(e: Event){        
        this.value = (e.target as HTMLInputElement).value as string;
        this.dispatchEvent(new CustomEvent("changed", {
            detail: this.value,
            bubbles: true,
        }))
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-textfield': LitTextField;
    }
}
