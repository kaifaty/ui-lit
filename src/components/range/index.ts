import {css, html, nothing} from 'lit'
import {property, query, state} from 'lit/decorators.js'

import {ResizeObserverController} from '../../controllers/resize-observer'
import {definable, focusable, labled, stylable} from '../../mixins/'
import {LitFormAssoc} from '../../nesting'
import {noselect} from '../../styles/noselect'

import {PREFIX, RangeCSSVars} from './styles.map'
import {TRect} from './types'


export const cssState = {
    size: 16,
    padding: 12,
    pointer: 8,
    pointerBorder: 2,
    topMargin: 8,
    tumbBorderSize: 2,
    get poinerWidth(){
        return this.pointer + this.pointerBorder
    },
    get toMiddle(){
        return (this.size - this.pointer) / 2 
    },
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

export class LitRange extends focusable(labled(stylable(definable(LitFormAssoc), RangeCSSVars, PREFIX))){
    
    static styles = [
            ...super.styles,
            noselect, 
            css`
            :host{
                display: inline-block;
                --size: ${cssState['size']};
                --pointer: ${cssState['pointer']}px;
                --pointer-border: ${cssState['pointerBorder']}px;
                --line-height: 4px;
                --top-margin: ${cssState['topMargin']}px;
                --padding: ${cssState['padding']}px;
                --poiner-width: calc(var(--pointer) + var(--pointer-border));
                --to-middle: calc((var(--size) - var(--pointer)) / 2);
                --default-filled: hsl(264, 100%, 60%);
                --percent: 0;
                --thumb-border-size: ${cssState['tumbBorderSize']};
                
                padding: 1px;
                box-sizing: border-box;
                contain: content;

            }
            :host([showPercent]) .wrapper{
                padding-bottom: 17px;
            }
            .wrapper:focus{
                outline: ${LitRange.cssVar('outline-focus')};
            }

            .wrapper{
                min-width: 100px;
                position: relative;
                box-sizing: border-box;
                padding: 5px var(--padding);
                box-sizing: border-box;
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
                bottom: 0;
                left: calc(var(--size) / 2 * -1 + 4px);
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
                cursor: pointer;
            }
            :host([hover]) .track-line{
                background: linear-gradient(to right, ${LitRange.cssVar('filled-hover')} var(--percent), ${LitRange.cssVar('track-background-hover')} var(--percent));
            }
            .track-line{
                width: 100%;
                height: var(--line-height);
                margin: var(--top-margin) auto;
                border-radius: 5px;
                outline: ${LitRange.cssVar('track-outline')};
                background: linear-gradient(to right, ${LitRange.cssVar('filled')} var(--percent), ${LitRange.cssVar('track-background')} var(--percent));
            }
            .thumb-wrapper{
                position: absolute;
                z-index: 3;
                left: calc(var(--size) / 2 * -1);
                top: calc(var(--top-margin) - var(--size) / 2 + var(--line-height) / 2 - var(--thumb-border-size));
                width: var(--size, 14px);
                height: var(--size, 14px);
            }

            .thumb.fullfiled{
                background-color: ${LitRange.cssVar('filled')};
                border: ${LitRange.cssVar('thumb-outline-fullfiled')};
            }

            :host([hover]) .thumb{
                background-color: ${LitRange.cssVar('thumb-background-hover')};
            }
            :host([pressed]) .thumb{      
                background-color:  ${LitRange.cssVar('thumb-background-pressed')};
            }
            .thumb{
                border-radius: 100%;
                width: 100%;
                height: 100%;
                background-color: ${LitRange.cssVar('thumb-background')};
                border: ${LitRange.cssVar('thumb-outline')};
                box-shadow: ${LitRange.cssVar('thumb-shadow')};
            }

            .point{
                position: absolute;
                top: calc(var(--top-margin) - var(--pointer) / 2 + var(--line-height) / 2 - var(--pointer-border));
                width: var(--pointer);
                height: var(--pointer);
                border-radius: var(--pointer);
                background-color: ${LitRange.cssVar('point-background')};
                border: var(--pointer-border) solid ${LitRange.cssVar('thumb-background')};
                transform: translate(-50%, 0);
                z-index: 1;
            }
            .point.filled{
                border: var(--pointer-border) solid ${LitRange.cssVar('filled')};
                background-color: ${LitRange.cssVar('filled')};
            }
            :host([hover]) .point.filled{
                border: var(--pointer-border) solid ${LitRange.cssVar('filled-hover')};
                background-color: ${LitRange.cssVar('filled-hover')};
            }
            :host([hover]) .point:not(.filled){
                border: var(--pointer-border) solid ${LitRange.cssVar('track-background-hover')};
            }
            `
    ]
     
    static get properties(){        
        return {
            ...super.properties,
            value: {type: String, hasChanged: () => true},
            min: {type: Number},
            max: {type: Number},
        }
    }
    
    @state() isPercentHidden = true
    @state() disabledByVol = true
    @property({type: Number, reflect: true, attribute: true}) decimals = 8
    @property({type: Boolean, reflect: true}) showPercent = false
    @property({type: Boolean, reflect: true, attribute: true}) usePoints = false
    @property({type: Boolean, reflect: true}) startFromMin = false
    @query('.track') _wrapper!: HTMLElement
    private _RO = new ResizeObserverController(this)
    private _points: number[] = [0, 25, 50, 75, 100]
    private _timeout = 0
    private _trackSize = 0
    private _trackStartX = 0
    private _thumbSize = 0
    private _padding = 0
    private _rect: TRect | null = null
    private _min = 0
    private _percent = 0
    private _offsetX = 0
    private _lastX = 0
    tabindex = 0
    get offsetX(){
        return this._offsetX
    }
    get min() {
        return this._min
    }
    set min(value: number){
        const oldValue = this._min
        
        if(oldValue === value) return
        if(value < 0){
            console.warn('Min value must be => 0, replaced to 0.')
            value = 0
        }
        this._min = value
        this._recalcValue()
        this._percent = this._calcPercentByValue()
        this.requestUpdate('max', oldValue)        
    }

    private _max = 100
    get max() {
        return this._max
    }
    set max(value: number){
        const oldValue = this._max
        if(oldValue === value) return
        this._max = value
        this._recalcValue()
        this._percent = this._calcPercentByValue()
        this.requestUpdate('max', oldValue)        
    }

    get percent(){
        return this._percent
    }
    get valueAsNumber(){
        return Number(this._value)
    }
    set valueAsNumber(value: number){
        if(typeof value === 'number'){
            this.value = value.toFixed(this.decimals)
        }
        else if (typeof value === 'string'){
            this.value = value
        }
    }
    private _value = '0'
    get value() {
        return this._value
    }
    set value(value: string){
        const oldValue = this._value
        if(oldValue === value) return
        this._value = value
        this._recalcValue()
        this._percent = this._calcPercentByValue()
        this.requestUpdate('value', oldValue)        
    }
    get minPercent(){
        if(this.startFromMin){
            return 0
        }
        if(!this.max) return 0
        return this.min / this.max * 100
    }
    
    isDisabled(){
        return this.disabled || this.max < this.min || !this.max
    }
    
    connectedCallback(){
        super.connectedCallback()
        this._thumbSize = parseInt(window.getComputedStyle(this).getPropertyValue('--pointer')) || cssState.pointer
        this._padding = parseInt(window.getComputedStyle(this).getPropertyValue('--padding')) || cssState.padding
    }

    willUpdate(){         
        this._value = this._calcValueByPercent(this._percent).toFixed(this.decimals)
        this._updateOffset()
    }
    updated(props: Map<string, unknown>){
        super.updated(props)
        if(props.has('value') || props.has('min') || props.has('max')){
            this.style.setProperty('--percent', this._percent + '%')
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
            })
        }
        return nothing
    }
    private _percentTemplate(){
        if(!this.showPercent) return nothing
        const left = this._offsetX + this._padding - (this._thumbSize + 6) * this._percent / 100
        return  html`<div style = "transform: translateX(${left}px);"
                          class = "noselect percent ${this.isPercentHidden ? 'hidden' : ''}">${this._percent}%</div> `
    }
    private _thumbTemplate(){
        const offset = (this._offsetX).toFixed(1)
        return html`<div class = "thumb-wrapper" 
            style = "transform: translateX(${offset}px);">
            ${this.isDisabled() 
                ? nothing 
                : html`<div part = "thumb" 
                            class = "thumb ${this._percent === 100 ? 'fullfiled' : ''}"></div>`}       
        </div>`
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
        </div>`
    }    


    // ==== Actions ==== 
    private _recalcValue(){
        let val = this.valueAsNumber
        if(this.min > this.max){
            val = this.min
        }
        else if(val > this.max){
            val = this.max
        }
        else if(val < this.min){
            val = this.min
        }
        this._value = val.toFixed(this.decimals)
    }


    private _calcTrackStartX(rect: TRect){
        return rect.x + 2 * this._padding
    }

    private _calcTackWidth(rect: TRect){
        return rect.width
    }

    private _calcOffset(x: number){
        return x - this._trackStartX - this._rect!.left + this._padding 
    }

    private _calcPercentByOffset(offset: number){
        let percent = Math.round(offset / (this._trackSize ) * 100 * 10) / 10
        if(percent > 100){
            percent = 100
        }
        if(this.usePoints){
            if(percent < 3 || !percent){
                percent = 0
            }
            else if(percent > 22 && percent < 28){
                percent = 25
            }
            else if(percent > 47 && percent < 53){
                percent = 50
            }
            else if(percent > 72 && percent < 78){
                percent = 75
            }
            else if(percent > 97){
                percent = 100
            }
        }
        if(percent < this.minPercent){
            return this.minPercent
        }
        return percent
    }

    private _calcPercentByValue(){
        let value = 0
        
        if(!this.max) return 0
        if(this.startFromMin){
            value =  Math.round(((this.valueAsNumber - this.min) / (this.max - this.min) ) * 100 * 10) / 10
        }
        else{
            value =  Math.round((this.valueAsNumber / this.max) * 100 * 10) / 10
        }
        if(value < 0){
            return 0
        }
        if(value > 100){
            return 100
        }
        return value
    }

    private _calcValueByPercent(percent: number){
        let value = 0
        value = this.max * (percent / 100)
        if (this.startFromMin && value < this.min) {
            return this.min
        }
        if (value > this.max) {
            return this.max
        }
        return value
    }
    
    private _updateOffset(){
        const offsetX = Math.round((this._trackSize ) * this._percent / 100 * 1e2) / 1e2
        if(offsetX !== this._offsetX){
            this._offsetX = offsetX
        }
    }

    private _hidePercent(){        
        clearTimeout(this._timeout)
        this._timeout = window.setTimeout(() => {
            this.isPercentHidden = true
        }, 800)
    }
    
    private _movePosition(x: number){
        if(this.isDisabled()) return
        this._lastX = x
        requestAnimationFrame(() => {
            const offset =  this._calcOffset(x)
            const percent = this._calcPercentByOffset(offset)
            this.value = this._calcValueByPercent(percent).toString()
            this.notify()
         })
    }

    public setPercent(value: number){
        this._percent = Math.max(Math.min(value, 100), 0)
        this.value = this._calcValueByPercent(this._percent).toString()
        setTimeout(()=> this.notify())
    }
    
    
    // ==== Events ==== 
    private _onPreventTouch(e: TouchEvent){
        e.preventDefault()
    }
    private _onPointerDown(e: PointerEvent){   
        (e.target as HTMLElement).setPointerCapture(e.pointerId)
        this._handlePointerDown()
        this._handlePointerMove(e.clientX)
        e.preventDefault() 
        // Atop auto focus
    }
    private _onPointerMove(e: PointerEvent){
        if(!e.isPrimary || !this.hasAttribute('pressed')) return
        this._handlePointerMove(e.clientX)
        e.preventDefault()
    }
    private _onPointerLostCapture(e: PointerEvent){
        this._handlePointerUp(this._lastX)
        // e.preventDefault();
    }
    private _onPointerOver(e: PointerEvent){
        this._onPointOver(e)
    }

    private _onChangeSize = (rect: TRect) => {
        this._rect = this.getBoundingClientRect()
        this._trackSize = this._calcTackWidth(rect)
        this._trackStartX = this._calcTrackStartX(rect)
        this._updateOffset()
        this.requestUpdate()
    }

    private _handlePointerDown(){
        this._rect = this.getBoundingClientRect()
        if(this.isDisabled()) return
        this.isPercentHidden = false
        this.setAttribute('pressed', '')
    }

    private _handlePointerUp(x: number){
        this._hidePercent()
        this._movePosition(x)
        this.removeAttribute('pressed')
    }
    private _handlePointerMove(x: number){
        this._movePosition(x)
        this.isPercentHidden = false
    }
    private _onPointOver(e: Event){
        if(this.isDisabled()) return
        clearTimeout(this._timeout)
        this.isPercentHidden = false
        this.setAttribute('hover', '')
        e.preventDefault()
    }
    private _onPointLeave(e: Event){
        e.preventDefault()
        this._hidePercent()
        this.removeAttribute('hover')
    }
    private _handleKeyboard(e: KeyboardEvent){
        if(e.key === 'ArrowRight' || e.key === 'ArrowTop'){
            this.setPercent(this._percent + 1)
            
        }
        if(e.key === 'ArrowLeft' || e.key === 'ArrowBottom'){
            this.setPercent(this._percent - 1)
            
        }
    }

    notify(){
        this.dispatchEvent(new CustomEvent('changed', {
            detail: {
                value: this.value,
                percent: this._percent,
                valueAsNumber: this.valueAsNumber,
                type: 'range'
            },
            bubbles: true,
        }))
    }
    
}


declare global {
    interface HTMLElementTagNameMap {
      'lit-range': LitRange;
    }
}
