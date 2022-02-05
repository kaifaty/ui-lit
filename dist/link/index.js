import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { linkStyles } from './styles';
let LitLink = class LitLink extends LitElement {
    constructor() {
        super(...arguments);
        this.href = undefined;
        this.type = 'link';
        this.rel = "nofollow";
        this.target = "_self";
        this.underlined = false;
        this.tabindex = 0;
    }
    render() {
        return html `<a @mouseover = "${this.onMouseover}"
                        @mouseout = "${this.onMouseout}"
                        tabindex = "${this.tabindex}"
                        rel = "${ifDefined(this.rel)}"
                        target = "${this.target}" 
                        href = "${ifDefined(this.href)}"><slot></slot></a>`;
    }
    onMouseover() {
        if (this.type === 'button')
            return;
        this.setAttribute("hover", "");
    }
    onMouseout() {
        if (this.type === 'button')
            return;
        this.removeAttribute("hover");
    }
    click() {
        var _a, _b;
        (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("a")) === null || _b === void 0 ? void 0 : _b.click();
    }
};
LitLink.styles = linkStyles;
__decorate([
    property({ type: String })
], LitLink.prototype, "href", void 0);
__decorate([
    property({ type: String, reflect: true })
], LitLink.prototype, "type", void 0);
__decorate([
    property({ type: String })
], LitLink.prototype, "rel", void 0);
__decorate([
    property({ type: String })
], LitLink.prototype, "target", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitLink.prototype, "underlined", void 0);
LitLink = __decorate([
    customElement("lit-link")
], LitLink);
export { LitLink };
