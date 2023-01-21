import {createcssMap} from '@kai/utils'
import {css, html, LitElement} from 'lit'
import {property, state} from 'lit/decorators.js'

import {ResizeObserverController} from '../../../controllers/resize-observer'
import {definable} from '../../../mixins/definable'
import {focusable} from '../../../mixins/focusable'
import {formAssociated} from '../../../mixins/form-associated'
import {scrollbar} from '../../../styles/scrollbar'
import {LitTab} from '../tab'
import type {TabType} from '../types'



const {getVar} = createcssMap({
    'outline-focus': '1px dashed #999',
    'height': '32px',
    'indicator': 'hsl(264, 100%, 66%)',
}, '--lit-tab-')


export class LitTabs extends focusable(formAssociated(definable(LitElement))) {
    static get styles (){
        return  [...super.elementStyles, css`
        :host{
            display: flex;
            height: ${getVar('height')};
            padding: 0 0 4px 0;
            box-sizing: border-box;
            position: relative;
            contain: content;

            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            --borderX: 0;
            --borderWidth: 0;
        }
        :host(:focus-within){
            outline: ${getVar('outline-focus')};
            outline-offset: 2px;
        }
        :host([disabled]){
            opacity: 0.5;
        }
        .wrapper{
            display: flex;
            width: 100%;
        }
        .wrapper:focus{
            outline: none;
        }
        .active.border{
            transform: none !important; 
            transition: 250ms transform cubic-bezier(0.4, 0, 0.2, 1);
        }
        .border.not-animated{
            transition: none;
        }
        .border{
            position: absolute;
            background-color: ${getVar('indicator')};
            bottom: 0;
            left: 0;
            height: 2px;
            bottom: 0;
            width: 100px;
            transform-origin: left;
            transition: transform ease 0.3s;
            transform: translate(var(--borderX)) scaleX(var(--borderWidth));
        }

        `, scrollbar]
    }
    static define(name?: string){
        LitTab.define()
        super.define(name)
    }
    

    @property({type: String}) type: TabType = 'tab'
    @state() animateBorder = false

    private _RO = new ResizeObserverController(this)

    #tabs: LitTab[] = []
    #value = ''
    #tabSelected?: LitTab
    #timerResize = 0

    constructor(){
        super()
        this._onChangeSize = this._onChangeSize.bind(this)
    }
    set selectedIndex(value: number){
        if(value > this.#tabs.length || value < 0) return
        this.value = this.#tabs[value].value
        this.dispatchEvent(new CustomEvent('changed', {
            detail: this.value,
            bubbles: true
        }))
    }
    get selectedIndex(){
        for(let i = 0; i < this.#tabs.length; i++){
            if(this.#value === this.#tabs[i].value) return i
        }        
        return -1
    }
    get value(){
        return this.#value
    }
    set value(value: string){
        if(value === this.#value) return
        this.#value = value
        this.#updateSelected()
    }
    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(_changedProperties.has('type')){
            this.#updateType()
        }
    }


    connectedCallback(): void {
        super.connectedCallback()
        window.addEventListener('resize', this._onChangeSize)
        this.addEventListener('tabConnected', this.#tabConnected as EventListener) 
        this.addEventListener('changedTab', this.#handleSelect as EventListener)
    }
    disconnectedCallback(): void {
        super.disconnectedCallback()
        window.removeEventListener('resize', this._onChangeSize)
        this.removeEventListener('tabConnected', this.#tabConnected as EventListener)
        this.removeEventListener('changedTab', this.#handleSelect as EventListener)
    }

    disconnectTab(value: LitTab){
        const index = this.#tabs.findIndex(it => it === value)
        if(~index){
            this.#tabs.splice(index, 1)
        }        
    }

    private _onChangeSize(){
        this.animateBorder = false        
        // this.#updateTabPosition()
        clearTimeout(this.#timerResize)
        this.#timerResize = window.setTimeout(() => {
            this.animateBorder = true
        }, 300)
    }

    #updateTabPosition = () => {
        if(!this.#tabSelected){
            return
        }
        this.style.setProperty('--borderX', (this.#tabSelected.offsetLeft).toFixed(2) + 'px')
        this.style.setProperty('--borderWidth', (this.#tabSelected.clientWidth / 100).toFixed(4))
    }


    #handleSelect = (e: CustomEvent<LitTab>) => {
        this.value = e.detail.value
        this.#tabSelected = e.detail
        this.#updateTabPosition()
        this.dispatchEvent(new CustomEvent('changed', {
            detail: e.detail.value,
            bubbles: true,
        }))
    }

    /** 
     * Connect new tab to tabs list
     */
    #tabConnected = (e: CustomEvent<LitTab>) => {
        const tab = e.detail
        this.#tabs.push(tab)

        tab.type = this.type

        if(tab.selected){
            this.#value = tab.value
            this.#tabSelected = tab
        }
        else if(tab.value === this.#value){
            this.#tabSelected = tab
        }

        this.#updateSelected()
    }

    /**
     * Update "selected" property of tab
     */
    #updateSelected(){
        this.#tabs.forEach(it => {
            it.setSelection(it.value === this.#value)
        })
    }

    /**
     * Update "type" property of tab
     */
    #updateType(){
        this.#tabs.forEach(it => it.type = this.type)
    }


    /**
     * Comman tabs by keyboard
     */
    #handleKeyEvent(e: KeyboardEvent){
        if(e.key === 'ArrowLeft'){
            this.selectedIndex = this.selectedIndex - 1
        }
        else if (e.key === 'ArrowRight'){
            this.selectedIndex = this.selectedIndex + 1
        }
    }

    firstUpdated() {
        setTimeout(() => {
            this.#updateTabPosition()
            this.animateBorder = true
        })
    }
    render(){
        return html`
        <div tabindex = "0" 
            ${this._RO.observe(this._onChangeSize)}
            @keydown = "${this.#handleKeyEvent}" 
            class = "wrapper"><slot></slot></div>
        <div class = "border ${!this.animateBorder ? 'not-animated' : ''}"></div>`
    }

}
declare global {
    interface HTMLElementTagNameMap {
      'lit-tabs': LitTabs;
      'lit-tab': LitTab;
    }
}
