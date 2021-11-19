import { __decorate } from "tslib";
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';
import { getRootElement } from 'kailib';
let LitLabel = class LitLabel extends LitElement {
    constructor() {
        super(...arguments);
        this.for = '';
        this._connectedNode = null;
        this._handleClick = (e) => {
            var _a, _b, _c;
            (_a = this._connectedNode) === null || _a === void 0 ? void 0 : _a.focus();
            if (((_b = this._connectedNode) === null || _b === void 0 ? void 0 : _b.tagName.toLowerCase()) === 'lit-checkbox'
                && ((_c = e.target) === null || _c === void 0 ? void 0 : _c.tagName.toLowerCase()) !== 'lit-checkbox') {
                this._connectedNode.toggle();
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._handleClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._connectedNode = null;
        this.removeEventListener('click', this._handleClick);
    }
    firstUpdated() {
        this.appendConnectedField(this._findConnectedField());
    }
    render() {
        return html `<slot></slot>`;
    }
    appendConnectedField(el) {
        console.log(el);
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
        else {
            for (const node of this.childNodes) {
                if (node._formAssiciated) {
                    return node;
                }
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
