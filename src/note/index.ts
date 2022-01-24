import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { OuterClickRemoveController } from '../controllers/OuterClickRemoveController';
import { noteStyles } from './styles';


@customElement("lit-note")
export class LitNote extends LitElement{
    static styles = noteStyles;
    private _hosted: number = 0;
    private _minShowTime: number = 500; 
    private _handle = new OuterClickRemoveController(this);
    getSize(){
        const bound = this.getBoundingClientRect()
        return {
            width: bound.width,
            height: bound.height,
        }
    }
    show(){
        this.classList.add('visible');
    }
    connectedCallback(){
        super.connectedCallback();
        this._hosted = Date.now();
    }
    render(){
        return html`<slot></slot>`;
    }
    handleClick(e: Event){
        if(e.target !== this && Date.now() - this._hosted > this._minShowTime){
            this.dispatchEvent(new CustomEvent("close"))
        }
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-note': LitNote;
    }
}
