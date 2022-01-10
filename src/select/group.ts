import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';


@customElement("lit-opt-group")
export class ListBox extends LitElement{
    static styles = css`
    :host{
        display: block;
    }
    label{
        display: block;
    }
    `;
    @property({type: Boolean, reflect: true}) disabled: boolean = false;
    @property({type: String}) label: string = '';
    render(){
        return html`
            <label>
                ${this.label}
                <slot></slot>
            </label>`
    }
}