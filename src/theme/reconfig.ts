import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';


@customElement("lit-theme-configer")
export class LitThemeConfiger extends LitElement{
    static styles = css`
    :host{
        display: block;
    }
    lit-header{
        margin: 0;
    }
    .wrapper{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        align-items: center;
    }
    `;

    @state() hue: number = localStorage.appThemeHue || "264";
    protected render() {
        return html`
        <div class = "wrapper">
            <slot><lit-header level = "5">Hue:</lit-header></slot>
            <lit-range min = "0" max = "360" value = "${this.hue}"></lit-range>
            <slot><lit-header level = "5">Saturation:</lit-header></slot>
            <lit-range></lit-range>
        </div>`;
    }
    private _change(){

    }
}