import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators';
import '../label';
let FromElement = class FromElement extends LitElement {
    constructor() {
        super(...arguments);
        this._elements = [];
        this.noValidate = false;
        this.disabled = false;
        // ==== Events ==== 
        this._handleSubmit = (e) => {
            e.preventDefault();
            this.submit();
        };
        this._handleFormAttached = (e) => {
            this._elements.push(e.detail);
        };
        this._handleFormDettached = (e) => {
            this._elements.filter(it => e.detail !== it);
        };
    }
    get length() {
        return this._elements.length;
    }
    get elements() {
        return this._elements;
    }
    render() {
        return html `<slot></slot>`;
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("submitForm", this._handleSubmit);
        this.addEventListener("fromAttached", this._handleFormAttached);
        this.addEventListener("fromDettached", this._handleFormDettached);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener("submitForm", this._handleSubmit);
        this.removeEventListener("fromAttached", this._handleFormAttached);
        this.removeEventListener("fromDettached", this._handleFormDettached);
    }
    _getData() {
        const data = {};
        this._elements.forEach(it => {
            if (it.tagName.toLocaleLowerCase() === "checkbox-element") {
                data[it.name] = Number(it.checked);
            }
            else if (it.name) {
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
    updated(props) {
        if (props.has('disabled')) {
            this._elements.forEach(el => el.disabled = this.disabled);
        }
    }
    submit() {
        if (!this.noValidate && !this.reportValidity()) {
            return false;
        }
        const data = this._getData();
        this.dispatchEvent(new CustomEvent('submit', {
            detail: { data },
            bubbles: true
        }));
        return data;
    }
    reset() {
    }
};
__decorate([
    property({ type: Boolean })
], FromElement.prototype, "noValidate", void 0);
__decorate([
    property({ type: Boolean })
], FromElement.prototype, "disabled", void 0);
FromElement = __decorate([
    customElement("form-element")
], FromElement);
export { FromElement };
