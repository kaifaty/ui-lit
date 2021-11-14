import { __decorate } from "tslib";
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';
import { getRootElement } from 'kailib';
let LitLabel = class LitLabel extends LitElement {
    constructor() {
        super(...arguments);
        this.for = '';
        this._connectedNode = null;
        this._handleClick = () => {
            var _a;
            (_a = this._connectedNode) === null || _a === void 0 ? void 0 : _a.focus();
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.appendConnectedField(this._findConnectedField());
        this.addEventListener('click', this._handleClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._connectedNode = null;
        this.removeEventListener('click', this._handleClick);
    }
    render() {
        return html `<slot></slot>`;
    }
    appendConnectedField(el) {
        if (!this._connectedNode && el) {
            this._connectedNode = el;
        }
    }
    removeConnectedField(el) {
        if (el === this._connectedNode) {
            this._connectedNode = null;
        }
    }
    _findConnectedField() {
        if (this.for) {
            const root = getRootElement(this);
            const node = root.querySelector(`#${this.for}`);
            if (node && node._formAssiciated || node instanceof HTMLInputElement) {
                return node;
            }
        }
        return null;
    }
};
LitLabel.styles = css ``;
__decorate([
    property({ type: String })
], LitLabel.prototype, "for", void 0);
LitLabel = __decorate([
    customElement("lit-label")
], LitLabel);
export { LitLabel };
