import {css, html, nothing} from 'lit'
import {property} from 'lit/decorators.js'

import {FormAssociatedElement} from '../form-associated/types'

type Constructor<T> = new (...args: any[]) => T;

interface INotification {

}

type TNotificatable = FormAssociatedElement & INotification;

export const notificatable = <T extends Constructor<FormAssociatedElement>>(superClass: T) => {
    class Notificatable extends superClass implements TNotificatable{
        
        static styles = [
            ...(superClass as any).elementStyles,
            css`
            :host{
                position: relative;
            }
            `
        ]
        @property({type: Boolean, reflect: true}) showNote = false
        private _top = 0

        private _onValid = () => {  
            this.removeAttribute('invalid')
            this.showNote = false
        }
        private _onInvalid = () => {
            this.setAttribute('invalid', '')
        }
        private _onReport = () => {
            this.showNote = true
        }

        connectedCallback(): void {
            super.connectedCallback()
            this.addEventListener('valid', this._onValid)
            this.addEventListener('invalid', this._onInvalid)
            this.addEventListener('reportInvalid', this._onReport)
        }
        disconnectedCallback(): void {
            super.disconnectedCallback()
            this.removeEventListener('valid', this._onValid)
            this.removeEventListener('invalid', this._onInvalid)
            this.removeEventListener('reportInvalid', this._onReport)
        }
        willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
            super.willUpdate(_changedProperties)
            this._top = this.clientHeight
        }

        render(){
            if(this.showNote){
                return html`<lit-note 
                    @close = "${this._handleCloseNote}" 
                    error
                    style = "top: ${(this._top)}px;"
                    class = "error">${this.validationMessage}</lit-note>`
            }
            return nothing
        }
        private _handleCloseNote(){
            this.showNote = false
        }
    }
    
    return Notificatable as Constructor<FormAssociatedElement> & T
}