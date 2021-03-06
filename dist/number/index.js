import { __decorate } from "tslib";
import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { formAssociated } from '../mixins/form-associated/index';
;
import '../icon';
import { input } from '../styles/input';
import { live } from 'lit/directives/live.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { labled } from '../mixins/labled';
import { focusable } from '../mixins/focusable/index';
import { notificatable } from '../mixins/notificatable/index';
import { isiOS } from 'kailib';
const _isIOS = isiOS();
const filterZeroues = (decimals) => {
    let res = '';
    let nonZeroExist = false;
    if (!decimals)
        return res;
    for (let i = decimals.length - 1; i >= 0; i--) {
        if (decimals[i] !== '0') {
            nonZeroExist = true;
        }
        if (nonZeroExist) {
            res = decimals[i] + res;
        }
    }
    return res;
};
const filterNotNumbers = (str) => {
    let res = '';
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        if (code === 45 || code === 46 || code >= 48 && code <= 57) {
            res += str[i];
        }
    }
    return res;
};
let LitNumberField = class LitNumberField extends focusable(labled(notificatable(formAssociated(LitElement)))) {
    constructor() {
        super(...arguments);
        this.min = NaN;
        this.max = NaN;
        this.decimals = 8;
        this.replaceToRange = false;
        this.placeholder = '';
        this.inputmode = 'decimal';
        this.useCancelButton = false;
        this.icon = '';
        this._selectionBeforeRender = 0;
        this._inputRef = createRef();
        this._value = '';
    }
    static get styles() {
        return [
            ...super.elementStyles,
            input
        ];
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
        return Number(this._value);
    }
    set valueAsNumber(value) {
        if (!value) {
            this.value = '';
            return;
        }
        if (typeof value === 'number') {
            const [ceil, dec] = value.toFixed(this.decimals).split(".");
            const filtered = filterZeroues(dec);
            if (filtered) {
                this.value = ceil + "." + filtered;
            }
            else {
                this.value = ceil;
            }
        }
        else if (typeof value === 'string') {
            this.value = value;
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        const oldValue = this._value;
        if (Number(value) === Number(oldValue)) {
            return;
        }
        this._value = this._valueResolve(value);
        this.requestUpdate('value', oldValue);
    }
    _valueResolve(rawValue) {
        if (!rawValue)
            return '';
        let value = filterNotNumbers(rawValue.replace(",", "."));
        const [ceil, ...decs] = value.split(".");
        const decimals = decs.join("");
        if (decimals.length) {
            value = ceil + "." + decimals.slice(0, this.decimals);
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
    _cancelIconTemplate() {
        if (!this.useCancelButton || !this.value)
            return nothing;
        return html `<lit-icon 
                        @click = "${this._clearValue}"
                        icon = "remove" 
                        danger
                        class = "danger icon"></lit-icon>`;
    }
    _onClick(e) {
        e.stopPropagation();
    }
    get selectionStart() {
        var _a;
        return ((_a = this._inputRef.value) === null || _a === void 0 ? void 0 : _a.selectionStart) || 0;
    }
    willUpdate(_changedProperties) {
        super.willUpdate(_changedProperties);
        this._selectionBeforeRender = this.selectionStart;
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
                   inputmode = "decimal"
                   @input = "${this._handleInput}" 
                   @change = "${this._handleChange}"
                   @click = "${this._onClick}"
                   ${ref(this._inputRef)}
                   .value = ${live(this.value)}>
            ${this._cancelIconTemplate()}
            <div class = "icon"><slot name = "icon"></slot></div>
        </div>`;
    }
    updated(props) {
        var _a;
        super.updated(props);
        if (this._selectionBeforeRender !== this.selectionStart && !_isIOS) {
            (_a = this._inputRef.value) === null || _a === void 0 ? void 0 : _a.setSelectionRange(this._selectionBeforeRender, this._selectionBeforeRender);
        }
        this.validate();
    }
    validate() {
        super.validate();
        //if(!this.required && this.disabled) return;
        const skip = !this.required && this.disabled;
        if (this.min) {
            if (this.valueAsNumber < this.min && !skip) {
                this.setValidity({ rangeUnderflow: true });
            }
            else if (this.validity.rangeUnderflow) {
                this.setValidity({ rangeUnderflow: false });
            }
        }
        if (this.max) {
            if (this.valueAsNumber > this.max && !skip) {
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
    // ==== Events ====
    _handleChange(e) {
        this.reportValidity();
    }
    _handleInput(e) {
        const oldValue = this._value;
        const value = e.target.value;
        this.value = value;
        if (oldValue !== this._value) {
            this.notify();
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
