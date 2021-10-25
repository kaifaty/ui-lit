
import { customElement, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';
export * from './code-line';

@customElement('code-element')
export class CodeElement extends LitElement{
    static styles = css`
    :host{
        display: block;
        background-color: var(--code-background, rgba(0,0,0,0.05));
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
      'code-element': CodeElement;
    }
    
}