import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import type {ILabled} from '../../mixins/labled'
import type {LitCheckbox} from '../checkbox/index'



@customElement('lit-label')
export class LitLabel extends LitElement{
    static styles = css`
    :host{
        display: inline-flex;
        align-items: center;
        color: var(--lit-label-color, inherit);
    }
    :host([disabled]){
        opacity: 0.5;
    }
    `
    @property({type: String}) for = ''
    private _labled: ILabled | null = null

    connectedCallback(){
        super.connectedCallback()
        this.addEventListener('click', this._handleClick)
        this.addEventListener('labledConnected', this._onLabledConnected as EventListener)
    }

    disconnectedCallback(){
        super.disconnectedCallback()        
        this._disconnectLabels()
        this.removeEventListener('click', this._handleClick)
        this.removeEventListener('labledConnected', this._onLabledConnected as EventListener)
    }

    firstUpdated(){
        this._connectByFor()
    }

    render(){
        return html`<slot></slot>`
    }

    get labled(){
        return this._labled
    }
    
    protected setLabled(labeled: ILabled){
        
        if(this._labled === labeled) return
        if(this._labled){
            console.warn(this, 'already has labled', this._labled)
            this._disconnectLabels()
        }
        this._labled = labeled
        this._labled.addLabel(this)
    }
    
    private _disconnectLabels(){
        this._labled?.removeLabel(this)
        this._labled = null
    }
    private _connectByFor(){
        if(this.for){
            const node = this.parentElement?.querySelector(`#${this.for}`) as ILabled | null
            if(node?.addLabel){
                this.setLabled(node)
            }
        }
    }

    //  === Events === 
    private _onLabledConnected = (e: CustomEvent) => {
        this.setLabled(e.detail)
    }

    private _handleClick = (e: Event) => {
        if(!this._labled) return
        this._labled?.focus()
        if((this._labled as LitCheckbox).checked !== undefined){
            (this._labled as LitCheckbox).toggle()
        }
        
    }

}

declare global {
    interface HTMLElementTagNameMap {
      'lit-label': LitLabel;
    }
}
