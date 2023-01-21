import type {LitElement, PropertyValueMap} from 'lit'

import type {LitLabel} from '../../components/label/index'
import type {FormAssociatedElement} from '../form-associated/types'
import type {Constructor} from '../types'


export interface ILabled extends LitElement{
    readonly labels: LitLabel[]
    addLabel(data: LitLabel): void
    removeLabel(data: LitLabel): void
}

/**
 * Mixin append labels for component
 */
export const labled = <T extends Constructor<FormAssociatedElement>>(superClass: T) => {
    class LabledElement extends superClass implements ILabled{
        #labels: LitLabel[] = []
        

        /** @ignore  */
        #notify(){
            this.dispatchEvent(new CustomEvent('labledConnected', {
                composed: true,
                bubbles: true,
                detail: this
            }))
        }

        /** @ignore  */
        #updateDisabled(){
            this.#labels.forEach(it => {
                if(this.disabled){
                    it.setAttribute('disabled', '')
                }
                else{
                    it.removeAttribute('disabled')    
                }
            })
        }

        /** @ignore  */
        #getExistLabelIndex(label: LitLabel){
            return this.#labels.findIndex(el => el === label)
        }

        get labels(){
            return this.#labels
        }
        
        /**
         * @param label {LitLabel} - custom label
         */
        addLabel(label: LitLabel): void {
            const i = this.#getExistLabelIndex(label)
            if(i >= 0) return
            this.#labels.push(label)
            this.#updateDisabled()
        }

        /**
         * @param label {LitLabel} - custom label
         */
        removeLabel(label: LitLabel): void {
            const i = this.#getExistLabelIndex(label)
            if(i < 0) return
            this.#labels.splice(i, 1)
            this.#labels =  this.#labels.filter(l => l !== label)
        }
            
        /** @ignore  */
        willUpdate(props: PropertyValueMap<any>) {
            super.willUpdate(props)
            if(props.has('disabled')){
                this.#updateDisabled()
            }
        }
        
        /** @ignore  */
        connectedCallback(){
            super.connectedCallback()
            this.#notify()
        }

        /** @ignore  */
        disconnectedCallback(){
            super.disconnectedCallback()
            this.#labels = []
        }
    }
    return LabledElement as Constructor<ILabled> & T     
}