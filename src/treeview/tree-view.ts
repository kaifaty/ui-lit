import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TSelectItem } from '../select/interface';
import '../icon';
import type { LitTreeItem } from './tree-item';


export interface ITreeViewProps {
    items: TSelectItem[]
    opened: boolean
    value: string
}

@customElement("lit-tree-view")
export class LitTreeview extends LitElement{
    static styles = css`
    :host{
        display: inline-block;
        font-size: var(--lit-treeview-font-size, 14px);
        color: var(--lit-treeitem-color, inherit);
        --icon-color: var(--lit-treeitem-color, inherit);
    }
    `;
    @property({type: String, reflect: true}) value: string = '';
    connectedCallback(){
        super.connectedCallback();
        this.addEventListener('changed', this._onChanged as EventListener);
    }
    disconnectedCallback(){
        super.disconnectedCallback();
        this.removeEventListener('changed', this._onChanged as EventListener);
    }
    private _onChanged(e: CustomEvent){
        this.value = e.detail;
    }
    
    updated(){
        this.querySelectorAll("lit-tree-subview").forEach(it => {
            it.updateSelection(false);
        })
        this.querySelectorAll("lit-tree-item").forEach(it => {            
            it.updateSelection(this.value);
        })
    }
    render(){
        return html`<slot></slot>`;
    }
}


declare global {
    interface HTMLElementTagNameMap {
      'lit-tree-view': LitTreeview;
    }
}