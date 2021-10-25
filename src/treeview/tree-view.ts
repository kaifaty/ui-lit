import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';
import { TSelectItem } from '../select';
import { noselect } from '../styles/noselect';
import { classMap } from 'lit/directives/class-map';
import '../icon'
import type { TreeItem } from './tree-item';


export interface ITreeViewProps {
    items: TSelectItem[]
    opened: boolean
    selected: string
}


@customElement("tree-view")
export class Treeview extends LitElement{
    static styles = css`
    :host{
        display: inline-block;
    }
    `;
    _items: Map<string, TreeItem> = new Map();
    @property({type: String, reflect: true}) selected: string = '';

    setValue(value: string){
        this.selected = value;
        for(const [v, it] of this._items){
            if(it.container){
                it.selectContainer(value);
                continue;
            }
            if(v === value){
                it.select();
            }
            else{
                it.unselect();
            }
        }
    }
    connectTreeItem(item: TreeItem){
        this._items.set(item.value, item);
    }
    disconnectTreeItem(item: TreeItem){
        this._items.delete(item.value);
    }
    render(){
        return html`<slot></slot>`;
    }
    firstUpdated(){
        this.setValue(this.selected);
    }
}


declare global {
    interface HTMLElementTagNameMap {
      'tree-view': Treeview;
    }
    
}