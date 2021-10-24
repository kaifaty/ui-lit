import { __decorate } from "tslib";
import { classMap } from 'lit/directives/class-map';
import { styleMap } from 'lit/directives/style-map';
import { html, LitElement, css, nothing } from 'lit';
import { formAssociated } from '../form-associated/index';
import { customElement, property, state } from 'lit/decorators';
import { input } from '../styles/input';
import { getEventDataset, isChildOfElement } from '../helpers';
import { ClickController } from '../controllers/ClickController';
import { KeyDownController } from '../controllers/KeyController';
import { calcPositionForPopup } from '../helpers/position';
import { scrollbar } from '../styles/scrollbar';
let SelectElement = class SelectElement extends formAssociated(LitElement) {
    constructor() {
        super(...arguments);
        this.items = [];
        this.value = '';
        this.optionsWidth = 0;
        this.optionsHeight = 0;
        this.open = false;
        this._clickController = new ClickController(this);
        this._keyPressController = new KeyDownController(this);
        this._isFocus = false;
        this._focusTime = 0;
        this._focusedOption = '';
        this._optionsPosition = { x: 0, y: 0 };
    }
    selected() {
        return this.items.filter(it => this.value === it.value)[0];
    }
    currentOption() {
        return this.items.findIndex(it => it.value === this.value);
    }
    firstUpdated() {
        if (!this.optionsWidth) {
            this.optionsWidth = this.clientWidth;
        }
    }
    willUpdate() {
        if (this.open) {
            this._optionsPosition = calcPositionForPopup(this, { width: this.optionsWidth, height: this.optionsHeight || 40 });
        }
    }
    _contentTemplate() {
        if (!this.open)
            return nothing;
        const optionsClass = {
            options: true,
            "ff-scrollbar": true,
            open: this.open,
        };
        const optionStyles = {
            width: this.optionsWidth + "px",
            height: (this.optionsHeight ? this.optionsHeight + "px" : "initial"),
            //transform: `translate(0, 100%);`
            left: this._optionsPosition.x + "px",
            top: this._optionsPosition.y + "px"
        };
        return html `<div
            style = "${styleMap(optionStyles)}"
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
                @click = "${this._handleSelectClick}" 
                @focus = "${this._handleOptionFocus}" 
                class = "${classMap(className)}">${it.text}</div>`;
        })}</div>`;
    }
    focus() {
        var _a, _b;
        (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".content")) === null || _b === void 0 ? void 0 : _b.focus();
    }
    render() {
        var _a;
        return html `
        <div 
            @click = "${this.handleClick}"
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
    setValue(value) {
        this.value = value;
        this.focus();
    }
    nextSelect() {
        let current = this.currentOption();
        current++;
        if (current > this.items.length - 1) {
            current = 0;
        }
        this.setValue(this.items[current].value);
    }
    prevSelect() {
        let current = this.currentOption();
        current--;
        if (current < 0) {
            current = this.items.length - 1;
        }
        this.setValue(this.items[current].value);
    }
    _handleOptionFocus(e) {
        this._focusedOption = e.target.dataset.value;
    }
    _handleSelectClick(e) {
        this.setValue(getEventDataset(e, 'value'));
        this.open = false;
        e.stopPropagation();
    }
    handlekeyDown(e) {
        if (e.key === "ArrowDown") {
            this.nextSelect();
        }
        if (e.key === "ArrowUp") {
            this.prevSelect();
        }
        if (e.key === "Enter") {
            if (this.open) {
                this.setValue(this._focusedOption);
                this.open = false;
            }
            else {
                this.open = true;
            }
        }
    }
    handleDocumentClick(e) {
        const isChild = isChildOfElement(e.target, this);
        if (!isChild) {
            this.open = false;
        }
    }
    handleClick() {
        this.open = !this.open;
    }
};
SelectElement.styles = [
    input,
    scrollbar,
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
            overflow-y: auto;
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
    property({ type: Number })
], SelectElement.prototype, "optionsHeight", void 0);
__decorate([
    state()
], SelectElement.prototype, "open", void 0);
SelectElement = __decorate([
    customElement("select-element")
], SelectElement);
export { SelectElement };
