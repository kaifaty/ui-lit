import { buttonCSSVars, buttonCSSValues } from './../button/styles';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../select/option'
import { focusable } from '../mixins/focusable/index';

@customElement("lit-menu-item")
export class LitMenuItem extends focusable(LitElement){
    static styles = css`
    :host{
        min-width: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        white-space: nowrap;
        position: relative;

    }
    .wrapper{
        padding: 10px;
    }
    lit-button:focus-within{
        background-color: ${buttonCSSValues.backgroundFocus};
    }
    lit-button{
        width: 100%;
    }
    `;

    @property({type: String}) value: string = '';
    render(){
        return html`<lit-button 
                        @keydown = "${this._handleFocus}" 
                        between><slot></slot></lit-button>`
    }
    private _handleFocus = (e: KeyboardEvent) => {
        let event = '';
        if(e.key === 'ArrowDown'){
            event = 'focusNext';
        }
        else if(e.key === 'ArrowUp'){
            event = 'focusPrev';
        }
        else if(e.key === 'Enter' || e.key === ' '){
            this.dispatchEvent(new CustomEvent("menuSelect", {
                detail: this.value,
                composed: true,
                bubbles: true
            }))
            e.preventDefault();
        }
        if(event){
            this.dispatchEvent(new CustomEvent(event, {
                detail: true,
                bubbles: true,
                composed: true
            }))
            e.preventDefault();
        }
    }
}