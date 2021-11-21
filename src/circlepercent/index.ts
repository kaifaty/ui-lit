import { LitElement, css, html, noChange } from 'lit';
import {property, customElement, query} from 'lit/decorators'
import { Directive, PartInfo, PartType, ElementPart, directive } from 'lit/directive';

export interface ICircleProps{
    percent: number
}
class CanvasDirective extends Directive{
    _inited = false;
    _ctx: CanvasRenderingContext2D | null = null;
    _color = "#aaa";

    constructor(partInfo: PartInfo){
        super(partInfo);
        if (partInfo.type !== PartType.ELEMENT) {
            throw new Error('Must be element');
        }
    }
    render(f: Function, size: number, ratio: number){
        return noChange;
    }
    update(part: ElementPart, args: [Function, number, number]){
        if(!this._ctx){
            const styles = window.getComputedStyle(part.element);
            this._color = styles.getPropertyValue("--circle-color");
            this._ctx = (part.element as HTMLCanvasElement).getContext('2d')!;
            this._ctx.canvas.height = args[1] * args[2];
            this._ctx.canvas.width = args[1] * args[2];
        }
        args[0](this._ctx, this._color);
    }
}
const canvasDirective = directive(CanvasDirective);

@customElement('lit-circle')
export class LitCircle extends LitElement{
    static styles = css`
    :host{
        display: block;
        height: var(--lit-percent-size, 14px);
        width: var(--lit-percent-size, 14px);
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
        this.requestUpdate();
    }
    _color: string = "#aaa";
    @property({type: Number, attribute: true}) size: number = 14;
    @property({type: Number, attribute: true}) ratio: number = 2;

    get lineWidth() {
        return 1 * this.ratio;
    }
    get radius(){
        return this.size * this.ratio / 2 ;
    }
    renderCircle = (ctx: CanvasRenderingContext2D) => {
        if(!ctx) return;
        ctx.strokeStyle = this._color;
        ctx.fillStyle = this._color;
        ctx.clearRect(0, 0, this.radius * 2, this.radius * 2);    
        ctx.lineWidth = 0;
        if(this.percent){
            ctx.beginPath();
            ctx.moveTo(this.radius, this.radius);
            ctx.lineTo(this.radius, 0);
            ctx.arc(
                this.radius, 
                this.radius,
                this.radius -  this.ratio, 
                -Math.PI / 2,
                (this.percent / 100) * 2 * Math.PI - Math.PI / 2
            );
            ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(this.radius, this.radius, this.radius - this.lineWidth - 1, 0, 2 * Math.PI);
        ctx.stroke();
    }
    render(){
        return html`<canvas ${canvasDirective(this.renderCircle, this.size, this.ratio)}></canvas>`;
    }
    connectedCallback(){
        super.connectedCallback();
        //this.size = this.clientWidth;
        const styles = window.getComputedStyle(this);
        this._color = styles.getPropertyValue("--lit-circle-color");
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-circle': LitCircle;
    }
}
