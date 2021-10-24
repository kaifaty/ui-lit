
import { customElement} from 'lit/decorators';
import { LitElement, html, css } from 'lit';

@customElement('panel-element')
export class PanelElement extends LitElement{
    static styles = css`
    :host{
        display: inline-block;
        background-color: var(--panel-background, rgba(0, 0, 0, 0.2));
        color: var(--panel-color, var(--app-font-color, black));
        padding: var(--panel-padding, 10px 15px);
        border: 1px solid var(--panel-border, initial);
    }`;
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'panel-element': PanelElement;
    }
    
}