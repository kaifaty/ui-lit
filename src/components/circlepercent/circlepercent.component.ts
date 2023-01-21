import {css, html, LitElement} from 'lit'
import {property} from 'lit/decorators.js'

import {definable, stylable} from '../../mixins'

import {canvasDirective} from './directive'
import {circleCSSMap, PREFIX} from './styles.map'


export class LitCircle extends stylable(definable(LitElement), circleCSSMap, PREFIX){
    static styles = css`
    :host{
        display: block;
        --size: 14px;
        height: var(--size);
        width: var(--size);
        contain: strict;
        color: ${LitCircle.cssVar('color')};
    }
    canvas{
        width: 100%;
        height: 100%;
        display: block;
    }`
    
    static get properties(){
        return { 
            percent: {type: Number}
        }
    }
    
    private _percent = 0
    get percent(){
        return this._percent
    }
    set percent(value: number){
        if(value > 100) value = 100
        this._percent = value
        this.requestUpdate()
    }
    @property({type: Number, attribute: true}) size = 0
    @property({type: Number, attribute: true}) ratio = 2
    @property({type: String, attribute: true}) color = ''

    private _defaultSize = 14

    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(!this.color || this.color === 'rgb(0, 0, 0)'){
            const styles = window.getComputedStyle(this)        
            this.color = this.color || styles.getPropertyValue('color')
        }
        if(_changedProperties.has('size')){
            this.size = this.size || 
                parseInt(window.getComputedStyle(this).getPropertyValue('--lit-percent-size')) || this._defaultSize

            this.style.setProperty('--size', this.size + 'px')
        }
    }
    get lineWidth() {
        return this.ratio
    }
    get radius(){
        return this.size * this.ratio / 2 
    }
    renderCircle = (ctx: CanvasRenderingContext2D) => {
        if(!ctx) return
        ctx.strokeStyle = this.color
        ctx.fillStyle = this.color
        ctx.clearRect(0, 0, this.radius * 2, this.radius * 2)    
        ctx.lineWidth = 0
        if(this.percent){
            ctx.beginPath()
            ctx.moveTo(this.radius, this.radius)
            ctx.lineTo(this.radius, 0)
            ctx.arc(
                this.radius, 
                this.radius,
                this.radius -  this.ratio, 
                -Math.PI / 2,
                (this.percent / 100) * 2 * Math.PI - Math.PI / 2
            )
            ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(this.radius, this.radius, this.radius - this.lineWidth - 1, 0, 2 * Math.PI)
        ctx.stroke()
    }
    render(){
        return html`<canvas ${canvasDirective(this.renderCircle, this.size, this.ratio)}></canvas>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-circle': LitCircle;
    }
}
