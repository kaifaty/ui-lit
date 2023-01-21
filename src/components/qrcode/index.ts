import {css, html, LitElement} from 'lit'
import {customElement, property, query} from 'lit/decorators.js'


let toCanvas: (canvas: HTMLCanvasElement, value: string, data: {width: number}) => void

@customElement('lit-qrcode')
export class LitQRCode extends LitElement{
    @query('canvas') canvas!: HTMLCanvasElement
    static styles = css`
    :host{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        contain: content;
    }
    canvas{
        display: block;
    }`
    @property({type: String}) value = ''
    @property({type: Number}) width = 200
    connectedCallback(){
        super.connectedCallback()
        import ('qrcode').then(r => {
            toCanvas = r.toCanvas
            this.requestUpdate()
        })
    }
    private _setQRCode(){
        toCanvas?.(this.canvas, this.value, {width: this.width})
    }
    updated(){
        this._setQRCode()
    }
    render(){
        return html`<canvas></canvas>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-qrcode': LitQRCode;
    }
}