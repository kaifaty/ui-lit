import { LitElement, css, html } from 'lit';
import {property, customElement, query} from 'lit/decorators'

export interface ICircleProps{
    percent: number
}

@customElement('lit-circle')
export class CirclePercent extends LitElement{
    static styles = css`
    :host{
        display: block;
        height: var(--percent-size, 14px);
        width: var(--percent-size, 14px);
    }
    canvas{
        width: 100%;
        height: 100%;
        display: block;
    }
    `;    
    static get properties(){
        return {
            percent: {type: Number}
        }
    }
    _percent: number = 0;
    get percent(){
        return this._percent;
    }
    set percent(value: number){
        if(value > 100) value = 100;
        this._percent = value;
        this.renderCircle();
    }

    @property({type: Number, attribute: true}) size: number = 0;
    @property({type: Number, attribute: true}) ratio: number = 2;
    @query('canvas') canvas!: HTMLCanvasElement;
    _ctx: CanvasRenderingContext2D | null = null;

    private _init(){
        this._ctx = this.canvas.getContext('2d')!;
        this._ctx.canvas.height = this.clientHeight * this.ratio;
        this._ctx.canvas.width = this.clientWidth * this.ratio;
        this._ctx.lineWidth = this.lineWidth;
    }
    get lineWidth() {
        return 1 * this.ratio;
    }
    get radius(){
        return this.size * this.ratio / 2 ;
    }
    getColor(): string{
        const styles = window.getComputedStyle(this.canvas);
        const color = styles.getPropertyValue("--circle-color");        
        return color || "#aaa"; 
    }
    renderCircle(){
        if(!this._ctx) return;
        const color = this.getColor();
        this._ctx.strokeStyle = color;
        this._ctx.fillStyle = color;
        this._ctx.clearRect(0, 0, this.radius * 2, this.radius * 2);    
        this._ctx.lineWidth = 0;

        if(this.percent){
            this._ctx.beginPath();
            this._ctx.moveTo(this.radius, this.radius);
            this._ctx.lineTo(this.radius, 0);
            this._ctx.arc(
                this.radius, 
                this.radius,
                this.radius -  this.ratio, 
                -Math.PI / 2,
                (this.percent / 100) * 2 * Math.PI - Math.PI / 2
            );
            this._ctx.fill();
        }
        
         this._ctx.beginPath();
         this._ctx.arc(this.radius, this.radius, this.radius - this.lineWidth - 1, 0, 2 * Math.PI);
         this._ctx.stroke();
    }
    render(){
        return html`<canvas></canvas>`;
    }
    updated(){
        this.renderCircle();
    }
    firstUpdated(){
        if(this.size){
            this.style.setProperty('--percent-size', this.size + "px");
        }
        else{
            this.size = parseInt(this.style.getPropertyValue('--percent-size')) || 14;
        }
        this._init();
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-circle': CirclePercent;
    }
}
