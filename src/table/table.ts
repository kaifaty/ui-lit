import { LitElement, html, css, nothing, TemplateResult, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { repeat } from 'lit/directives/repeat';
import '../pagination';
import { scrollbar } from '../styles/scrollbar';
import { ResizeObserverController } from '../controllers/ResizeObserverController';

export type ISourceItem = {
    key: string;
    [key: string]: string | number | Record<string, any>;
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
    valueFn?: (data: any) => string | TemplateResult
    filters?: TFilterItem[];
    //onFilter?: (value: string, record: ISourceItem) => boolean;
    sorter?: boolean | ((a: ISourceItem, b: ISourceItem, direction: TSortDirections) => number); 
    sortDirections?: TSortDirections[];
    defaultSort?: boolean
}
export type TSortDirections = 'ascend' | 'descend';

const nodataSVG = svg`
<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
<path d="M117.92 114.453L12.7467 9.22665L5.92 16L16 26.1333V101.333C16 104.162 17.1238 106.875 19.1242 108.876C21.1246 110.876 23.8377 112 26.6667 112H101.867L111.147 121.227L117.92 114.453ZM26.6667 101.333V36.7467L91.2533 101.333H26.6667ZM43.7333 26.6667L33.0667 16H101.333C104.162 16 106.875 17.1238 108.876 19.1242C110.876 21.1246 112 23.8377 112 26.6667V94.9333L101.333 84.2667V26.6667H43.7333Z" />
</svg>`;

@customElement("lit-table")
export class TableElement extends LitElement{
    static get properties(){
        return {
            columns: {type: Array},
            rowHeight: {type: Number},
            headerHeight: {type: Number},
        }
    }
    static styles = [css`
    :host{
        display: block;
        --lit-cells: 4;
        --row-height: 30px;
        --header-height: 50px;
        font-size: var(--lit-table-font-size);
    }
    :host([pagination]){
        display: grid;
        grid-template-rows: auto 26px;
    }
    .content{
        display: grid;
        grid-template-columns: var(--lit-table-cells, repeat(var(--lit-cells), auto));
        align-content: start;
        overflow-y: auto;
    }
    .content.nodata{
        align-content: stretch;
        grid-template-rows: var(--header-height) auto;
    }
    lit-pagination{
        display: flex;
        align-content: end;
    }
    footer{
        display: flex;
        justify-content: space-between;
    }
    .flex-content{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        grid-column: 1 / calc(var(--lit-cells) + 1);
        opacity: 0.1;
    }
    .flex-content svg{
        fill: var(--lit-icon-color);
    }
    `, scrollbar];
    RO = new ResizeObserverController(this);
    _columns: TColumnItem[] = [];
    set columns(value: TColumnItem[]){
        const oldValue = this._columns;
        this._columns = value;
        if(oldValue.length !== value.length){
            this.style.setProperty('--lit-cells', this.columns.length.toString());
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
            this.style.setProperty('--header-height', this._headerHeight + "px");
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
    _rect: DOMRect | null = null;

    private recalcPageLength(){
        if(!this.paginationToHeight || !this.pagination || !this._rect) return;
        const availableHeight = this._rect!.height - this.headerHeight; 
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
        if(data){
            this.sort = data.key;
            this.sortDirection = data.sortDirections?.[0] || 'descend';
        }
    }
    hasFilters(){
        return !!this.columns
                    .map(it => it.filters?.filter(it => it.checked).length)
                    .filter(it => it).length;
    }
    getFilteredData(){
        if(!this.hasFilters()){
            return [...this.dataSource];
        }
        const cols: Record<string, TFilterItem[]> = {};

        this.columns.forEach?.(col => col.filters?.forEach(f => {
            if(f.checked){
                if(!cols[col.key]) cols[col.key] = [];
                cols[col.key].push(f);
            }
        }));
        return this.dataSource.filter(it => {
            const keys = Object.keys(cols);
            for(const key of keys){
                const rowFilters: boolean[] = [];
                const rowValue = it[key];
                cols[key].forEach(f => {
                    if(!f.type || f.type === 'checkbox'){
                        rowFilters.push(
                            f.onFilter 
                                ? f.onFilter(f.value, it)
                                : rowValue === f.value
                        );
                    }
                    else if(f.type === 'input' && f.value){
                        if(f.onFilter){
                            rowFilters.push(f.onFilter(f.value, it));
                        }
                        else{
                            rowFilters.push(rowValue == f.value);
                        }
                    }
                });
                if(!rowFilters.filter(it => it)[0]){
                    return false;
                }
            };
            return true;
        });
        
    }
    willUpdate(){
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
            return html`<lit-table-header 
                @changeFilter = "${this._changeFilter}"
                .sort = "${this.sort}"
                .sortDirection = "${this.sortDirection}"
                .item = "${col}"></lit-table-header>`
        });
    }
    private _rowsTemplate(){
        return repeat(
            this.pagination 
                ? this._data.slice(this.page * this.pageLength, (this.page + 1) * this.pageLength) 
                : this._data, 
            it => it.key, 
            it => html`
            <lit-table-row>
                ${this.columns.map((col, i) => {
                    return html`<lit-table-cell>${col.valueFn ? col.valueFn(it) : it[col.key]}</lit-table-cell>`
                })}
            </lit-table-row>`
        )
    }
    private _onResize = (rect: DOMRect) => {
        this._rect = rect;
        this.recalcPageLength();
    }
    render(){
        return html`
        <div class = "content ff-scrollbar ${!this._data.length ? 'nodata' : ''}" 
            ${this.RO.observe(this._onResize)}
             @changeSort = "${this._onSortChanged}">
            <lit-table-row>
                ${this._headerTemplate()}
            </lit-table-row>
            ${
                !this._data.length 
                    ? html`<div class = "flex-content">
                                ${nodataSVG}
                           </div>` 
                    : this._rowsTemplate()
            }
        </div>
        <footer>
            ${this.pagination
                ? html `<lit-pagination 
                            @changed = "${this._onPageChanged}"
                            .length = "${this._data.length}"
                            .pageLength = "${this.pageLength}" 
                            .page = "${this.page}"
                    ></lit-pagination>`
                : nothing
            }
            <slot></slot>
        </footer>`;
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
      'lit-table': TableElement;
    }
}