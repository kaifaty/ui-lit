import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { formAssociated } from '../form-associated/index';
import { customElement } from 'lit/decorators';
let SelectElement = class SelectElement extends formAssociated(LitElement) {
    render() {
        return html ``;
    }
};
SelectElement = __decorate([
    customElement("select-element")
], SelectElement);
export { SelectElement };
