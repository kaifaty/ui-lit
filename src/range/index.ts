import { ResizeObserverController } from './../controllers/ResizeObserverController';
import { LitElement, html, CSSResultOrNative, nothing, css, unsafeCSS } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import type { FormAssociated } from '../mixins/form-associated/interface';
import { formAssociated } from '../mixins/form-associated/index';
import { noselect } from '../styles/noselect';
import { labled } from '../mixins/labled/index';
import { focusable } from '../mixins/focusable/index';
import { notificatable } from '../mixins/notificatable/index';
import { rangeStyles } from './style';
import {throttle} from 'helpful-decorators'

type TRect = {
    x: number
    y: number
    left: number
    top: number
    bottom: number
    width: number
    height: number
}
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
            rangeStyles
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
    private _rect: TRect | null = null;
    private _min: number = 0;
    private _percent: number = 0;
    private _offsetX: number = 0;
    tabindex: number = 0;
    private _trackElement: HTMLElement | null = null;
    get offsetX(){
        return this._offsetX
    }
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

    protected firstUpdated(_changedProperties: Map<string | number | symbol, unknown>): void {
        super.firstUpdated(_changedProperties);        
        this._trackElement = this.shadowRoot!.querySelector(".track");
    }

    willUpdate(){         
        this._value = this._calcValueByPercent(this._percent).toFixed(this.decimals);
        this._updateOffset();
    }
    updated(props: Map<string, unknown>){
        super.updated(props);
        if(props.has("disabled") && this.disabled){
            //this.style.setProperty(`--percent`, 0 + "%")
        }
        else if(props.has("disabled") && !this.disabled){
            //this.style.setProperty(`--percent`, this._percent + "%")
        }
        //else 
        if(props.has("value") || props.has("min") || props.has("max")){
            this.style.setProperty(`--percent`, this._percent + "%")
        }
        
    }

    // ==== templates ==== 
    private _pointersTemplate(){
        if(this.usePoints){
            return this._points.map(it => {
                const filled = this._percent >= it //&& !this.disabled
                return html`<div                         
                    data-value = "${it}"
                    style = "left: ${it}%;"
                    class = "point point-${it} ${filled ? 'filled' : ''}"></div>`
            });
        }
        return nothing;
    }
    private _percentTemplate(){
        if(!this.showPercent) return nothing;
        const left = this._offsetX + this._padding - (this._thumbSize + 7) * this._percent / 100;
        return  html`<div style = "transform: translateX(${left}px);"
                        class = "noselect percent ${this.isPercentHidden ? 'hidden' : ''}">${this._percent}%</div> `
    }
    private _thumbTemplate(){
        const offset = (this._offsetX).toFixed(1);
        return html`<div class = "thumb-wrapper" 
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
    private _recalcValue(){
        let val = this.valueAsNumber;
        if(this.min > this.max){
            val = this.min;
        }
        else if(val > this.max){
            val = this.max;
        }
        else if(val < this.min){
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

    private _calcTrackStartX(rect: TRect){
        return rect.x + 2 * this._padding;
    }

    private _calcTackWidth(rect: TRect){
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
        if(offsetX !== this._offsetX){
            this._offsetX = offsetX;
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
            const percent = this._calcPercentByOffset(offset);
            this.value = this._calcValueByPercent(percent).toString();
            this._dispatch();
         })
    }

    public setPercent(value: number){
        this._percent = Math.max(Math.min(value, 100), 0);
        this.value = this._calcValueByPercent(this._percent).toString();
        setTimeout(()=> this._dispatch())
    }
    
    
    // ==== Events ==== 
    private _onPreventTouch = (e: TouchEvent) => {
        e.preventDefault();
    }
    private _onPointerDown = (e: PointerEvent) => {   
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        this._handlePointerDown();
        this._handlePointerMove(e.clientX);
        e.preventDefault(); // Atop auto focus
    }
    private _onPointerMove = (e: PointerEvent) => {
        if(!e.isPrimary || !this.hasAttribute("pressed")) return;
        this._handlePointerMove(e.clientX);
        e.preventDefault();
    }
    private _onPointerLostCapture = (e: PointerEvent) => {
        this._handlePointerUp(e.clientX);
        // e.preventDefault();
    }
    private _onPointerOver = (e: PointerEvent) => {
        this._onPointOver(e);
    }

    private _onChangeSize = (rect: TRect) => {
        this._rect = this.getBoundingClientRect();
        this._trackSize = this._calcTackWidth(rect);
        this._trackStartX = this._calcTrackStartX(rect);
        this._updateOffset();
        this.requestUpdate();
    }

    private _handlePointerDown = () => {
        this._rect = this.getBoundingClientRect();
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
    private _onPointOver = (e: Event) => {
        if(this.isDisabled()) return;
        clearTimeout(this._timeout);
        this.isPercentHidden = false;
        this.setAttribute('hover', '');
        e.preventDefault();
    }
    private _onPointLeave = (e: Event) => {
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
