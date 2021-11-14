import { styleMap } from 'lit/directives/style-map';
import { html, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators';
import { input } from '../styles/input';
import { formAssociated } from '../form-associated/index';

export interface ITextareaProps {
    name?: string
    class?: string
    placeholder?: string 
    value?: string 
}
type TResize = "none" | "both" | "horizontal" | "vertical" | "block" | "inline";
@customElement('lit-textarea')
export class LitTextarea extends formAssociated(LitElement){
    static styles = [input, css`
    :host{  
        display: inline-block;
    }
    textarea{
        width: 100%;
        display: inline-block;
        margin: 0;
        resize: var(--textarea-resize, none);
    }
    `];
    static get properties(){
        return {
            value: {type: String},
        }
    }
    @property({type: String}) placeholder: string = '';
    @property({type: String}) resize: TResize = 'none';

    _value: string = '';
    get value(){
        return this._value;
    }
    set value(data: string){
        const oldValue = this._value;
        this._value = data;
        this.requestUpdate('value', oldValue);
    }
    
    render(){
        const style = {resize: this.resize};
        return html`<textarea 
                        style = "${styleMap(style)}"
                        placeholder="${this.placeholder}" 
                        @input = "${this._onInput}">${this.value}</textarea>`;
    }
    private _onInput(e: Event){
        this.value = (e.target as HTMLTextAreaElement).value;
        this.dispatchEvent(new CustomEvent('changed', {
            detail: this.value,
            bubbles: true
        }))
    }
}


declare global {
    interface HTMLElementTagNameMap {
      'lit-textarea': LitTextarea;
    }
}