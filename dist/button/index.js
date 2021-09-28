import { __decorate } from "tslib";
import { LitElement, nothing, html, } from 'lit';
import { customElement, property } from 'lit/decorators';
import { classMap } from 'lit/directives/class-map';
import { EnterController } from '../controllers/EnterController';
import { button } from '../styles/button';
let ButtomElement = class ButtomElement extends LitElement {
    constructor() {
        super(...arguments);
        this.iconBefore = '';
        this.iconAfter = '';
        this.type = 'button';
        this.size = 'medium';
        this.tabindex = 0;
        this.disabled = false;
        this.borderless = false;
        this.switch = false;
        this.primary = false;
        this.success = false;
        this.error = false;
        this.switchOn = true;
        this.enter = new EnterController(this);
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    get classes() {
        return {
            borderless: this.borderless,
            switch: this.switch,
            "switch-on": this.switchOn,
            primary: this.primary,
            success: this.success,
            error: this.error,
            disabled: this.disabled,
            wrapper: true,
            noselect: true,
            "icon-before": !!this.iconBefore,
            "icon-after": !!this.iconAfter,
        };
    }
    _iconBeforeTemplate() {
        if (!this.iconBefore)
            return nothing;
        return html `<span class = "icon-before icon">${this.iconBefore}</span>`;
    }
    _iconAfterTemplate() {
        if (!this.iconAfter)
            return nothing;
        return html `<span class = "icon-after icon">${this.iconAfter}</span>`;
    }
    render() {
        return html `
            <div tabindex = "${this.tabindex}" 
                class = "${classMap(this.classes)}" 
                @click = "${this._click}"
            >${this._iconBeforeTemplate()}<div><slot></slot></div>${this._iconAfterTemplate()}</div>`;
    }
    // ==== Events ====
    onkeyEnter() {
        if (document.activeElement === this) {
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
ButtomElement.styles = button;
__decorate([
    property()
], ButtomElement.prototype, "iconBefore", void 0);
__decorate([
    property()
], ButtomElement.prototype, "iconAfter", void 0);
__decorate([
    property({ type: String })
], ButtomElement.prototype, "type", void 0);
__decorate([
    property({ type: String })
], ButtomElement.prototype, "size", void 0);
__decorate([
    property({ type: Number })
], ButtomElement.prototype, "tabindex", void 0);
__decorate([
    property({ type: Boolean })
], ButtomElement.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], ButtomElement.prototype, "borderless", void 0);
__decorate([
    property({ type: Boolean })
], ButtomElement.prototype, "switch", void 0);
__decorate([
    property({ type: Boolean })
], ButtomElement.prototype, "primary", void 0);
__decorate([
    property({ type: Boolean })
], ButtomElement.prototype, "success", void 0);
__decorate([
    property({ type: Boolean })
], ButtomElement.prototype, "error", void 0);
__decorate([
    property({ type: Boolean })
], ButtomElement.prototype, "switchOn", void 0);
ButtomElement = __decorate([
    customElement("button-element")
], ButtomElement);
export { ButtomElement };
