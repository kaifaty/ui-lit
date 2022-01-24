import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { noselect } from '../styles/noselect';


@customElement("lit-ripple")
export class Ripple extends LitElement{
    static styles = [
        noselect, 
        css`
    :host{
        display: block;
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        --click-x: 0;
        --click-y: 0;
        --click-size: 100px;
        z-index: 0;
    }
    :host::after,
    :host::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        background-color: var(--ripple-background, #000);
    }
    :host::before{
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 0;
    }
    :host::after{
        width: var(--click-size);
        height: var(--click-size);
        opacity: 0;
        border-radius: 50%;
        z-index: 1;
    }
    :host([hover])::before{
        opacity: var(--ripple-opacity-hover, 0.1);
    }
    :host(:focus)::before{
        opacity: var(--ripple-opacity-focus, 0.15);
    }
    :host([pressed])::after{
        opacity: var(--ripple-opacity-pressed, 0.2);
        top: var(--click-y);
        left: var(--click-x);
        animation: ripple 0.3s ease-out;
        transform: scale(2);
    }
    @keyframes ripple {
        0% {
            transform: scale(0);
        }
        30% {
            transform: scale(1);
        }
        100% {
            transform: scale(2.2);
        }
    }
    `]

    @property({type: Boolean, reflect: true}) accent: boolean = true;
    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('focus', this._onFocus);
        this.addEventListener('mouseover', this._onMouseOver);
        this.addEventListener('mouseout', this._onMouseOut);
        this.addEventListener('mousedown', this._onMouseDown);
        this.addEventListener('touchstart', this._onTouchStart);
    }
    disconnectedCallback(): void {
        super.disconnectedCallback()
        this.removeEventListener('focus', this._onFocus);
        this.removeEventListener('mouseover', this._onMouseOver);
        this.removeEventListener('mouseout', this._onMouseOut);
        this.removeEventListener('mousedown', this._onMouseDown);
        this.removeEventListener('touchstart', this._onTouchStart);
    }
    
    private _startPress(x: number, y: number){
        const rect = this.getBoundingClientRect();
        this.setAttribute('pressed', '');
        const _x = x - rect.x - rect.width / 2;
        const _y = y - rect.y - rect.width / 2;
        this.style.setProperty(`--click-size`, rect.width + "px");
        this.style.setProperty(`--click-x`, _x + "px");
        this.style.setProperty(`--click-y`, _y + "px");
        
    }

    private _endPress(){
        this.removeAttribute('pressed');
        this.removeAttribute('hover');
    }

    /** @ignore  */
    private _onMouseDown(e: MouseEvent){
        // e.preventDefault();
        document.addEventListener('mouseup', this._onMouseUp);
        this._startPress(e.clientX, e.clientY);
    }

    /** @ignore  */
    private _onMouseUp = (e: MouseEvent) => {
        // e.preventDefault();
        this._endPress();
        document.removeEventListener('mouseup', this._onMouseUp);
    }

    /** @ignore  */
    private _onTouchStart(e: TouchEvent){
        this._startPress(e.touches[0].clientX, e.touches[0].clientY);
        document.addEventListener('touchcancel', this._onEndTouch);
        document.addEventListener('touchend', this._onEndTouch);
        // e.preventDefault();
    }

    /** @ignore  */
    private _onEndTouch = (e: TouchEvent) => {
        this.removeAttribute('pressed');
        this.removeAttribute('hover');
        document.removeEventListener('touchcancel', this._onEndTouch);
        document.removeEventListener('touchend', this._onEndTouch);
        // e.preventDefault();
    }

    /** @ignore  */
    private _onMouseOver(e: MouseEvent){
        this.setAttribute('hover', '');
        e.preventDefault();
    }

    /** @ignore  */
    private _onMouseOut(e: MouseEvent){
        this.removeAttribute('hover');
        e.preventDefault();
    }

    /** @ignore  */
    private _onFocus(){
        this.removeAttribute('hover');
        this.removeAttribute('hover');
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-ripple': Ripple;
    }
}
