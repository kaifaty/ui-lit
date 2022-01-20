import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { spinnerStyles } from './styles';


export interface ISipnnerProps {
    fullscreen: boolean
    fullContent: boolean
    small: boolean
    big: boolean
}

@customElement('lit-spinner')
export class LitSpinner extends LitElement{
    static styles = spinnerStyles;
    @property({type: Boolean, attribute: true, reflect: true}) big: boolean = false;
    @property({type: Boolean, attribute: true, reflect: true}) small: boolean = false;
    @property({type: Boolean, attribute: true, reflect: true}) fullContent: boolean = false;
    @property({type: Boolean, attribute: true, reflect: true}) fullscreen: boolean = false;

    render(){
        return html`
            <div class = "pulsor">
                <div class="bounce bounce1"></div>
                <div class="bounce bounce2"></div>
            </div>
        `;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-spinner': LitSpinner;
    }
}