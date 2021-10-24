import { classMap } from 'lit/directives/class-map';
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import type { TreeviewRoot } from './tree-view';

@customElement("treeitem-element")
export class TreeItem extends LitElement{
    static styles = css`
        :host{
            display: block;
            padding: 5px 10px;
            cursor: pointer;
            font-weight: 600;
        }
        :host([containered]){
            margin-left: 20px;
        }
        :host([container]) .label{
            padding-bottom: 5px;
        }
        :host([container][selected]) .label{
            color: var(--treeitem-selected-color, #f700ff);
        }
        :host(:not([container])[selected]){
            background-color: var(--treeitem-selected-background, rgba(0, 0, 0, 0.1));
            color: var(--treeitem-selected-color, #f700ff);
        }
        .icon-before{
            margin-right: 5px;
            
        }
        `;
    @property({type: String, attribute: true, reflect: true}) value: string = '';
    @property({type: String}) label: string = '';
    @property({type: Boolean, reflect: true}) container: boolean = false;
    @property({type: Boolean}) opened: boolean = false;
    @state() selected: boolean = false;
    _childTrees: TreeItem[] = [];
    _childValues: string[] = [];
    _cachedRoot: TreeviewRoot | null = null;
    
    get root(): TreeviewRoot | null{
        if(this._cachedRoot) return this._cachedRoot;
        let current: HTMLElement | null = this.parentElement;
        while(current){
            if(current.tagName.toLowerCase() === "treeview-root"){
                this._cachedRoot = current as TreeviewRoot;
                return this._cachedRoot;
            }
            current = current.parentElement!;
        }
        return null;        
    }
    get rootItem(): TreeItem | null{
        let current: HTMLElement | null = this.parentElement;
        while(current){
            if(current.tagName.toLowerCase() === "treeitem-element"){
                return current as TreeItem;
            }
            current = current.parentElement!;
        }
        return null;  
    }
    private _connectToView(){
        const root = this.root;
        if(!root){
            console.warn("TreeItem must be child of TreeView");
            return;
        }
        root.connectTreeItem(this);
    }
    private _disconnectFromView(){
        this.root?.disconnectTreeItem(this);
    }
    private _connectToItem(){
        if(!!this.rootItem){
            this.setAttribute("containered", "");
        }
    }
    connectedCallback(){
        super.connectedCallback();
        this.addEventListener('click', this.onSelect);
        this._connectToView();
        this._connectToItem();

    }
    disconnectedCallback(){
        this._cachedRoot = null;
        this._childTrees = [];
        this._disconnectFromView();
        this.removeEventListener('click', this.onSelect);
        super.disconnectedCallback()
    }
    firstUpdated(){
        const childs = [...this.querySelectorAll("treeitem-element")];
        if(childs.length){
            this._childTrees = childs;
            this._childValues = childs.map(it => it.value);
            this.container = true;
            this._updateOpened();
            const text = this.childNodes[0].textContent;
            this.append();
            this.insertAdjacentHTML('afterbegin', `<span>${text}</span>`);
            this.childNodes[0].remove();
        }
    }
    private _updateOpened(){
        this._childTrees.forEach(it => {
            it.style.display = this.opened ? 'block' : 'none';
        })
    }
    private _containterTemplate(){
        if(this.container){
            const data = {
                dropup: this.opened,
                "icon-before": true
            }
            return html`<icon-element 
                            icon = "dropdown" 
                            class = "${classMap(data)}"></icon-element>`;
        }
    }
    render(){
        return html`<div class = "label">${this._containterTemplate()}${this.label}</div><slot></slot>`;
    }
    onSelect = (e: Event) => {
        e.stopPropagation();
        if(this.container){
            this.opened = !this.opened;
            this._updateOpened();
        }
        else{
            this.root!.setValue(this.value);
        }
    }
    selectContainer(value: string){
        if(this._childValues.includes(value)){
            this.select();
        }
        else{
            this.unselect();
        }
    }
    select(){
        this.setAttribute("selected", "");
        this.selected = true;
    }
    unselect(){
        this.selected = false;
        this.removeAttribute("selected");
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'treeitem-element': TreeItem;
    }
    
}