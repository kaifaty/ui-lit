
import { customElement} from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import { panelStyles } from './styles';

@customElement('lit-panel')
export class LitPanel extends LitElement{
    static styles = panelStyles;
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-panel': LitPanel;
    }
    
}