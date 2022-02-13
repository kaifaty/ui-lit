import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../select/option'
import { focusable } from '../mixins/focusable/index';
import { menuItemStyles } from './styles';
import { mobileAndTabletCheck } from 'kailib';



@customElement("lit-menu-item")
export class LitMenuItem extends focusable(LitElement){
    static styles = menuItemStyles;

    
    @property({type: String}) value: string = '';
    render(){
        return html`<lit-button 
                        @keydown = "${this._handleFocus}"><slot slot = "icon-before" name = "icon-before"></slot><slot></slot></lit-button>`
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