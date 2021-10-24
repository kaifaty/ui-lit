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


@customElement("treeview-root")
export class TreeviewRoot extends LitElement{
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
}


@customElement("treeview-element_")
export class TreeviewElement_ extends LitElement{
    static styles = [
        noselect,
        css`
    :host{
        display: inline-block;
        box-sizing: border-box;
    }
    .title{
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .content.open{
        display: block;
    }
    .content{
        display: none;
    }
    .item{
        padding: 2px 0;
        padding-left: 15px;
        cursor: pointer;
        --icon-font-size: 16px;
    }
    .item.selected{
        color: var(--button-color, #ff33cc);
    }
    .item.selected, 
    .item:hover, 
    .title:hover{
        background-color: var(--button-background-hover);
    }
    .icon{
        margin-left: 10px;
        --icon-font-size: 12px;
    }
    .icon-closed{
        transform-origin: center;
        transform: rotate(-90deg);
    }
    `];
    @property({type: Array, attribute: false}) items: TSelectItem[] = [];
    @property({type: String}) selected: string = '';
    @property({type: Boolean, attribute: true, reflect: true}) opened: boolean = false;

    
    render(){
        const title = {opened: this.opened, title: true, noselect: true};
        const icon = {"icon-closed": !this.opened, icon: true};
        return html`
        <div class = "${classMap(title)}" 
            @click = "${this._onToggle}">
            <icon-element 
                icon = "dropdown" 
                class = "${classMap(icon)}"></icon-element>
        </div>
        <div class = "content noselect ${this.opened ? 'open': ''}">
            ${this.items.map(it => html`
                <div @click = "${this._onSelect}" 
                     data-value = "${it.value}" 
                     class = "item ${it.value === this.selected ? 'selected' : ''} ">${it.text}</div>
            `)}
        </div>
        `;
    }
    private _onToggle(e: Event){
        e.preventDefault();
        this.opened = !this.opened;
        this.dispatchEvent(new CustomEvent("toggle", {
            composed: true,
            bubbles: true,
            detail: this.opened
        }))
    }
    private _onSelect(e: Event){
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const value = ((e.target as HTMLElement).closest('.item') as HTMLElement).dataset.value as string;
        console.log(value)
        this.selected = value;
        this.dispatchEvent(new CustomEvent("changed", {
            composed: true,
            bubbles: true,
            detail: value
        }))
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'treeview-element': TreeviewRoot;
    }
    
}