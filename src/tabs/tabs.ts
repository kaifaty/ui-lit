import { noselectText } from '../styles/noselect';
import { classMap } from 'lit/directives/class-map';
import { LitElement, css, unsafeCSS, html, TemplateResult } from 'lit';
import { formAssociated } from '../form-associated/index';
import { property, customElement } from 'lit/decorators';
import { FormAssociatedProps } from '../form-associated/interface';
import { KeyDownController } from '../controllers/KeyController';

export type TTabType = 'button' | 'tab';
export type TTab = {
    value: string;
    text: string | TemplateResult;
    icon?: string | TemplateResult;
}

export interface ITabs extends FormAssociatedProps{
    items: TTab[],
    type: TTabType;

}

@customElement("lit-tabs")
export class TabsElement extends formAssociated(LitElement) implements ITabs{
    static styles = css`
    :host{
        
        display: inline-block;        
    }
    .content{
        display: flex;
    }
    .tab.selected, 
    :not(.disabled) .tab:not(:focus):hover, 
    :not(.disabled) :focus{
        background-color: tomato;
    }
    :host([disabled]){
        opacity: 0.5;
    }`;    
    @property({type: Array}) items: TTab[] = [];
    @property({type: String, reflect: true}) type: TTabType = 'button';
    @property({type: String}) value: string = '';


    connectedCallback(){
        super.connectedCallback();
        this.addEventListener('changed', this._handleSelect as EventListener);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this.removeEventListener('changed', this._handleSelect as EventListener);
    }

    private _handleSelect(e: CustomEvent){
        this.value = e.detail;
    }
    private _updateTabs(){
        this.querySelectorAll("lit-tab").forEach(it => {
            this.disabled 
                ? it.setAttribute("disabled", "") 
                : it.removeAttribute("disabled") ;
            it.type = this.type 
            it.value === this.value 
                ? it.select() 
                : it.unselect()
            }
        )
    }

    updated(){
        if(this.disabled) return;
        this._updateTabs();
    }
    render(){
        const map = {
            content: true,
            type: this.type,
            disabled: this.disabled,
            ["type-"+ this.type]: true,
        };
        return html`<div class = "${classMap(map)}"><slot></slot></div>`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-tabs': TabsElement;
    }
}
