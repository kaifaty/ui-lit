import { __decorate } from "tslib";
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { OuterClickRemoveController } from '../controllers/OuterClickRemoveController';
import { noteStyles } from './styles';
let LitNote = class LitNote extends LitElement {
    constructor() {
        super(...arguments);
        this._hosted = 0;
        this._minShowTime = 500;
        this._handle = new OuterClickRemoveController(this);
    }
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
    connectedCallback() {
        super.connectedCallback();
        this._hosted = Date.now();
    }
    render() {
        return html `<slot></slot>`;
    }
    handleClick(e) {
        if (e.target !== this && Date.now() - this._hosted > this._minShowTime) {
            this.dispatchEvent(new CustomEvent("close"));
        }
    }
};
LitNote.styles = noteStyles;
LitNote = __decorate([
    customElement("lit-note")
], LitNote);
export { LitNote };
