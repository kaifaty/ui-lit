import { __decorate } from "tslib";
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../label';
let LitFrom = class LitFrom extends LitElement {
    constructor() {
        super(...arguments);
        this.noValidate = false;
        this._elements = [];
        this._defaults = {};
        this._button = null;
        this._disabled = false;
        // ==== Events ==== 
        this._handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this._button = e.target;
            this.submit();
        };
        this._handleFormAttached = (e) => {
            var _a, _b;
            this._elements.push(e.detail.element);
            this._addToDefault(e.detail.element);
            (_b = (_a = e.detail).onAttatch) === null || _b === void 0 ? void 0 : _b.call(_a, this);
        };
    }
    get button() {
        if (this._button)
            return this._button;
        const slots = this.querySelectorAll("slot");
        for (const slot of slots) {
            for (const el of slot.assignedElements()) {
                if (el.tagName.toLowerCase() === "lit-button" && el.type === 'submit') {
                    return el;
                }
            }
        }
        return null;
    }
    get length() {
        return this._elements.length;
    }
    get elements() {
        return this._elements;
    }
    get disabled() {
        return this.disabled;
    }
    set disabled(value) {
        if (value !== this._disabled) {
            this._disabled = value;
            this._elements.forEach(el => el.disabled = this.disabled);
        }
    }
    render() {
        return html `<slot></slot>`;
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("submitForm", this._handleSubmit);
        this.addEventListener("fromAttached", this._handleFormAttached);
        //this.addEventListener("fromDettached", this._handleFormDettached as EventListener);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("submitForm", this._handleSubmit);
        this.removeEventListener("fromAttached", this._handleFormAttached);
        //this.removeEventListener("fromDettached", this._handleFormDettached as EventListener);
    }
    _addToDefault(el) {
        if (el.name) {
            this._defaults[el.name] = el.value;
        }
    }
    detatchElement(el) {
        this._elements = this._elements.filter(it => el !== it);
    }
    getData() {
        const data = {};
        this._elements.forEach(it => {
            if (!it.name || it.disabled)
                return;
            if (it.tagName.toLocaleLowerCase() === "lit-checkbox") {
                data[it.name] = it.checked;
            }
            else if (it.tagName.toLocaleLowerCase() === "lit-numberfield") {
                data[it.name] = it.valueAsNumber;
            }
            else if (it.tagName.toLocaleLowerCase() === "lit-range") {
                data[it.name] = it.valueAsNumber;
            }
            else {
                data[it.name] = it.value;
            }
        });
        return data;
    }
    checkValidity() {
        for (const el of this.elements) {
            if (!el.checkValidity()) {
                return false;
            }
        }
        return true;
    }
    reportValidity() {
        for (const el of this.elements) {
            el.validate();
            if (!el.reportValidity()) {
                return false;
            }
        }
        return true;
    }
    _startSpinButton() {
        if (this.button) {
            this.button.loading = true;
        }
    }
    _stopSpinButton() {
        const btn = this.button;
        if (btn) {
            btn.loading = false;
        }
        this._button = null;
    }
    async submit() {
        if (!this.noValidate && !this.reportValidity()) {
            return false;
        }
        const data = this.getData();
        if (this.onAction) {
            try {
                this._startSpinButton();
                await this.onAction(data);
                this._stopSpinButton();
            }
            catch {
                this._stopSpinButton();
                return false;
            }
        }
        this.dispatchEvent(new CustomEvent('submit', {
            detail: { data },
            bubbles: true
        }));
        return data;
    }
    async reset() {
        // Check tabss on reset 
        this.elements.forEach(it => it.value = this._defaults[it.name]);
        return new Promise(r => {
            setTimeout(() => {
                this.elements.forEach(it => it.validityDefault());
                r(true);
            });
        });
    }
};
LitFrom.styles = css `
    :host{
        display: block;
    }
    `;
__decorate([
    property({ type: Boolean })
], LitFrom.prototype, "noValidate", void 0);
__decorate([
    property({ type: Object })
], LitFrom.prototype, "onAction", void 0);
LitFrom = __decorate([
    customElement("lit-form")
], LitFrom);
export { LitFrom };
