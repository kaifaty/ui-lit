import { styleMap } from 'lit/directives/style-map.js';
import { TemplateResult, LitElement, nothing, html, } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { KeyDownController } from '../controllers/KeyController';
import { button } from './styles';
import '../spinner';


export interface ButtonProps{
    type: 'button' | 'submit',
    size: TSize,
    primary?: boolean
    disabled?: boolean
    borderless?: boolean
    switch?: boolean
    success?: boolean
    danger?: boolean
    switchOn?: boolean
    notifyOnClick?: boolean
    center?: boolean
    loading?: boolean
}

type TSize = 'small' | 'medium' | 'large';
@customElement("lit-button")
export class LitButton extends LitElement implements ButtonProps{
    static styles = button;
    static get properties(){
        return {
            loading: {type: Boolean}
        }
    }
    _loading: boolean = false;
    get loading(){
        return this._loading;
    }
    set loading(value: boolean){
        const oldValue = this._loading;

        if(oldValue === value) return;
        if(value){
            this._width = this.clientWidth;
        }
        else{
            this._width = 0;
        }
        this._loading = value;
        this.requestUpdate("loading", oldValue);
        

    }
    @state() iconBefore: boolean = false;
    @state() iconAfter: boolean  = false;
    @state() _notifyIcon: boolean  = false;
    @property({type: String}) type: 'submit' | 'button' = 'button';
    @property({type: String, reflect: true}) size: TSize = 'medium';
    @property({type: Boolean, reflect: true}) disabled:  boolean = false;
    @property({type: Boolean, reflect: true}) borderless: boolean = false;
    @property({type: Boolean, reflect: true}) switch: boolean = false;
    @property({type: Boolean, reflect: true}) primary: boolean = false;
    @property({type: Boolean, reflect: true}) secondary: boolean = false;
    @property({type: Boolean, reflect: true}) success: boolean = false;
    @property({type: Boolean, reflect: true}) danger: boolean = false;
    @property({type: Boolean, reflect: true}) switchOn: boolean = false;
    @property({type: Boolean, reflect: true}) notifyOnClick: boolean = false;

    @state() hover: boolean = false;
    @state() pressed: boolean = false;
    @state() focused: boolean = false;
    @property({type: Number}) tabindex: number = 0;

    notifyTimeout = 0;
    _width = 0;

    get classes(){
        return {
            wrapper: true,
            noselect: true,
            hover: this.hover,
            pressed: this.pressed,
            focused: this.focused,
            checkmark: this._notifyIcon
        };
    }
    private _contentTemplate(){
        if(this.loading){
            return html`<lit-spinner small></lit-spinner>`;
        }
        if(this._notifyIcon){
            return html`<lit-icon icon = "checkmark"></lit-icon>`;
        }
        return html`<slot name = "icon-before"></slot>
                    <span><slot></slot></span>
                    <slot name = "icon-after"></slot>`;
    }
    render(){
        const styles = this._width ? {width: this._width + 'px'} : {};
        return html`
        <button tabindex = "${this.tabindex}" 
            style = "${styleMap(styles)}"
            class = "${classMap(this.classes)}" 
            @click = "${this.click}"
            @focus = "${this._onFocus}"
            @blur = "${this._onBlur}"
            @mouseover = "${this._onMouseOver}"
            @mouseout = "${this._onMouseOut}"
            @mousedown = "${this._onMouseDown}"
            @touchstart = "${this._onTouchStart}"
        >${this._contentTemplate()}</button>`;
    }

    // ==== Events ====
    private _onMouseDown(e: MouseEvent){
        this.pressed = true;
        // e.preventDefault();
        document.addEventListener('mouseup', this._onMouseUp);
    }
    private _onMouseUp = (e: MouseEvent) => {
        this.pressed = false;
        // e.preventDefault();
        document.removeEventListener('mouseup', this._onMouseUp);
    }
    private _onTouchStart(e: TouchEvent){
        this.pressed = true;
        document.addEventListener('touchcancel', this._onEndTouch);
        document.addEventListener('touchend', this._onEndTouch);
        // e.preventDefault();
    }
    private _onEndTouch = (e: TouchEvent) => {
        this.pressed = false;
        document.removeEventListener('touchcancel', this._onEndTouch);
        document.removeEventListener('touchend', this._onEndTouch);
        // e.preventDefault();
    }
    private _onMouseOver(e: MouseEvent){
        this.hover = true;
        e.preventDefault();
    }
    private _onMouseOut(e: MouseEvent){
        this.hover = false;
        e.preventDefault();
    }
    private _onBlur(){
        this.focused = false;
        document.removeEventListener('keydown', this._onKeyDown);
    }
    private _onFocus(){
        this.focused = true;
        document.addEventListener('keydown', this._onKeyDown);
    }
    private _onKeyDown(e: KeyboardEvent){
        if(e.key === "Enter"){
            this.submit();
        }
    }

    // ==== Actions ====
    
    public focus(): void {
        (this.shadowRoot!.querySelector(`.wrapper`) as HTMLElement)?.focus();
    }
    public click(){  
        this.submit()          
    }

    public toggleSwitch(){
        this.switchOn = !this.switchOn;
        this.dispatchEvent(new CustomEvent("switchChanged", {
            detail: this.switchOn,
            bubbles: true,
        }))
    }
    public submit(){
        if(this.disabled || this.loading) return;  
           
        if(this.switch){
            this.toggleSwitch();
        }
        if(this.type === 'submit'){
            this.dispatchEvent(new CustomEvent("submitForm", {
                bubbles: true,
                composed: true,
            }));
        }
        if(this.notifyOnClick){
            this._notifyIcon = true;
            this._width = this.clientWidth;
            clearTimeout(this.notifyTimeout);
            this.notifyTimeout = window.setTimeout(() => {
                this._notifyIcon = false;
                this._width = 0;
            }, 1000)
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-button': LitButton;
    }
}