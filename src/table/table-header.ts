import { ifDefined } from 'lit/directives/if-defined';
import { classMap } from 'lit/directives/class-map';
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { TColumnItem, TFilterItem, TSortDirections } from './table';
import { noselect } from '../styles/noselect';
import '../textfield';
import '../number';
import { ClickController } from '../controllers/ClickController';
import { isClickInElement } from 'kailib';

@customElement('lit-table-header')
export class LitTableHeader extends LitElement{
    static styles = [css`
    :host{
        padding: var(--lit-cell-header-padding, 0 15px);
        font-weight: 600;
        font-size: var(--lit-table-header-font-size, inherit);
        position: relative;
        display: flex;
        --lit-icon-font-size: 8px;
        --lit-icon-color: var(--lit-table-icon-color, rgba(0,0,0,0.2));
    }
    :host(:not(:last-child))::after{
        content: '';
        position: absolute;
        width: 1px;
        height: 50%;
        display: inline-block;
        background-color: var(--lit-table-header-separator, rgba(0,0,0,0.1));
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
    }
    .sort-icons{
        display: flex;
        padding: var(--lit-table-sort-padding, 0 5px );
        flex-direction: column;
        align-items: center;
        line-height: 0.9;
        margin-left: 4px;
    }
    .sort-icons:hover {
        background-color: var(--lit-table-icon-background-hover, rgba(0, 0, 0, 0.1));
        --lit-icon-color: var(--lit-table-icon-color-hover, rgba(0, 0, 0, 0.5));
    }
    :host([sortDirection = "descend"]) .sorted lit-icon[icon = "dropdown"],
    :host([sortDirection = "ascend"]) .sorted lit-icon[icon = "dropup"],
    .filters-checked
    {
        --lit-icon-color: var(--lit-table-icon-color-selected, hsl(210, 90%, 60%));
    }
    [icon = "filter"]{
        padding: var(--lit-table-filter-padding, 6px 4px);
        border-radius: 3px;
    }
    [icon = "filter"]:hover{
        background-color: var(--lit-table-icon-background-hover, rgba(0, 0, 0, 0.1));
        --lit-icon-color: var(--lit-table-icon-color-hover, rgba(0, 0, 0, 0.5));
    }
    .sorter{
        cursor: pointer;
    }
    .wrapper{
        display: flex;
        align-items: center;
        height: var(--header-height, 50px);
    }
    .filter-template{
        position: absolute;
        font-size: 12px;
        left: 0;
        font-weight: 400;
        padding: 10px;
        width: 160px;
        border-radius: 5px;
        background-color: var(--lit-table-filter-content-background, #fff);
        box-shadow: 2px 2px 10px rgba(0,0,0,0.13);
        z-index: 1;
        display: grid;
        grid-template-rows: auto 25px;
        gap: 15px;
        
    }
    .filter-template footer{
        display: flex;
        justify-content: space-between;

    }
    .filter-template checkbox-element{
        margin-right: 7px;
    }
    .flex-center{
        display: flex;
        align-items: center;
    }
    .rows{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        align-items: center;
    }
    .row{
        display: contents;
    }
    :host([align = center]){
        justify-content: center;
    }
    :host([align = right]){
        justify-content: right;
    }
    `, noselect];
    
    @property({type: String, reflect: true}) align: string = 'left';
    @property({type: Object}) item?: TColumnItem = undefined;
    @property({type: String}) sort: string = '';
    @property({type: String, reflect: true}) sortDirection: string = 'ascend';
    _filterVisible = false;
    _clickController = new ClickController(this);
    
    
    connectedCallback(){
        super.connectedCallback();
        this.sortDirection = this.directions[0] || 'ascend';
    }
    
    get filterVisible(){
        return this._filterVisible;
    }
    set filterVisible(value: boolean){
        const oldValue = this._filterVisible;
        this._filterVisible = value;
        this.requestUpdate('filterVisible', oldValue);
    }
    

    get directions() {
        return this.item?.sortDirections || ['ascend', 'descend'];
    }

