
import { customElement} from 'lit/decorators.js';
import { LitElement, html, css } from 'lit';

@customElement('lit-panel')
export class LitPanel extends LitElement{
    static styles = css`
    :host{
        display: block;
        background-color: var(--lit-panel-background, hsl(299, 80%, 70%));
        color: var(--lit-panel-color, var(--app-font-color, hsl(299, 70%, 10%)));
        padding: var(--lit-panel-padding, 10px 15px);
        border: 1px solid var(--lit-panel-border, initial);
    }
    :host([danger]){
        background-color: var(--lit-panel-danger-background, hsl(0, 80%, 70%));
        color: var(--lit-panel-danger-color, hsl(0, 80%, 95%));
        border: 1px solid var(--lit-panel-danger-border, initial);
    }
    `;
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-panel': LitPanel;
    }
    
}