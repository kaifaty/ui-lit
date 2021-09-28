import { TemplateResult, LitElement, nothing, html, } from 'lit';
import { customElement, property } from 'lit/decorators';
import { classMap } from 'lit/directives/class-map';
import { EnterController } from '../controllers/EnterController';
import { button } from '../styles/button';


export interface ButtonProps{
    type?: 'button' | 'submit',
    primary?: boolean
    disabled?: boolean
    borderless?: boolean
    switch?: boolean
    success?: boolean
    error?: boolean
    switchOn?: boolean
}


@customElement("button-element")
export class ButtomElement extends LitElement implements ButtonProps{
    static styles = button;
    @property() iconBefore: string | TemplateResult = '';
    @property() iconAfter: string | TemplateResult = '';
    @property({type: String}) type: 'submit' | 'button' = 'button';
    @property({type: String}) size: 'small' | 'medium' | 'large' = 'medium';
    @property({type: Number}) tabindex: number = 0;
    @property({type: Boolean}) disabled:  boolean = false;
    @property({type: Boolean}) borderless: boolean = false;
    @property({type: Boolean}) switch: boolean = false;
    @property({type: Boolean}) primary: boolean = false;
    @property({type: Boolean}) success: boolean = false;
    @property({type: Boolean}) error: boolean = false;

    @property({type: Boolean}) switchOn: boolean = true;


    enter = new EnterController(this);

    connectedCallback(){
        super.connectedCallback();
    }
    disconnectedCallback(){
        super.disconnectedCallback();
    }
    get classes(){
        return {
            borderless: this.borderless,
            switch: this.switch,
            "switch-on": this.switchOn,
            primary: this.primary,
            success: this.success,
            error: this.error,
            disabled: this.disabled,
            wrapper: true,
            noselect: true,
            "icon-before": !!this.iconBefore,
            "icon-after": !!this.iconAfter,
        };
    }
    private _iconBeforeTemplate(){
        if(!this.iconBefore) return nothing;
        return html`<span class = "icon-before icon">${this.iconBefore}</span>`;
    }
    private _iconAfterTemplate(){
        if(!this.iconAfter) return nothing;
        return html`<span class = "icon-after icon">${this.iconAfter}</span>`;
    }
    render(){
        return html`
            <div tabindex = "${this.tabindex}" 
                class = "${classMap(this.classes)}" 
                @click = "${this._click}"
            >${this._iconBeforeTemplate()}<div><slot></slot></div>${this._iconAfterTemplate()}</div>`;
    }

    // ==== Events ====
    onkeyEnter(){
        if(document.activeElement === this){
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
      'button-element': ButtomElement;
    }
}