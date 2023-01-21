
import {css, html, LitElement} from 'lit'

import {definable, stylable} from '../../mixins'
import {PREFIX} from '../select/styles.map'

import {SidebarCSSMap} from './styles.map'


export class LitSidebar extends stylable(definable(LitElement), SidebarCSSMap, PREFIX){

    static styles = css`
    :host{
        --position: -270px;
        display: block;
        position: fixed;
        width: 270px;
        top: 0;
        height: var(--viewport-height, 100vh);
        transform: translateX(var(--position)); 
        background: ${LitSidebar.cssVar('background')};
        color: ${LitSidebar.cssVar('color')};
        z-index: 100;
        box-sizing: border-box;
        left: 0;
        padding: 5px;
        will-change: transform;
        transition: transform 0.4s linear;
    }
    :host([opened]){
        transition: transform 0.4s linear;
        box-shadow: 3px 0 8px rgba(0, 0, 0, 0.5);
    }
    :host([moving]){
        transition: none !important;
    }
    #arrow{
        position: absolute;
        top: 5px;
        right: 5px;        
    }
    `
    static get properties(){
        return {
            opened: {type: Boolean}
        }
    }
    private _opened = false
    get opened(){
        return this._opened
    }
    set opened(value: boolean){    
        this._opened = value
        if(value){
            this.setAttribute('opened', '')
            this._setPosition(0)
            this._trackTouch()
        }
        else{
            this.removeAttribute('opened')
            this._setPosition(-270)
            this._unTrackTouch()
        }
    }
    private _touchX = 0
    private _positionBeforeMove = 0
    private _position = -270
    private _touchID = 0

    protected render(){
        return html`
        <div id = "arrow" >
            <slot name = "arrow">
                <lit-icon 
                    @click = "${this._hide}"
                    icon = "back"></lit-icon>
            </slot>
        </div>
        <slot></slot>`
    }

    private _touchStart = (e: TouchEvent) => {
        const touch = e.changedTouches[0]
        this._touchID = touch.identifier;
        ( document.activeElement as HTMLElement)?.blur?.()
        this._down(touch.clientX)
    }
    private _touchMove = (e: TouchEvent) => {
        const touch = [...e.changedTouches].filter(it => this._touchID === it.identifier)[0]
        this._move(touch.clientX)
    }
    private _touchEnd = () => {
        this._end()
    }

    private _mouseDown = (e: MouseEvent) => {
        this._down(e.clientX)
    }

    private _mouseMove = (e: MouseEvent) => {
        this._move(e.clientX)
    }

    private _mouseUp = (e: MouseEvent) => {
        this._end()
    }


    private _requestAnimation = () => {
        this.style.setProperty('--position', `${this._position}px`)
    }

    private _setPosition(position: number){
        if(position === this._position) return
        this._position = position
        requestAnimationFrame(this._requestAnimation)
    }

    private _down = (x: number) => {
        this.setAttribute('moving', '')
        this._touchX = x
        this._positionBeforeMove = this._position
    }

    private _move = (x: number) => {
        if(!this.hasAttribute('moving')) return
        const diff = (x - this._touchX)
        this._setPosition(
            Math.max(
                Math.min(
                    this._positionBeforeMove + diff, 
                    0
                ), 
                -270
            )
        )
    }

    private _end = () => {   
        this.removeAttribute('moving')
        this.opened = this._position > -100
        this._dispatch()
    }


    private _trackTouch = () => {
        document.addEventListener('touchstart', this._touchStart)
        document.addEventListener('touchmove', this._touchMove)
        document.addEventListener('touchend', this._touchEnd)
        document.addEventListener('mousedown', this._mouseDown)
        document.addEventListener('mouseup', this._mouseUp)
        document.addEventListener('mousemove', this._mouseMove)
    }
    
    private _unTrackTouch = () => {
        document.removeEventListener('touchstart', this._touchStart)
        document.removeEventListener('touchmove', this._touchMove)
        document.removeEventListener('touchend', this._touchEnd)
        document.removeEventListener('mousedown', this._mouseDown)
        document.removeEventListener('mouseup', this._mouseUp)
        document.removeEventListener('mousemove', this._mouseMove)
    }

    private _hide(){
        this.opened = false
        this._dispatch()
    }
    private _dispatch(){
        this.dispatchEvent(new CustomEvent('openChanged', {
            bubbles: true,
            composed: true,
            detail: this.opened
        }))
    }
}