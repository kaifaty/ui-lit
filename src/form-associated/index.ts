import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators';
import { FormAssociatedElement, ProxyElement, ValidityStateFlags } from './interface';
import { calcPositionForNote } from '../helpers/position';
import type { NoteElement } from '../note/index';
import { ref, createRef } from 'lit/directives/ref.js';


type Constructor<T> = new (...args: any[]) => T;

export  const formAssociated = <T extends Constructor<LitElement>>(superClass: T) => {
    class FormAssociated extends superClass {
        static get properties(){
            return {
                value: {type: String},
                name: {type: String},
                disabled: {type: Boolean},
            }
        }
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

        public get validationMessage(){
            return '';
        }


        _disabled: boolean = false;
        get disabled(){
            return this._disabled;
        }
        set disabled(value: boolean){
            this._disabled = value;
            if(value){
                this.classList.add("disabled");
            }
            else{
                this.classList.remove("disabled");
            }
        }

        _name: string = '';
        get name(){
            return this._name;
        }
        set name(value: string){
            this._name = value;
        }

        
        _required: boolean = false;
        get required(){
            return this._disabled;
        }
        set required(value: boolean){
            this._required = value;
        }
        constructor(...args: any[]) {
            super(...args);
            this.required = false;
        }
        
        render(){
            if(this.valid){
                return nothing;
            }
            return html`<note-element ${ref(this.noteRef)}></note-element>`;
        }

        /** Validation */
        checkValidity(){
            this.valid = !Object.values(this.validity).filter(it => it).length;
            return this.valid;
        }
        reportValidity(){
            const validity = this.checkValidity();
            console.log(validity)
            if(!validity){
                const note = this.noteRef?.value;
                console.log(note)
                if(note){
                    note.innerText = "Ошибка, неверно  указана длина"
                    const {x, y} = calcPositionForNote(this, {width: 400, height: 40});
                    note.style.left = x + "px";
                    note.style.top = y + "px";
                    note.show();
                }
                

            }
            return validity;
        }
        validate(){}
        setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement){
            this.validity = {...this.validity, ...flags};
            if(message){
                this.customValidationMessage = message;
            }
           this.checkValidity();
        }
        public get willValidate(): boolean {
            return true;
        }
        /** ========= */

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


        private _keypressHandler(e: KeyboardEvent): void {
            if(e.key === 'Enter'){
                this.dispatchEvent(new CustomEvent('submitForm', {
                    bubbles: true,
                    composed: true
                }))
            }
        }
    };
/*
    attr({ mode: "boolean" })(C.prototype, "disabled");
    attr({ mode: "fromView", attribute: "value" })(C.prototype, "initialValue");
    attr(C.prototype, "name");
    attr({ mode: "boolean" })(C.prototype, "required");
    observable(C.prototype, "value");*/
    

    return FormAssociated as Constructor<FormAssociatedElement> & T;;
}