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
        this.appendConnectedField(this._findConnectedField());
        this.addEventListener('click', this._handleClick);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this._connectedNode = null;
        this.removeEventListener('click', this._handleClick);
    }
    render(){
        return html`<slot></slot>`
    }
    public appendConnectedField(el: TLabled | HTMLInputElement | null){
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
        return null;
    }

    _handleClick = () => {
        this._connectedNode?.focus();
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-label': LitLabel;
    }
}
