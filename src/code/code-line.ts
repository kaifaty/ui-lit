
import { customElement, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';
import { getParentTagName } from '../helpers';
import type { CodeElement } from './index';


@customElement('code-line')
export class CodeLine extends LitElement{
    static styles = css`
    :host{
        display: block;
        padding: 3px;
    }
    .wrapper{
        display: grid;
        grid-template-columns: 25px auto;
    }
    .line-number{
        color: #777;
    }
    `;
    @state() number: number = 0;
    get root(){        
        return getParentTagName(this, 'code-element') as CodeElement | null; 
    }
    connectedCallback(){
        super.connectedCallback();
        const root = this.root;
        if(!root){
            console.warn('Code line must be child of code-element');
            return
        }
        this.number = root.inc()
    }
    render(){
        return html`<div class = "wrapper">
                <div class = "line-number">${this.number}</div>
                <div><slot></slot></div>   
            </div>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'code-line': CodeLine;
    }
    
}