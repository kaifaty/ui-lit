import { LitElement, css, unsafeCSS, html, TemplateResult } from 'lit';
import { formAssociated } from '../mixins/form-associated/index';
import { property, customElement } from 'lit/decorators.js';
import { FormAssociatedProps } from '../mixins/form-associated/interface';
import { scrollbar } from '../styles/scrollbar';
import { LitTab } from './tab';
import { focusable } from '../mixins/focusable/index';
import { _vTabs as _v } from './styles';

export type TTabType = 'button' | 'tab';
export type TTab = {
    value: string;
    text: string | TemplateResult;
    icon?: string | TemplateResult;
}

export interface ITabs extends FormAssociatedProps{
    //items: TTab[],
    type: TTabType;
    value: string;
}

@customElement("lit-tabs")
export class LitTabs extends focusable(formAssociated(LitElement)) implements ITabs{
    static get styles() {
        return [
        ...super.elementStyles,
        css`
        :host{
            display: inline-block;
            padding: 0 0 4px 0;
            box-sizing: border-box;
            position: relative;
        }
        :host([disabled]){
            opacity: 0.5;
        }
        .wrapper{
            display: flex;
            width: 100%;
        }
        .scroll-wrapper:focus{
            outline: ${_v.outline};
        }
        .scroll-wrapper{
            overflow-y: hidden;
            width: 100%;
        }
        .scroller{
            width: 100%;
            overflow-x: scroll;
            overflow-y: hidden;
            margin-bottom: -17px;
            -webkit-overflow-scrolling: touch;
            display: flex;
        }
        `, scrollbar];
    } 

    @property({type: String}) type: TTabType = 'tab';

    private _tabs: LitTab[] = [];
    private _value: string = '';

    set selectedIndex(value: number){
        if(value > this._tabs.length || value < 0) return;
        this.value = this._tabs[value].value;
        this.dispatchEvent(new CustomEvent('changed', {
            detail: this.value,
            bubbles: true
        }));
    }
    get selectedIndex(){
        for(let i = 0; i < this._tabs.length; i++){
            if(this._value === this._tabs[i].value) return i;
        }        
        return -1;
    }
    get value(){
        return this._value;
    }
    set value(value: string){
        if(value === this._value) return;
        const prevRect = this._tabs.find(it => it.value === this._value)?.getBoundingClientRect();
        this._value = value;
        this._updateSelected(prevRect);
    }
    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(_changedProperties.has('type')){
            this._updateType()
        }
    }

    connectedCallback(){
        super.connectedCallback();
        this.addEventListener('changed', this._handleSelect as EventListener);
        this.addEventListener('tabConnected', this._tabConnected as EventListener);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this.removeEventListener('changed', this._handleSelect as EventListener);
        this.removeEventListener('tabConnected', this._tabConnected as EventListener);
    }

    private _updateSelected = (prevRect?: null | DOMRect) => {
        this._tabs.forEach(it => {
            it.setSelection(it.value === this._value, prevRect);
        })
    }

    private _updateType = () => {
        this._tabs.forEach(it => it.type = this.type)
    }

    private _tabConnected = (e: CustomEvent) => {
        this._tabs.push(e.detail);
        e.detail.type = this.type;
        this._updateSelected();
    }

    disconncetTab(value: LitTab){
        const index = this._tabs.findIndex(it => it === value);
        if(~index){
            this._tabs.splice(index, 1);
        }        
    }

    private _handleSelect = (e: CustomEvent) => {
        this.value = e.detail;
    }
    render(){
        return html`
        <div class = "scroll-wrapper" 
             @keydown = "${this._handleKeyEvent}">
            <div class = "scroller">
                <div class = "wrapper"><slot></slot></div>
            </div>
        </div>`;
    }

    private _handleKeyEvent = (e: KeyboardEvent) => {
        if(e.key === 'ArrowLeft'){
            this.selectedIndex = this.selectedIndex - 1;
        }
        else if (e.key === 'ArrowRight'){
            this.selectedIndex = this.selectedIndex + 1;
        }
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-tabs': LitTabs;
    }
}
