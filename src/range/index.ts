import { ResizeObserverController } from './../controllers/ResizeObserverController';
import { LitElement, html, TemplateResult, nothing, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators';
import type { FormAssociated } from '../form-associated/interface';
import { formAssociated } from '../form-associated/index';
import { noselect } from '../styles/noselect';
import { getClientX, IUIEvent } from 'kailib';

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

/** <lit-range></lit-range> */
@customElement("lit-range")
export class LitRange extends formAssociated(LitElement){
    
    static get styles () {
        return [
            noselect, 
            css`
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
                background-color: var(--lit-range-thumb, #111);
                box-shadow: 0 0 0 var(--lit-pointer-border) var(--lit-range-points-border-color, #111);
                
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
                background-color: var(--lit-range-track, #999);
                height: var(--line-height);
                margin: var(--top-margin) auto;
                border-radius: 2px
            }
            .blocked-track{
                position: absolute;
                left: 5px;
                background-color: var(--lit-range-track-blocked, #999);
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
                background-color: var(--lit-range-points-background, #fff);
                box-shadow: 0 0 0 var(--pointer-border) var(--lit-range-points-border-color, #444);
                transform: translate(-50%, 0);
                z-index: 1;
            }
            `
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
    private _isMoving: boolean = false;
    @state() offsetX: number = 0;
    @state() percent: number = 0;
    @state() isPercentHidden: boolean = true;
    @state() disabledByVol: boolean = true;
    @property({type: Number}) decimals: number = 8;
    @property({type: Boolean}) showPercent: boolean = false;
    @property({type: Boolean}) usePoints: boolean = true;
    @property({type: Boolean}) startFromMin: boolean = false;
    @query('.track') _wrapper!: HTMLElement;
    RO = new ResizeObserverController(this);
    _points: number[] = [0, 25, 50, 75, 100];
    _timeout: number = 0;
    _trackSize: number = 0;
    _trackStartX: number = 0;
    _thumbSize: number = 0;
    _padding: number = 0;
    _rect: DOMRect | null = null;
    _min: number = 0;
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
        this.percent = this._calcPercentByValue();
        this.requestUpdate('max', oldValue);        
    }

    _max: number = 100;
    get max() {
        return this._max;
    }
    set max(value: number){
        const oldValue = this._max;
        if(oldValue === value) return;
        this._max = value;
        this.percent = this._calcPercentByValue();
        this.requestUpdate('max', oldValue);        
    }

    get valueAsNumber(){
        return Number(this._value);
    }
    set valueAsNumber(value: number){
        if(typeof value === 'number'){
            this.value = value.toFixed(this.decimals);
        }
    }
    _value: string = '0';
    get value() {
        return this._value;
    }
    set value(value: string){
        const oldValue = this._value;
        if(oldValue === value) return;
        this._value = value;
        this.percent = this._calcPercentByValue();
        this.requestUpdate('value', oldValue);        
    }
    
    isDisabled(){
        return this.disabled || this.max < this.min;
    }
    
    willUpdate(){  
        //const rect = this.getBoundingClientRect()
        //this._trackSize = this._calcTackWidth(rect);
        //this._trackStartX = this._calcTrackStartX(rect);
        this._value = this._calcValueByPercent(this.percent).toFixed(this.decimals);
        this._updateOffset();
    }
    updated(props: Map<string, string | number | unknown>){
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


    get minPercent(){
        if(!this.startFromMin){
            return 0;
        }
        //return this.valueAsNumber / (this.max - this.min) * 100 
        return this.min / this.max * 100;
    }

    // ==== Actions ==== 
    private _calcTrackStartX(rect: DOMRect){
        return rect.x  + 2 * this._padding;
    }
    private _calcTackWidth(rect: DOMRect){
        return rect.width;
    }
    private _calcOffset(e: IUIEvent){
        const xPosition = getClientX(e);
        return xPosition -  this._trackStartX - this._rect!.left - this._padding; //  - this._trackStartX - this._thumbSize / 2;
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
        if(this.startFromMin){
            value =  Math.round(((this.valueAsNumber - this.min) / (this.max - this.min) ) * 100 * 10) / 10;
        }
        else{
            value =  Math.round((this.valueAsNumber / this.max) * 100 * 10) / 10;
        }
        if(value < this.min){
            return 0;
        }
        if(value > this.max){
            return 100;
        }
        return value;
    }
    private _calcValueByPercent(percent: number){
        let value = 0;
        if(this.startFromMin){
            value = this.min + (this.max - this.min)  * (percent / 100);
         }
         else{
            value = this.max * (percent / 100);
         }
         if(value < this.min){
             return this.min;
         }
         if(value > this.max){
             return this.max;
         }
         return value;
    }
    
    private _updateOffset(){
        const offsetX = Math.round((this._trackSize ) * this.percent / 100 * 1e2) / 1e2;
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
    private _movePosition(e: IUIEvent){
        requestAnimationFrame(() => {
             const offset =  this._calcOffset(e);
             this.percent = this._calcPercentByOffset(offset);
         })
        e.preventDefault();
    }

    public setPercent(value: number){
        this.percent = value;
    }
    
    // ==== Events ==== 
    private _handlePointerDown = (e: IUIEvent) => {
        if(this.isDisabled()) return;
        this._isMoving = true;
        this.isPercentHidden = false;
    }
    private _handlePointerMove = (e: Event) => {
        if(this._isMoving === true){        
            this._movePosition(e as IUIEvent);
            this.isPercentHidden = false;
            e.preventDefault();
        }
    }
    private _handlePointerUp = (e: IUIEvent) => {
        if(this._isMoving === true){
            this._isMoving = false;
            this._hidePercent();
            this._movePosition(e as IUIEvent);
            e.preventDefault();
        }
    }
    private _handlePointOver = (e: Event) => {
        if(this.isDisabled()) return;
        clearTimeout(this._timeout);
        this.isPercentHidden = false;
        e.preventDefault();
    }
    private _handlePointLeave = (e: Event) => {
        e.preventDefault();
        this._hidePercent();
    }

    // ==== templates ==== 
    private _pointersTemplate(){
        if(this.usePoints){
            return this._points.map(it => 
                    html`<div                         
                        data-value = "${it}"
                        style = "left: ${it}%;"
                        class = "point point-${it}"></div>`);
        }
        return nothing;
    }
    private _percentTemplate(){
        if(!this.showPercent) return nothing;
        const left = this.offsetX + this._padding - this._thumbSize * this.percent / 100;
        return  html`<div style = "left: ${left}px;"
                        class = "noselect percent ${this.isPercentHidden ? 'hidden' : ''}">${this.percent}%</div> `
    }
    private _blockedVolume(){
        if(!this.startFromMin) return nothing;
        const width = this.minPercent * (this._trackSize - this._padding) / 100;
        return html`<div class = "blocked-track" style = "width: ${width}px;"></div>`;
    }
    private _thumbTemplate(){
        const offset = (this.offsetX ).toFixed(1);
        return html`<div class = "thumb-wrapper" 
            style = "left: ${offset}px">
            ${this.isDisabled() ? nothing : html`<slot><div class = "thumb"></div></slot>`}       
        </div>`;
    }
    render(){
        return html`
        <div class = "track ${this.isDisabled() ? 'disabled' : ''}"
            ${this.RO.observe(this._onChangeSize)}
            @mousedown = "${this._handlePointerDown}"
            @mouserover = "${this._handlePointOver}"
            @mouseleave = "${this._handlePointLeave}"
            @touchstart = "${this._handlePointerDown}">
            ${this._thumbTemplate()}
            <div class = "track-line"></div>
            ${this._pointersTemplate()}
            ${this._blockedVolume()}
        </div>
        ${this._percentTemplate()}
        `;
    }
    _onChangeSize = (rect: DOMRect) => {
        this._rect = this.getBoundingClientRect();
        this._trackSize = this._calcTackWidth(rect);
        this._trackStartX = this._calcTrackStartX(rect);
    }
    connectedCallback(){
        super.connectedCallback();
        document.addEventListener("touchmove", this._handlePointerMove, {passive: false});
        document.addEventListener("touchend", this._handlePointerUp as EventListener);
        document.addEventListener("mousemove", this._handlePointerMove, {passive: false});
        document.addEventListener("mouseup", this._handlePointerUp as EventListener);
        this._thumbSize = parseInt(window.getComputedStyle(this).getPropertyValue("--pointer"));
        this._padding = parseInt(window.getComputedStyle(this).getPropertyValue("--padding"));
    }
    disconnectedCallback(){
        document.removeEventListener("touchmove", this._handlePointerMove);
        document.removeEventListener("touchend", this._handlePointerUp as EventListener);
        document.removeEventListener("mousemove", this._handlePointerMove);
        document.removeEventListener("mouseup", this._handlePointerUp as EventListener);
        super.disconnectedCallback()
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-range': LitRange;
    }
}
