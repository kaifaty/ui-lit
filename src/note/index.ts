import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';
import { OuterClickRemoveController } from '../controllers/OuterClickRemoveController';


@customElement("lit-note")
export class LitNote extends LitElement{
    static styles = css`
    :host{
        display: block;
        position: absolute;/*
        visibility: hidden;
        opacity: 0;*/
        transition: 0.4s ease-in;
        border: 1px solid var(--lit-note-border-color);
        z-index: 10;
        padding: 5px;
        border-radius: 1px;
        box-sizing: border-box;
        background-color: var(--lit-note-background-color, rgba(255,255,255,0.85));
        color: var(--lit-note-color);
    }
    :host(.visible){
        visibility: visible;
        opacity: 1;
    }
    :host(.error){
        /*background-color: var(--note-error-background-color, #fff);*/
        color: var(--lit-note-error-color, red);
        /*border: 1px solid var(--note-error-border-color, #ff7e6d);*/
    }
    `;
    _hosted: number = 0;
    _minShowTime: number = 500; 
    _handle = new OuterClickRemoveController(this);
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
