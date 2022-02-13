import { __decorate } from "tslib";
import { styleMap } from 'lit/directives/style-map.js';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { button } from './styles';
import '../spinner';
import '../icon';
import '../link';
import { focusable } from '../mixins/focusable/index';
/** @tag lit-button */
let LitButton = class LitButton extends focusable(LitElement) {
    constructor() {
        super(...arguments);
        /** @ignore  */
        this._loading = false;
        /** @prop {"button" | "submit"} type */
        this.align = 'center';
        this.href = null;
        this.target = "_self";
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
        this.between = false;
        /** @prop {boolean} switchOn - switch State. true - enabled, false disabled */
        this.switchOn = false;
        this.accent = false;
        this.notifyOnClick = false;
        /** @ignore  */
        this._notifyIcon = false;
        this.tabindex = 0;
        /** @ignore  */
        this._notifyTimeout = 0;
        /** @ignore  */
        this._width = 0;
        /** @ignore  */
        this._radiant = 5;
        /** @ignore  */
        this._animationFrame = 0;
        /** @ignore  */
        this._pressed = false;
        // ==== Events ====
        // +++ Ripple +++
        this._startAnimation = () => {
            if (this._radiant < 1000 && this._pressed) {
                this._radiant += 20;
                this.style.setProperty(`--radiant`, this._radiant + "px");
                this._animationFrame = requestAnimationFrame(this._startAnimation);
            }
        };
        this._endPress = () => {
            this._pressed = false;
            this._radiant = 5;
            cancelAnimationFrame(this._animationFrame);
            this.removeAttribute('pressed');
            this.removeAttribute('hover');
            document.removeEventListener('mouseup', this._endPress);
            document.removeEventListener('touchend', this._endPress);
            document.removeEventListener('touchcancel', this._endPress);
        };
        /** @ignore  */
        this._onKeyDown = (e) => {
            if (e.key === "Enter" || e.key === " ") {
                this.submit();
                e.preventDefault();
            }
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
            button: true,
            wrapper: true,
            noselect: true,
            checkmark: this._notifyIcon,
            accent: this.primary || this.success || this.danger || this.accent
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
                    <div part = "content" class = "content"><slot></slot></div>
                    <slot name = "icon-after"></slot>`;
    }
    wrapperTemplate(content) {
        if (this.href) {
            return html `<lit-link 
                        type = "button"
                        target = "${this.target}"
                        href = "${this.href}">${content}</lit-link>`;
        }
        return content;
    }
    /**
     * @slot icon-before - You can put some elements before content
     * @slot icon-after - You can put some elements after content
     */
    render() {
        const styles = this._width ? { width: this._width + 'px' } : {};
        const template = html `
        <button role = "button"
            aria-pressed = "${this.type === 'switch' ? this.switchOn : 'undefined'}"
            tabindex = "${this.href ? -1 : this.tabindex}" 
            style = "${styleMap(styles)}"
            class = "${classMap(this.classes)}" 
            @click = "${this.click}"
            @focus = "${this._onFocus}"
            @blur = "${this._onBlur}"
            @mouseover = "${this._onMouseOver}"
            @mouseout = "${this._onMouseOut}"
            @mousedown = "${this._onMouseDown}"
            
            @touchstart = "${this._onTouchstart}"
            @touchcancel = "${this._endPress}"
            @touchend = "${this._endPress}"
        >${this._contentTemplate()}</button>`;
        return this.wrapperTemplate(template);
    }
    _onTouchstart(e) {
        this._startPress(e.touches[0].clientX, e.touches[0].clientY);
        document.addEventListener('touchend', this._endPress);
        document.addEventListener('touchcancel', this._endPress);
    }
    _onMouseOver(e) {
        this.setAttribute('hover', '');
    }
    _onMouseOut(e) {
        this.removeAttribute('hover');
    }
    _onMouseDown(e) {
        this._startPress(e.clientX, e.clientY);
        document.addEventListener('mouseup', this._endPress);
    }
    _startPress(x, y) {
        const rect = this.getBoundingClientRect();
        this._pressed = true;
        this.setAttribute('pressed', '');
        const _x = x - rect.x;
        const _y = y - rect.y;
        this.style.setProperty(`--click-x`, _x + "px");
        this.style.setProperty(`--click-y`, _y + "px");
        this._startAnimation();
    }
    // --- Ripple ---
    /** @ignore  */
    _onBlur() {
        document.removeEventListener('keydown', this._onKeyDown);
    }
    /** @ignore  */
    _onFocus() {
        document.addEventListener('keydown', this._onKeyDown);
    }
    // ==== Actions ====    
    click() {
        var _a, _b;
        (_b = (_a = window.navigator).vibrate) === null || _b === void 0 ? void 0 : _b.call(_a, 20);
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
        var _a, _b;
        if (this.disabled || this.loading)
            return;
        if (this.href) {
            (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("lit-link")) === null || _b === void 0 ? void 0 : _b.click();
        }
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
            this._width = this.clientWidth;
            clearTimeout(this._notifyTimeout);
            this._notifyTimeout = window.setTimeout(() => {
                this._notifyIcon = false;
                this._width = 0;
            }, 1000);
        }
    }
};
LitButton.styles = button;
__decorate([
    property({ type: String, attribute: true })
], LitButton.prototype, "align", void 0);
__decorate([
    property({ type: String, attribute: true })
], LitButton.prototype, "href", void 0);
__decorate([
    property({ type: String })
], LitButton.prototype, "target", void 0);
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
], LitButton.prototype, "between", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "switchOn", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitButton.prototype, "accent", void 0);
__decorate([
    property({ type: Boolean })
], LitButton.prototype, "notifyOnClick", void 0);
__decorate([
    state()
], LitButton.prototype, "_notifyIcon", void 0);
__decorate([
    property({ type: Number })
], LitButton.prototype, "tabindex", void 0);
LitButton = __decorate([
    customElement("lit-button")
], LitButton);
export { LitButton };
