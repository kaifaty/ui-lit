import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { repeat } from 'lit/directives/repeat';
import '../pagination';

export type ISourceItem = {
    key: string;
    [key: string]: string | number;
}
export type TFilterType = 'checkbox' | 'input';
export interface TFilterItem {
    text: string;
    value: string | number | boolean;
    checked?: boolean;
    placeholder?: string;
    type?: TFilterType
    onFilter?: (value: string | number | boolean, record: ISourceItem) => boolean;
}
interface IFilters extends TFilterItem{
    key: string
}
export type TColumnItem = {
    title: string;
    key: string;
    filters?: TFilterItem[];
    //onFilter?: (value: string, record: ISourceItem) => boolean;
    sorter?: boolean | ((a: ISourceItem, b: ISourceItem, direction: TSortDirections) => number); 
    sortDirections?: TSortDirections[];
    defaultSort?: boolean
}
export type TSortDirections = 'ascend' | 'descend';


@customElement("table-element")
export class TableElement extends LitElement{
    static get properties(){
        return {
            columns: {type: Array},
            rowHeight: {type: Number},
            headerHeight: {type: Number},
        }
    }
    static styles = css`
    :host{
        display: block;
        --cells: 4;
        --row-height: 30px;
        --header-height: 50px;
    }
    :host([pagination]){
        display: grid;
        grid-template-rows: auto 40px;
    }
    .content{
        display: grid;
        grid-template-columns: repeat(var(--cells), auto);
        align-content: start;
        overflow-y: auto;
    }
    pagination-element{
        display: flex;
        align-content: end;
    }
    `;
    _columns: TColumnItem[] = [];
    set columns(value: TColumnItem[]){
        const oldValue = this._columns;
        this._columns = value;
        if(oldValue.length !== value.length){
            this.style.setProperty('--cells', this.columns.length.toString());
        }
        this.requestUpdate('columns', oldValue);
    }
    get columns(){
        return this._columns;
    }
    _headerHeight: number = 50;
    set headerHeight(value: number){
        const oldValue = this._headerHeight;
        this._headerHeight = value;
        if(oldValue !== value){
            this.style.setProperty('--row-height', this._headerHeight + "px");
        }
        this.requestUpdate('headerHeight', value)
    }
    get headerHeight(){return this._headerHeight}

    _rowHeight: number = 30;
    set rowHeight(value: number){
        const oldValue = this._rowHeight;
        this._rowHeight = value;
        if(oldValue !== value){
            this.style.setProperty('--row-height', this._rowHeight + "px");
        }
        this.requestUpdate('rowHeight', value)
    }
    get rowHeight(){return this._rowHeight}

    @property({type: Array}) dataSource: Array<ISourceItem> = [];
    @property({type: Boolean, reflect: true}) pagination: boolean = false;
    @property({type: Boolean}) paginationToHeight: boolean = false;
    @property({type: Number}) pageLength: number = 5;
    @state() sort: string = '';
    @state() sortDirection: TSortDirections = 'descend';
    @state() page: number = 0;
    _data: Array<ISourceItem> = [];

    private recalcPageLength(){
        if(!this.paginationToHeight || !this.pagination) return;
        const paginationHeight = 40;
        const availableHeight = this.clientHeight - paginationHeight - this.headerHeight; 
        this.pageLength = Math.floor(availableHeight / this.rowHeight);
    }
    private sortFunction(
        a: ISourceItem, 
        b: ISourceItem,
        direction: TSortDirections
    ){        
        if(a[this.sort] > b[this.sort]){
            return direction === 'descend' ? -1 : 1;
        }
        if(a[this.sort] < b[this.sort]){
            return direction === 'descend' ? 1 : -1;
        }
        return 0;
    }
    connectedCallback(){
        super.connectedCallback()
        const data = this.columns.filter(it => it.defaultSort)[0];
        this.sort = data.key;
    }
    hasFilters(){
        return !!this.columns.map(it => it.filters?.filter(it => it.checked).length).filter(it => it).length;
    }
    getFilteredData(){
        if(!this.hasFilters()){
            return [...this.dataSource];
        }
        
        const filters: IFilters[] = [];
        this.columns.forEach(col => col.filters?.forEach(f => f.checked ? filters.push({...f, key: col.key}) : ''));

        return this.dataSource.filter(it => {
            const rowFilters: boolean[] = [];
            filters.forEach(filter => {
                const rowValue = it[filter.key];
                if(!filter.type || filter.type === 'checkbox'){
                    rowFilters.push(rowValue === filter.value);
                }
                else if(filter.type === 'input' && filter.value){
                    if(filter.onFilter){
                        rowFilters.push(filter.onFilter(filter.value, it));
                    }
                    else{
                        rowFilters.push(rowValue == filter.value);
                    }
                }
            });
            if(!rowFilters.filter(it => it)[0]){
                return false;
            }
            return true;
        });
        
    }
    willUpdate(){
        this.recalcPageLength();
        const dataSource = this.getFilteredData();
        if(this.sort){
            const data = this.columns.filter(it => it.key === this.sort)[0];
            const sorter = (a: ISourceItem, b: ISourceItem) => {
                if(typeof data.sorter === 'function'){
                    return data.sorter(a, b, this.sortDirection);
                }
                return this.sortFunction(a, b, this.sortDirection);
            }
            dataSource.sort(sorter);
        }
        this._data = dataSource;

    }
    private _headerTemplate(){
        return this.columns.map((col, i) => {
            return html`<table-header 
                @changeFilter = "${this._changeFilter}"
                .sort = "${this.sort}"
                .sortDirection = "${this.sortDirection}"
                .item = "${col}"></table-header>`
        })
    }
    private _rowsTemplate(){
        return repeat(
            this.pagination 
                ? this._data.slice(this.page * this.pageLength, (this.page + 1) * this.pageLength) 
                : this._data, 
            it => it.key, 
            it => html`
            <table-row>
                ${this.columns.map((col, i) => {
                    return html`<table-cell>${it[col.key]}</table-cell>`
                })}
            </table-row>`
        )
    }

    render(){
        return html`
        <div class = "content" 
             @changeSort = "${this._onSortChanged}">
            <table-row>
                ${this._headerTemplate()}
            </table-row>
            ${ this._rowsTemplate() }
        </div>
        ${this.pagination 
            ? html`<pagination-element 
                        @changed = "${this._onPageChanged}"
                        .length = "${this._data.length}"
                        .pageLength = "${this.pageLength}" 
                        .page = "${this.page}"
                ></pagination-element>` 
            : nothing
        }`;
    }
    private _changeFilter(e: CustomEvent){
        const item = e.detail;
        this.columns = this.columns.map(it => it.key === item.key ? item : it);
    }
    private _onSortChanged(e: CustomEvent){
        this.sort = e.detail.sort;
        this.sortDirection = e.detail.direction;
        this.requestUpdate();
    }
    private _onPageChanged(e: CustomEvent){
        this.page = e.detail;
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'table-element': TableElement;
    }
}