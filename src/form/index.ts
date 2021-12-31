import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';
import { FormAssociatedElement } from '../form-associated/interface';
import '../label';
import type { LitCheckbox } from '../checkbox/index';
import { LitNumberField } from '../number/index';

export interface IFormProps {
    disabled: boolean
    noValidate: boolean
}

export interface IFormElement{
    checkValidity(): boolean
    reportValidity(): boolean
    submit(): void
}
type TReturnData = Record<string, string | boolean | number>;
@customElement("lit-form")
export class LitFrom extends LitElement implements IFormElement, IFormProps{
    static styles = css`
    :host{
        display: block;
    }
    `;
    _elements: FormAssociatedElement[] = []

    get length(){
        return this._elements.length;
    }
    get elements(){
        return this._elements;
    }
    @property({type: Boolean}) noValidate: boolean = false;
    _disabled: boolean = false;
    get disabled(){ 
        return this.disabled
    }
    set disabled(value: boolean){
        if(value !== this._disabled){
            this._disabled = value;
            this._elements.forEach(el => el.disabled = this.disabled);
        }
    }


    render(){
        return html`<slot></slot>`;
    }
    connectedCallback(){
        super.connectedCallback();
        this.addEventListener("submitForm", this._handleSubmit)
        this.addEventListener("fromAttached", this._handleFormAttached as EventListener);
        //this.addEventListener("fromDettached", this._handleFormDettached as EventListener);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this.removeEventListener("submitForm", this._handleSubmit)
        this.removeEventListener("fromAttached", this._handleFormAttached as EventListener);
        //this.removeEventListener("fromDettached", this._handleFormDettached as EventListener);
    }

    // ==== Events ==== 
    private _handleSubmit = (e: Event) => {
        e.preventDefault();
        this.submit();
    }
    private _handleFormAttached = (e: CustomEvent) => {
        this._elements.push(e.detail.element);
        e.detail.onAttatch?.(this);

    } 
    detatchElement(el: HTMLElement){
        this._elements = this._elements.filter(it => el !== it);
    }
    getData(){
        const data: TReturnData = {};
        this._elements.forEach(it => {
            if(!it.name || it.disabled) return;
            if(it.tagName.toLocaleLowerCase() === "lit-checkbox"){
                data[it.name] = (it as LitCheckbox).checked;
            }
            else if(it.tagName.toLocaleLowerCase() === "lit-numberfiled"){
                data[it.name] = (it as LitNumberField).valueAsNumber;
            }
            else{
                data[it.name] = it.value;
            }
        })
        return data;
    }

    public checkValidity(): boolean{                
        for(const el of this.elements){
            if(!el.checkValidity()){
                return false;
            }
        }
        return true;
    }
    public reportValidity(): boolean{
        for(const el of this.elements){
            el.validate();
            if(!el.reportValidity()){
                return false;
            }
        }
        return true;
    }

    submit(): false | TReturnData{
        if(!this.noValidate && !this.reportValidity()){
            return false;
        }
        const data = this.getData();
        this.dispatchEvent(new CustomEvent('submit', {
            detail: { data },
            bubbles: true
        }))
        return data;
    }
    reset(){

    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-form': LitFrom;
    }
}
