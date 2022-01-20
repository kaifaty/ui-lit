import { customElement, property } from 'lit/decorators.js';
import { formAssociated } from '../mixins/form-associated/index';
import { LitElement, html, css } from 'lit';
import { noselect } from '../styles/noselect';
import { labled } from '../mixins/labled';
import { checkboxStyles } from './styles';


/**
 * 
 * @cssprop --lit-checkbox-background Background of checkbox
 * @cssprop --lit-checkbox-border Border of checkbox
 * 
 * @cssprop --lit-switcher-shadow Inset shadow of switcher
 * @cssprop --lit-switcher-control-background Switcher control background
 * @cssprop --lit-switcher-control-shadow Switcher control shadow
 * @cssprop --lit-switcher-off-background Switcher control background
 * 
 */

export interface ICheckboxProps{
    checked: boolean
    readonly: boolean
    value: TCkeckboxValue
    type: TCheckboxType
}

export type TCkeckboxValue = 'on' | 'off';
export type TCheckboxType = "switcher" | "checkbox";

@customElement("lit-checkbox")
export class LitCheckbox extends labled(formAssociated(LitElement)) implements ICheckboxProps{
    static styles = [
        noselect,
        checkboxStyles
    ];

    @property({type: String, reflect: true}) type: TCheckboxType = "switcher";
    static get properties(){        
        return {
            ...super.properties,
            value: {type: String},
            name: {type: String},
            checked: {type: Boolean},
        }
    }
    private _checked: boolean = false;
    get checked(){
        return this._checked;
    }
    set checked(value: boolean){
        this.value = value ? 'on' : 'off';
    }

    private _value: TCkeckboxValue = 'off';
    get value(){
        return this._value;
    }
    set value(value: TCkeckboxValue){
        const oldValue = this._value;
        if(oldValue === value) return;
        this._value = value;
        this._checked = value === 'on';
        this.setAttribute('value', value);
        this.requestUpdate('value', oldValue);
    }
    
    reportValidity(){
        return true;
    }
    render(){
        return html`
        <div 
            role = "checkbox" 
            aria-checked = "${this.checked}"
            aria-label = "${(this.labels[0]?.textContent || '').trim()}"
            class = "noselect"
            id = "content" 
            @click = "${this._click}"><span class = "control"></span></div>`;
    }
    private _click(e: Event){
        e.stopPropagation();
        this.toggle();
    }
    public toggle(){
        if(this.readonly || this.disabled) return;
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
