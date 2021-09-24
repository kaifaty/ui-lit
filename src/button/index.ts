import { TemplateResult, LitElement, nothing, html, css, } from 'lit';
import { customElement, property } from 'lit/decorators';
import { classMap } from 'lit/directives/class-map';
import { EnterController } from '../controllers/EnterController';
import { noselect } from '../styles/noselect';


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
    static styles = [
        noselect,
        css`
        :host{
            display: var(--button-display, inline-block);
            height: var(--button-height);
        }
        .icon{
            align-self: center;
            justify-self: center;
        }
        .wrapper.mini{
            padding: 2px 4px;
            font-size: 0.9rem;
        }
        .wrapper.disabled{
            opacity: 0.5;
        }
        .wrapper.icon-before, .wrapper.icon-after{
            grid-template-columns: auto auto;
        }
        .wrapper.icon-before.icon-after{
            grid-template-columns:  auto auto auto;
        }
        .wrapper.borderless{
            border:  none;
        }
        .wrapper{
            cursor: pointer;
            display: grid;
            gap: var(--button-icon-gap, 4px);
            box-sizing: border-box;
            align-content: center;
            grid-template-columns: auto;
            height: 100%;
            padding: var(--button-padding, 6px 20px);
            border: var(--button-border, 1px solid  hsl(222, 20%, 65%));
            outline: var(--button-outline, none);
            border-radius: var(--button-radius, 3px);
            color: var(--button-color, hsl(222, 20%, 20%));
            background-color: var(--button-backround-color, hsl(222, 20%, 99%));
            --icon-fill: var(--button-color);
        }
        .wrapper:not(.disabled):hover{
            background-color: var(--button-background-hover,  hsl(222, 20%, 96%));
        }
        .wrapper:not(.disabled):focus{
            background-color: var(--button-background-focus, var(--button-backround-color, hsl(222,20%, 99%)));
            outline: var(--button-success-outline-focus, 1px solid hsla(222, 20%, 60%, 0.5));
            
        }

        .wrapper.primary{
            color: var(--button-primary, hsl(222, 95%, 98%));
            background-color: var(--button-primary-background, hsl(222, 95%, 65%));
            border: 1px solid var(--button-primary-border,  hsl(222, 95%, 45%));
            --icon-fill: var(--button-primary);
        }
        .wrapper.primary:not(.disabled):hover{
            background-color: var(--button-primary-background-hover,  hsl(222, 95%, 60%));
        }
        .wrapper.primary:not(.disabled):focus{
            background-color: var(--button-primary-background-focus,  var(--button-primary-background, hsl(222, 95%, 65%)));
            outline: var(--button-primary-outline-focus, 1px solid  hsl(222, 95%, 45%));
        }

        .wrapper.success{
            color: var(--button-success, hsl(120, 95%, 15%));
            background-color: var(--button-success-background, hsl(110, 85%, 70%));
            border: var(--button-success-border, 1px solid hsl(120, 95%, 45%));
            --icon-fill: var(--button-success);
        }
        .wrapper.success:not(.disabled):hover{
            background-color: var(--button-success-background-hover, hsl(120, 95%, 80%));
        }
        .wrapper.success:not(.disabled):focus{
            background-color: var(--button-success-background-focus, hsl(120, 95%, 70%));
            outline: var(--button-success-outline-focus, 1px solid hsl(120, 95%, 50%));
        }

        .wrapper.error{
            color: var(--button-error, hsl(1, 95%, 15%));
            background-color: var(--button-error-background, hsl(1, 95%, 80%));
            border: 1px solid var(--button-error-border, hsl(1, 95%, 55%));
            --icon-fill: var(--button-error);
        }
        .wrapper.error:not(.disabled):hover{
            background-color: var(--button-error-background-hover,  hsl(1, 95%, 75%));
        }
        .wrapper.error:not(.disabled):focus{
            background-color: var(--button-error-background-hover,  hsl(1, 95%, 80%));
            outline: var(--button-error-outline-focus, 1px solid  hsl(1, 95%, 55%));
        }

        .wrapper.switch:focus{
            outline: none;
        }
        .wrapper.switch.switch-on{
            background-color: var(--button-backround-color, hsl(222, 20%, 85%));
        }
        .wrapper.switch:not(.switch-on):not(:hover),
        .wrapper.switch:not(.switch-on):focus
        {
            background-color: transparent;
        }
        `
    ];
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
        
        this.submit();
    }
    // ==== Actions ====
    toggleSwitch(){
        this.switchOn = !this.switchOn;
        this.dispatchEvent(new CustomEvent("switchChanged", {
            detail: this.switchOn
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