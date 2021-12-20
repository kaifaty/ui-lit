import { customElement, property } from 'lit/decorators';
import { formAssociated } from '../form-associated/index';
import { LitElement, html, css } from 'lit';
import { input } from '../styles/input';



export interface ICheckboxProps{
    checked: boolean
    readonly: boolean
    value: TCkeckboxValue
    type: TCheckboxType
}

export type TCkeckboxValue = 'on' | 'off';
export type TCheckboxType = "switcher" | "checkbox";

@customElement("lit-checkbox")
export class LitCheckbox extends formAssociated(LitElement) implements ICheckboxProps{
    static styles = [
        input,
        css`
        :host{
            --switcher-width: 32px;
            --switcher-height: 14px;
            --control-size: 14px;
            --offset: calc((var(--switcher-height) - var(--control-size) - 2px ) / 2);

            --checkmark-border: 2px;
            --checkmark-width: 5px;
            --checkmark-height: 8px;
            --checkmark-left: calc(var(--control-size) - var(--checkmark-width) - var(--checkmark-border) - 3px);
            --checkmark-top: calc(var(--control-size) - var(--checkmark-height) - var(--checkmark-border) - 4px);

        }
        .checkbox{
            width: var(--control-size);
            height: var(--control-size);
            border: 1px solid var(--checkbox-border, #999);
            position: relative;
            cursor: pointer;
            background-color: var(--lit-checkbox-background, white);
            
        }
        .checkbox:hover{
            box-shadow: 0 0 2px var(--lit-checkbox-border, #999);
        }
        .checkbox.on:after{
            content:'';
            position: absolute;
            top: var(--checkmark-top);
            left: var(--checkmark-left);
                    
            transform-origin: center;
            transform:  rotate(45deg) skewX(15deg) ;
            height: var(--checkmark-height);
            width: var(--checkmark-width);
            border-bottom: var(--checkmark-border) solid var(--checkmark-color, hsl(100, 65%, 5%));
            border-right: var(--checkmark-border) solid var(--checkmark-color, hsl(100, 65%, 5%));
        }
        .switcher{
            cursor: pointer;
            position: relative;
            width: var(--switcher-width);
            height: var(--switcher-height);
            border-radius: 16px;
            transition: background-color ease 0.2s;
            box-shadow: inset 1px 1px 2px var(--lit-checkbox-switcher-shadow, rgba(0,0,0,0.7));
        }
        .switcher .control{
            position: absolute;
            background-color: var(--lit-checkbox-switcher-control-background,#fff);
            border: 1px solid var(--lit-checkbox-switcher-control-border, #ccc); ;
            border-radius: var(--lit-checkbox-control-size, 16px);
            width: var(--control-size);
            height: var(--control-size);
            top: var(--offset);
            left: var(--offset);
            box-shadow: 1px 1px 2px var(--lit-checkbox-switcher-control-shadow, rgba(0,0,0,0.6));
            transition: transform ease 0.2s;
        }
        .switcher.on {
            background-color: var(--lit-switcher-on-background, hsl(110, 65%, 50%));
        }
        .switcher.off {
            background-color: var(--lit-switcher-off-background, hsl(0, 65%, 55%));
        }
        .switcher.on .control{
            transform: translateX(calc(var(--switcher-width) - var(--control-size) + 1px));
        }
        .readonly{
            opacity: 0.5;
        }
        `
    ];

    @property({type: String, reflect: true}) type: TCheckboxType = "switcher";
    static get properties(){        
        return {
            ...super.properties,
            value: {type: String},
            checked: {type: Boolean},
        }
    }
    _checked: boolean = false;
    get checked(){
        return this._checked;
    }
    set checked(value: boolean){
        this.value = value ? 'on' : 'off';
    }

    _value: TCkeckboxValue = 'off';
    get value(){
        return this._value;
    }
    set value(value: TCkeckboxValue){
        const oldValue = this._value;
        this._value = value;
        this._checked = value === 'on';
        this.requestUpdate('value', oldValue);
    }
    public connectedCallback(): void {
        super.connectedCallback();
        this.findLabel()?.appendConnectedField(this);
    }
    public disconnectedCallback(){
        super.disconnectedCallback();
        this.findLabel()?.removeConnectedField(this);
    }
    private _switcherTemplate(){
        return html`<div 
            @click = "${this._handleClick}" 
            class = "switcher ${this.readonly ? 'readonly' : ''} ${this.value}"><span class = "control"></span></div>`;
    }
    private _checkboxTemplate(){
        return html`<div 
            @click = "${this._handleClick}" 
            class = "checkbox ${this.readonly ? 'readonly' : ''} ${this.value}">
    </div>`;
    }
    render(){
        if(this.type === 'switcher'){
            return this._switcherTemplate();
        }
        return this._checkboxTemplate();
    }
    private _handleClick(){
        if(this.readonly) return;
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent("changed", {
            bubbles: true,
            detail: {
                value: this.value,
                checked: this.checked
            }
        }))
    }
    public toggle(){
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent("changed", {
            bubbles: true,
            detail: {
                value: this.value,
                checked: this.checked
            }
        }))
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-checkbox': LitCheckbox;
    }
}
