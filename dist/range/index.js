import { __decorate } from "tslib";
import { LitElement, html, nothing, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators';
import { formAssociated } from '../form-associated/index';
import { noselect } from '../styles/noselect';
import { getClientX } from '../helpers';
let RangeElement = class RangeElement extends formAssociated(LitElement) {
    constructor() {
        super(...arguments);
        this._isMoving = false;
        this.offsetX = 0;
        this.percent = 0;
        this.isPercentHidden = true;
        this.disabledByVol = true;
        this.decimals = 8;
        this.showPercent = false;
        this.usePoints = true;
        this.startFromMin = false;
        this._points = [0, 25, 50, 75, 100];
        this._timeout = 0;
        this._trackSize = 0;
        this._trackStartX = 0;
        this._thumbSize = 0;
        this._padding = 0;
        this._min = 0;
        this._max = 100;
        this._value = '0';
        // ==== Events ==== 
        this._onPointerDown = (e) => {
            if (this.isDisabled())
                return;
            this._isMoving = true;
            this.isPercentHidden = false;
        };
        this._onPointerMove = (e) => {
            if (this._isMoving === true) {
                this._movePosition(e);
                this.isPercentHidden = false;
                e.preventDefault();
            }
        };
        this._onPointerUp = (e) => {
            if (this._isMoving === true) {
                this._isMoving = false;
                this._hidePercent();
                this._movePosition(e);
                e.preventDefault();
            }
        };
        this._onPointOver = (e) => {
            if (this.isDisabled())
                return;
            clearTimeout(this._timeout);
            this.isPercentHidden = false;
            e.preventDefault();
        };
        this._onPointLeave = (e) => {
            e.preventDefault();
            this._hidePercent();
        };
    }
    static get styles() {
        return [
            noselect,
            css `
            :host{
                display: inline-block;
                min-width: 200px;
                position: relative;
                box-sizing: border-box;
                --size: 8px;
                --pointer: 8px;
                --pointer-border: 2px;
                --poiner-width: calc(var(--pointer) + var(--pointer-border));
                --line-height: 4px;
                --to-middle: calc((var(--size) - var(--pointer)) / 2);
                --top-margin: 8px;
                --padding: 10px;
                padding: 5px var(--padding);
                box-sizing: border-box;

            }
            :host(.disabled){
                opacity: 0.5;
            }
            .thumb, .point, .track-line{
                cursor: pointer;
            }
            .thumb-wrapper{
                position: absolute;
                z-index: 3;
                top: calc(var(--top-margin) - var(--size) / 2 + var(--line-height) / 2);
                width: var(--size, 14px);
                height: var(--size, 14px);
                transform-origin: center;
                transform: translateX(-50%);
                
            }
            .thumb{
                border-radius: 100%;
                width: 100%;
                height: 100%;
                background-color: var(--range-thumb, #111);
                box-shadow: 0 0 0 var(--pointer-border) var(--range-points-border-color, #111);
                
            }
            .percent{
                opacity: 1;
                text-align: center;
                left: 0;
                position: absolute;
                text-align: center;
                transform-origin: center;
                font-size: 12px;
                transform-origin: center;
                transform: translate(calc(-50% + 4px));
            }
            .percent.hidden{
                opacity: 0;
            }
            .track{
                display: flex;
                position: relative;
                width: 100%;
                border-radius: 3px;
                box-sizing: border-box;
                position: relative;
            }
            .track-line{
                width: calc(100% );
                background-color: var(--range-track, #999);
                height: var(--line-height);
                margin: var(--top-margin) auto;
                border-radius: 2px
            }
            .blocked-track{
                position: absolute;
                left: 5px;
                background-color: var(--range-track-blocked, #999);
                height: var(--lineHeigh);
                top: var(--top-margin);
                border-radius: 2px
            }
            .point{
                position: absolute;
                top: calc(var(--top-margin) - var(--pointer) / 2 + var(--line-height) / 2);
                width: var(--pointer);
                height: var(--pointer);
                border-radius: var(--pointer);
                background-color: var(--range-points-background, #fff);
                box-shadow: 0 0 0 var(--pointer-border) var(--range-points-border-color, #444);
                transform: translate(-50%, 0);
                z-index: 1;
            }
            `
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
    get min() {
        return this._min;
    }
    set min(value) {
        const oldValue = this._min;
        if (value < 0) {
            console.warn("Min value must be => 0, replaced to 0.");
            value = 0;
        }
        this._min = value;
        this.percent = this._calcPercentByValue();
        this.requestUpdate('max', oldValue);
    }
    get max() {
        return this._max;
    }
    set max(value) {
        const oldValue = this._max;
        this._max = value;
        this.percent = this._calcPercentByValue();
        this.requestUpdate('max', oldValue);
    }
    get valueAsNumber() {
        return Number(this._value);
    }
    set valueAsNumber(value) {
        if (typeof value === 'number') {
            this.value = value.toFixed(this.decimals);
        }
    }
    get value() {
        return this._value;
    }
    set value(value) {
        const oldValue = this._value;
        this._value = value;
        this.percent = this._calcPercentByValue();
        this.requestUpdate('value', oldValue);
    }
    isDisabled() {
        return this.disabled || this.max < this.min;
    }
    willUpdate() {
        const rect = this.getBoundingClientRect();
        this._trackSize = this._calcTackWidth(rect);
        this._trackStartX = this._calcTrackStartX(rect);
        this._value = this._calcValueByPercent(this.percent).toFixed(this.decimals);
        this._updateOffset();
    }
    updated(props) {
        super.updated(props);
        this.dispatchEvent(new CustomEvent("changed", {
            detail: {
                value: this.value,
                percent: this.percent,
                valueAsNumber: this.valueAsNumber,
                type: 'range'
            },
            bubbles: true,
        }));
    }
    get minPercent() {
        if (!this.startFromMin) {
            return 0;
        }
        //return this.valueAsNumber / (this.max - this.min) * 100 
        return this.min / this.max * 100;
    }
    // ==== Actions ==== 
    _calcTrackStartX(rect) {
        return rect.x + this._padding;
    }
    _calcTackWidth(rect) {
        return rect.width - this._padding * 2;
    }
    _calcOffset(e) {
        const xPosition = getClientX(e);
        console.log(e, xPosition, this._trackStartX);
        return xPosition - this._trackStartX; //  - this._trackStartX - this._thumbSize / 2;
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
        if (this.startFromMin) {
            value = Math.round(((this.valueAsNumber - this.min) / (this.max - this.min)) * 100 * 10) / 10;
        }
        else {
            value = Math.round((this.valueAsNumber / this.max) * 100 * 10) / 10;
        }
        if (value < this.min) {
            return 0;
        }
        if (value > this.max) {
            return 100;
        }
        return value;
    }
    _calcValueByPercent(percent) {
        let value = 0;
        if (this.startFromMin) {
            value = this.min + (this.max - this.min) * (percent / 100);
        }
        else {
            value = this.max * (percent / 100);
        }
        if (value < this.min) {
            return this.min;
        }
        if (value > this.max) {
            return this.max;
        }
        return value;
        ;
    }
    _updateOffset() {
        const rect = this.getBoundingClientRect();
        const width = rect.width - this._padding * 2; //  this._thumbSize / 2
        const offsetX = Math.round(width * this.percent / 100 * 1e2) / 1e2;
        if (offsetX !== this.offsetX) {
            this.offsetX = offsetX;
        }
    }
    _hidePercent() {
        clearTimeout(this._timeout);
        this._timeout = window.setTimeout(() => {
            this.isPercentHidden = true;
        }, 800);
    }
    _movePosition(e) {
        requestAnimationFrame(() => {
            const offset = this._calcOffset(e);
            this.percent = this._calcPercentByOffset(offset);
        });
        e.preventDefault();
    }
    setPercent(value) {
        this.percent = value;
    }
    // ==== templates ==== 
    _pointersTemplate() {
        if (this.usePoints) {
            return this._points.map(it => html `<div                         
                        data-value = "${it}"
                        style = "left: ${it}%;"
                        class = "point point-${it}"></div>`);
        }
        return nothing;
    }
    _percentTemplate() {
        if (this.showPercent)
            return nothing;
        const translateX = (this.percent * 0.25).toFixed(1);
        const left = this.offsetX + this._padding - this._thumbSize * this.percent / 100; //+ this._trackSize * this.percent / 100 + this._padding;
        return html `<div style = "left: ${left}px;"
                        class = "noselect percent ${this.isPercentHidden ? 'hidden' : ''}">${this.percent}%</div> `;
    }
    _blockedVolume() {
        if (!this.startFromMin)
            return nothing;
        const width = this.minPercent * (this._trackSize - this._padding) / 100;
        return html `<div class = "blocked-track" style = "width: ${width}px;"></div>`;
    }
    _thumbTemplate() {
        const offset = (this.offsetX).toFixed(1);
        return html `<div class = "thumb-wrapper" 
            style = "left: ${offset}px">
            ${this.isDisabled() ? nothing : html `<slot><div class = "thumb"></div></slot>`}       
        </div>`;
    }
    render() {
        return html `
        <div class = "track ${this.isDisabled() ? 'disabled' : ''}"
            @mousedown = "${this._onPointerDown}"
            @mouserover = "${this._onPointOver}"
            @mouseleave = "${this._onPointLeave}"
            @touchstart = "${this._onPointerDown}">
            ${this._thumbTemplate()}
            <div class = "track-line"></div>
            ${this._pointersTemplate()}
            ${this._blockedVolume()}
        </div>
        ${this._percentTemplate()}
        `;
    }
    connectedCallback() {
        super.connectedCallback();
        document.addEventListener("touchmove", this._onPointerMove, { passive: false });
        document.addEventListener("touchend", this._onPointerUp);
        document.addEventListener("mousemove", this._onPointerMove, { passive: false });
        document.addEventListener("mouseup", this._onPointerUp);
        const rect = this.getBoundingClientRect();
        this._trackSize = this._calcTackWidth(rect);
        this._trackStartX = this._calcTrackStartX(rect);
        this._thumbSize = parseInt(window.getComputedStyle(this).getPropertyValue("--pointer"));
        this._padding = parseInt(window.getComputedStyle(this).getPropertyValue("--padding"));
    }
    disconnectedCallback() {
        document.removeEventListener("touchmove", this._onPointerMove);
        document.removeEventListener("touchend", this._onPointerUp);
        document.removeEventListener("mousemove", this._onPointerMove);
        document.removeEventListener("mouseup", this._onPointerUp);
        super.disconnectedCallback();
    }
};
__decorate([
    state()
], RangeElement.prototype, "offsetX", void 0);
__decorate([
    state()
], RangeElement.prototype, "percent", void 0);
__decorate([
    state()
], RangeElement.prototype, "isPercentHidden", void 0);
__decorate([
    state()
], RangeElement.prototype, "disabledByVol", void 0);
__decorate([
    property({ type: Number })
], RangeElement.prototype, "decimals", void 0);
__decorate([
    property({ type: Boolean })
], RangeElement.prototype, "showPercent", void 0);
__decorate([
    property({ type: Boolean })
], RangeElement.prototype, "usePoints", void 0);
__decorate([
    property({ type: Boolean })
], RangeElement.prototype, "startFromMin", void 0);
__decorate([
    query('.track')
], RangeElement.prototype, "_wrapper", void 0);
RangeElement = __decorate([
    customElement("range-element")
], RangeElement);
export { RangeElement };
