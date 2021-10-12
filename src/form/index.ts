import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators';
import { FormAssociatedElement } from '../form-associated/interface';
import '../label';

export interface IFormProps {
    disabled: boolean
    noValidate: boolean
}

export interface IFormElement{
    checkValidity(): boolean
    reportValidity(): boolean
    submit(): void
}
@customElement("form-element")
export class FromElement extends LitElement implements IFormElement, IFormProps{
    _elements: FormAssociatedElement[] = []

    get length(){
        return this._elements.length;
    }
    get elements(){
        return this._elements;
    }
    @property({type: Boolean}) noValidate: boolean = false;
    @property({type: Boolean}) disabled: boolean = false;

    render(){
        return html`<slot></slot>`;
    }
    connectedCallback(){
        super.connectedCallback();
        this.addEventListener("submitForm", this._handleSubmit)
        this.addEventListener("fromAttached", this._handleFormAttached as EventListener);
        this.addEventListener("fromDettached", this._handleFormDettached as EventListener);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this.removeEventListener("submitForm", this._handleSubmit)
        this.removeEventListener("fromAttached", this._handleFormAttached as EventListener);
        this.removeEventListener("fromDettached", this._handleFormDettached as EventListener);
    }

    // ==== Events ==== 
    private _handleSubmit = (e: Event) => {
        e.preventDefault();
        this.submit();
    }
    private _handleFormAttached = (e: CustomEvent) => {
        this._elements.push(e.detail);
    } 
    private _handleFormDettached = (e: CustomEvent) => {
        this._elements.filter(it => e.detail !== it);
    }
    private _getData(){
        const data: Record<string, string | boolean | number> = {};

        this._elements.forEach(it => {
            if(it.name){
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

    updated(props: Map<string, string | boolean>){
        if(props.has('disabled')){
            this._elements.forEach(el => el.disabled = this.disabled);
        }

    }
    submit(): void{
        
        if(!this.noValidate && !this.reportValidity()){
            return;
        }
        this.dispatchEvent(new CustomEvent('submit', {
            detail: {
                data: this._getData(),
            },
            bubbles: true
        }))
    }
    reset(){

    }
}
declare global {
    interface HTMLElementTagNameMap {
      'form-element': FromElement;
    }
}
