
import {html, LitElement, nothing} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'

import {scrollbar} from '../../../styles'
import {backIcon, closeIcon} from '../assets/icons'
import type {DialogEvents, DialogState} from '../types'


import {styles} from './styles'
import '../../text'

/**
 * @tag lit-modal
 * 
 * @cssprop --lit-modal-header-color #fefefe
 * @cssprop --lit-modal-header-background #111
 * @cssprop --lit-modal-header-font-size 16px
 * @cssprop --lit-modal-header-padding 10px 20px
 * 
 * @cssprop --lit-modal-main-padding 10px 20px
 * @cssprop --lit-modal-footer-padding 10px 20px
 * 
 * @cssprop --lit-modal-background #fff
 * @cssprop --lit-modal-min-height 200px
 * @cssprop --lit-modal-max-height 100%
 * @cssprop --lit-modal-height min-content
 * 
 * @cssprop --lit-modal-min-width 280px
 * @cssprop --lit-modal-max-width min(600px, 90%)
 * @cssprop --lit-modal-width 100%
 * 
 * @cssprop --lit-modal-border-radius 5px
 * @cssprop --lit-modal-box-shadow 1px 1px 8px rgba(0,0,0,0.7)
 * @cssprop --lit-modal-icon-color #888
 * 
 * @fires requestBackDialog - Back
 * @fires requestCloseDialog - Close
 * 
 */


@customElement('lit-modal')
export class LitModal extends LitElement{
    static get styles() {
        return [styles, scrollbar]
    }
    @property({type: Object}) data?: DialogState
    @property({type: Number}) index = 0
    @property({type: String}) error = ''
    @property({type: Boolean, reflect: true}) attop = true
    @state() isClosing = false
    
    #resolve?: (value: boolean) => void

    #backIcon(){
        if(this.index < 1){
            return nothing
        }
        return html`<div 
            class = "back" 
            role='button' 
            aria-label='back' 
            @click = "${this.#onBack}">${backIcon}</div>`
    }
    #closeIcon(){
        return html`<div 
            class = "close" 
            role='button' 
            aria-label='close' 
            @click = "${this.#onClose}"
        >${closeIcon}</div>`
    }
    #onBack(){
        this.dispatchEvent(new CustomEvent<DialogEvents['requestBackDialog']>('requestBackDialog', {bubbles: true}))
    }
    #onClose(){
        this.dispatchEvent(new CustomEvent<DialogEvents['requestCloseDialog']>('requestCloseDialog', {bubbles: true}))
    }
    #onAnimationend(){
        this.#resolve?.(true)
    }
    close(){
        this.isClosing = true
        return new Promise(r => {
            this.#resolve = r
        })
    }
    protected render() {
        if(!this.data) return nothing
        return html`
        <div class = "wrapper ${this.isClosing ? 'closing' : ''}" @animationend = "${this.#onAnimationend}">
            <div class = "content">
                <header .hidden = "${!(this.data.header)}">${this.data.header}</header>
                <main class = "ff-scrollbar">${this.data.body}</main>
                <footer>
                    <lit-text class = "error" center status="error">${this.error}</lit-text>
                    <div class = "footer-content">
                    ${this.data.footer}
                    </div>
                </footer>
            </div>
            <div class = "icons-wrapper">${this.#backIcon()}${this.#closeIcon()}</div>
        </div>
        `
    }
}


declare global {
    interface HTMLElementTagNameMap {
      'lit-modal': LitModal;
    }
}