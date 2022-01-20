
import { customElement, property, query } from 'lit/decorators.js';
import { LitElement, html, css } from 'lit';
import QRCode from 'qrcode'

export interface IQRCodeProps{
    value: string
}

@customElement('lit-qrcode')
export class LitQRCode extends LitElement{
    @query('canvas') canvas!: HTMLCanvasElement;
    static styles = css`
    :host{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        contain: content;
    }
    canvas{
        display: block;
    }`;
    @property({type: String}) value: string = '';
    @property({type: Number}) width: number = 200;

    private _setQRCode(){
        QRCode.toCanvas(this.canvas, this.value, {width: this.width});
    }
    updated(){
        this._setQRCode()
    }
    render(){
        return html`<canvas></canvas>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-qrcode': LitQRCode;
    }
}