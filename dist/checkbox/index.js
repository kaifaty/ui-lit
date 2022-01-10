import { __decorate } from "tslib";
import { customElement, property } from 'lit/decorators.js';
import { formAssociated } from '../mixins/form-associated/index';
import { LitElement, html, css } from 'lit';
import { noselect } from '../styles/noselect';
import { labled } from '../mixins/labled';
let LitCheckbox = class LitCheckbox extends labled(formAssociated(LitElement)) {
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
            name: { type: String },
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
        if (oldValue === value)
            return;
        this._value = value;
        this._checked = value === 'on';
        this.setAttribute('value', value);
        this.requestUpdate('value', oldValue);
    }
    reportValidity() {
        return true;
    }
    render() {
        var _a;
        return html `
        <div 
            role = "checkbox" 
            aria-checked = "${this.checked}"
            aria-label = "${(((_a = this.labels[0]) === null || _a === void 0 ? void 0 : _a.textContent) || '').trim()}"
            class = "noselect"
            id = "content" 
            @click = "${this._click}"><span class = "control"></span></div>`;
    }
    _click(e) {
        e.stopPropagation();
        this.toggle();
    }
    toggle() {
        if (this.readonly || this.disabled)
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
LitCheckbox.styles = [
    noselect,
    css `
        :host{
            --switcher-width: 32px;
            --switcher-height: 14px;
            --control-size: 14px;
            --offset: calc((var(--switcher-height) - var(--control-size) - 2px ) / 2);

            --checkmark-border: 2px;
            --checkmark-width: 5px;
            --checkmark-height: 8px;
            --checkmark-left: calc(var(--control-size) - var(--checkmark-width) - var(--checkmark-border) - 3px);
            --checkmark-top: calc(var(--control-size) - var(--checkmark-height) - var(--checkmark-border) - 4px);

        }
        :host([readonly]),
        :host([disabled]){
            opacity: 0.5;
        }

        :host([type=checkbox]) .control{
            display: none;
        }
        :host([type=checkbox]) #content{
            width: var(--control-size);
            height: var(--control-size);
            border: var(--lit-checkbox-border, 1px solid #999);
            position: relative;
            cursor: pointer;
            background-color: var(--lit-checkbox-background, white);
            
        }
        :host([type=checkbox]) #content:hover{
            box-shadow: var(--lit-checkbox-border, 0 0 2px #999);
        }
        :host([type=checkbox][value=on]) #content:after{
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

        :host([type=switcher]) #content{
            cursor: pointer;
            position: relative;
            width: var(--switcher-width);
            height: var(--switcher-height);
            border-radius: var(--switcher-height);
            transition: background-color ease 0.2s;
            box-shadow: var(--lit-switcher-shadow, inset 1px 1px 2px  rgba(0,0,0,0.7));
        }
        :host([type=switcher]) .control{
            position: absolute;
            background-color: var(--lit-switcher-control-background,#fff);
            border-radius: 100%;
            width: var(--control-size);
            height: var(--control-size);
            top: var(--offset);
            left: var(--offset);
            box-shadow: 1px 1px 2px var(--lit-switcher-control-shadow, rgba(0,0,0,0.6));
            transition: transform ease 0.2s;
        }

        :host([type=switcher][value=on]) #content{
            background-color: var(--lit-switcher-on-background, hsl(110, 65%, 50%));
        }
        :host([type=switcher]) #content{
            background-color: var(--lit-switcher-off-background, hsl(0, 65%, 55%));
        }
        :host([type=switcher][value=on]) .control{
            transform: translateX(calc(var(--switcher-width) - var(--control-size) + 1px));
        }
        `
];
__decorate([
    property({ type: String, reflect: true })
], LitCheckbox.prototype, "type", void 0);
LitCheckbox = __decorate([
    customElement("lit-checkbox")
], LitCheckbox);
export { LitCheckbox };
