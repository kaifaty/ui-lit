import { styleMap } from 'lit/directives/style-map.js';
import { LitElement, nothing, html, } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { button } from './styles';
import '../spinner';
import '../icon';
import '../ripple';
import { focusable } from '../mixins/focusable/index';


/**
 *
 * @cssprop --lit-button-display - Controls the display of button
 * 
 * 
 * @cssprop --lit-button-small-height - small size Height
 * @cssprop --lit-button-small-padding - small size Padding
 * @cssprop --lit-button-small-font-size - small size FontSize
 * 
 * @cssprop --lit-button-height - medium size Height
 * @cssprop --lit-button-padding - medium size Padding
 * @cssprop --lit-button-font-size - medium size FontSize
 * 
 * @cssprop --lit-button-large-height - large size Height
 * @cssprop --lit-button-large-padding - large size Padding
 * @cssprop --lit-button-large-font-size - large size FontSize
 * 
 * @cssprop --lit-button-border - border
 * @cssprop --lit-button-outline - outline
 * @cssprop --lit-button-radius - border-radius
 * 
 * 
 * @cssprop --lit-button-text-transform - text-transform
 * @cssprop --lit-button-letter-spacing - letter-spacing
 * 
 * 
 * @cssprop --lit-button-color - color
 * @cssprop --lit-button-background - background
 * 
 * @cssprop --lit-button-background-hover - hover background-color
 * @cssprop --lit-button-background-focus - focus background-color
 * @cssprop --lit-button-background-pressed - pressed background-color
 * 
 * @cssprop --lit-button-outline-hover - hover outline
 * @cssprop --lit-button-outline-focus - focus outline
 * @cssprop --lit-button-outline-pressed - pressed outline
 * 
 * @cssprop --lit-button-color-hover - hover color
 * @cssprop --lit-button-color-focus - focus color
 * @cssprop --lit-button-color-pressed - pressed color
 * 
 * 
 * @cssprop --lit-button-primary-color - color
 * @cssprop --lit-button-primary-background - background
 * @cssprop --lit-button-primary-border - border
 * 
 * @cssprop --lit-button-primary-color-hover - hover color
 * @cssprop --lit-button-primary-color-focus - focus color
 * @cssprop --lit-button-primary-color-pressed - pressed color
 * 
 * @cssprop --lit-button-primary-background-hover - hover background
 * @cssprop --lit-button-primary-background-focus - focus background
 * @cssprop --lit-button-primary-background-pressed - pressed background
 * 
 * @cssprop --lit-button-primary-outline-hover - outline hover
 * @cssprop --lit-button-primary-outline-focus - outline hover
 * @cssprop --lit-button-primary-outline-pressed - outline pressed
 * 
 * 
 * @cssprop --lit-button-success-color - color
 * @cssprop --lit-button-success-background - background
 * @cssprop --lit-button-success-border - border
 * 
 * @cssprop --lit-button-success-color-hover - hover color
 * @cssprop --lit-button-success-color-focus - focus color
 * @cssprop --lit-button-success-color-pressed - pressed color
 * 
 * @cssprop --lit-button-success-background-hover - hover background
 * @cssprop --lit-button-success-background-focus - focus background
 * @cssprop --lit-button-success-background-pressed - pressed background
 * 
 * @cssprop --lit-button-success-outline-hover - outline hover
 * @cssprop --lit-button-success-outline-focus - outline hover
 * @cssprop --lit-button-success-outline-pressed - outline pressed
 * 
 * 
 * @cssprop --lit-button-danger-color - color
 * @cssprop --lit-button-danger-background - background
 * @cssprop --lit-button-danger-border - border
 * 
 * @cssprop --lit-button-danger-color-hover - hover color
 * @cssprop --lit-button-danger-color-focus - focus color
 * @cssprop --lit-button-danger-color-pressed - pressed color
 * 
 * @cssprop --lit-button-danger-background-hover - hover background
 * @cssprop --lit-button-danger-background-focus - focus background
 * @cssprop --lit-button-danger-background-pressed - pressed background
 * 
 * @cssprop --lit-button-danger-outline-hover - outline hover
 * @cssprop --lit-button-danger-outline-focus - outline hover
 * @cssprop --lit-button-danger-outline-pressed - outline pressed
 * 
 * @cssprop --lit-button-switch-color Switch color 
 * @cssprop --lit-button-switch-background Switch background color 
 * 
 * @cssprop --lit-button-switch-on-color Switch-On color 
 * @cssprop --lit-button-switch-on-background Switch-On background color 
 * 
 * 
 */

 export interface ButtonProps{
    type: Type,
    size: TSize,
    primary?: boolean
    disabled?: boolean
    borderless?: boolean
    success?: boolean
    danger?: boolean
    switchOn?: boolean
    notifyOnClick?: boolean
    center?: boolean
    loading?: boolean
}

type Type = 'submit' | 'button' | 'switch';
type TSize = "small" | "medium" | "large" ;

