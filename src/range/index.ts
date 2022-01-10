import { ResizeObserverController } from './../controllers/ResizeObserverController';
import { LitElement, html, TemplateResult, nothing, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import type { FormAssociated } from '../mixins/form-associated/interface';
import { formAssociated } from '../mixins/form-associated/index';
import { noselect } from '../styles/noselect';
import { getClientX, IUIEvent } from 'kailib';
import { labled } from '../mixins/labled/index';
import { focusable } from '../mixins/focusable/index';
import { notificatable } from '../mixins/notificatable/index';

export interface IRangeProps extends FormAssociated {
    value: string
    valueAsNumber: number
    min: number
    max: number
    noteHidden: boolean
    usePoints: boolean
    startFromMin: boolean
    showPercent: boolean
}



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
@customElement("lit-range")
export class LitRange extends focusable(labled(notificatable(formAssociated(LitElement)))){
    
    static get styles () {
        return [
            ...super.elementStyles,
            noselect, 
            css`
            :host{
                display: inline-block;
                --size: var(--lit-range-thumb-size, 16px);
                --pointer: 8px;
                --pointer-border: 2px;
                --poiner-width: calc(var(--pointer) + var(--pointer-border));
                --line-height: 4px;
                --to-middle: calc((var(--size) - var(--pointer)) / 2);
                --top-margin: 8px;
                --padding: 12px;
                --default-filled: hsl(264, 100%, 60%);
                padding: 1px;
                box-sizing: border-box;
                contain: content;

            }
            :host([showPercent]) .wrapper{
                padding-bottom: 15px;
            }
            .wrapper:focus{
                outline: var(--lit-range-outline-focus, 1px dashed rgba(0,0,0,0.5));
            }
            :host([hover]),
            :host([pressed]){                
                --default-filled: hsl(264, 100%, 50%);
                --lit-range-track: var(--lit-range-track-hover, #ddd);
                --lit-range-filled: var(--lit-range-filled-hover, hsl(264, 100%, 50%));
            }
            :host([hover]){
                --lit-range-thumb: var(--lit-range-thumb-hover,  hsl(264, 10%, 20%));
            }
            :host([pressed]){
                
                --lit-range-thumb: var(--lit-range-thumb-pressed,  hsl(264, 90%, 60%));
            }
            .wrapper{
                min-width: 200px;
                position: relative;
                box-sizing: border-box;
                padding: 5px var(--padding);
            }
            .thumb, .point, .track-line{
                cursor: pointer;
            }
            .percent{
                opacity: 1;
                text-align: center;
                left: 0;
                position: absolute;
                text-align: center;
                transform-origin: center;
                font-size: 12px;
                will-change: transform;
                left: calc(var(--size) / 2 * -1);
            }
            .percent.hidden{
                opacity: 0;
            }
            .track{
                display: flex;
                position: relative;
                width: 100%;
                border-radius: 5px;
                box-sizing: border-box;
                position: relative;
            }
            .track-line{
                width: 100%;
                height: var(--line-height);
                margin: var(--top-margin) auto;
                border-radius: 5px;
                outline: 1px solid #999;
            }
            .thumb-wrapper{
                position: absolute;
                z-index: 3;
                left: calc(var(--size) / 2 * -1);
                top: calc(var(--top-margin) - var(--size) / 2 + var(--line-height) / 2);
                width: var(--size, 14px);
                height: var(--size, 14px);
                will-change: transform;
            }
            .thumb.fullfiled{
                background-color: var(--lit-range-filled, var(--default-filled));
            }
            .thumb{
                border-radius: 100%;
                width: 100%;
                height: 100%;
                background-color: var(--lit-range-thumb,  hsl(264, 10%, 40%));
                outline: 2px solid  hsl(264, 100%, 99%);
                box-shadow: var(--lit-range-thumb-shadow, 0 1px 3px hsl(264, 100%, 20%));
                
            }
            .point{
                position: absolute;
                top: calc(var(--top-margin) - var(--pointer) / 2 + var(--line-height) / 2);
                width: var(--pointer);
                height: var(--pointer);
                border-radius: var(--pointer);
                background-color: var(--lit-range-points-background, #eee);
                box-shadow: 0 0 0 var(--pointer-border) var(--lit-range-filled, var(--default-filled));
                transform: translate(-50%, 0);
                z-index: 1;
            }
            .point.filled{
                background-color: var(--lit-range-filled, var(--default-filled));
            }
            `,
            

        ]
    } 
    
    static get properties(){        
        return {
            ...super.properties,
            value: {type: String, hasChanged: () => true},
            min: {type: Number},
            max: {type: Number},
        }
    }
    @state() offsetX: number = 0;
    @state() isPercentHidden: boolean = true;
    @state() disabledByVol: boolean = true;
    @property({type: Number}) decimals: number = 8;
    @property({type: Boolean, reflect: true}) showPercent: boolean = false;
    @property({type: Boolean}) usePoints: boolean = true;
    @property({type: Boolean, reflect: true}) startFromMin: boolean = false;
    @query('.track') _wrapper!: HTMLElement;
    private _RO = new ResizeObserverController(this);
    private _points: number[] = [0, 25, 50, 75, 100];
    private _timeout: number = 0;
    private _trackSize: number = 0;
    private _trackStartX: number = 0;
    private _thumbSize: number = 0;
    private _padding: number = 0;
    private _rect: DOMRect | null = null;
    private _min: number = 0;
    private _percent: number = 0;
    tabindex: number = 0;
    get min() {
        return this._min;
    }
    set min(value: number){
        const oldValue = this._min;
        
        if(oldValue === value) return;
        if(value < 0){
            console.warn("Min value must be => 0, replaced to 0.");
            value = 0;
        }
        this._min = value;
        this._recalcValue();
        this._percent = this._calcPercentByValue();
        this.requestUpdate('max', oldValue);        
    }

    private _max: number = 100;
    get max() {
        return this._max;
    }
    set max(value: number){
        const oldValue = this._max;
        if(oldValue === value) return;
        this._max = value;
        this._recalcValue();
        this._percent = this._calcPercentByValue();
        this.requestUpdate('max', oldValue);        
    }

    get percent(){
        return this._percent;
    }
    get valueAsNumber(){
        return Number(this._value);
    }
    set valueAsNumber(value: number){
        if(typeof value === 'number'){
            this.value = value.toFixed(this.decimals);
        }
        else if (typeof value === 'string'){
            this.value = value
        }
    }
    private _value: string = '0';
    get value() {
        return this._value;
    }
    set value(value: string){
        const oldValue = this._value;
        if(oldValue === value) return;
        this._value = value;
        this._recalcValue();
        this._percent = this._calcPercentByValue();
        this.requestUpdate('value', oldValue);        
    }
    get minPercent(){
        if(this.startFromMin){
            return 0;
        }
        if(!this.max) return 0;
        return this.min / this.max * 100;
    }
    
    isDisabled(){
        return this.disabled || this.max < this.min || !this.max;
    }
    
    connectedCallback(){
        super.connectedCallback();
        this._thumbSize = parseInt(window.getComputedStyle(this).getPropertyValue("--pointer"));
        this._padding = parseInt(window.getComputedStyle(this).getPropertyValue("--padding"));
    }

    willUpdate(){         
        this._value = this._calcValueByPercent(this._percent).toFixed(this.decimals);
        this._updateOffset();
    }

    // ==== templates ==== 
    private _pointersTemplate(){
        if(this.usePoints){
            return this._points.map(it => 
                    html`<div                         
                        data-value = "${it}"
                        style = "left: ${it}%;"
                        class = "point point-${it} ${this._percent >= it ? 'filled' : ''}"></div>`);
        }
        return nothing;
    }
    private _percentTemplate(){
        if(!this.showPercent) return nothing;
        const left = this.offsetX + this._padding - (this._thumbSize + 7) * this._percent / 100;
        return  html`<div style = "transform: translateX(${left}px);"
                        class = "noselect percent ${this.isPercentHidden ? 'hidden' : ''}">${this._percent}%</div> `
    }
    private _thumbTemplate(){
        const offset = (this.offsetX ).toFixed(1);
        return html`<div class = "thumb-wrapper }" 
            style = "transform: translateX(${offset}px);">
            ${this.isDisabled() 
                ? nothing 
                : html`<div part = "thumb" 
                            class = "thumb ${this._percent === 100 ? 'fullfiled' : ''}"></div>`}       
        </div>`;
    }

    render(){
        return html`
        <div tabindex = "${this.tabindex}"
            role = "slider" 
            class = "wrapper"
            @focus = "${this._onFocus}"
            @blur = "${this._onBlur}"
            aria-valuemin="${this.min}"
            aria-valuemax="${this.max}"
            aria-valuenow="${this.value}">
            <div class = "track"
                ${this._RO.observe(this._onChangeSize)}
                @mousedown = "${this._mouserDown}"
                @mouseover = "${this._handlePointOver}"
                @mouseout = "${this._handlePointLeave}"
                @touchstart = "${this._touchStart}">
                ${this._thumbTemplate()}
                <div style = "background: linear-gradient(to right,  var(--lit-range-filled, var(--default-filled)) ${this._percent}%, var(--lit-range-track, #eee) ${this._percent}%);"
                    class = "track-line"></div>
                ${this._pointersTemplate()}
            </div>
            ${this._percentTemplate()}
        </div>`;
    }

    
    


    // ==== Actions ==== 
    private _recalcValue(){
        let val = this.valueAsNumber;
        if(this.valueAsNumber > this.max){
            val = this.max;
        }
        if(this.valueAsNumber < this.min){
            val = this.min;
        }
        this._value = val.toFixed(this.decimals);
    }
    private _dispatch() {
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

    private _calcTrackStartX(rect: DOMRect){
        return rect.x  + 2 * this._padding;
    }

    private _calcTackWidth(rect: DOMRect){
        return rect.width;
    }

    private _calcOffset(x: number){
        return x - this._trackStartX - this._rect!.left + this._padding; 
    }

    private _calcPercentByOffset(offset: number){
        let percent = Math.round(offset / (this._trackSize ) * 100 * 10) / 10;
        if(percent > 100){
            percent = 100;
        }
        if(this.usePoints){
            if(percent < 3 || !percent){
                percent = 0
            }
            else if(percent > 22 && percent < 28){
                percent = 25;
            }
            else if(percent > 47 && percent < 53){
                percent = 50;
            }
            else if(percent > 72 && percent < 78){
                percent = 75;
            }
            else if(percent > 97){
                percent = 100;
            }
        }
        if(percent < this.minPercent){
            return this.minPercent;
        }
        return percent;
    }

    private _calcPercentByValue(){
        let value = 0;
        
        if(!this.max) return 0;
        if(this.startFromMin){
            value =  Math.round(((this.valueAsNumber - this.min) / (this.max - this.min) ) * 100 * 10) / 10;
        }
        else{
            value =  Math.round((this.valueAsNumber / this.max) * 100 * 10) / 10;
        }
        if(value < 0){
            return 0;
        }
        if(value > 100){
            return 100;
        }
        return value;
    }

    private _calcValueByPercent(percent: number){
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
    
    private _updateOffset(){
        const offsetX = Math.round((this._trackSize ) * this._percent / 100 * 1e2) / 1e2;
        if(offsetX !== this.offsetX){
            this.offsetX = offsetX;
        }
    }

    private _hidePercent(){        
        clearTimeout(this._timeout);
        this._timeout = window.setTimeout(() => {
            this.isPercentHidden = true;
        }, 800);
    }
    
    private _movePosition(x: number){
        if(this.isDisabled()) return;
        requestAnimationFrame(() => {
            const offset =  this._calcOffset(x);
            this._percent = this._calcPercentByOffset(offset);
            this._value = this._calcValueByPercent(this._percent).toString();
            this._updateOffset();
            this._dispatch();
         })
    }

    public setPercent(value: number){
        this._percent = Math.max(Math.min(value, 100), 0);
        this.requestUpdate();
        setTimeout(()=> this._dispatch())
    }
    
    
    // ==== Events ==== 

    private _onFocus(){
        document.addEventListener("keydown", this._handleKeyboard)
    }
    private _onBlur(){
        document.removeEventListener("keydown", this._handleKeyboard)
    }
    private _onChangeSize = (rect: DOMRect) => {
        this._rect = this.getBoundingClientRect();
        this._trackSize = this._calcTackWidth(rect);
        this._trackStartX = this._calcTrackStartX(rect);
        this._updateOffset();
    }
    private _touchStart = (e: TouchEvent) => {
        document.addEventListener('touchmove', this._touchMove);
        document.addEventListener('touchend', this._touchEnd);
        document.addEventListener('touchcancel', this._touchEnd);
        this._handlePointerDown();
        this._handlePointerMove(e.touches[0].clientX);
        e.preventDefault();
        
    }
    private _touchMove = (e: TouchEvent) => {
        this._handlePointerMove(e.touches[0].clientX);
        e.preventDefault();
    }
    private _touchEnd = (e: TouchEvent) => {
        document.removeEventListener('touchmove', this._touchMove);
        document.removeEventListener('touchend', this._touchEnd);
        document.removeEventListener('touchcancel', this._touchEnd);
        this._handlePointerUp(e.touches[0].clientX);
        e.preventDefault();
    }

    private _mouserDown = (e: MouseEvent) => {
        document.addEventListener('mousemove', this._mouseMove);
        document.addEventListener('mouseup', this._mouseUp);        
        this._handlePointerDown();
        this._handlePointerMove(e.clientX);
        e.preventDefault();
    }
    private _mouseMove = (e: MouseEvent) => {
        this._handlePointerMove(e.clientX);
        e.preventDefault();
    }

    private _mouseUp = (e: MouseEvent) => {
        document.removeEventListener('mousemove', this._mouseMove);
        document.removeEventListener('mouseup', this._mouseUp);
        e.preventDefault();
        this._handlePointerUp(e.clientX);
    }

    private _handlePointerDown = () => {
        if(this.isDisabled()) return;
        this.isPercentHidden = false;
        this.setAttribute('pressed', '');

    }
    private _handlePointerUp = (x: number) => {
        this._hidePercent();
        this._movePosition(x);
        this.removeAttribute('pressed');
    }
    private _handlePointerMove = (x: number) => {
        this._movePosition(x);
        this.isPercentHidden = false;
    }
    private _handlePointOver = (e: Event) => {
        if(this.isDisabled()) return;
        clearTimeout(this._timeout);
        this.isPercentHidden = false;
        this.setAttribute('hover', '');
        e.preventDefault();
    }
    private _handlePointLeave = (e: Event) => {
        e.preventDefault();
        this._hidePercent();
        this.removeAttribute('hover');
    }
    private _handleKeyboard = (e: KeyboardEvent) => {
        if(e.key === "ArrowRight" || e.key === "ArrowTop"){
            this.setPercent(this._percent + 1)
            
        }
        if(e.key === "ArrowLeft" || e.key === "ArrowBottom"){
            this.setPercent(this._percent - 1)
            
        }
    }

    
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-range': LitRange;
    }
}
