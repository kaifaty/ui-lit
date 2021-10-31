import { __decorate } from "tslib";
import { html, nothing } from 'lit';
import { property } from 'lit/decorators';
import '../note';
import { ref, createRef } from 'lit/directives/ref.js';
const defaultValidationMessages = {
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
export const formAssociated = (superClass) => {
    class FormAssociated extends superClass {
        constructor(...args) {
            super(...args);
            this._formAssiciated = true;
            this.showNote = false;
            this.disabled = false;
            this.required = false;
            this.readonly = false;
            this.name = '';
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
            this._isFirstUpdated = false;
            this.min = NaN;
            this.max = NaN;
            this.step = NaN;
            this.pattern = '';
            this.required = false;
        }
        static get properties() {
            return {
                value: { type: String },
            };
        }
        connectedCallback() {
            super.connectedCallback();
            this.addEventListener("keypress", this._handleKeypress);
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
        render() {
            if (this.showNote) {
                //const {x, y} = calcPositionForPopup(this, {width: 400, height: 40});
                // style = "left: ${x}px; top: ${y + 5}px"
                return html `<note-element 
                    @close = "${this._handleCloseNote}" 
                    style = "transform: translate(0, -100%);"
                    class = "error" ${ref(this.noteRef)}>${this.validationMessage}</note-element>`;
            }
            return nothing;
        }
        updated(_changedProperties) {
            if (_changedProperties.has("disabled")) {
                this.disabled
                    ? this.classList.add("disabled")
                    : this.classList.remove("disabled");
            }
            if (_changedProperties.has("readonly")) {
                this.readonly
                    ? this.classList.add("readonly")
                    : this.classList.remove("readonly");
            }
        }
        async firstUpdated() {
            await this.updateComplete;
            this._isFirstUpdated = true;
        }
        findLabel() {
            let parent = this.parentElement;
            if ((parent === null || parent === void 0 ? void 0 : parent.tagName) === "LABEL-TEXT") {
                return parent;
            }
            while (parent) {
                if ((parent === null || parent === void 0 ? void 0 : parent.tagName) === "LABEL-TEXT") {
                    return parent;
                }
                parent = parent.parentElement;
            }
            return null;
        }
        /** Validation */
        _getLang() {
            return window.ValidationsMessagesLang || window.navigator.language.split('-')[0];
        }
        _getErrorText(key) {
            var _a, _b;
            const text = ((_a = window.ValidationsMessages) === null || _a === void 0 ? void 0 : _a[key][this._getLang()])
                || ((_b = window.ValidationsMessages) === null || _b === void 0 ? void 0 : _b[key]['en'])
                || defaultValidationMessages[key][this._getLang()]
                || defaultValidationMessages[key]['en'];
            const data = {
                min: this.min,
                max: this.max,
                step: this.step,
            };
            return text.replace(/\$\{([a-zA-Z0-9_.,=)( ]+)\}/g, (m, n) => {
                let value = data[n];
                return value !== undefined
                    ? String(value)
                    : m;
            });
        }
        get validationMessage() {
            const keys = Object.keys(this.validity);
            for (const key of keys) {
                const v = this.validity[key];
                if (v) {
                    return this._getErrorText(key);
                }
            }
            return "";
        }
        checkValidity() {
            if (!this._isFirstUpdated)
                return false;
            this.valid = !Object.values(this.validity).filter(it => it).length;
            if (this.isConnected) {
                if (this.valid) {
                    this.classList.remove("error-valid");
                }
                else {
                    this.classList.add("error-valid");
                }
            }
            return this.valid;
        }
        reportValidity() {
            const validity = this.checkValidity();
            this.showNote = !validity;
            return validity;
        }
        validate() {
            if (this.required && !this.value) {
                this.setValidity({ valueMissing: true });
            }
            else if (!this.required || this.value) {
                this.setValidity({ valueMissing: false });
            }
        }
        setValidity(flags, message, anchor) {
            this.validity = { ...this.validity, ...flags };
            if (message) {
                this.customValidationMessage = message;
            }
            this.checkValidity();
        }
        /** ========= */
        _handleCloseNote() {
            this.showNote = false;
        }
        _handleKeypress(e) {
            if (e.key === 'Enter') {
                this.dispatchEvent(new CustomEvent('submitForm', {
                    bubbles: true,
                    composed: true
                }));
            }
        }
    }
    __decorate([
        property({ type: Boolean, reflect: true })
    ], FormAssociated.prototype, "showNote", void 0);
    __decorate([
        property({ type: Boolean, reflect: true })
    ], FormAssociated.prototype, "disabled", void 0);
    __decorate([
        property({ type: Boolean })
    ], FormAssociated.prototype, "required", void 0);
    __decorate([
        property({ type: Boolean })
    ], FormAssociated.prototype, "readonly", void 0);
    __decorate([
        property({ type: String })
    ], FormAssociated.prototype, "name", void 0);
    ;
    return FormAssociated;
    ;
};
