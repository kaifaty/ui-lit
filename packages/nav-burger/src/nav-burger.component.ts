import {touchFind} from '@kai/utils'
import {css, html, LitElement} from 'lit'
import {state} from 'lit/decorators.js'
import {classMap} from 'lit/directives/class-map.js'

import {stylable} from '../../mixins'
import {definable} from '../../mixins/definable'

import {navBurgerCSSMap, PREFIX} from './styles.map'


const RESTORING_THRESHHOLD = -100


export class LitNavBurger extends stylable(definable(LitElement), navBurgerCSSMap, PREFIX){

    /** @ignore */
    static styles = css`
    :host{
        display: contents;
        --translateX: translateX(0);
    }
    #burger{
        cursor: pointer;
        display: grid;
        gap: 8px;
        position: absolute;
        right: 0;
        top: 0;
        padding: 10px;
        width: 35px;
        background: none;
        outline: none;
        border: none;
        box-sizing: content-box;
        contain: content;
    }
    #burger .line{
        height: 4px;
        background: ${LitNavBurger.cssVar('line-background')};
        transition: ease .3s;
    }
    #burger.opened:not(.closing) .first{
        transform-origin: top left;
        transform: translateX(10px) rotate(45deg);
    }
    #burger.opened:not(.closing) .third{
        transform-origin: bottom left;
        transform: translateX(10px) rotate(-45deg);
    }
    #burger.opened:not(.closing) .second{
        opacity: 0;
    }
    nav{
        position: fixed;
        top: 0;
        left: 0;    
        width: 250px;
        height: 100%;
        background: ${LitNavBurger.cssVar('background')};
        box-shadow: ${LitNavBurger.cssVar('box-shadow')};
        transform: translate(-100%);
        contain: content;
    }
    nav.opened{
        transform: translate(0);
    }
    nav.opened.fadein{
        animation-name: fadein;
        animation-timing-function: ease;
        animation-duration: 0.3s;
    }
    nav.opened.closing{
        animation-name: fadeout;
        animation-timing-function: ease;
        animation-duration: 0.3s;
    }
    nav.opened.touching{
        transform: var(--translateX);
    }
    nav.opened.restoring{
        animation-name: restore;
        animation-timing-function: ease;
        animation-duration: 0.3s;
    }
    @keyframes fadeout{
        0%{
            transform: var(--translateX);
        }
        100%{
            transform: translateX(-100%);
        }
    }
    @keyframes fadein{
        0%{
            transform: translateX(-100%);
        }
        100%{
            transform: var(--translateX);
        }
    }
    @keyframes restore{
        0%{
            transform: var(--translateX);
        }
        100%{
            transform: translateX(0);
        }
    }
    `
    @state() opened = false
    @state() isClosing = false
    @state() isTouching = false
    @state() isRestoring = false
    @state() isFadein = true


    open(){
        this.opened = true
    }
    close(){
        this.isTouching = false
        this.#touchinfo = {
            id: 0,
            left: 0,
            diff: 0,
        }
        if(this.opened){
            this.isClosing = true
        }
    }
    toggle(){
        if(this.opened){
            this.close()
        }
        else{
            this.open()
        }
    }

    /** @ignore */
    #touchinfo = {
        id: 0,
        diff: 0,
        left: 0,
    }
    
    /** @ignore */
    #onAnimationEnd(e: AnimationEvent){
        if(e.animationName === 'fadein'){
            this.isFadein = false
            this.style.setProperty('--translateX', 'translateX(0)')
        }
        if(e.animationName === 'restore'){
            this.isRestoring = false
            this.style.setProperty('--translateX', 'translateX(0)')
        }
        if(e.animationName === 'fadeout'){
            this.opened = false
            this.isClosing = false
            this.isFadein = true
            this.style.setProperty('--translateX', 'translateX(0)')
        }
    }

    /** @ignore */
    #onTouchstart(e: TouchEvent){
        const touch = e.touches[0]
        this.#touchinfo.id = touch.identifier
        this.#touchinfo.left = touch.clientX
    }

    /** @ignore */
    #ontouchmove(e: TouchEvent){
        
        this.isTouching = true
        const touch = touchFind(this.#touchinfo.id, e.touches)
        if(touch){
            this.#touchinfo.diff = Math.min(touch.clientX - this.#touchinfo.left, 0)
            this.style.setProperty('--translateX', `translateX(${this.#touchinfo.diff + 'px'})`)
        }
    }

    /** @ignore */
    #ontouchend(){
        if(!this.isTouching){
            return
        }
        if(this.#touchinfo.diff < RESTORING_THRESHHOLD){
            this.isClosing = true
        }
        else{
            this.isRestoring = true
        }
        this.isTouching = false
        this.#touchinfo = {
            id: 0,
            left: 0,
            diff: 0,
        }
    }

    /** @ignore */
    #windowTouchstart = (e: TouchEvent) => {
        const nav = this.shadowRoot?.querySelector('nav')
        if(!nav || this.isFadein){
            return
        }
        if(!e.composedPath().find(node => nav === node)){
            this.close()
        }
    }

    /** @ignore */
    connectedCallback() {
        super.connectedCallback()
        window.addEventListener('touchstart', this.#windowTouchstart)
    }

    /** @ignore */
    disconnectedCallback() {
        super.disconnectedCallback()
        window.removeEventListener('touchstart', this.#windowTouchstart)
    }

    protected render(): unknown {
        const map = {
            'opened': this.opened,
            'closing': this.isClosing,
            'touching': this.isTouching,
            'restoring': this.isRestoring,
            'fadein': this.isFadein,
        }
        return html`
        <button id = "burger" @click = "${this.toggle}" class = "${classMap(map)}">
            <div class = "line first"></div>
            <div class = "line second"></div>
            <div class = "line third"></div>
        </button>
        <nav class = "${classMap(map)}" 
            @touchstart ="${this.#onTouchstart}"
            @touchmove = "${this.#ontouchmove}"
            @touchend = "${this.#ontouchend}"
            @animationend = "${this.#onAnimationEnd}">
            <slot></slot>
        </nav>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-nav-burger': LitNavBurger;
    }
    
}
