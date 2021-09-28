import { __decorate } from "tslib";
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators';
import { formAssociated } from '../form-associated/index';
import '../icon';
import { input } from '../styles/input';
import { createRef, ref } from 'lit/directives/ref.js';
let TextField = class TextField extends formAssociated(LitElement) {
    constructor() {
        super(...arguments);
        this.size = 0;
        this.minlength = NaN;
        this.maxlength = NaN;
        this.spellcheck = false;
        this.autofocus = false;
        this.pattern = '';
        this.placeholder = '';
        this.inputmode = 'text';
        this.type = 'text';
        this.useCancelButton = false;
        this.icon = '';
        this.inputRef = createRef();
        this._value = '';
    }
    static get styles() {
        return input;
    }
    ;
    static get properties() {
        return {
            ...super.properties,
            value: { type: String },
        };
    }
    get value() {
        return this._value;
    }
    set value(value) {
        const oldValue = this._value;
        this._value = value;
        ;
        this.requestUpdate('value', oldValue);
    }
    connectedCallback() {
        var _a;
        super.connectedCallback();
        (_a = this.findLabel()) === null || _a === void 0 ? void 0 : _a.appendConnectedField(this);
    }
    disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        (_a = this.findLabel()) === null || _a === void 0 ? void 0 : _a.removeConnectedField(this);
    }
    validate() {
        super.validate();
        if (!isNaN(this.minlength)) {
            if (this.value.length < this.minlength) {
                this.setValidity({ tooShort: true });
            }
            else if (this.validity.tooShort) {
                this.setValidity({ tooShort: false });
            }
        }
        if (!isNaN(this.maxlength)) {
            if (this.value.length > this.maxlength) {
                this.setValidity({ tooLong: true });
            }
            else if (this.validity.tooLong) {
                this.setValidity({ tooLong: false });
            }
        }
        if (this.pattern) {
            const patten = (new RegExp(this.pattern));
            if (!patten.test(this.value)) {
                this.setValidity({ patternMismatch: true });
            }
            else if (this.validity.patternMismatch) {
                this.setValidity({ patternMismatch: false });
            }
        }
    }
    _iconTemplate() {
        if (!this.icon)
            return nothing;
        return html `<div class = "icon">${this.icon}</div>`;
    }
    _cancelIconTemplate() {
        if (!this.useCancelButton || !this.value)
            return nothing;
        return html `<icon-element 
                        @click = "${this.clearValue}"
                        icon = "cancel" 
                        class = "danger icon"></icon-element>`;
    }
    render() {
        return html `
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
    updated(_changedProperties) {
        super.updated(_changedProperties);
        this.validate();
    }
    firstUpdated(props) {
        super.firstUpdated(props);
        if (this.autofocus) {
            setTimeout(() => this.focus());
        }
    }
    focus() {
        var _a, _b;
        (_a = this.inputRef.value) === null || _a === void 0 ? void 0 : _a.focus();
        (_b = this.inputRef.value) === null || _b === void 0 ? void 0 : _b.setSelectionRange(this.value.length, this.value.length);
    }
    clearValue() {
        this.value = '';
    }
    // 
    _onChange(e) {
        this.reportValidity();
    }
    _onInput(e) {
        this.value = e.target.value;
        this.dispatchEvent(new CustomEvent("changed", {
            detail: this.value,
            bubbles: true,
        }));
    }
};
__decorate([
    property({ type: Number })
], TextField.prototype, "size", void 0);
__decorate([
    property({ type: Number })
], TextField.prototype, "minlength", void 0);
__decorate([
    property({ type: Number })
], TextField.prototype, "maxlength", void 0);
__decorate([
    property({ type: Boolean })
], TextField.prototype, "spellcheck", void 0);
__decorate([
    property({ type: Boolean })
], TextField.prototype, "autofocus", void 0);
__decorate([
    property({ type: String })
], TextField.prototype, "pattern", void 0);
__decorate([
    property({ type: String })
], TextField.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], TextField.prototype, "inputmode", void 0);
__decorate([
    property({ type: String })
], TextField.prototype, "type", void 0);
__decorate([
    property({ type: Boolean })
], TextField.prototype, "useCancelButton", void 0);
__decorate([
    property()
], TextField.prototype, "icon", void 0);
TextField = __decorate([
    customElement("text-field")
], TextField);
export { TextField };
