import { LitElement, html, nothing, css } from 'lit';
import { state, property } from 'lit/decorators';
import type { FormAssociatedElement, ProxyElement, ValidityStateFlags } from './interface';
import { calcPositionForNote } from '../helpers/position';
import type { NoteElement } from '../note';
import '../note';
import { ref, createRef } from 'lit/directives/ref.js';
import type { LabelText } from '../label';


type Constructor<T> = new (...args: any[]) => T;

export  const formAssociated = <T extends Constructor<LitElement>>(superClass: T) => {
    class FormAssociated extends superClass {
        _formAssiciated =  true;
        static get properties(){
            return {
                value: {type: String},
            }
        }
        @state() showNote: boolean = false;
        @property({type: Boolean}) disabled: boolean = false;
        @property({type: Boolean}) required: boolean = false;
        @property({type: Boolean}) readonly: boolean = false;
        @property({type: String}) name: string = '';
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
        public noteRef = createRef<NoteElement>();
        public valid: boolean = true;
        public value: string = '';
        protected customValidationMessage = '';
        _isFirstUpdated = false;

        
        constructor(...args: any[]) {
            super(...args);
            this.required = false;
        }
        
        public connectedCallback(): void {
            super.connectedCallback();
            this.addEventListener("keypress", this._keypressHandler);
            this.dispatchEvent(new CustomEvent("fromAttached", {
                bubbles: true,
                composed: true,
                detail: this,
            }));
        }
        public disconnectedCallback(){
            super.disconnectedCallback();
            this.dispatchEvent(new CustomEvent("fromDettached", {
                bubbles: true,
                composed: true,
                detail: this,
            }));
        }
        render(){
            if(this.showNote){
                const {x, y} = calcPositionForNote(this, {width: 400, height: 40});
                return html`<note-element 
                    @close = "${this._onCloseNote}" 
                    style = "left: ${x}px; top: ${y + 5}px"
                    class = "error" ${ref(this.noteRef)}>${this.validationMessage}</note-element>`;
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

        public findLabel(): LabelText | null{
            let parent = this.parentElement;
            if(parent?.tagName === "LABEL-ELEMENT"){
                return parent as LabelText;
            }
            while(parent){
                if(parent?.tagName === "LABEL-ELEMENT"){
                    return parent as LabelText;
                }
                parent = parent.parentElement
            }
            return null;
        }

        /** Validation */
        public get validationMessage(){
            return "Ошибка";
        }
        checkValidity(){
            if(!this._isFirstUpdated) return false;
            this.valid = !Object.values(this.validity).filter(it => it).length;
            if(this.isConnected){
                if(this.valid){
                    this.classList.remove("error-valid");
                }
                else{
                    this.classList.add("error-valid");
                }
            }
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


        

        private _onCloseNote(){
            this.showNote = false;
        }
        private _keypressHandler(e: KeyboardEvent): void {
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