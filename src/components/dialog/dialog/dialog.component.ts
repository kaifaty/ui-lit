import {createcssMap, isTouchExist, KeyDownController} from '@kai/utils'
import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators/custom-element.js'
import {property} from 'lit/decorators/property.js'
import {state} from 'lit/decorators/state.js'
import {classMap} from 'lit/directives/class-map.js'

import type {LitButton} from '../../button/button.component'
import type {LitBottomsheet} from '../bottomsheet'
import type {LitModal} from '../modal'
import type {DialogState, DialogType} from '../types'

import {changeInert, setScrollbarPadding} from './utils'
import '../modal'
import '../bottomsheet'
import '../../form'


type DialogTypes = 'lit-modal' | 'lit-bottomsheet'

const PREFIX = '--lit-dialog-'

const {getVar} = createcssMap({
    'overlap-z-index': 99999,
    'overlap-background': 'rgb(0, 0, 0, 0.5)',
}, PREFIX)

/**
 * @tag lit-dialog
 * 
 * @attr {'modal' | 'bottomsheet' | 'smart'} [type=smart] - Type of dialog
 * 
 * @cssprop --lit-dialog-overlap-z-index - Z-index of overlap
 * @cssprop --lit-dialog-overlap-background - Background color
 * 
 */

@customElement('lit-dialog')
export class LitDialog extends LitElement{
    static styles = css`
    :host{
        word-wrap: break-word;
        visibility: hidden;
        isolation: isolate;
        position: fixed;
        top: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        z-index: ${getVar('overlap-z-index')};
    }
    :host([visible]){
        visibility: visible;
    }
    .overlap{
        position: absolute;
        margin: 0;
        top: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        background-color: ${getVar('overlap-background')};
    }
    .content{
        z-index: 2;
    }
    
    .overlap.visible{
        animation-duration: 0.3s;
        animation-name: fadein;
        animation-timing-function: ease-in;   
    }
    .overlap.visible.closing{
        animation-duration: 0.3s;
        animation-name: fadeout;
        animation-timing-function: ease;   
        animation-fill-mode: forwards;
    }
    @keyframes fadein{
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fadeout{
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }`


    @state() isClosing = false

    /**
     * Dialog is singleton in app
     */
    connectedCallback(): void {
        if(document.querySelectorAll('lit-dialog').length > 1){
            this.remove()
            return
        }
        super.connectedCallback()
    }

    #onKeyDown = (e: KeyboardEvent) => {
        if(e.key === 'Escape'){
            this.back()
        }
    }
    #keydown = new KeyDownController(this, this.#onKeyDown)
    
    get hasDialogs(){
        return !!this.#stack.length
    }

    #stack: Array<LitBottomsheet | LitModal> = []
    #prevVisabile = false
    #lastElementName?: DialogTypes

    #resolver?: (data: unknown) => void

    @property({type: String, reflect: true, attribute: true})
    type: DialogType = 'smart'

    get hasOpenedDialogs(){
        return Boolean(this.#stack.length)
    }
    
    willUpdate(){
        if(this.#prevVisabile !== this.hasDialogs){
            if(this.hasDialogs){
                this.setAttribute('visible', '')
            }
            else{
                this.removeAttribute('visible')
            }
            changeInert(this.hasDialogs)
            setScrollbarPadding(this.hasDialogs)
        }
        this.#stack.forEach((el, i) => {
            el.attop = i === this.#stack.length - 1
        })
    }
    updated(){
        this.#prevVisabile = this.hasDialogs
        if(!this.#stack.length){
            this.isClosing = false
        }
    }
    close(){
        this.isClosing = true
        this.#stack.forEach(item => item.isClosing = true)
        this.back()?.then(() => {
            this.#stack = []
            this.requestUpdate()
        })
    }
    back(){
        if(this.#stack.length < 2){
            this.isClosing = true
        }
        const last = this.#stack.at(-1)
        return last?.close().then(() => {
            this.#stack.pop()
            this.requestUpdate()
        })                
    }
    #getElementName(): DialogTypes{
        if(this.type === 'modal'){
            return 'lit-modal'
        }
        if(this.type === 'bottomsheet'){
            return 'lit-bottomsheet'
        }
        if(this.#lastElementName){
            return this.#lastElementName
        }
        if(window.innerWidth <= 600 && isTouchExist()){
            return 'lit-bottomsheet'
        }
        return 'lit-modal'
    }
    #onanimationend(e: AnimationEvent){
        if(e.animationName === 'fadeout'){
            this.#lastElementName = undefined
        }
    }
    open(data: DialogState){
        const elementName = this.#getElementName()
        const element = document.createElement(elementName)

        element.data = data
        element.index = this.#stack.length

        this.#lastElementName = elementName
        this.#stack.push(element)
        this.requestUpdate()

        return new Promise((r) => {
            this.#resolver = r
        })
    }

    async #onSubmit(e: CustomEvent<{data: Record<string, unknown>}>){
        const component = this.#stack.at(-1)
        const action = component?.data?.action

        if(action){
            const submitBtn = component.shadowRoot?.querySelector<LitButton>('lit-button[type=submit]')
            try{

                if(submitBtn){
                    submitBtn.loading = true
                    submitBtn.disabled = true
                }
                const result = await action(e.detail.data)
                this.#resolver?.(result)
                if(result){
                    this.back()
                }
            }
            catch(_e){
                const e = _e as Error
                component.error = e.message
                
            }
            finally{
                if(submitBtn){
                    submitBtn.loading = false
                    submitBtn.disabled = false
                }
            }
        }
        else{
            this.#resolver?.(e.detail.data)
        }
    }

    render(){
        const classmap = {
            closing: this.isClosing,
            visible: this.hasDialogs,
        }
        return html`
        <div @animationend = "${this.#onanimationend}" 
            class = "${classMap({...classmap, overlap: true})}"></div>
        <lit-form 
            @submit = "${this.#onSubmit}"
            @buttonClose = "${this.back}"
            @requestBackDialog = "${this.back}"
            @requestCloseDialog = "${this.close}"
            class = "${classMap({...classmap, content: true})}">
            ${this.#stack}
        </lit-form>`
    }

}

declare global {
    interface HTMLElementTagNameMap {
      'lit-dialog': LitDialog;
    }
}