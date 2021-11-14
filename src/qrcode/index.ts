
import { customElement, property, query } from 'lit/decorators';
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
        display: flex;
        justify-content: center;
    }
    canvas{
        display: block;
        width: var(--qrcode-width, 200px);
    }`;
    @property({type: String}) value: string = '';
    private _setQRCode(){
        QRCode.toCanvas(this.canvas, this.value, {width: 200});
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