    private _getNewDirection(){
        const directions = this.directions;
        const index = directions.indexOf(this.sortDirection as TSortDirections);
        
        if(index === -1 || !this.isSort){
            return directions[0];
        }
        if(directions.length - 1 < index){
            return '';
        }
        return directions[index + 1];
    }
    get isSort(){
        return this.sort === this.item?.key;
    }
    private _sortTemplate(){
        if(this.item?.sorter){        
            return html`<div class = "sort-icons">
                ${this.directions.slice().sort().map(it => {
                    if(it ==='ascend'){
                        return html`<lit-icon icon = "dropup"></lit-icon>`;
                    }
                    else {
                        return html`<lit-icon icon = "dropdown"></lit-icon>`
                    }
                })}
            </div>`;
        }
    }
    private _filterIconTemplate(){
        if(!this.item?.filters) return nothing;
        const map = {
            "filters-checked": this.item.filters.filter(it => it.checked).length
        }
        return html`<lit-icon 
                        @click = "${this._onFilterToggle}" 
                        class = "${classMap(map)}"
                        icon = "filter"></lit-icon>`;
    }
    private _filterItemTemplate(item: TFilterItem, i: number){
        if(item.type === 'checkbox' || !item.type){
            return html`
                <lit-label>
                    ${item.text}
                </lit-label>
                <lit-checkbox 
                    .checked = "${item.checked || false}"
                    name = "${i}"></lit-checkbox>`;
        }
        if(item.type === 'input' && typeof item.value === 'number'){
            return html`
                <lit-label>
                    ${item.text}
                </lit-label>
                <lit-numberfield 
                    name = "${i}" 
                    value = "${item.value}"
                    placeholder = "${ifDefined(item.placeholder)}"></lit-numberfield>`;
        }
        if(item.type === 'input'){
            return html`
                <lit-label>
                    ${item.text}
                </lit-label>
                <lit-textfield 
                    name = "${i}" 
                    value = "${item.value}"
                    placeholder = "${ifDefined(item.placeholder)}"></lit-textfield>`;
        }
        return nothing;
    }
    private _filterTemplate(){
        if(!this.filterVisible) return nothing;
        return html`<lit-form 
                    @submit = "${this._onSubmitFilter}"
                    class = "filter-template">
                <div class = "rows">
                    ${this.item!.filters!.map((it, i) => html`<div class = "row">${this._filterItemTemplate(it, i)}</div>`)}
                </div>
                <footer>
                    <lit-button 
                        @click = "${this._onReset}"
                        borderless
                        type = "button"
                        size = "small">Reset</lit-button>
                    <lit-button 
                        type = "submit"
                        primary 
                        size = "small">OK</lit-button>
                </footer>
            </lit-form>`;
    }
    render(){
        const map = {
            "wrapper": true,
            "noselect": true,
            "sorted": this.isSort,
            "sorter": !!this.item?.sorter
        };
        return html`<div 
            @click = "${this._onChangeSort}" 
            class = "${classMap(map)}">
            <div>${this.item?.title}</div>${this._sortTemplate()}${this._filterIconTemplate()}
        </div>
        ${this._filterTemplate()}`;
    }
    private _onFilterToggle(e: Event){
        e.stopPropagation();
        this.filterVisible = !this.filterVisible;
    }
    private _onChangeSort(){
        if(!this.item?.sorter) return;
        const direction = this._getNewDirection();
        this.dispatchEvent(new CustomEvent("changeSort", {
            detail: {
                sort: direction ? this.item!.key : '',
                direction
            },
            bubbles: true
        }));
    }
    private _onSubmitFilter(e: CustomEvent){
        this.filterVisible = false;
        const data = e.detail.data;
        const filters = this.item!.filters!.map((it, i) => {
            if(!it.type || it.type === 'checkbox'){
                return {
                    ...it, 
                    checked: data[i]
                }
            }
            return {
                ...it, 
                value: data[i], 
                checked: !!data[i]
            }
        });
        this.dispatchEvent(new CustomEvent("changeFilter", {
            detail: {...this.item!, filters},
            bubbles: true
        }));
    }
    private _onReset(){
        this.filterVisible = false;
        
        this.dispatchEvent(new CustomEvent("changeFilter", {
            detail: {
                ...this.item, 
                filters: this.item?.filters?.map(it => ({...it, checked: false, value: it.type === 'input' ? '' : it.value}))
            },
            bubbles: true
        }))
    }

    handleDocumentClick = (e: Event) => {
        if(!isClickInElement(e, this)){
            this.filterVisible = false;
        }
        
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-table-header': LitTableHeader;
    }
}