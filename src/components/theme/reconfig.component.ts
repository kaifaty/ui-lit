import {firstUpper} from '@kai/utils'
import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import {HCL, PalleteName} from './types'


@customElement('lit-theme-configer')
export class LitThemeConfiger extends LitElement{
    static styles = css`
    :host{
        display: block;
    }
    .wrapper lit-header{
        margin: 0;
    }
    .wrapper{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        align-items: center;
    }
    `
    @property({type: String}) name: PalleteName = 'primary'
    @property({type: Array}) params: HCL = [330, 75, 75]

    protected render() {
        return html`
        <lit-header level = "4"><slot name = "name">${firstUpper(this.name)}</slot></lit-header>
        <slot></slot>
        <div class = "wrapper">
            <lit-header level = "5"><slot name = "hue">Hue:</slot></lit-header>
            <lit-range 
                @changed = "${this._changeH}" 
                min = "0" 
                max = "360" 
                value = "${this.params[0]}"></lit-range>
            <lit-header level = "5"><slot name = "chroma">Chroma:</slot></lit-header>
            <lit-range
                @changed = "${this._changeS}" 
                min = "0" 
                max = "100" 
                value = "${this.params[1]}"></lit-range>
            <lit-header level = "5"><slot name = "luminance">Luminance:</slot></lit-header>
            <lit-range
                @changed = "${this._changeL}" 
                min = "0" 
                max = "100" 
                value = "${this.params[2]}"></lit-range>
        </div>`
    }
    private _changeH(e: CustomEvent){
        this.params = [e.detail.valueAsNumber, this.params[1], this.params[2]]
        this._dispatch()
    }
    private _changeS(e: CustomEvent){
        this.params = [this.params[0], e.detail.valueAsNumber, this.params[2]]
        this._dispatch()
    }
    private _changeL(e: CustomEvent){
        this.params = [this.params[0], this.params[1], e.detail.valueAsNumber]
        this._dispatch()
    }
    private _dispatch(){
        this.dispatchEvent(new CustomEvent('changedPallete', {
            detail: {
                name: this.name,
                params: this.params
            },
            composed: true,
            bubbles: true
        }))
    }
}