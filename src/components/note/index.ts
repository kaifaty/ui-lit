import {html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'

import {OuterClickRemoveController} from '../../controllers/click'

import {noteStyles} from './styles'


@customElement('lit-note')
export class LitNote extends LitElement{
    static styles = noteStyles
    private _hosted = 0
    private _minShowTime = 500 
    private _handle = new OuterClickRemoveController(this, (e: Event) => {
        if(e.target !== this && Date.now() - this._hosted > this._minShowTime){
            this.dispatchEvent(new CustomEvent('close'))
        }
    })
    getSize(){
        const bound = this.getBoundingClientRect()
        return {
            width: bound.width,
            height: bound.height,
        }
    }
    show(){
        this.classList.add('visible')
    }
    connectedCallback(){
        super.connectedCallback()
        this._hosted = Date.now()
    }
    render(){
        return html`<slot></slot>`
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-note': LitNote;
    }
}
