import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators';
let FromElement = class FromElement extends LitElement {
    constructor() {
        super(...arguments);
        this.elements = [];
        this._onSubmit = (e) => {
            e.preventDefault();
            this.submit();
        };
    }
    render() {
        return html `
        <div @submitForm = "${this._onSubmit}"
             @fromAttached = '${this._onFormAttached}'
             @fromDettached = '${this._onFormDettached}'>
            <slot></slot>
        </div>
    `;
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    checkValidity() {
        return true;
    }
    reportValidity() {
        return true;
    }
    _onFormAttached(e) {
        this.elements.push(e.detail);
    }
    _onFormDettached(e) {
        this.elements.filter(it => e.detail !== it);
    }
    _getData() {
        const data = {};
        this.elements.forEach(it => {
            if (it.name) {
                data[it.name] = it.value;
            }
        });
        return data;
    }
    submit() {
        if (!this.reportValidity()) {
            return;
        }
        this.dispatchEvent(new CustomEvent('submit', {
            detail: {
                data: this._getData()
            }
        }));
    }
};
FromElement = __decorate([
    customElement("form-element")
], FromElement);
export { FromElement };
