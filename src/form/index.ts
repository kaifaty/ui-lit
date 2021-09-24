import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators';
import { FormAssociatedElement } from '../form-associated/interface';

@customElement("form-element")
export class FromElement extends LitElement{
    elements: FormAssociatedElement[] = []
    render(){
        return html`
        <div @submitForm = "${this._onSubmit}"
             @fromAttached = '${this._onFormAttached}'
             @fromDettached = '${this._onFormDettached}'>
            <slot></slot>
        </div>
    `;
    }
    connectedCallback(){
        super.connectedCallback();
    }
    disconnectedCallback(){
        super.disconnectedCallback();
    }

    public checkValidity(){        
        return true;
    }
    public reportValidity(): boolean{
        return true;
    }

    private _onSubmit = (e: Event) => {
        e.preventDefault();
        this.submit();
    }
    private _onFormAttached(e: CustomEvent){
        this.elements.push(e.detail);
    }
    private _onFormDettached(e: CustomEvent){
        this.elements.filter(it => e.detail !== it);
    }
    private _getData(){
        const data: Record<string, string | boolean | number> = {};

        this.elements.forEach(it => {
            if(it.name){
                data[it.name] = it.value;
            }
        })
        return data;
    }
    submit(){
        if(!this.reportValidity()){
            return;
        }
        this.dispatchEvent(new CustomEvent('submit', {
            detail: {
                data: this._getData()
            }
        }))
    }
}