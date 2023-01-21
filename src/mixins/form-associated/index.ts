import {css, LitElement} from 'lit'
import {property} from 'lit/decorators.js'

import {LitFrom} from '../../components/form/index'

import type {FormAssociatedElement, ValidityStateFlags} from './types'

import '../../components/note'

type TValidationMessageKey = keyof ValidityStateFlags;
type TValidationMessages = Record<TValidationMessageKey, {[k: string] : string}>

const defaultValidationMessages: TValidationMessages = {
    badInput: {
        'en': 'Bad input',
    },
    customError: {
        'en': 'Custom error',
    },
    patternMismatch: {
        'en': 'Pattern ${pattern} error',
    },
    rangeOverflow: {
        'en': 'Value must be less then ${max}',
    },
    rangeUnderflow: {
        'en': 'Value must be more then ${min}',
    },
    stepMismatch: {
        'en': 'Value must be in step of ${step}',
    },
    tooLong: {
        'en': 'Value is too long',
    },
    tooShort: {
        'en': 'Value is too short',
    },
    valueMissing: {
        'en': 'Value is required',
    },
    typeMismatch: {
        'en': 'Type mismatch',
    },
}


const getLang = () => window.ValidationsMessagesLang || window.navigator.language.split('-')[0]

type Constructor<T> = new (...args: any[]) => T;

const defaultValidity = {
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
}

export const formAssociated = <T extends Constructor<LitElement>>(superClass: T) => {
    class FormAssociated extends superClass implements FormAssociated{
        private _formAssiciated =  true
        static get properties(){
            return {
                value: {type: String},
            }
        }
        static styles = [
            ...(superClass as any).elementStyles, 
            css`    
            :host([disabled]){
                opacity: 0.5;
                pointer-events: none;
            }
            :host([readonly]){
                opacity: 0.7;
                pointer-events: none;
        }`]
        
        @property({type: Boolean, reflect: true}) disabled = false
        @property({type: Boolean}) required = false
        @property({type: Boolean, reflect: true}) readonly = false
        @property({type: Boolean}) willValidate = true
        @property({type: Boolean}) validateOnChange = false
        @property({type: String}) name = ''

        //@property({type: Boolean}) valid: boolean = true;

        public validity: ValidityStateFlags = {...defaultValidity}
        public _value = ''
        get value(){
            return this._value
        }
        set value(value: string){
            this._value = value
        }
        protected customValidationMessage = ''
        public isFirstUpdated = false
        public min?: number = NaN
        public max?: number = NaN
        public step?: number = NaN
        public pattern?: string = ''
        private _submitForm: LitFrom | null = null
        private _valueOnInit = ''

        
        /** @ignore  */
        public connectedCallback(): void {
            super.connectedCallback()
            this.addEventListener('keypress', this._handleKeypress)
        }
        /** @ignore  */
        public disconnectedCallback(){
            super.disconnectedCallback()
            this._submitForm?.detatchElement(this)
        }
        /** @ignore  */
        async firstUpdated(){
            await this.updateComplete
            this.dispatchEvent(new CustomEvent('fromAttached', {
                bubbles: true,
                composed: true,
                detail: {
                    element: this,
                    onAttatch: (form: LitFrom) => {
                        this._submitForm = form
                    }
                }
            }))
            this._valueOnInit = this._value
            this.isFirstUpdated = true
        }
        get form(){
            return this._submitForm
        }
        get valid(){
            return this.checkValidity()
        }

        /**
         * Validation
         * 
         * @ignore
         */
        private _getErrorText(key: TValidationMessageKey){
            const text = window.ValidationsMessages?.[key][getLang()] 
                || window.ValidationsMessages?.[key]['en'] 
                || defaultValidationMessages[key][getLang()]
                || defaultValidationMessages[key]['en']
            const data: Record<string, number | string | undefined> = {
                min: this.min,
                max: this.max,
                step: this.step,
                pattern: this.pattern,
            }
            return text.replace(/\$\{([a-zA-Z0-9_.,=)( ]+)\}/g, (m, n) => {
                const value = data[n]
                if(typeof value === 'number' && Math.log10(value) < -4){
                    return value.toFixed(Math.abs(Math.ceil(Math.log10(value))) + 1)
                }
                return value !== undefined
                    ? String(value)
                    : m
            })
        }
        public get validationMessage(){
            const keys = Object.keys(this.validity)
            for(const key of keys){
                const v = this.validity[key as TValidationMessageKey]
                if(v){
                    return this._getErrorText(key as TValidationMessageKey)
                }
            }
            return ''
        }
        checkValidity(): boolean{
            if(!this.isFirstUpdated){
                return true
            }
            if(this.validateOnChange && this._valueOnInit === this._value){
                return true
            }
            return !Object.values(this.validity).filter(it => it).length
        }
        reportValidity(): boolean{
            const valid = this.checkValidity()
            if(!valid){
                this.dispatchEvent(new CustomEvent('reportInvalid'))
            }
            return valid
        }
        validate(){           
            if(this.required && !this.value && !this.disabled){
                this.setValidity({valueMissing: true})
            }
            else if(this.validity.valueMissing){
                this.setValidity({valueMissing: false})
            }
            else if(!this.value){
                this.validityDefault()
            }
        }
        setValidity(flags: ValidityStateFlags, message?: string){ 
            if(!this.willValidate) {
                return
            }
            this.validity = {...this.validity, ...flags}
            if(message){
                this.customValidationMessage = message
            }
            this._updateValidity()
        }
        public validityDefault(){
            this.setValidity({...defaultValidity})
            this.reportValidity()
        }


        /**
         * @ignore
         */
        private _updateValidity(){
            this.dispatchEvent(new CustomEvent(this.checkValidity() ? 'valid' : 'invalid', {
                detail: this,
                composed: true,
                bubbles: true
            }))
        }

        /**
         * @ignore
         */
        private _handleKeypress(e: KeyboardEvent): void {
            if(e.key === 'Enter'){
                this.dispatchEvent(new CustomEvent('submitForm', {
                    bubbles: true,
                    composed: true
                }))
            }
        }
            
        /**
         * @ignore
         */
        notify(){
            this.dispatchEvent(new CustomEvent('changed', {detail: this.value, bubbles: true}))
        }
    };
    

    return FormAssociated as Constructor<FormAssociatedElement> & T
}


declare global {
    interface Window { 
        ValidationsMessages?: TValidationMessages,
        ValidationsMessagesLang?: string
     }
}
