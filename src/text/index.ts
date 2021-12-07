import { property, customElement } from 'lit/decorators';
import { LitElement, css, html } from 'lit';

type TextStatus = "error" | "danger" | "attention" | "success" | "accented" | "none";
export interface ITextProps {
    status: TextStatus,
    center: boolean
    pulse: boolean
}

@customElement('lit-text')
export class LitText extends LitElement{
    static styles = [
        css`
        :host{
            display: block;
        }
        :host([status="error"]),
        :host([status="danger"]){
            color: var(--lit-error-color, red);
            --lit-icon-color: var(--lit-error-color);
        }
        :host([status="attention"]){
            color: var(--lit-attention-color, #c4c10d);
            --lit-icon-color: var(--lit-attention-color);
        }
        :host([status="success"]){
            color: var(--lit-success-color, #24d40d);
            --lit-icon-color: var(--lit-success-color);
        }
        :host([status="accented"]){
            color: var(--lit-accented-color, #24d40d);
            --lit-icon-color: var(--lit-accented-color);
        }
        :host([center]){
            text-align: center;
        }
        :host([pulse]){
            animation: pulse 1.8s ease infinite;
        }
        @keyframes pulse {
            0% {
                opacity: 1
            }
            50%{
                opacity: 0.5
            }
            100%{
                opacity: 1
            }
        }`
    ]

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