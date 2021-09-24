import { LitElement, html, css, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators';
import { formAssociated } from '../form-associated/index';
import {ref, createRef} from 'lit/directives/ref.js';
import '../icon';
import '../note/index';
import { input } from '../styles/input';
import type { NoteElement } from '../note/index';

export interface TextProps{
    size: number,
    readonly: boolean,
    useCancelButton: boolean,
    spellcheck: boolean,
    autofocus: boolean,
    placeholder: string,
    inputmode: string,
    value: string,
    type: 'text' | 'email' | 'password',
}

@customElement("text-field")
export class TextField extends formAssociated(LitElement) implements TextProps{
    //proxy = document.createElement("input");
    static styles = [
        input,
        css`
        :host{
            display: inline-block;
            height: 28px;
        }
        .wrapper{
            position: relative;
            height: 100%;
        }
        .icon{
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);

        }
    `];

    inputRef = createRef<HTMLInputElement>();

    static get properties(){        
        return {
            ...super.properties,
            value: {type: String},
            pattern: {type: String},
            maxlength: {type: Number},
            minlength: {type: Number},
        }
    }

    @property({type: Number}) size: number = 0;
    @property({type: Boolean}) readonly: boolean = false;
    @property({type: Boolean}) spellcheck: boolean = false;
    @property({type: Boolean}) autofocus: boolean = false;
    
    @property({type: String}) placeholder: string = '';
    @property({type: String}) inputmode: string = '';
    @property({type: String}) type: 'text' | 'email' | 'password' = 'text';

    @property({type: Boolean}) useCancelButton: boolean = false;
    @property() icon: string | TemplateResult = '';



    _value: string = '';
    get value(){
        return this._value;
    }
    set value(value: string){
        const oldValue = this._value;
        this._value = value;;
        this.requestUpdate('value', oldValue);
        this.validate();
    }

    _pattern: string = '';
    get pattern(){
        return this._pattern;
    }
    set pattern(value: string){
        this._pattern = value;
        this.validate();
    }

    _minlength: number = 0;
    get minlength(){
        return this._minlength;
    }
    set minlength(value: number){
        this._minlength =  value;
        this.validate();
    }

    _maxlength: number = 0;
    get maxlength(){
        return this._minlength;
    }
    set maxlength(value: number){
        this._maxlength = value;
        this.validate();
    }

    public validate(){
        if(this._minlength){
            if(this.value.length < this._minlength){
                this.setValidity({tooShort: true})
            }
            else if(this.validity.tooShort){
                this.setValidity({tooShort: false})
            }
        }
        if(this._maxlength){
            if(this.value.length > this._maxlength){
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
        console.log(this.useCancelButton, this.value)
        if(!this.useCancelButton ||  !this.value) return nothing;
        return html`<icon-element 
                        @click = "${this.clearValue}"
                        icon = "cancel" 
                        class = "danger icon"></icon-element>`;
    }
    render(){
        return html`
        ${super.render()}
        <div class = "wrapper" >
            <input type = "text" 
                   placeholder = "${this.placeholder}"
                   spellcheck = "${this.spellcheck}"
                   size = "${this.size}"
                   @input = "${this._onInput}" 
                   @change = "${this._onChange}"
                   .value = "${this.value}" ${ref(this.inputRef)}>
            ${this._cancelIconTemplate()}
            ${this._iconTemplate()}
        </div>
        `;
    }

    private clearValue(){
        this.value = '';
    }

    private _onChange(e: Event){
        this.reportValidity();
    }
    private _onInput(e: Event){
        this.value = (e.target as HTMLInputElement).value as string;
    }
}