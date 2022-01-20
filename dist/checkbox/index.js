import { __decorate } from "tslib";
import { customElement, property } from 'lit/decorators.js';
import { formAssociated } from '../mixins/form-associated/index';
import { LitElement, html } from 'lit';
import { noselect } from '../styles/noselect';
import { labled } from '../mixins/labled';
import { checkboxStyles } from './styles';
let LitCheckbox = class LitCheckbox extends labled(formAssociated(LitElement)) {
    constructor() {
        super(...arguments);
        this.type = "switcher";
        this._checked = false;
        this._value = 'off';
    }
    static get properties() {
        return {
            ...super.properties,
            value: { type: String },
            name: { type: String },
            checked: { type: Boolean },
        };
    }
    get checked() {
        return this._checked;
    }
    set checked(value) {
        this.value = value ? 'on' : 'off';
    }
    get value() {
        return this._value;
    }
    set value(value) {
        const oldValue = this._value;
        if (oldValue === value)
            return;
        this._value = value;
        this._checked = value === 'on';
        this.setAttribute('value', value);
        this.requestUpdate('value', oldValue);
    }
    reportValidity() {
        return true;
    }
    render() {
        var _a;
        return html `
        <div 
            role = "checkbox" 
            aria-checked = "${this.checked}"
            aria-label = "${(((_a = this.labels[0]) === null || _a === void 0 ? void 0 : _a.textContent) || '').trim()}"
            class = "noselect"
            id = "content" 
            @click = "${this._click}"><span class = "control"></span></div>`;
    }
    _click(e) {
        e.stopPropagation();
        this.toggle();
    }
    toggle() {
        if (this.readonly || this.disabled)
            return;
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent("changed", {
            bubbles: true,
            detail: {
                value: this.value,
                checked: this.checked
            }
        }));
    }
};
LitCheckbox.styles = [
    noselect,
    checkboxStyles
];
__decorate([
    property({ type: String, reflect: true })
], LitCheckbox.prototype, "type", void 0);
LitCheckbox = __decorate([
    customElement("lit-checkbox")
], LitCheckbox);
export { LitCheckbox };
