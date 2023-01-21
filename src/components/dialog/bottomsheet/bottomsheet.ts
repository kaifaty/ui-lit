import {touchFind} from '@kai/utils'
import {html, LitElement, nothing} from 'lit'
import {classMap} from 'lit-html/directives/class-map.js'
import {customElement, property, state} from 'lit/decorators.js'

import {backIcon,closeIcon} from '../assets/icons'
import type {DialogEvents, DialogState} from '../types'

import {styles} from './styles'

import '../../button/button.component'

const RESTORING_THRESHHOLD = 150

/**
 * @tag lit-bottomsheet
 * 
 * @cssprop --lit-bottomsheet-nav-padding - 16px 16px 0 16px
 * @cssprop --lit-bottomsheet-blocks-gap - 12px
 * @cssprop --lit-bottomsheet-border-radius - 24px 24px 0 0
 * @cssprop --lit-bottomsheet-box-shadow - 3px -6px 30px rgba(0, 0, 0, 30%)
 * @cssprop --lit-bottomsheet-background-color - #fff
 * 
 * @fires requestBackDialog - Back
 * @fires requestCloseDialog - Close
 * 
 */
@customElement('lit-bottomsheet')
export class LitBottomsheet extends LitElement{
    static styles = styles

    @property({type: Boolean, reflect: true}) attop = 0
    @property({type: Number}) index = 0
    @property({type: Object}) data?: DialogState
    @property({type: Boolean}) isClosing = false
    @property({type: String}) error = ''

    @state() isTouching = false
    @state() isRestoring = false
    @state() isFadein = true
    
    #resolve?: (value: boolean) => void
    #touchinfo = {
        id: 0,
        top: 0,
        diff: 0,
    }

    #onAnimationend(e: AnimationEvent){
        if(e.animationName === 'fadeout'){
            this.#resolve?.(true)
        }
        if(e.animationName === 'fadein'){
            this.isFadein = false
        }
        if(e.animationName === 'faderestore'){
            this.isRestoring = false
            this.style.setProperty('--translateY', 'translateY(0)')
        }
    }
    #back(){
        this.dispatchEvent(new CustomEvent<DialogEvents['requestBackDialog']>('requestBackDialog', {bubbles: true}))
    }
    #close(){
        this.dispatchEvent(new CustomEvent<DialogEvents['requestCloseDialog']>('requestCloseDialog', {bubbles: true}))
    }
    #onTouchStart(e: TouchEvent){
        const touch = e.touches[0]
        this.#touchinfo.id = touch.identifier
        this.#touchinfo.top = touch.clientY
        this.isTouching = true
    }
    #onTouchMove(e: TouchEvent){
        const touch = touchFind(this.#touchinfo.id, e.touches)
        if(touch){
            this.#touchinfo.diff = Math.max(Math.round(touch.clientY - this.#touchinfo.top), 0)
            this.style.setProperty('--translateY', `translateY(${this.#touchinfo.diff + 'px'})`)
        }
    }
    #onTouchEnd(){
        if(this.#touchinfo.diff > RESTORING_THRESHHOLD){
            return this.#back()
        }
        this.isTouching = false
        this.isRestoring = true
        this.#touchinfo = {
            id: 0,
            top: 0,
            diff: 0,
        }
    }

    close(): Promise<boolean>{
        this.isClosing = true
        return new Promise(r => {
            this.#resolve = r
        })
    }
    willUpdate() {
        this.style.setProperty('--index', this.index.toString())
    }
    #footerTemplate(){
        if(!this.data?.footer && !this.error){
            return nothing
        }
        return html`<footer>
            ${this.error ? html`<lit-text center class = "error" status="error">${this.error}</lit-text>` : nothing}
            ${this.data?.footer}
        </footer>`
    }
    render() {
        const classData = {
            wrapper: true,
            closing: this.isClosing,
            touching: this.isTouching,
            restoring: this.isRestoring,
            fadein: this.isFadein,
        }
        return html`
        <div class = "${classMap(classData)} " 
            @animationend = "${this.#onAnimationend}"
            @touchstart = "${this.#onTouchStart}"
            @touchmove = "${this.#onTouchMove}"
            @touchend = "${this.#onTouchEnd}">
            <nav>
                <div @click = "${this.#back}">${backIcon}</div>
                <div @click = "${this.#close}">${closeIcon}</div>
            </nav>
            <header>${this.data?.header}</header>
            <main>${this.data?.body}</main>
            ${this.#footerTemplate()}
        </div>
        `
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-bottomsheet': LitBottomsheet;
    }
}