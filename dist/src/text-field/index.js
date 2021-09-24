import { __decorate } from "tslib";
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators';
import { formAssociated } from '../form-associated/index';
import { ref, createRef } from 'lit/directives/ref.js';
import '../icon';
import '../note/index';
import { input } from '../styles/input';
let TextField = class TextField extends formAssociated(LitElement) {
    constructor() {
        super(...arguments);
        this.inputRef = createRef();
        this.size = 0;
        this.readonly = false;
        this.spellcheck = false;
        this.autofocus = false;
        this.placeholder = '';
        this.inputmode = '';
        this.type = 'text';
        this.useCancelButton = false;
        this.icon = '';
        this._value = '';
        this._pattern = '';
        this._minlength = 0;
        this._maxlength = 0;
    }
    static get properties() {
        return {
            ...super.properties,
            value: { type: String },
            pattern: { type: String },
            maxlength: { type: Number },
            minlength: { type: Number },
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
        this.validate();
    }
    get pattern() {
        return this._pattern;
    }
    set pattern(value) {
        this._pattern = value;
        this.validate();
    }
    get minlength() {
        return this._minlength;
    }
    set minlength(value) {
        this._minlength = value;
        this.validate();
    }
    get maxlength() {
        return this._minlength;
    }
    set maxlength(value) {
        this._maxlength = value;
        this.validate();
    }
    validate() {
        if (this._minlength) {
            if (this.value.length < this._minlength) {
                this.setValidity({ tooShort: true });
            }
            else if (this.validity.tooShort) {
                this.setValidity({ tooShort: false });
            }
        }
        if (this._maxlength) {
            if (this.value.length > this._maxlength) {
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
        console.log(this.useCancelButton, this.value);
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
    clearValue() {
        this.value = '';
    }
    _onChange(e) {
        this.reportValidity();
    }
    _onInput(e) {
        this.value = e.target.value;
    }
};
//proxy = document.createElement("input");
TextField.styles = [
    input,
    css `
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
    `
];
__decorate([
    property({ type: Number })
], TextField.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], TextField.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], TextField.prototype, "spellcheck", void 0);
__decorate([
    property({ type: Boolean })
], TextField.prototype, "autofocus", void 0);
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
