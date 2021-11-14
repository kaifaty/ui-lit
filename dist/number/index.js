import { __decorate } from "tslib";
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators';
import { formAssociated } from '../form-associated/index';
;
import '../icon';
import { input } from '../styles/input';
import { live } from 'lit//directives/live';
import { createRef, ref } from 'lit/directives/ref.js';
const AvailabledKeys = ['Control', 'Backspace', 'Delete', ',', '.', 'ArrowLeft', 'ArrowRight', 'Shift', 'Home', 'End', "Enter"];
const Numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const CtrAvailable = [
    'a', 'v', 'c', 'x', 'z',
    86, 67, 88, 90, 65
];
let LitNumberField = class LitNumberField extends formAssociated(LitElement) {
    constructor() {
        super(...arguments);
        this.min = NaN;
        this.max = NaN;
        this.decimals = 8;
        this.readonly = false;
        this.autofocus = false;
        this.replaceToRange = false;
        this.placeholder = '';
        this.inputmode = 'text';
        this.useCancelButton = false;
        this.icon = '';
        this._selectionBeforeRender = 0;
        this.inputRef = createRef();
        this._valueAsNumber = NaN;
        this._value = '';
    }
    static get styles() {
        return input;
    }
    ;
    static get properties() {
        return {
            ...super.properties,
            value: { type: String, hasChanged: () => true },
            valueAsNumber: { type: String },
        };
    }
    get valueAsNumber() {
        return this._valueAsNumber;
    }
    set valueAsNumber(value) {
        this.value = value.toFixed(this.decimals);
    }
    get value() {
        return this._value;
    }
    set value(value) {
        const oldValue = this._value;
        this._value = this._valueResolve(value);
        this._valueAsNumber = Number(this._value);
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
    _valueResolve(rawValue) {
        let value = rawValue.replace(",", ".");
        const arr = value.split(".");
        if (arr.length > 1) {
            value = arr[0] + "." + arr.slice(1).join("").slice(0, this.decimals);
        }
        if (this.replaceToRange) {
            const asNumber = Number(value);
            if (!isNaN(this.min) && asNumber < this.min) {
                value = this.min.toString();
            }
            else if (!isNaN(this.max) && asNumber > this.max) {
                value = this.max.toString();
            }
        }
        return value;
    }
    _iconTemplate() {
        if (!this.icon)
            return nothing;
        return html `<div class = "icon">${this.icon}</div>`;
    }
    _cancelIconTemplate() {
        if (!this.useCancelButton || !this.value)
            return nothing;
        return html `<lit-icon 
                        @click = "${this._clearValue}"
                        icon = "remove" 
                        class = "danger icon"></lit-icon>`;
    }
    willUpdate() {
        var _a;
        this._selectionBeforeRender = ((_a = this.inputRef.value) === null || _a === void 0 ? void 0 : _a.selectionStart) || 0;
    }
    render() {
        return html `
        ${super.render()}
        <div class = "wrapper" >
            <input type = "text" 
                   ?disabled = "${this.disabled}"
                   ?readonly = "${this.readonly}"
                   placeholder = "${this.placeholder}"
                   spellcheck = "${this.spellcheck}"
                   inputmode = "${this.inputmode}"
                   @input = "${this._handleInput}" 
                   @keydown = "${this._handleKeyDown}"
                   @change = "${this._handleChange}"
                   ${ref(this.inputRef)}
                   .value = ${live(this.value)}>
            ${this._cancelIconTemplate()}
            ${this._iconTemplate()}
        </div>`;
    }
    updated(props) {
        var _a;
        super.updated(props);
        if (this._selectionBeforeRender !== undefined) {
            (_a = this.inputRef.value) === null || _a === void 0 ? void 0 : _a.setSelectionRange(this._selectionBeforeRender, this._selectionBeforeRender);
        }
        this.validate();
        if (props.has("value")) {
            this.dispatchEvent(new CustomEvent("changed", { detail: this.value, bubbles: true }));
        }
    }
    async firstUpdated(props) {
        super.firstUpdated(props);
        if (this.autofocus) {
            setTimeout(() => this.focus());
        }
    }
    validate() {
        super.validate();
        if (this.min) {
            if (this.valueAsNumber < this.min) {
                this.setValidity({ rangeUnderflow: true });
            }
            else if (this.validity.rangeUnderflow) {
                this.setValidity({ rangeUnderflow: false });
            }
        }
        if (this.max) {
            if (this.valueAsNumber > this.max) {
                this.setValidity({ rangeOverflow: true });
            }
            else if (this.validity.rangeOverflow) {
                this.setValidity({ rangeOverflow: false });
            }
        }
    }
    _clearValue() {
        this.value = '';
    }
    focus() {
        var _a, _b;
        (_a = this.inputRef.value) === null || _a === void 0 ? void 0 : _a.focus();
        (_b = this.inputRef.value) === null || _b === void 0 ? void 0 : _b.setSelectionRange(this.value.length, this.value.length);
    }
    // ==== Events ====
    _handleChange(e) {
        this.reportValidity();
    }
    _handleInput(e) {
        this.value = e.target.value;
    }
    _handleKeyDown(e) {
        if (!AvailabledKeys.includes(e.key) &&
            !Numbers.includes(e.key) &&
            !(CtrAvailable.includes(e.key) && (e.ctrlKey || e.metaKey) ||
                CtrAvailable.includes(e.keyCode) && (e.ctrlKey || e.metaKey))) {
            e.preventDefault();
        }
    }
};
__decorate([
    property({ type: Number })
], LitNumberField.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], LitNumberField.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], LitNumberField.prototype, "decimals", void 0);
__decorate([
    property({ type: Boolean })
], LitNumberField.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean })
], LitNumberField.prototype, "autofocus", void 0);
__decorate([
    property({ type: Boolean })
], LitNumberField.prototype, "replaceToRange", void 0);
__decorate([
    property({ type: String })
], LitNumberField.prototype, "placeholder", void 0);
__decorate([
    property({ type: String })
], LitNumberField.prototype, "inputmode", void 0);
__decorate([
    property({ type: Boolean })
], LitNumberField.prototype, "useCancelButton", void 0);
__decorate([
    property()
], LitNumberField.prototype, "icon", void 0);
LitNumberField = __decorate([
    customElement("lit-numberfield")
], LitNumberField);
export { LitNumberField };
