import { __decorate } from "tslib";
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators';
import { ifDefined } from 'lit/directives/if-defined';
let LitLink = class LitLink extends LitElement {
    constructor() {
        super(...arguments);
        this.href = undefined;
        this.type = 'link';
        this.rel = "nofollow";
        this.target = "_self";
    }
    render() {
        return html `<a 
                    rel = "${ifDefined(this.rel)}"
                    target = "${this.target}" 
                    href = "${ifDefined(this.href)}"><slot></slot></a>`;
    }
};
LitLink.styles = css `
    :host{
        display: inline-block;
        box-sizing: border-box;
    }
    :host(.underlined) a{
        border-bottom: 1px solid var(--lit-link-color, hsl(200, 80%, 55%));
    }
    a:focus{
        outline: 1px solid var(--lit-link-color, hsl(200, 80%, 55%));
        border-bottom: 1px solid transparent;
    }
    a{
        color: var(--lit-link-color, hsl(200, 80%, 55%));
        text-decoration: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
    }
    a:hover:not(:focus){
        color: var(--lit-link-color-hover, hsl(200, 80%, 60%));
        box-shadow: 0 4px 4px -4px  hsl(200, 80%, 55%);
        -webkit--shadow: 0 4px 4px -4px  hsl(200, 80%, 55%);
        -moz-box-shadow: 0 4px 4px -4px  hsl(200, 80%, 55%);
    }
    `;
__decorate([
    property({ type: String })
], LitLink.prototype, "href", void 0);
__decorate([
    property({ type: String })
], LitLink.prototype, "type", void 0);
__decorate([
    property({ type: String })
], LitLink.prototype, "rel", void 0);
__decorate([
    property({ type: String })
], LitLink.prototype, "target", void 0);
LitLink = __decorate([
    customElement("lit-link")
], LitLink);
export { LitLink };
