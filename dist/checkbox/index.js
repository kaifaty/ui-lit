import { __decorate } from "tslib";
import { customElement, property } from 'lit/decorators';
import { formAssociated } from '../form-associated/index';
import { LitElement, html, css } from 'lit';
import { input } from '../styles/input';
let CheckboxElement = class CheckboxElement extends formAssociated(LitElement) {
    constructor() {
        super(...arguments);
        this.type = "switcher";
        this._checked = false;
        this._value = 'off';
    }
    static get properties() {
        return {
            ...super.properties,
            value: { type: String },
            checked: { type: Boolean },
        };
    }
    get checked() {
        return this._checked;
    }
    set checked(value) {
        this.value = value ? 'on' : 'off';
    }
    get value() {
        return this._value;
    }
    set value(value) {
        const oldValue = this._value;
        this._value = value;
        this._checked = value === 'on';
        this.requestUpdate('value', oldValue);
    }
    connectedCallback() {
        var _a;
        super.connectedCallback();
        (_a = this.findLabel()) === null || _a === void 0 ? void 0 : _a.appendConnectedField(this);
    }
    disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        (_a = this.findLabel()) === null || _a === void 0 ? void 0 : _a.removeConnectedField(this);
    }
    _switcherTemplate() {
        return html `<div 
            @click = "${this._handleClick}" 
            class = "switcher ${this.readonly ? 'readonly' : ''} ${this.value}"><span class = "control"></span></div>`;
    }
    _checkboxTemplate() {
        return html `<div 
            @click = "${this._handleClick}" 
            class = "checkbox ${this.readonly ? 'readonly' : ''} ${this.value}">
    </div>`;
    }
    render() {
        if (this.type === 'switcher') {
            return this._switcherTemplate();
        }
        return this._checkboxTemplate();
    }
    _handleClick() {
        if (this.readonly)
            return;
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent("changed", {
            bubbles: true,
            detail: {
                value: this.value,
                checked: this.checked
            }
        }));
    }
};
CheckboxElement.styles = [
    input,
    css `
        :host{
            --checkbox-switcher-width: 32px;
            --checkbox-switcher-height: 14px;
            --checkbox-control-size: 14px;
            --offset: calc((var(--checkbox-switcher-height) - var(--checkbox-control-size) - 2px ) / 2);

            --checkmark-border: 2px;
            --checkmark-width: 5px;
            --checkmark-height: 8px;
            --checkmark-left: calc(var(--checkbox-control-size) - var(--checkmark-width) - var(--checkmark-border) - 3px);
            --checkmark-top: calc(var(--checkbox-control-size) - var(--checkmark-height) - var(--checkmark-border) - 4px);

        }
        .checkbox{
            width: var(--checkbox-control-size);
            height: var(--checkbox-control-size);
            border: 1px solid var(--checkbox-border, #999);
            position: relative;
            cursor: pointer;
            background-color: var(--checkbox-background, white);
            
        }
        .checkbox:hover{
            box-shadow: 0 0 2px var(--checkbox-border, #999);
        }
        .checkbox.on{
        }
        .checkbox.on:after{
            content:'';
            position: absolute;
            top: var(--checkmark-top);
            left: var(--checkmark-left);
                    
            transform-origin: center;
            transform:  rotate(45deg) skewX(15deg) ;
            height: var(--checkmark-height);
            width: var(--checkmark-width);
            border-bottom: var(--checkmark-border) solid var(--checkmark-color, hsl(100, 65%, 5%));
            border-right: var(--checkmark-border) solid var(--checkmark-color, hsl(100, 65%, 5%));
        }
        .switcher{
            cursor: pointer;
            position: relative;
            width: var(--checkbox-switcher-width);
            height: var(--checkbox-switcher-height);
            border-radius: 16px;
            z-index: 2;
            transition: background-color ease 0.2s;
            box-shadow: var(--checkbox-switcher-shadow, inset 1px 1px 2px rgba(0,0,0,0.7));
        }
        .switcher .control{
            position: absolute;
            background-color: var(--checkbox-switcher-control-background,#fff);
            border: var(--checkbox-switcher-control-border, 1px solid #ccc); ;
            border-radius: var(--checkbox-control-size);
            width: var(--checkbox-control-size);
            height: var(--checkbox-control-size);
            top: var(--offset);
            left: var(--offset);
            box-shadow: var(--checkbox-switcher-control-shadow, 1px 1px 2px rgba(0,0,0,0.6));
            transition: transform ease 0.2s;
        }
        .switcher.on {
            background-color: var(--switcher-on-background, hsl(110, 65%, 50%));
        }
        .switcher.off {
            background-color: var(--switcher-off-background, hsl(0, 65%, 55%));
        }
        .switcher.on .control{
            transform: translateX(calc(var(--checkbox-switcher-width) - var(--checkbox-control-size) + 1px));
        }
        .readonly{
            opacity: 0.5;
        }
        `
];
__decorate([
    property({ type: String, reflect: true })
], CheckboxElement.prototype, "type", void 0);
CheckboxElement = __decorate([
    customElement("lit-checkbox")
], CheckboxElement);
export { CheckboxElement };
