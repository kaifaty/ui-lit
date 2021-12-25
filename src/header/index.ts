import { customElement, property } from 'lit/decorators';
import { LitElement, html, css } from 'lit';

export interface IHeaderProps {
    level: number
}

@customElement('lit-header')
export class LitHeader extends LitElement{
    static get properties(){
        return {
            center: {type: Boolean}
        }
    }
    static styles = [
        css`
        :host{
            display: block;
            font-weight: var(--lit-header-font-weight, bold);
            font-family: var(--lit-header-font-weight, inherit);
        }
        :host([center]){
            text-align: center;
        }
        `,
        ...[1, 2, 3, 4, 5, 6].map(it => 
        css`:host([level="${it}"]){
            margin: var(--lit-header-${it}-margin, 2.5rem 0 1rem 0);
            font-size: var(--lit-header-${it}-font-size, ${Math.round(10 * (3 - it * 0.4)) / 10}rem);
        }`)
    ];

@property({type: Number, attribute: true, reflect: true}) level: number = 1;
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-header': LitHeader;
    }
    
}