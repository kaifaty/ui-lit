import { __decorate } from "tslib";
import { ResizeObserverController } from './../controllers/ResizeObserverController';
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { formAssociated } from '../mixins/form-associated/index';
import { noselect } from '../styles/noselect';
import { labled } from '../mixins/labled/index';
import { focusable } from '../mixins/focusable/index';
import { notificatable } from '../mixins/notificatable/index';
import { rangeStyles } from './style';
/**
 * <lit-range></lit-range>
 *
 * @cssprop --lit-range-thumb-size Thumb size
 *
 * @cssprop --lit-range-track Track color
 * @cssprop --lit-range-track-hover Track color when hovered
 *
 * @cssprop --lit-range-thumb Thumb color
 * @cssprop --lit-range-thumb-shadow Thumb shadow
 *
 * @cssprop --lit-range-points-background Points background
 *
 * @cssprop --lit-range-filled Fillted color
 * @cssprop --lit-range-filled-hover Fillted color
 *
 *
 * @cssprop --lit-range-outline-focus Outline when focused
 *
 * */
let LitRange = class LitRange extends focusable(labled(notificatable(formAssociated(LitElement)))) {
    constructor() {
        super(...arguments);
        this.isPercentHidden = true;
        this.disabledByVol = true;
        this.decimals = 8;
        this.showPercent = false;
        this.usePoints = true;
        this.startFromMin = false;
        this._RO = new ResizeObserverController(this);
        this._points = [0, 25, 50, 75, 100];
        this._timeout = 0;
        this._trackSize = 0;
        this._trackStartX = 0;
        this._thumbSize = 0;
        this._padding = 0;
        this._rect = null;
        this._min = 0;
        this._percent = 0;
        this._offsetX = 0;
        this._lastX = 0;
        this.tabindex = 0;
        this._max = 100;
        this._value = '0';
        this._onChangeSize = (rect) => {
            this._rect = this.getBoundingClientRect();
            this._trackSize = this._calcTackWidth(rect);
            this._trackStartX = this._calcTrackStartX(rect);
            this._updateOffset();
            this.requestUpdate();
        };
    }
    static get styles() {
        return [
            ...super.elementStyles,
            noselect,
            rangeStyles
        ];
    }
    static get properties() {
        return {
            ...super.properties,
            value: { type: String, hasChanged: () => true },
            min: { type: Number },
            max: { type: Number },
        };
    }
    get offsetX() {
        return this._offsetX;
    }
    get min() {
        return this._min;
    }
    set min(value) {
        const oldValue = this._min;
        if (oldValue === value)
            return;
        if (value < 0) {
            console.warn("Min value must be => 0, replaced to 0.");
            value = 0;
        }
        this._min = value;
        this._recalcValue();
        this._percent = this._calcPercentByValue();
        this.requestUpdate('max', oldValue);
    }
    get max() {
        return this._max;
    }
    set max(value) {
        const oldValue = this._max;
        if (oldValue === value)
            return;
        this._max = value;
        this._recalcValue();
        this._percent = this._calcPercentByValue();
        this.requestUpdate('max', oldValue);
    }
    get percent() {
        return this._percent;
    }
    get valueAsNumber() {
        return Number(this._value);
    }
    set valueAsNumber(value) {
        if (typeof value === 'number') {
            this.value = value.toFixed(this.decimals);
        }
        else if (typeof value === 'string') {
            this.value = value;
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        const oldValue = this._value;
        if (oldValue === value)
            return;
        this._value = value;
        this._recalcValue();
        this._percent = this._calcPercentByValue();
        this.requestUpdate('value', oldValue);
    }
    get minPercent() {
        if (this.startFromMin) {
            return 0;
        }
        if (!this.max)
            return 0;
        return this.min / this.max * 100;
    }
    isDisabled() {
        return this.disabled || this.max < this.min || !this.max;
    }
    connectedCallback() {
        super.connectedCallback();
        this._thumbSize = parseInt(window.getComputedStyle(this).getPropertyValue("--pointer"));
        this._padding = parseInt(window.getComputedStyle(this).getPropertyValue("--padding"));
    }
    willUpdate() {
        this._value = this._calcValueByPercent(this._percent).toFixed(this.decimals);
        this._updateOffset();
    }
    updated(props) {
        super.updated(props);
        if (props.has("value") || props.has("min") || props.has("max")) {
            this.style.setProperty(`--percent`, this._percent + "%");
        }
    }
    // ==== templates ==== 
    _pointersTemplate() {
        if (this.usePoints) {
            return this._points.map(it => {
                const filled = this._percent >= it; //&& !this.disabled
                return html `<div                         
                    data-value = "${it}"
                    style = "left: ${it}%;"
                    class = "point point-${it} ${filled ? 'filled' : ''}"></div>`;
            });
        }
        return nothing;
    }
    _percentTemplate() {
        if (!this.showPercent)
            return nothing;
        const left = this._offsetX + this._padding - (this._thumbSize + 6) * this._percent / 100;
        return html `<div style = "transform: translateX(${left}px);"
                          class = "noselect percent ${this.isPercentHidden ? 'hidden' : ''}">${this._percent}%</div> `;
    }
    _thumbTemplate() {
        const offset = (this._offsetX).toFixed(1);
        return html `<div class = "thumb-wrapper" 
            style = "transform: translateX(${offset}px);">
            ${this.isDisabled()
            ? nothing
            : html `<div part = "thumb" 
                            class = "thumb ${this._percent === 100 ? 'fullfiled' : ''}"></div>`}       
        </div>`;
    }
    render() {
        return html `
        <div tabindex = "${this.tabindex}"
            role = "slider" 
            class = "wrapper"
            @keydown = "${this._handleKeyboard}"
            aria-valuemin="${this.min}"
            aria-valuemax="${this.max}"
            aria-valuenow="${this.value}">
            <div class = "track"
                ${this._RO.observe(this._onChangeSize)}
                @touchstart = "${this._onPreventTouch}"
                @pointerdown = "${this._onPointerDown}"
                @pointermove = "${this._onPointerMove}"
                @pointerleave = "${this._onPointLeave}"
                @pointerover = "${this._onPointerOver}"
                @lostpointercapture = "${this._onPointerLostCapture}">
                ${this._thumbTemplate()}
                <div class = "track-line"></div>
                ${this._pointersTemplate()}
            </div>
            ${this._percentTemplate()}
        </div>`;
    }
    // ==== Actions ==== 
    _recalcValue() {
        let val = this.valueAsNumber;
        if (this.min > this.max) {
            val = this.min;
        }
        else if (val > this.max) {
            val = this.max;
        }
        else if (val < this.min) {
            val = this.min;
        }
        this._value = val.toFixed(this.decimals);
    }
    _calcTrackStartX(rect) {
        return rect.x + 2 * this._padding;
    }
    _calcTackWidth(rect) {
        return rect.width;
    }
    _calcOffset(x) {
        return x - this._trackStartX - this._rect.left + this._padding;
    }
    _calcPercentByOffset(offset) {
        let percent = Math.round(offset / (this._trackSize) * 100 * 10) / 10;
        if (percent > 100) {
            percent = 100;
        }
        if (this.usePoints) {
            if (percent < 3 || !percent) {
                percent = 0;
            }
            else if (percent > 22 && percent < 28) {
                percent = 25;
            }
            else if (percent > 47 && percent < 53) {
                percent = 50;
            }
            else if (percent > 72 && percent < 78) {
                percent = 75;
            }
            else if (percent > 97) {
                percent = 100;
            }
        }
        if (percent < this.minPercent) {
            return this.minPercent;
        }
        return percent;
    }
    _calcPercentByValue() {
        let value = 0;
        if (!this.max)
            return 0;
        if (this.startFromMin) {
            value = Math.round(((this.valueAsNumber - this.min) / (this.max - this.min)) * 100 * 10) / 10;
        }
        else {
            value = Math.round((this.valueAsNumber / this.max) * 100 * 10) / 10;
        }
        if (value < 0) {
            return 0;
        }
        if (value > 100) {
            return 100;
        }
        return value;
    }
    _calcValueByPercent(percent) {
        let value = 0;
        value = this.max * (percent / 100);
        if (this.startFromMin && value < this.min) {
            return this.min;
        }
        if (value > this.max) {
            return this.max;
        }
        return value;
    }
    _updateOffset() {
        const offsetX = Math.round((this._trackSize) * this._percent / 100 * 1e2) / 1e2;
        if (offsetX !== this._offsetX) {
            this._offsetX = offsetX;
        }
    }
    _hidePercent() {
        clearTimeout(this._timeout);
        this._timeout = window.setTimeout(() => {
            this.isPercentHidden = true;
        }, 800);
    }
    _movePosition(x) {
        if (this.isDisabled())
            return;
        this._lastX = x;
        requestAnimationFrame(() => {
            const offset = this._calcOffset(x);
            const percent = this._calcPercentByOffset(offset);
            this.value = this._calcValueByPercent(percent).toString();
            this.notify();
        });
    }
    setPercent(value) {
        this._percent = Math.max(Math.min(value, 100), 0);
        this.value = this._calcValueByPercent(this._percent).toString();
        setTimeout(() => this.notify());
    }
    // ==== Events ==== 
    _onPreventTouch(e) {
        e.preventDefault();
    }
    _onPointerDown(e) {
        e.target.setPointerCapture(e.pointerId);
        this._handlePointerDown();
        this._handlePointerMove(e.clientX);
        e.preventDefault();
        // Atop auto focus
    }
    _onPointerMove(e) {
        if (!e.isPrimary || !this.hasAttribute("pressed"))
            return;
        this._handlePointerMove(e.clientX);
        e.preventDefault();
    }
    _onPointerLostCapture(e) {
        this._handlePointerUp(this._lastX);
        // e.preventDefault();
    }
    _onPointerOver(e) {
        this._onPointOver(e);
    }
    _handlePointerDown() {
        this._rect = this.getBoundingClientRect();
        if (this.isDisabled())
            return;
        this.isPercentHidden = false;
        this.setAttribute('pressed', '');
    }
    _handlePointerUp(x) {
        this._hidePercent();
        this._movePosition(x);
        this.removeAttribute('pressed');
    }
    _handlePointerMove(x) {
        this._movePosition(x);
        this.isPercentHidden = false;
    }
    _onPointOver(e) {
        if (this.isDisabled())
            return;
        clearTimeout(this._timeout);
        this.isPercentHidden = false;
        this.setAttribute('hover', '');
        e.preventDefault();
    }
    _onPointLeave(e) {
        e.preventDefault();
        this._hidePercent();
        this.removeAttribute('hover');
    }
    _handleKeyboard(e) {
        if (e.key === "ArrowRight" || e.key === "ArrowTop") {
            this.setPercent(this._percent + 1);
        }
        if (e.key === "ArrowLeft" || e.key === "ArrowBottom") {
            this.setPercent(this._percent - 1);
        }
    }
    notify() {
        this.dispatchEvent(new CustomEvent("changed", {
            detail: {
                value: this.value,
                percent: this._percent,
                valueAsNumber: this.valueAsNumber,
                type: 'range'
            },
            bubbles: true,
        }));
    }
};
__decorate([
    state()
], LitRange.prototype, "isPercentHidden", void 0);
__decorate([
    state()
], LitRange.prototype, "disabledByVol", void 0);
__decorate([
    property({ type: Number })
], LitRange.prototype, "decimals", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitRange.prototype, "showPercent", void 0);
__decorate([
    property({ type: Boolean })
], LitRange.prototype, "usePoints", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], LitRange.prototype, "startFromMin", void 0);
__decorate([
    query('.track')
], LitRange.prototype, "_wrapper", void 0);
LitRange = __decorate([
    customElement("lit-range")
], LitRange);
export { LitRange };
