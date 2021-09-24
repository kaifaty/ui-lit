import { __decorate } from "tslib";
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators';
let NoteElement = class NoteElement extends LitElement {
    getSize() {
        const bound = this.getBoundingClientRect();
        return {
            width: bound.width,
            height: bound.height,
        };
    }
    show() {
        this.classList.add('visible');
    }
    render() {
        return html `<slot></slot>`;
    }
};
NoteElement.styles = css `
    :host{
        display: block;
        position: absolute;
        visibility: hidden;
        opacity: 0;
        transition: 0.4s ease-in;
        border: 1px solid #000;
        z-index: 10;
        padding: 5px 15px;
        border-radius: 3px;
        box-sizing: border-box;
    }
    :host(.visible){
        visibility: visible;
        opacity: 1;
    }
    `;
NoteElement = __decorate([
    customElement("note-element")
], NoteElement);
export { NoteElement };
