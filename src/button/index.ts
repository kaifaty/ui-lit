import { TemplateResult, LitElement, nothing, html, } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { classMap } from 'lit/directives/class-map';
import { KeyDownController } from '../controllers/KeyController';
import { button } from '../styles/button';


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
}

type TSize = 'small' | 'medium' | 'large';
@customElement("lit-button")
export class ButtomElement extends LitElement implements ButtonProps{
    static styles = button;
    @state() iconBefore: boolean = false;
    @state() iconAfter: boolean  = false;
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

    @property({type: Number}) tabindex: number = 0;

    enter = new KeyDownController(this);

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
            "icon-before": !!this.iconBefore,
            "icon-after": !!this.iconAfter,
        };
    }
    render(){
        return html`
        <div tabIndex = "${this.tabindex}" 
            class = "${classMap(this.classes)}" 
            @click = "${this._click}"
            ><slot @slotchange = "${this._onIconBefore}" 
                  name = "icon-before"
            ></slot><div
            ><slot></slot></div><slot @slotchange = "${this._onIconAfter}"
                  name = "icon-after"></slot></div>`;
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
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-button': ButtomElement;
    }
}