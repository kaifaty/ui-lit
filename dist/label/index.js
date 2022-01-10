import { __decorate } from "tslib";
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let LitLabel = class LitLabel extends LitElement {
    constructor() {
        super(...arguments);
        this.for = '';
        this._labled = null;
        //  === Events === 
        this._onLabledConnected = (e) => {
            this.setLabled(e.detail);
        };
        this._handleClick = (e) => {
            var _a;
            if (!this._labled)
                return;
            (_a = this._labled) === null || _a === void 0 ? void 0 : _a.focus();
            if (this._labled.checked !== undefined) {
                this._labled.toggle();
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this._handleClick);
        this.addEventListener('labledConnected', this._onLabledConnected);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._disconnectLabels();
        this.removeEventListener('click', this._handleClick);
        this.removeEventListener('labledConnected', this._onLabledConnected);
    }
    firstUpdated() {
        this._connectByFor();
    }
    render() {
        return html `<slot></slot>`;
    }
    get labled() {
        return this._labled;
    }
    setLabled(labeled) {
        if (this._labled === labeled)
            return;
        if (this._labled) {
            console.warn(this, 'already has labled', this._labled);
            this._disconnectLabels();
        }
        this._labled = labeled;
        this._labled.addLabel(this);
    }
    _disconnectLabels() {
        var _a;
        (_a = this._labled) === null || _a === void 0 ? void 0 : _a.removeLabel(this);
        this._labled = null;
    }
    _connectByFor() {
        var _a;
        if (this.for) {
            const node = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(`#${this.for}`);
            if (node && node.addLabel) {
                this.setLabled(node);
            }
        }
    }
};
LitLabel.styles = css `
    :host{
        display: inline-flex;
        align-items: center;
    }
    :host([disabled]){
        opacity: 0.5;
    }
    `;
__decorate([
    property({ type: String })
], LitLabel.prototype, "for", void 0);
LitLabel = __decorate([
    customElement("lit-label")
], LitLabel);
export { LitLabel };
