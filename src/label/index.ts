import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';
import { getRootElement } from 'kailib';
import type { LitTextField } from '../textfield/index';
import type { LitNumberField } from '../number/index';
import type { LitCheckbox } from '../checkbox/index';

type TLabled = LitNumberField | LitTextField | LitCheckbox;

@customElement("lit-label")
export class LitLabel extends LitElement{
    static styles = css``;
    @property({type: String}) for: string = '';
    _connectedNode: TLabled | HTMLInputElement | null = null;
    connectedCallback(){
        super.connectedCallback();
        this.addEventListener('click', this._handleClick);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this._connectedNode = null;
        this.removeEventListener('click', this._handleClick);
    }
    firstUpdated(){
        this.appendConnectedField(this._findConnectedField());
    }
    render(){
        return html`<slot></slot>`
    }
    public appendConnectedField(el: TLabled | HTMLInputElement | null){
        console.log(el)
        if(!this._connectedNode && el){
            this._connectedNode = el;
        }
    }
    public removeConnectedField(el?:  TLabled | HTMLInputElement | null){
        if(el === this._connectedNode){
            this._connectedNode = null;
        }
    }
    private _findConnectedField(){
        if(this.for){
            const root = getRootElement(this);
            const node = root.querySelector(`#${this.for}`) as (HTMLElement & {_formAssiciated?: boolean});
            if(node && node._formAssiciated || node instanceof HTMLInputElement){
                return node as TLabled | HTMLInputElement;
            }
        }
        else{
            for(const node of this.childNodes){
                if ((node as any)._formAssiciated){
                    return node as TLabled;
                }
            }
        }
        return null;
    }

    _handleClick = (e: Event) => {
        this._connectedNode?.focus();
        if(
            this._connectedNode?.tagName.toLowerCase() === 'lit-checkbox' 
            && (e.target as LitCheckbox)?.tagName.toLowerCase() !== 'lit-checkbox'
        ){
            (this._connectedNode as LitCheckbox).toggle();
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-label': LitLabel;
    }
}
