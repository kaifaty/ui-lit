
import { customElement, state } from 'lit/decorators.js';
import { LitElement, html, css } from 'lit';
export * from './code-line';

@customElement('lit-code')
export class LitCode extends LitElement{
    static styles = css`
    :host{
        display: block;
        background-color: var(--lit-code-background, rgba(0,0,0,0.05));
        padding: 10px;
        margin: 10px 0;
        font-family: monospace;
        border-radius: 5px;
    }`;
    _counter: number = 0;
    inc(){        
        return ++this._counter;
    }
    render(){
        return html`<slot></slot>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-code': LitCode;
    }
    
}