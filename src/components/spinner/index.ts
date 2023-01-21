import {html, LitElement} from 'lit'
import {property} from 'lit/decorators.js'

import {definable} from '../../mixins/definable'

import {PREFIX, spinnerStyles} from './styles'


export interface ISipnnerProps {
    fullscreen: boolean
    fullContent: boolean
    small: boolean
    big: boolean
}

export class LitSpinner extends definable(LitElement){
    static styles = spinnerStyles
    @property({type: Boolean, attribute: true, reflect: true}) big = false
    @property({type: Boolean, attribute: true, reflect: true}) small = false
    @property({type: Boolean, attribute: true, reflect: true}) fullContent = false
    @property({type: Boolean, attribute: true, reflect: true}) fullscreen = false

    @property({type: String,  attribute: true, reflect: true}) type: 'bounce' | 'ring' | 'spinner' = 'bounce'
    render(){
        if(this.type === 'spinner'){
            return html`<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
        }
        if(this.type === 'ring'){
            return html`<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`
        }
        return html`
            <div class = "pulsor">
                <div class="bounce bounce1"></div>
                <div class="bounce bounce2"></div>
            </div>
        `
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-spinner': LitSpinner;
    }
}