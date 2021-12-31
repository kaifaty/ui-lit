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
    @property({type: Boolean, reflect: true}) center: boolean = false;
    @property({type: Boolean, reflect: true}) loading: boolean = false;

    @property({type: Number}) tabindex: number = 0;

    enter = new KeyDownController(this);
    notifyTimeout = 0;

    get classes(){
        return {
            wrapper: true,
            noselect: true,
        };
    }
    private _contentTemplate(){
        if(this.loading){
            return html`<lit-spinner small></lit-spinner>`;
        }
        if(this._notifyIcon){
            return html`<lit-icon class = "checkmark" 
                                  icon = "checkmark"></lit-icon>`;
        }
        return html`<slot name = "icon-before"></slot>
                    <slot></slot>
                    <slot name = "icon-after"></slot>`;
    }
    render(){
        return html`
        <div tabIndex = "${this.tabindex}" 
            class = "${classMap(this.classes)}" 
            @click = "${this.click}"
        >${this._contentTemplate()}</div>`;
    }

    // ==== Events ====
    handlekeyDown(e: KeyboardEvent){
        if(e.key === "Enter" && document.activeElement === this){
            this.submit();
        }
    }
    public focus(): void {
        (this.shadowRoot!.querySelector(`.wrapper`) as HTMLElement)?.focus();
    }
    public click(){
        if(this.disabled || this.loading) return;        
        if(this.switch){
            this.toggleSwitch();
        }
        else{
            this.submit();
        }                
    }
    // ==== Actions ====
    public toggleSwitch(){
        this.switchOn = !this.switchOn;
        this.dispatchEvent(new CustomEvent("switchChanged", {
            detail: this.switchOn,
            bubbles: true,
        }))
    }
    public submit(){
        if(this.loading) return;
        if(this.type === 'submit'){
            this.dispatchEvent(new CustomEvent("submitForm", {
                bubbles: true,
                composed: true,
            }));
        }
        if(this.notifyOnClick){
            this._notifyIcon = true;
            clearTimeout(this.notifyTimeout);
            this.notifyTimeout = window.setTimeout(() => {
                this._notifyIcon = false;
            }, 1000)
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-button': LitButton;
    }
}