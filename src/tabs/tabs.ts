import { noselectText } from '../styles/noselect';
import { classMap } from 'lit/directives/class-map';
import { LitElement, css, unsafeCSS, html, TemplateResult } from 'lit';
import { formAssociated } from '../mixins/form-associated/index';
import { property, customElement } from 'lit/decorators.js';
import { FormAssociatedProps } from '../mixins/form-associated/interface';
import { scrollbar } from '../styles/scrollbar';
import { LitTab } from './tab';
import { labled } from '../mixins/labled/index';
import { focusable } from '../mixins/focusable/index';

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
            display: block;
            padding:0 0 15px 0;
            box-sizing: border-box;
            overflow-x: auto;
            overflow-y: hidden;
            width: 100%;
        }
        :host([disabled]){
            opacity: 0.5;
        }
        .wrapper:focus{
            display: flex;
            outline: 1px dashed #999;
        }
        .wrapper{
            display: flex;
        }
        `, scrollbar];
    } 

    @property({type: String}) type: TTabType = 'button';

    private _tabs: LitTab[] = [];
    private _value: string = '';

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
        this.addEventListener('focus', this._onFocus);
        this.addEventListener('blur', this._onBlur);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this.removeEventListener('changed', this._handleSelect as EventListener);
        this.removeEventListener('tabConnected', this._tabConnected as EventListener);
        this.removeEventListener('focus', this._onFocus);
        this.removeEventListener('blur', this._onBlur);
    }

    private _updateSelected = (prevRect?: null | DOMRect) => {
        this._tabs.forEach(it => {
            it.setSelect(it.value === this._value, prevRect);
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
        return html`<div tabIndex = "0" class = "wrapper"><slot></slot></div>`;
    }

    private _onFocus = (e: Event) => {
        this.addEventListener('keydown', this._handleKeyEvent);
    }
    private _onBlur = (e: Event) => {
        this.removeEventListener('keydown', this._handleKeyEvent);
    }
    private _handleKeyEvent = (e: KeyboardEvent) => {
        if(e.key === 'ArrowLeft'){
            this.querySelector(`lit-tab`)?.focus();
        }
        else if (e.key === 'ArrowRight'){
            (this.querySelector(`lit-tab:last-child`) as HTMLElement)?.focus();
        }
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-tabs': LitTabs;
    }
}
