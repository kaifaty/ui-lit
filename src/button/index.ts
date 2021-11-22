import { TemplateResult, LitElement, nothing, html, } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { classMap } from 'lit/directives/class-map';
import { KeyDownController } from '../controllers/KeyController';
import { button } from '../styles/button';
import '../spinner';


export interface ButtonProps{
    type?: 'button' | 'submit',
    size?: TSize,
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
    @property({type: Boolean, reflect: true}) switchOn: boolean = true;
    @property({type: Boolean, reflect: true}) notifyOnClick: boolean = false;
    @property({type: Boolean, reflect: true}) center: boolean = false;
    @property({type: Boolean, reflect: true}) loading: boolean = false;

    @property({type: Number}) tabindex: number = 0;

    enter = new KeyDownController(this);
    notifyTimeout = 0;

    connectedCallback(){
        super.connectedCallback();
    }
    disconnectedCallback(){
        super.disconnectedCallback();
    }
    get classes(){
        return {
            wrapper: true,
            noselect: true,
            "icon-before": !!this.iconBefore && !this.loading,
            "icon-after": !!this.iconAfter && !this.loading,
        };
    }
    willUpdate(){
        if (this._notifyIcon || this.loading) {
            this.style.width = this.clientWidth + "px";
            this.style.height = this.clientHeight + "px";
            this.style.setProperty("--button-justify", 'center');
        }
        else if (this.notifyTimeout > 0) {
            this.style.removeProperty("width");
            this.style.removeProperty("height");
            this.style.removeProperty("--button-justify");
        }
    }
    private _contentTemplate(){
        return this._notifyIcon 
        ? html`<lit-icon class = "checkmark" 
                         icon = "checkmark"></lit-icon>` 
        : html`
            <slot @slotchange = "${this._onIconBefore}" 
                  name = "icon-before"></slot>
            <slot></slot>
            <slot @slotchange = "${this._onIconAfter}"
                  name = "icon-after"></slot>`;
    }
    render(){
        return html`
        <div tabIndex = "${this.tabindex}" 
            class = "${classMap(this.classes)}" 
            @click = "${this._click}"
            >${this.loading 
                ? html`<lit-spinner small></lit-spinner>` 
                : this._contentTemplate()}
        </div>`;
    }

    // ==== Events ====
    private _onIconBefore(e: Event){
        this.iconBefore = true;
    }
    private _onIconAfter(e: Event){
        this.iconAfter = true;
    }
    handlekeyDown(e: KeyboardEvent){
        if(e.key === "Enter" && document.activeElement === this){
            this.submit();
        }
    }
    private _click(){
        if(this.disabled) return;
        
        if(this.switch){
            this.toggleSwitch();
        }
        else{
            this.submit();
        }        
        
    }
    // ==== Actions ====
    toggleSwitch(){
        this.switchOn = !this.switchOn;
        this.dispatchEvent(new CustomEvent("switchChanged", {
            detail: this.switchOn,
            bubbles: true,
        }))
    }
    submit(){
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