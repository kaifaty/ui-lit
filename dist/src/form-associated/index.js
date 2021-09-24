import { html, nothing } from 'lit';
import { calcPositionForNote } from '../helpers/position';
import { ref, createRef } from 'lit/directives/ref.js';
export const formAssociated = (superClass) => {
    class FormAssociated extends superClass {
        constructor(...args) {
            super(...args);
            this.validity = {
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
            this.noteRef = createRef();
            this.valid = true;
            this.value = '';
            this.customValidationMessage = '';
            this._disabled = false;
            this._name = '';
            this._required = false;
            this.required = false;
        }
        static get properties() {
            return {
                value: { type: String },
                name: { type: String },
                disabled: { type: Boolean },
            };
        }
        get validationMessage() {
            return '';
        }
        get disabled() {
            return this._disabled;
        }
        set disabled(value) {
            this._disabled = value;
            if (value) {
                this.classList.add("disabled");
            }
            else {
                this.classList.remove("disabled");
            }
        }
        get name() {
            return this._name;
        }
        set name(value) {
            this._name = value;
        }
        get required() {
            return this._disabled;
        }
        set required(value) {
            this._required = value;
        }
        render() {
            if (this.valid) {
                return nothing;
            }
            return html `<note-element ${ref(this.noteRef)}></note-element>`;
        }
        /** Validation */
        checkValidity() {
            this.valid = !Object.values(this.validity).filter(it => it).length;
            return this.valid;
        }
        reportValidity() {
            var _a;
            const validity = this.checkValidity();
            console.log(validity);
            if (!validity) {
                const note = (_a = this.noteRef) === null || _a === void 0 ? void 0 : _a.value;
                console.log(note);
                if (note) {
                    note.innerText = "Ошибка, неверно  указана длина";
                    const { x, y } = calcPositionForNote(this, { width: 400, height: 40 });
                    note.style.left = x + "px";
                    note.style.top = y + "px";
                    note.show();
                }
            }
            return validity;
        }
        validate() { }
        setValidity(flags, message, anchor) {
            this.validity = { ...this.validity, ...flags };
            if (message) {
                this.customValidationMessage = message;
            }
            this.checkValidity();
        }
        get willValidate() {
            return true;
        }
        /** ========= */
        connectedCallback() {
            super.connectedCallback();
            this.addEventListener("keypress", this._keypressHandler);
            this.dispatchEvent(new CustomEvent("fromAttached", {
                bubbles: true,
                composed: true,
                detail: this,
            }));
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            this.dispatchEvent(new CustomEvent("fromDettached", {
                bubbles: true,
                composed: true,
                detail: this,
            }));
        }
        _keypressHandler(e) {
            if (e.key === 'Enter') {
                this.dispatchEvent(new CustomEvent('submitForm', {
                    bubbles: true,
                    composed: true
                }));
            }
        }
    }
    ;
    /*
        attr({ mode: "boolean" })(C.prototype, "disabled");
        attr({ mode: "fromView", attribute: "value" })(C.prototype, "initialValue");
        attr(C.prototype, "name");
        attr({ mode: "boolean" })(C.prototype, "required");
        observable(C.prototype, "value");*/
    return FormAssociated;
    ;
};
