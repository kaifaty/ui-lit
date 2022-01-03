var _LitButton_notifyTimeout, _LitButton_width;
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from "tslib";
import { styleMap } from 'lit/directives/style-map.js';
import { LitElement, html, } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { button } from './styles';
import '../spinner';
import '../icon';
import { focusable } from '../mixins/focusable/index';
/** @tag lit-button */
let LitButton = class LitButton extends focusable(LitElement) {
    constructor() {
        super(...arguments);
        /** @ignore  */
        this._loading = false;
        /** @prop {"button" | "submit"} type */
        this.type = 'button';
        this.size = 'medium';
        /** @prop {boolean} disabled - Disable element */
        this.disabled = false;
        /** @prop {boolean} borderless - Borderless element */
        this.borderless = false;
        ///** @prop {boolean} switch - Button can be switch toggle */
        //@property({type: Boolean, reflect: true}) switch: boolean = false;
        /** @prop {boolean} primary - Primary  */
        this.primary = false;
        /** @prop {boolean} success - Success  */
        this.success = false;
        /** @prop {boolean} danger - Danger  */
        this.danger = false;
        /** @prop {boolean} switchOn - switch State. true - enabled, false disabled */
        this.switchOn = false;
        this.notifyOnClick = false;
        /** @ignore  */
        this._notifyIcon = false;
        /** @ignore  */
        this.hover = false;
        /** @ignore  */
        this.pressed = false;
        /** @ignore  */
        this.focused = false;
        this.tabindex = 0;
        /** @ignore  */
        _LitButton_notifyTimeout.set(this, 0);
        /** @ignore  */
        _LitButton_width.set(this, 0);
        /** @ignore  */
        this._onMouseUp = (e) => {
            this.pressed = false;
            // e.preventDefault();
            document.removeEventListener('mouseup', this._onMouseUp);
        };
        /** @ignore  */
        this._onEndTouch = (e) => {
            this.pressed = false;
            document.removeEventListener('touchcancel', this._onEndTouch);
            document.removeEventListener('touchend', this._onEndTouch);
            // e.preventDefault();
        };
    }
    static get properties() {
        return {
            loading: { type: Boolean }
        };
    }
    get loading() {
        return this._loading;
    }
    set loading(value) {
        const oldValue = this._loading;
        if (oldValue === value)
            return;
        this._loading = value;
        if (value) {
            this.setAttribute('loading', '');
        }
        else {
            this.removeAttribute('loading');
        }
        this.requestUpdate("loading", oldValue);
    }
    /** @ignore  */
    get classes() {
        return {
            wrapper: true,
            noselect: true,
            hover: this.hover,
            pressed: this.pressed,
            focus: this.focused,
            checkmark: this._notifyIcon
        };
    }
    /** @ignore  */
    _contentTemplate() {
        if (this._notifyIcon) {
            return html `<lit-icon icon = "checkmark"></lit-icon>`;
        }
        return html `${this.loading
            ? html `<lit-spinner small></lit-spinner>`
            : html `<slot name = "icon-before"></slot>`}
                    <span><slot></slot></span>
                    <slot name = "icon-after"></slot>`;
    }
    /**
     * @slot icon-before - You can put some elements before content
     * @slot icon-after - You can put some elements after content
     */
    render() {
        const styles = __classPrivateFieldGet(this, _LitButton_width, "f") ? { width: __classPrivateFieldGet(this, _LitButton_width, "f") + 'px' } : {};
        return html `
        <button tabindex = "${this.tabindex}" 
            style = "${styleMap(styles)}"
            class = "${classMap(this.classes)}" 
            @click = "${this.click}"
            @focus = "${this._onFocus}"
            @blur = "${this._onBlur}"
            @mouseover = "${this._onMouseOver}"
            @mouseout = "${this._onMouseOut}"
            @mousedown = "${this._onMouseDown}"
            @touchstart = "${this._onTouchStart}"
        >${this._contentTemplate()}</button>`;
    }
    // ==== Events ====
    /** @ignore  */
    _onMouseDown(e) {
        this.pressed = true;
        // e.preventDefault();
        document.addEventListener('mouseup', this._onMouseUp);
    }
    /** @ignore  */
    _onTouchStart(e) {
        this.pressed = true;
        document.addEventListener('touchcancel', this._onEndTouch);
        document.addEventListener('touchend', this._onEndTouch);
        // e.preventDefault();
    }
    /** @ignore  */
    _onMouseOver(e) {
        this.hover = true;
        e.preventDefault();
    }
    /** @ignore  */
    _onMouseOut(e) {
        this.hover = false;
        e.preventDefault();
    }
    /** @ignore  */
    _onBlur() {
        this.focused = false;
        document.removeEventListener('keydown', this._onKeyDown);
    }
    /** @ignore  */
    _onFocus() {
        this.focused = true;
        document.addEventListener('keydown', this._onKeyDown);
    }
    /** @ignore  */
    _onKeyDown(e) {
        if (e.key === "Enter") {
            this.submit();
        }
    }
    // ==== Actions ====
    click() {
        this.submit();
    }
    /** @event {CustomEvent} switchChanged - for type = 'switch'. Return current switchOn state. */
    toggleSwitch() {
        this.switchOn = !this.switchOn;
        this.dispatchEvent(new CustomEvent("switchChanged", {
            detail: this.switchOn,
            bubbles: true,
        }));
    }
    /** @event {CustomEvent} submitForm - for type = 'submit'. Submit to lit-form */
    submit() {
        if (this.disabled || this.loading)
            return;
        if (this.type === 'switch') {
            this.toggleSwitch();
        }
        if (this.type === "submit") {
            this.dispatchEvent(new CustomEvent("submitForm", {
                bubbles: true,
                composed: true,
            }));
        }
        if (this.notifyOnClick) {
            this._notifyIcon = true;
            __classPrivateFieldSet(this, _LitButton_width, this.clientWidth, "f");
            clearTimeout(__classPrivateFieldGet(this, _LitButton_notifyTimeout, "f"));
            __classPrivateFieldSet(this, _LitButton_notifyTimeout, window.setTimeout(() => {
                this._notifyIcon = false;
                __classPrivateFieldSet(this, _LitButton_width, 0, "f");
            }, 1000), "f");
        }
    }
};
_LitButton_notifyTimeout = new WeakMap(), _LitButton_width = new WeakMap();
LitButton.styles = button;
__decorate([
    property({ type: String, attribute: true })
], LitButton.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: true })
], LitButton.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "borderless", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "primary", void 0);
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
    property({ type: Boolean })
], LitButton.prototype, "notifyOnClick", void 0);
__decorate([
    state()
], LitButton.prototype, "_notifyIcon", void 0);
__decorate([
    state()
], LitButton.prototype, "hover", void 0);
__decorate([
    state()
], LitButton.prototype, "pressed", void 0);
__decorate([
    state()
], LitButton.prototype, "focused", void 0);
__decorate([
    property({ type: Number })
], LitButton.prototype, "tabindex", void 0);
LitButton = __decorate([
    customElement("lit-button")
], LitButton);
export { LitButton };
