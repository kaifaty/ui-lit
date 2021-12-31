import { __decorate } from "tslib";
import { LitElement, html, } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { KeyDownController } from '../controllers/KeyController';
import { button } from './styles';
import '../spinner';
let LitButton = class LitButton extends LitElement {
    constructor() {
        super(...arguments);
        this.iconBefore = false;
        this.iconAfter = false;
        this._notifyIcon = false;
        this.type = 'button';
        this.size = 'medium';
        this.disabled = false;
        this.borderless = false;
        this.switch = false;
        this.primary = false;
        this.secondary = false;
        this.success = false;
        this.danger = false;
        this.switchOn = false;
        this.notifyOnClick = false;
        this.center = false;
        this.loading = false;
        this.tabindex = 0;
        this.enter = new KeyDownController(this);
        this.notifyTimeout = 0;
    }
    get classes() {
        return {
            wrapper: true,
            noselect: true,
        };
    }
    _contentTemplate() {
        if (this.loading) {
            return html `<lit-spinner small></lit-spinner>`;
        }
        if (this._notifyIcon) {
            return html `<lit-icon class = "checkmark" 
                                  icon = "checkmark"></lit-icon>`;
        }
        return html `<slot name = "icon-before"></slot>
                    <slot></slot>
                    <slot name = "icon-after"></slot>`;
    }
    render() {
        return html `
        <div tabIndex = "${this.tabindex}" 
            class = "${classMap(this.classes)}" 
            @click = "${this.click}"
        >${this._contentTemplate()}</div>`;
    }
    // ==== Events ====
    handlekeyDown(e) {
        if (e.key === "Enter" && document.activeElement === this) {
            this.submit();
        }
    }
    focus() {
        var _a;
        (_a = this.shadowRoot.querySelector(`.wrapper`)) === null || _a === void 0 ? void 0 : _a.focus();
    }
    click() {
        if (this.disabled || this.loading)
            return;
        if (this.switch) {
            this.toggleSwitch();
        }
        else {
            this.submit();
        }
    }
    // ==== Actions ====
    toggleSwitch() {
        this.switchOn = !this.switchOn;
        this.dispatchEvent(new CustomEvent("switchChanged", {
            detail: this.switchOn,
            bubbles: true,
        }));
    }
    submit() {
        if (this.loading)
            return;
        if (this.type === 'submit') {
            this.dispatchEvent(new CustomEvent("submitForm", {
                bubbles: true,
                composed: true,
            }));
        }
        if (this.notifyOnClick) {
            this._notifyIcon = true;
            clearTimeout(this.notifyTimeout);
            this.notifyTimeout = window.setTimeout(() => {
                this._notifyIcon = false;
            }, 1000);
        }
    }
};
LitButton.styles = button;
__decorate([
    state()
], LitButton.prototype, "iconBefore", void 0);
__decorate([
    state()
], LitButton.prototype, "iconAfter", void 0);
__decorate([
    state()
], LitButton.prototype, "_notifyIcon", void 0);
__decorate([
    property({ type: String })
], LitButton.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true })
], LitButton.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "borderless", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "switch", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "primary", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "secondary", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "success", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "danger", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "switchOn", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "notifyOnClick", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "center", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "loading", void 0);
__decorate([
    property({ type: Number })
], LitButton.prototype, "tabindex", void 0);
LitButton = __decorate([
    customElement("lit-button")
], LitButton);
export { LitButton };
