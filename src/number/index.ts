import { LitElement, html, css, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators';
import { formAssociated } from '../form-associated/index'
import type { FormAssociated } from '../form-associated/interface';;
import '../icon';
import { input } from '../styles/input';
import { live } from 'lit//directives/live';
import { createRef, ref, Ref } from 'lit/directives/ref.js';
import {inputDirective} from './inputValueDirective';
import { TInputMode } from '../text-field/index';


export interface NumberProps  extends FormAssociated{
    replaceToRange: boolean,
    useCancelButton: boolean,
    autofocus: boolean,
    placeholder: string,
    inputmode: string,
    value: string,
    decimals: number,
    valueAsNumber: number,
    min: number,
    max: number,
    icon: string | TemplateResult,
}

const AvailabledKeys = [ 'Control', 'Backspace', 'Delete', ',', '.', 'ArrowLeft', 'ArrowRight', 'Shift', 'Home', 'End', "Enter" ];
const Numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ]
const CtrAvailable: (number | string)[] = [
    'a', 'v', 'c', 'x', 'z',
    86, 67, 88, 90, 65
];

@customElement("number-field")
export class NumberField extends formAssociated(LitElement) implements NumberProps{
    static get styles (){
        return input
    };

    static get properties(){        
        return {
            ...super.properties,
            value: {type: String, hasChanged: () => true},
            valueAsNumber: {type: String},
        }
    }

    @property({type: Number}) min: number = NaN;
    @property({type: Number}) max: number = NaN;
    @property({type: Number}) decimals: number = 8;
    @property({type: Boolean}) readonly: boolean = false;
    @property({type: Boolean}) autofocus: boolean = false;
    @property({type: Boolean}) replaceToRange: boolean = false;
    
    @property({type: String}) placeholder: string = '';
    @property({type: String}) inputmode: TInputMode = 'text';

    @property({type: Boolean}) useCancelButton: boolean = false;
    @property() icon: string | TemplateResult = '';

    _selectionBeforeRender = 0;
    inputRef: Ref<HTMLInputElement> = createRef();

    _valueAsNumber: number = NaN;
    get valueAsNumber(){
        return this._valueAsNumber;
    }
    set valueAsNumber(value: number){
        this.value = value.toFixed(this.decimals);
    }

    _value: string = '';
    get value(){
        return this._value;
    }
    set value(value: string){
        const oldValue = this._value;
        this._value = this._valueResolve(value);
        this._valueAsNumber = Number(this._value);        
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

    private _valueResolve(rawValue: string){
        let value = rawValue.replace(",", ".");
        const arr = value.split(".");
        if(arr.length > 1){
            value = arr[0] + "." + arr.slice(1).join("").slice(0, this.decimals);
        }
        if(this.replaceToRange){
            const asNumber = Number(value);
            if(!isNaN(this.min) && asNumber < this.min){
                value = this.min.toString();
            }
            else if(!isNaN(this.max) && asNumber > this.max){
                value = this.max.toString();
            }
        }
        return value;
    }
    private _iconTemplate(){
        if(!this.icon) return nothing;
        return html`<div class = "icon">${this.icon}</div>`;
    }
    private _cancelIconTemplate(){
        if(!this.useCancelButton ||  !this.value) return nothing;
        return html`<icon-element 
                        @click = "${this._clearValue}"
                        icon = "remove" 
                        class = "danger icon"></icon-element>`;
    }
    willUpdate(){
        this._selectionBeforeRender = this.inputRef.value?.selectionStart || 0;
    }
    render(){
        return html`
        ${super.render()}
        <div class = "wrapper" >
            <input type = "text" 
                   ?disabled = "${this.disabled}"
                   ?readonly = "${this.readonly}"
                   placeholder = "${this.placeholder}"
                   spellcheck = "${this.spellcheck}"
                   inputmode = "${this.inputmode}"
                   @input = "${this._onInput}" 
                   @keydown = "${this._onKeyDown}"
                   @change = "${this._onChange}"
                   ${ref(this.inputRef)}
                   .value = ${live(this.value)}>
            ${this._cancelIconTemplate()}
            ${this._iconTemplate()}
        </div>`;
    }
    updated(props: Map<string | number | symbol, unknown>){
        super.updated(props);
        if(this._selectionBeforeRender !== undefined){
            this.inputRef.value?.setSelectionRange(this._selectionBeforeRender, this._selectionBeforeRender);
        }
        this.validate();
        if(props.has("value")){
            this.dispatchEvent(new CustomEvent("changed", {detail: this.value, bubbles: true}));
        }
        
    }
    async firstUpdated(props: Map<string | number | symbol, unknown>){
        super.firstUpdated(props);
        if(this.autofocus){
            setTimeout(() => this.focus());
        }
    }
    
    public validate(){
        super.validate();
        if(this.min){
            if(this.valueAsNumber < this.min){
                this.setValidity({rangeUnderflow: true})
            }
            else if(this.validity.rangeUnderflow){
                this.setValidity({rangeUnderflow: false})
            }
        }
        if(this.max){
            if(this.valueAsNumber > this.max){
                this.setValidity({rangeOverflow: true})
            }
            else if(this.validity.rangeOverflow){
                this.setValidity({rangeOverflow: false})
            }
        }
    }

    private _clearValue(){
        this.value = '';
    }

    focus(){
        this.inputRef.value?.focus();
        this.inputRef.value?.setSelectionRange(this.value.length, this.value.length);
    }
    
    // ==== Events ====
    private _onChange(e: Event){
        this.reportValidity();
    }
    private _onInput(e: Event){
        this.value = (e.target as HTMLInputElement).value as string;
    }
    private _onKeyDown(e: KeyboardEvent){
        if(
            !AvailabledKeys.includes(e.key) && 
            !Numbers.includes(e.key) && 
            !(
                CtrAvailable.includes(e.key) && (e.ctrlKey || e.metaKey) || 
                CtrAvailable.includes(e.keyCode) && (e.ctrlKey || e.metaKey)
            )
        ){    
            e.preventDefault();
        }
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'number-field': NumberField;
    }
}
