import { noselectText } from '../styles/noselect';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { TTabType } from './tabs';
import { KeyDownController } from '../controllers/KeyController';

@customElement('lit-tab')
export class LitTab extends LitElement{
    static styles = css`
    :host{
        ${unsafeCSS(noselectText)};
        cursor: pointer;
        color: var(--lit-tab-color);
        --icon-color: var(--lit-tab-color);
        background-color: var(--lit-tab-background);
        text-align: center;
    }
    :host([type="button"]){
        border: 1px solid  var(--lit-tab-border,  tomato);
        padding: var(--lit-tab-button-padding, 5px 14px);
    }
    :host([type="tab"]){
        padding: var(--lit-tab-padding, 5px 14px);
        border: 1px solid transparent;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid var(--lit-tab-border, tomato);
        
    }
    :host(:not([selected]):hover){
        outline: 1px solid var(--lit-tab-outline-hover, inherit);
        z-index: 1;
    }
    :host([selected]){
        background-color: var(--lit-tab-background-selected, tomato);
        color: var(--lit-tab-color-selected, black);
        --icon-color: var(--lit-tab-color-selected, black);
    }
    :host(:not([disabled]):focus){
        outline: 1px solid var(--lit-tab-border, tomato);
        z-index: 1;
    }
    
    `;
    @property({type: String}) value = "";
    tabIndex = 0;
    private _keyPressController = new KeyDownController(this);
    private _focused = false;
    private _type: string = '';
    set type(value: TTabType){
        if(value !== this._type){
            this.setAttribute('type', value);
            this._type = value;
        }
    }
    select(){
        this.setAttribute('selected', '');
        setTimeout(() => {
            this.focus();
        })
    }
    unselect(){
        this.removeAttribute('selected');
    }
    connectedCallback(){
        super.connectedCallback();
        this.addEventListener('click', this.selectNotify);
        this.addEventListener('focus', this._handleFocus);
        this.addEventListener('blur', this._handleBlur);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this.removeEventListener('click', this.selectNotify);
        this.removeEventListener('focus', this._handleFocus);
        this.addEventListener('blur', this._handleBlur);
    }
    private selectNotify(){
        this.dispatchEvent(new CustomEvent('changed', {
            detail: this.value,
            bubbles: true
        }));
    }
    private _handleFocus(){
        this._focused = true;
    }
    private _handleBlur(){
        this._focused = false;
    }
    render(){
        return html`<slot></slot>`;
    }
    
    handlekeyDown = (e: KeyboardEvent) => {
        if(e.key === "Enter" && this._focused){
            this.selectNotify();
        }
        if(this.hasAttribute('selected') && this._focused){
            if(e.key === "ArrowRight"){
                (this.nextElementSibling as LitTab | null)?.selectNotify?.();
            }
            if(e.key === "ArrowLeft"){
                (this.previousElementSibling as LitTab | null)?.selectNotify?.();
            }
        }
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-tab': LitTab;
    }
}
