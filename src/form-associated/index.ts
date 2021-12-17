import { LitElement, html, nothing, css } from 'lit';
import { state, property } from 'lit/decorators';
import type { FormAssociatedElement, ProxyElement, ValidityStateFlags } from './interface';
import { calcPositionForPopup } from '../helpers/position';
import type { LitNote } from '../note';
import '../note';
import { ref, createRef } from 'lit/directives/ref.js';
import type { LitLabel } from '../label';
import { LitFrom } from '../form/index';

type TValidationMessageKey = keyof ValidityStateFlags;
type TValidationMessages = Record<TValidationMessageKey, {[k: string] : string}>

const defaultValidationMessages: TValidationMessages = {
    badInput: {
        "en": "Bad input",
    },
    customError: {
        "en": "Custom error",
    },
    patternMismatch: {
        "en": "Pattern ${pattern} error",
    },
    rangeOverflow: {
        "en": "Value must be less then ${max}",
    },
    rangeUnderflow: {
        "en": "Value must be more then ${min}",
    },
    stepMismatch: {
        "en": "Value must be in step of ${step}",
    },
    tooLong: {
        "en": "Value is too long",
    },
    tooShort: {
        "en": "Value is too short",
    },
    valueMissing: {
        "en": "Value is required",
    },
    typeMismatch: {
        "en": "Type mismatch",
    },
};


type Constructor<T> = new (...args: any[]) => T;

export  const formAssociated = <T extends Constructor<LitElement>>(superClass: T) => {
    class FormAssociated extends superClass implements FormAssociated{
        _formAssiciated =  true;
        static get properties(){
            return {
                value: {type: String},
            }
        }
        @property({type: Boolean, reflect: true}) showNote: boolean = false;
        @property({type: Boolean, reflect: true}) disabled: boolean = false;
        @property({type: Boolean}) required: boolean = false;
        @property({type: Boolean}) readonly: boolean = false;
        @property({type: String}) name: string = '';
        @property({type: Boolean, reflect: true}) valid: boolean = true;
        public validity: ValidityStateFlags = {
            badInput: false,
            customError: false,
            patternMismatch: false,
            rangeOverflow: false,
            rangeUnderflow: false,
            stepMismatch: false,
            tooLong: false,
            tooShort: false,
            typeMismatch: false,
            valueMissing: false,
        };
        public noteRef = createRef<LitNote>();
        public value: string = '';
        protected customValidationMessage = '';
        _isFirstUpdated = false;
        public min?: number = NaN;
        public max?: number = NaN;
        public step?: number = NaN;
        public pattern?: string = '';
        _submitForm: LitFrom | null = null;

        
        constructor(...args: any[]) {
            super(...args);
            this.required = false;
        }
        
        public connectedCallback(): void {
            super.connectedCallback();
            this.addEventListener("keypress", this._handleKeypress);
            this.dispatchEvent(new CustomEvent("fromAttached", {
                bubbles: true,
                composed: true,
                detail: {
                    element: this,
                    onAttatch: (form: LitFrom) => {
                        this._submitForm = form;
                    }
                }
            }));
        }
        public disconnectedCallback(){
            super.disconnectedCallback();
            this._submitForm?.detatchElement(this);
        }
        render(){
            if(this.showNote){
                //const {x, y} = calcPositionForPopup(this, {width: 400, height: 40});
                // style = "left: ${x}px; top: ${y + 5}px"
                return html`<lit-note 
                    @close = "${this._handleCloseNote}" 
                    style = "transform: translate(0, -100%);"
                    class = "error" ${ref(this.noteRef)}>${this.validationMessage}</lit-note>`;
            }
            return nothing;
        }
        updated(_changedProperties: Map<string | number | symbol, unknown>){
            if(_changedProperties.has("disabled")){
                this.disabled 
                    ? this.classList.add("disabled") 
                    : this.classList.remove("disabled");
            }
            if(_changedProperties.has("readonly")){
                this.readonly 
                    ? this.classList.add("readonly") 
                    : this.classList.remove("readonly");
            }
        }
        async firstUpdated(){
            await this.updateComplete;
            this._isFirstUpdated = true
        }

        public findLabel(): LitLabel | null{
            let parent = this.parentElement;
            if(parent?.tagName === "lit-label"){
                return parent as LitLabel;
            }
            while(parent){
                if(parent?.tagName === "lit-label"){
                    return parent as LitLabel;
                }
                parent = parent.parentElement
            }
            return null;
        }

        /** Validation */
        private _getLang(): string{
            return window.ValidationsMessagesLang || window.navigator.language.split('-')[0];
        }
        private _getErrorText(key: TValidationMessageKey){
            const text = window.ValidationsMessages?.[key][this._getLang()] 
                || window.ValidationsMessages?.[key]['en'] 
                || defaultValidationMessages[key][this._getLang()]
                || defaultValidationMessages[key]['en'];
            const data: Record<string, number | string | undefined> = {
                min: this.min,
                max: this.max,
                step: this.step,
                pattern: this.pattern,
            };
            return text.replace(/\$\{([a-zA-Z0-9_.,=)( ]+)\}/g, (m, n) => {
                let value = data[n];
                return value !== undefined
                    ? String(value)
                    : m
            })
        }
        public get validationMessage(){
            const keys = Object.keys(this.validity);
            for(const key of keys){
                const v = this.validity[key as TValidationMessageKey];
                if(v){
                    return this._getErrorText(key as TValidationMessageKey)
                }
            }
            return "";
        }
        checkValidity(){
            if(!this._isFirstUpdated) return false;
            this.valid = !Object.values(this.validity).filter(it => it).length;
            
            return this.valid;
        }
        reportValidity(){            
            const validity = this.checkValidity();
            this.showNote = !validity;
            return validity;
        }
        validate(){
            if(this.required && !this.value){
                this.setValidity({valueMissing: true});
            }
            else if(!this.required || this.value){
                this.setValidity({valueMissing: false});
            }
        }
        setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement){
            this.validity = {...this.validity, ...flags};
            if(message){
                this.customValidationMessage = message;
            }
           this.checkValidity();
        }
        
        /** ========= */

        private _handleCloseNote(){
            this.showNote = false;
        }
        private _handleKeypress(e: KeyboardEvent): void {
            if(e.key === 'Enter'){
                this.dispatchEvent(new CustomEvent('submitForm', {
                    bubbles: true,
                    composed: true
                }))
            }
        }
    };
    

    return FormAssociated as Constructor<FormAssociatedElement> & T;;
}


declare global {
    interface Window { 
        ValidationsMessages?: TValidationMessages,
        ValidationsMessagesLang?: string
     }
}