/** @tag lit-button */
@customElement("lit-button")
export class LitButton extends focusable(LitElement) implements ButtonProps{
    static styles = button;
    static get properties(){
        return {
            loading: {type: Boolean}
        }
    }
    /** @ignore  */
    private _loading: boolean = false;
    
    get loading(){
        return this._loading;
    }
    set loading(value: boolean){
        const oldValue = this._loading;

        if(oldValue === value) return;
        this._loading = value;
        if(value){
            this.setAttribute('loading', '');
        }
        else{
            this.removeAttribute('loading');
        }
        this.requestUpdate("loading", oldValue);
        

    }


    /** @prop {"button" | "submit"} type */
    @property({type: String, attribute: true}) align: 'start' | 'center' | 'end' = 'center';

    /** @prop {"button" | "submit"} type */
    @property({type: String, attribute: true}) type: Type = 'button';
    @property({type: String, reflect: true, attribute: true}) size: TSize = 'medium'; 

    /** @prop {boolean} disabled - Disable element */
    @property({type: Boolean, reflect: true}) disabled:  boolean = false;

    /** @prop {boolean} borderless - Borderless element */
    @property({type: Boolean, reflect: true}) borderless: boolean = false;

    ///** @prop {boolean} switch - Button can be switch toggle */
    //@property({type: Boolean, reflect: true}) switch: boolean = false;

    /** @prop {boolean} primary - Primary  */
    @property({type: Boolean, reflect: true}) primary: boolean = false;

    /** @prop {boolean} success - Success  */
    @property({type: Boolean, reflect: true}) success: boolean = false;

    /** @prop {boolean} danger - Danger  */
    @property({type: Boolean, reflect: true}) danger: boolean = false;

    @property({type: Boolean, reflect: true}) between: boolean = false;

    /** @prop {boolean} switchOn - switch State. true - enabled, false disabled */    
    @property({type: Boolean, reflect: true}) switchOn: boolean = false;

    @property({type: Boolean, reflect: true}) accent: boolean = false;
    
    @property({type: Boolean}) notifyOnClick: boolean = false;

    /** @ignore  */
    @state() _notifyIcon: boolean  = false;


    @property({type: Number}) tabindex: number = 0;

    /** @ignore  */
    private _notifyTimeout = 0;

    /** @ignore  */
    private _width = 0;

    /** @ignore  */
    private get classes(){
        return {
            button: true,
            wrapper: true,
            noselect: true,
            checkmark: this._notifyIcon,
            accent: this.primary || this.success || this.danger || this.accent
        };
    }

    /** @ignore  */
    private _contentTemplate(){
        if(this._notifyIcon){
            return html`<lit-icon icon = "checkmark"></lit-icon>`;
        }
        return html`${this.loading 
                        ? html`<lit-spinner small></lit-spinner>` 
                        : html`<slot name = "icon-before"></slot>`}
                    <div part = "content" class = "content"><slot></slot></div>
                    <slot name = "icon-after"></slot>`;
    }


    /**
     * @slot icon-before - You can put some elements before content
     * @slot icon-after - You can put some elements after content
     */
    render(){
        const styles = this._width ? {width: this._width + 'px'} : {};
        return html`
            <button role = "button"
                aria-pressed = "${this.type === 'switch' ? this.switchOn : 'undefined'}"
                tabindex = "${this.tabindex}" 
                style = "${styleMap(styles)}"
                class = "${classMap(this.classes)}" 
                @click = "${this.click}"
                @focus = "${this._onFocus}"
                @blur = "${this._onBlur}"
            >${this._contentTemplate()}</button><lit-ripple @click = "${this.click}"></lit-ripple>`;
    }

    // ==== Events ====
    /** @ignore  */
    private _onBlur(){
        document.removeEventListener('keydown', this._onKeyDown);
    }
    /** @ignore  */
    private _onFocus(){
        document.addEventListener('keydown', this._onKeyDown);
    }
    /** @ignore  */
    private _onKeyDown = (e: KeyboardEvent) => {
        if(e.key === "Enter" || e.key === " "){
            this.submit();
            e.preventDefault();
        }
    }

    // ==== Actions ====
    
    public click(){  
        this.submit()          
    }

    /** @event {CustomEvent} switchChanged - for type = 'switch'. Return current switchOn state. */
    public toggleSwitch(){
        this.switchOn = !this.switchOn;
        this.dispatchEvent(new CustomEvent("switchChanged", {
            detail: this.switchOn,
            bubbles: true,
        }))
    }
    /** @event {CustomEvent} submitForm - for type = 'submit'. Submit to lit-form */
    public submit(){
        if(this.disabled || this.loading) return;  
        if(this.type === 'switch'){
            this.toggleSwitch();
        }
        if(this.type === "submit"){
            this.dispatchEvent(new CustomEvent("submitForm", {
                bubbles: true,
                composed: true,
            }));
        }
        if(this.notifyOnClick){
            this._notifyIcon = true;
            this._width = this.clientWidth;
            clearTimeout(this._notifyTimeout);
            this._notifyTimeout = window.setTimeout(() => {
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