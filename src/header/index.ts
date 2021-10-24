import { customElement, property } from 'lit/decorators';
import { LitElement, html, css } from 'lit';

export interface IHeaderProps {
    level: number
}

@customElement('header-element')
export class UIDescription extends LitElement{
    static styles = [
        css`
        :host{
            display: block;
            font-weight: var(--header-font-weight, bold);
            font-family: var(--header-font-weight, inherit);
        }
        `,
        ...[1, 2, 3, 4, 5, 6].map(it => 
        css`:host([level="${it}"]){
            margin: var(--header-${it}-margin, 0.5rem 0 1rem 0);
            font-size: var(--header-${it}-font-size, ${(2.7 - it * 0.3)}rem);
        }`)
    ];

@property({type: Number, attribute: true, reflect: true}) level: number = 1;
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'header-element': UIDescription;
    }
    
}