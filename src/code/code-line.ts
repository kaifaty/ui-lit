
import { customElement, state } from 'lit/decorators';
import { LitElement, html, css } from 'lit';
import { getParentTagName } from 'kailib';
import type { LitCode } from './index';


@customElement('lit-code-line')
export class LitCodeLine extends LitElement{
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
        color: var(--lit-code-number, #777);
    }
    `;
    @state() number: number = 0;
    get root(){        
        return getParentTagName(this, 'lit-code') as LitCode | null; 
    }
    connectedCallback(){
        super.connectedCallback();
        const root = this.root;
        if(!root){
            console.warn('Code line must be child of lit-code');
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
      'lit-code-line': LitCodeLine;
    }
    
}