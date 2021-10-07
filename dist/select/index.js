import { __decorate } from "tslib";
import { classMap } from 'lit/directives/class-map';
import { html, LitElement, css } from 'lit';
import { formAssociated } from '../form-associated/index';
import { customElement, property, state } from 'lit/decorators';
import { input } from '../styles/input';
import { getEventDataset, isChildOfElement } from '../helpers';
import { ClickController } from '../controllers/ClickController';
import { KeyDownController } from '../controllers/KeyController';
let SelectElement = class SelectElement extends formAssociated(LitElement) {
    constructor() {
        super(...arguments);
        this.items = [];
        this.value = '';
        this.optionsWidth = 0;
        this.open = false;
        this.clickController = new ClickController(this);
        this.keyPressController = new KeyDownController(this);
        this.isFocus = false;
        this.focusTime = 0;
        this._focusedOption = '';
    }
    selected() {
        return this.items.filter(it => this.value === it.value)[0];
    }
    currentOption() {
        var _a;
        const el = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".value-" + this.value);
        if (el !== undefined) {
            return Number(el.dataset.index);
        }
        return -1;
    }
    firstUpdated() {
        if (!this.optionsWidth) {
            this.optionsWidth = this.clientWidth;
        }
    }
    _contentTemplate() {
        const optionsClass = {
            options: true,
            open: this.open
        };
        return html `<div
            style = "width: ${this.optionsWidth}px;"
            class = "${classMap(optionsClass)}">${this.items.map((it, i) => {
            const className = {
                selected: this.value === it.value,
                option: true,
                ['value-' + it.value]: true
            };
            return html `<div 
                tabindex = "0"
                data-index = "${i}"
                data-value = "${it.value}"
                @click = "${this._onSelect}" 
                @focus = "${this._onOptionFocus}" 
                class = "${classMap(className)}">${it.text}</div>`;
        })}</div>`;
    }
    render() {
        var _a;
        return html `
        <div 
            @click = "${this.onClick}"
            @focus = "${this.onFocus}"
            tabindex = "0"
            class = "content">
            <div>${((_a = this.selected()) === null || _a === void 0 ? void 0 : _a.text) || '-'}</div>
            <slot name = "icon">
                <div class = "icon-dropdown"><icon-element 
                    class = "${this.open ? 'dropup' : ''}" 
                    icon = "dropdown"></icon-element></div>
            </slot>
        </div>
        ${this._contentTemplate()}`;
    }
    updated(p) {
        var _a, _b;
        super.updated(p);
        if (this.open) {
            (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".value-" + this.value)) === null || _b === void 0 ? void 0 : _b.focus();
        }
    }
    nextSelect() {
        let current = this.currentOption();
        current++;
        if (current > this.items.length - 1) {
            current = 0;
        }
        this.value = this.items[current].value;
    }
    prevSelect() {
        let current = this.currentOption();
        current--;
        if (current < 0) {
            current = this.items.length - 1;
        }
        this.value = this.items[current].value;
    }
    _onOptionFocus(e) {
        this._focusedOption = e.target.dataset.value;
    }
    _onSelect(e) {
        this.value = getEventDataset(e, 'value');
        this.open = false;
        e.stopPropagation();
    }
    onkeyDown(e) {
        if (e.key === "ArrowDown") {
            this.nextSelect();
        }
        if (e.key === "ArrowUp") {
            this.prevSelect();
        }
        if (e.key === "Enter") {
            if (this.open) {
                this.value = this._focusedOption;
                this.open = false;
            }
        }
    }
    onDocumentClick(e) {
        const isChild = isChildOfElement(e.target, this);
        if (!isChild) {
            this.open = false;
        }
    }
    onClick() {
        if (this.isFocus && Date.now() - this.focusTime > 250) {
            this.open = !this.open;
        }
    }
    onBlur() {
        this.open = false;
        this.isFocus = false;
    }
    onFocus() {
        this.isFocus = true;
        this.focusTime = Date.now();
        this.open = true;
    }
};
SelectElement.styles = [
    input,
    css `
        :host{
            display: inline-block;
            min-width: 80px;
        }
        .content{
            display: grid;
            background-color: var(--select-background);
            border: 1px solid var(--select-border, #ccc);
            grid-template-columns: auto auto;
            padding: var(--select-padding, 5px 10px);
            cursor: pointer;
        }
        .content:focus{
            outline: 1px solid var(--select-outline-focus, #ccc);
        }
        .options.open{
            display: block;
        }
        .options{
            position: absolute;
            display: none;
            border: 1px solid var(--select-border, #ccc);
            box-sizing: border-box;
        }
        .option{
            cursor: pointer;
            padding: var(--option-padding, 5px 10px);
        }
        .option:focus, 
        .option:hover{
            background-color: var(--option-hover, #ccc);
        }
        .disabled{
            opacity: 0.5;
        }
        .icon-dropdown{
            display: flex;
            align-items: center;
            justify-content: end;
        }`
];
__decorate([
    property({ type: Array })
], SelectElement.prototype, "items", void 0);
__decorate([
    property({ type: String })
], SelectElement.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], SelectElement.prototype, "optionsWidth", void 0);
__decorate([
    state()
], SelectElement.prototype, "open", void 0);
SelectElement = __decorate([
    customElement("select-element")
], SelectElement);
export { SelectElement };
