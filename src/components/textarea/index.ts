import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {styleMap} from 'lit/directives/style-map.js'

import {focusable} from '../../mixins/focusable/index'
import {formAssociated} from '../../mixins/form-associated/index'
import {FormAssociatedElement} from '../../mixins/form-associated/types'
import {labled} from '../../mixins/labled'
import {notificatable} from '../../mixins/notificatable/index'
import {input} from '../../styles/input'

export interface ITextareaProps extends FormAssociatedElement{
    placeholder?: string 
}
type TResize = 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
@customElement('lit-textarea')
export class LitTextarea extends focusable(labled(notificatable(formAssociated(LitElement)))){
    static get styles (){
        return [
            ...super.elementStyles,
            input, 
            css`
            :host{  
                display: inline-block;
            }
            textarea{
                width: 100%;
                display: inline-block;
                margin: 0;
                resize: var(--lit-textarea-resize, none);
            }
            `] as any
    };
    static get properties(){
        return {
            value: {type: String},
        }
    }
    @property({type: String}) placeholder = ''
    @property({type: String}) resize: TResize = 'none'

    _value = ''
    get value(){
        return this._value
    }
    set value(data: string){
        const oldValue = this._value
        this._value = data
        this.requestUpdate('value', oldValue)
    }
    
    render(){
        const style = {resize: this.resize}
        return html`<textarea 
                        .disabled = "${this.disabled}"
                        style = "${styleMap(style)}"
                        placeholder="${this.placeholder}" 
                        @input = "${this._onInput}">${this.value}</textarea>`
    }
    private _onInput(e: Event){
        this.value = (e.target as HTMLTextAreaElement).value
        this.dispatchEvent(new CustomEvent('changed', {
            detail: this.value,
            bubbles: true
        }))
    }
}


declare global {
    interface HTMLElementTagNameMap {
      'lit-textarea': LitTextarea;
    }
}