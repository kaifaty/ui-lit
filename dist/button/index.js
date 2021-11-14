import { __decorate } from "tslib";
import { LitElement, html, } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { classMap } from 'lit/directives/class-map';
import { KeyDownController } from '../controllers/KeyController';
import { button } from '../styles/button';
let LitButton = class LitButton extends LitElement {
    constructor() {
        super(...arguments);
        this.iconBefore = false;
        this.iconAfter = false;
        this.type = 'button';
        this.size = 'medium';
        this.disabled = false;
        this.borderless = false;
        this.switch = false;
        this.primary = false;
        this.secondary = false;
        this.success = false;
        this.danger = false;
        this.switchOn = true;
        this.tabindex = 0;
        this.enter = new KeyDownController(this);
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    get classes() {
        return {
            wrapper: true,
            noselect: true,
            "icon-before": !!this.iconBefore,
            "icon-after": !!this.iconAfter,
        };
    }
    render() {
        return html `
        <div tabIndex = "${this.tabindex}" 
            class = "${classMap(this.classes)}" 
            @click = "${this._click}"
            ><slot @slotchange = "${this._onIconBefore}" 
                  name = "icon-before"
            ></slot><div
            ><slot></slot></div><slot @slotchange = "${this._onIconAfter}"
                  name = "icon-after"></slot></div>`;
    }
    // ==== Events ====
    _onIconBefore(e) {
        this.iconBefore = true;
    }
    _onIconAfter(e) {
        this.iconAfter = true;
    }
    handlekeyDown(e) {
        if (e.key === "Enter" && document.activeElement === this) {
            this.submit();
        }
    }
    _click() {
        if (this.disabled)
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
        if (this.type === 'submit') {
            this.dispatchEvent(new CustomEvent("submitForm", {
                bubbles: true,
                composed: true,
            }));
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
    property({ type: Number })
], LitButton.prototype, "tabindex", void 0);
LitButton = __decorate([
    customElement("lit-button")
], LitButton);
export { LitButton };
