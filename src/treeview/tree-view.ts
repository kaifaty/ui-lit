import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';
import { TSelectItem } from '../select';
import '../icon';
import type { TreeItem } from './tree-item';


export interface ITreeViewProps {
    items: TSelectItem[]
    opened: boolean
    value: string
}

@customElement("tree-view")
export class Treeview extends LitElement{
    static styles = css`
    :host{
        display: inline-block;
        font-size: var(--treeview-font-size, 14px);
        color: var(--treeitem-color, inherit);
        --icon-color: var(--treeitem-color, inherit);
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
        this.querySelectorAll("tree-subview").forEach(it => {
            it.updateSelection(false);
        })
        this.querySelectorAll("tree-item").forEach(it => {            
            it.updateSelection(this.value);
        })
    }
    render(){
        return html`<slot></slot>`;
    }
}


declare global {
    interface HTMLElementTagNameMap {
      'tree-view': Treeview;
    }
}