import {createcssMap} from '@kai/utils'
import {css, html, LitElement} from 'lit'
import {property} from 'lit/decorators.js'


import {definable, focusable} from '../../../mixins'
import {LitButton} from '../../button'
import type {LitTabs} from '../tabs'
import type {TabType} from '../types'



const {getVar} = createcssMap({
    'ripple': 'transparent',
    'background-hover': 'transparent',
    'background': 'transparent',
    'color-default': '#666',
    'color': 'hsl(264, 100%, 66%)',
}, '--lit-tab-')



export class LitTab extends focusable(definable(LitElement)){
    static define(name?: string){
        LitButton.define()
        super.define(name)
    }
    static styles = css`
    :host{
        display: inline-block;
    }
    :host(:not([selected])){
        ${LitButton.cssKey('color')}: ${getVar('color-default')};
    }
    :host([tab]){
        border: none;
    }
    lit-button{
        display: block;
        contain: content;
        ${LitButton.cssKey('background')}: ${getVar('background')};
        ${LitButton.cssKey('border-radius')}: 0;
        ${LitButton.cssKey('background-hover')}: ${getVar('background-hover')};
        ${LitButton.cssKey('ripple')}: ${getVar('ripple')};
        ${LitButton.cssKey('color')}: ${getVar('color')};
        height: 100%;
    }`

    @property({type: String, attribute: true, reflect: true}) value = ''
    @property({type: Boolean, attribute: true, reflect: true}) selected = false
    @property({type: String, attribute: true, reflect: true}) type: TabType = 'button'
    
    #tabsHost: LitTabs | null = null

    setTabsHost(value: LitTabs){
        this.#tabsHost = value
    }
    connectedCallback(){
        super.connectedCallback()
        this.dispatchEvent(new CustomEvent<LitTab>('tabConnected', {
            detail: this,
            bubbles: true
        }))
    }

    disconnectedCallback(){
        super.disconnectedCallback()
        this.#tabsHost?.disconnectTab(this)
    }
    setSelection(value: boolean){
        this.selected = value
    }
    #selectNotify(e: Event){
        e.preventDefault()
        this.dispatchEvent(new CustomEvent<LitTab>('changedTab', {
            detail: this,
            bubbles: true
        }))
    }
    #prevent(e: Event){
        e.preventDefault()
    }

    render(){
        return html`
        <lit-button 
            .tabindex = "${-1}"
            @mousedown = "${this.#prevent}" 
            @click = "${this.#selectNotify}" 
            ?borderless = "${this.type === 'tab'}">
            <slot></slot>
        </lit-button>`
    }
    /*
    private _handlekeyDown = (e: KeyboardEvent) => {
        if(e.key === "ArrowRight"){
            (this.nextElementSibling as LitTab | null)?.focus?.()
        }
        if(e.key === "ArrowLeft"){
            (this.previousElementSibling as LitTab | null)?.focus?.()
        }
        if(e.key === "Enter" || e.key === " "){
            this._selectNotify();
        }
    }*/
}