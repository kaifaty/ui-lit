import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';
import { OuterClickRemoveController } from '../controllers/OuterClickRemoveController';


@customElement("note-element")
export class NoteElement extends LitElement{
    static styles = css`
    :host{
        display: block;
        position: absolute;/*
        visibility: hidden;
        opacity: 0;*/
        transition: 0.4s ease-in;
        border: 1px solid var(--note-border-color);
        z-index: 10;
        padding: 5px 15px;
        border-radius: 3px;
        box-sizing: border-box;
        background-color: var(--note-background-color, #fff);
        color: var(--note-color, red);
    }
    :host(.visible){
        visibility: visible;
        opacity: 1;
    }
    :host(.error){
        background-color: var(--note-error-background-color, #fff);
        color: var(--note-error-color, red);
        border: 1px solid var(--note-error-border-color, #ff7e6d);
    }
    `;
    _hosted: number = 0;
    _minShowTime: number = 500;
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
        document.addEventListener("click", this.onClick);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        document.removeEventListener("click", this.onClick); 
    }
    render(){
        return html`<slot></slot>`;
    }
    onClick = (e: Event) => {
        if(e.target !== this && Date.now() - this._hosted > this._minShowTime){
            this.dispatchEvent(new CustomEvent("close"))
        }
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'note-element': NoteElement;
    }
}
