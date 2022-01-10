import { ref, createRef } from 'lit/directives/ref.js';
import { FormAssociatedElement, ValidityStateFlags } from '../form-associated/interface';
import { property } from 'lit/decorators.js';
import { nothing, html, css, LitElement } from 'lit';
import { LitNote } from '../../note/index';

type Constructor<T> = new (...args: any[]) => T;

interface INotification {

}

type TNotificatable = FormAssociatedElement & INotification;

export const notificatable = <T extends Constructor<FormAssociatedElement>>(superClass: T) => {
    class Notificatable extends superClass implements TNotificatable{
        
        static styles = [
            ...(superClass as any).elementStyles, 
            css`    
            :host([invalid]) input{
                border: 1px solid var(--lit-error-border, #ff7e6d);
            }
            :host([invalid]) input:focus{
                outline: 1px solid var(--lit-error-border, #ff7e6d);
            }`
        ];
        
        @property({type: Boolean, reflect: true}) showNote: boolean = false;
        private _noteRef = createRef<LitNote>();

        private _onValid = () => {  
            this.removeAttribute('invalid');
            this.showNote = false;
        }
        private _onInvalid = () => {
            this.showNote = true;
            this.setAttribute('invalid', '');
        }

        connectedCallback(): void {
            super.connectedCallback();
            this.addEventListener('valid', this._onValid);
            this.addEventListener('invalid', this._onInvalid);

        }
        disconnectedCallback(): void {
            super.disconnectedCallback()
            this.removeEventListener('valid', this._onValid);
            this.removeEventListener('invalid', this._onInvalid);
        }


        render(){
            if(this.showNote){
                return html`<lit-note 
                    @close = "${this._handleCloseNote}" 
                    style = "transform: translate(0, 100%);"
                    class = "error" ${ref(this._noteRef)}>${this.validationMessage}</lit-note>`;
            }
            return nothing;
        }
        /*
        reportValidity(){            
            const validity = super.reportValidity();
            this.showNote = !validity;
            return validity;
        }
        */
        private _handleCloseNote(){
            this.showNote = false;
        }
    }
    
    return Notificatable as Constructor<FormAssociatedElement> & T;;
}