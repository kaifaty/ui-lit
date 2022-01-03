import type { LitLabel } from '../../label/index';
import { ILabled } from './inderface';
import { FormAssociatedElement } from '../form-associated/interface';

type Constructor<T> = new (...args: any[]) => T;

export const labled = <T extends Constructor<FormAssociatedElement>>(superClass: T) => {
    class LabledElement extends superClass implements ILabled{
        private _labels: LitLabel[] = [];
        constructor(...args: any[]) {
            super(...args);
        }
        get labels(){
            return this._labels
        }
        willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
            super.willUpdate(_changedProperties);
            if(_changedProperties.has('disabled')){
                this._updateDisabled();
            }
        }
        private _updateDisabled(){
            this._labels.forEach(it => {
                if(this.disabled){
                    it.setAttribute('disabled', '');
                }
                else{
                    it.removeAttribute('disabled');    
                }
            })
        }
        public connectedCallback(): void {
            super.connectedCallback();
            this._notify();
        }
        public disconnectedCallback(){
            super.disconnectedCallback();
            this._labels = [];
        }
        public addLabel(label: LitLabel){
            this._labels.push(label);
            this._updateDisabled();
        }
        public removeLabel(label: LitLabel){
            this._labels = this._labels.filter(l => l !== label);
        }
        
        private _notify(){
            this.dispatchEvent(new CustomEvent('labledConnected', {
                composed: true,
                bubbles: true,
                detail: this
            }))
        }
    }
    
    return LabledElement as Constructor<ILabled> & T;
}