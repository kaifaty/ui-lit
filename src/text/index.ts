import { property, customElement } from 'lit/decorators.js';
import { LitElement, css, html } from 'lit';
import { textStyles } from './styles';

type TextStatus = "error" | "danger" | "attention" | "success" | "accented" | "none";
export interface ITextProps {
    status: TextStatus,
    center: boolean
    pulse: boolean
}

@customElement('lit-text')
export class LitText extends LitElement{
    static styles = textStyles;
    @property({type: Boolean, attribute: true, reflect: true}) center: boolean = false;
    @property({type: Boolean, attribute: true, reflect: true}) pulse: boolean = false;
    @property({type: String, attribute: true, reflect: true}) status: TextStatus = 'none';
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-text': LitText;
    }
}