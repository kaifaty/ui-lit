import { LitElement, html, css, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators';
import { formAssociated } from '../form-associated/index';
import type { FormAssociated } from '../form-associated/interface';
import '../icon';
import { input } from '../styles/input';
import { createRef, ref, Ref } from 'lit/directives/ref.js';

export type TInputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
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
    type: 'text' | 'password',
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
    @property({type: String}) type: 'text' | 'password' = 'text';

    @property({type: Boolean}) useCancelButton: boolean = false;
    @property() icon: string | TemplateResult = '';
    inputRef: Ref<HTMLInputElement> = createRef();



    _value: string = '';
    get value(){
        return this._value;
    }
    set value(value: string){
        const oldValue = this._value;
        this._value = value;;
        this.requestUpdate('value', oldValue);
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
        super.validate();
        if(!isNaN(this.minlength)){
            if(this.value.length < this.minlength){
                this.setValidity({tooShort: true})
            }
            else if(this.validity.tooShort){
                this.setValidity({tooShort: false})
            }
        }
        if(!isNaN(this.maxlength)){
            if(this.value.length > this.maxlength){
                this.setValidity({tooLong: true})
            }
            else if(this.validity.tooLong){
                this.setValidity({tooLong: false})
            }
        }
        if(this.pattern){
            const patten = (new RegExp(this.pattern));
            if(!patten.test(this.value)){
                this.setValidity({patternMismatch: true})
            }
            else if(this.validity.patternMismatch){
                this.setValidity({patternMismatch: false})
            }
        }
    }
    private _iconTemplate(){
        if(!this.icon) return nothing;
        return html`<div class = "icon">${this.icon}</div>`;
    }
    private _cancelIconTemplate(){
        if(!this.useCancelButton ||  !this.value) return nothing;
        return html`<lit-icon 
                        @click = "${this.clearValue}"
                        icon = "cancel" 
                        class = "danger icon"></lit-icon>`;
    }
    render(){
        return html`
        ${super.render()}
        <div class = "wrapper" >
            <input type = "${this.type}" 
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
            ${this._cancelIconTemplate()}
            ${this._iconTemplate()}
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
        }))
    }

    
    private _onChange(e: Event){
        this.reportValidity();
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
