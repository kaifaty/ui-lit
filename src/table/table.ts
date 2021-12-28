import { classMap } from 'lit/directives/class-map';
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
export type TFilterType = 'checkbox' | 'text' | 'number' | 'date';
export interface TFilterItem {
    divider?: boolean,
    title?: string;
    text: string;
    value: string | number | boolean;
    checked?: boolean;
    placeholder?: string;
    //name?: string
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
    width?: number
    defaultSort?: boolean
    align?: string
    ellipses?: boolean
    halfHidden?: (data: any) => boolean
}
export type TSortDirections = 'ascend' | 'descend';

const nodataSVG = svg`
<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
<path d="M46.0625 44.7083L4.97917 3.60416L2.3125 6.24999L6.25 10.2083V39.5833C6.25 40.6884 6.68899 41.7482 7.47039 42.5296C8.25179 43.311 9.3116 43.75 10.4167 43.75H39.7917L43.4167 47.3542L46.0625 44.7083ZM10.4167 39.5833V14.3542L35.6458 39.5833H10.4167ZM17.0833 10.4167L12.9167 6.24999H39.5833C40.6884 6.24999 41.7482 6.68898 42.5296 7.47038C43.311 8.25178 43.75 9.31159 43.75 10.4167V37.0833L39.5833 32.9167V10.4167H17.0833Z"/>
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
        display: grid;
        --lit-cells: 4;
        --row-height: 30px;
        --header-height: 50px;
        font-size: var(--lit-table-font-size);
        position: relative;
    }
    :host([pagination]){
        display: grid;
        grid-template-rows: auto 26px;
    }
    
    :host(:not([pagination])){
        
    }
    :host(:not([pagination])) footer{
        display: none;
    }
    .content{
        display: grid;
        grid-template-columns: var(--lit-table-cells, repeat(var(--lit-cells), auto));
        align-content: start;
        overflow-y: auto;
        height: 100%;
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
        min-height: 100px;
    }
    .flex-content svg{
        fill: var(--lit-icon-color);
    }
    
    .ellipses{
        overflow: hidden; 
    }
    .ellipses > *{
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: nowrap;
    }
    lit-table-cell .full-content{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    `, scrollbar];
    private  RO = new ResizeObserverController(this);
    private  _columns: TColumnItem[] = [];
    set columns(value: TColumnItem[]){
        const oldValue = this._columns;
        this._columns = value;
        if(oldValue.length !== value.length){
            this.style.setProperty('--lit-cells', this.columns.length.toString());
        }
        this._updateSort();
        this.requestUpdate('columns', oldValue);
    }
    get columns(){
        return this._columns;
    }
    private _headerHeight: number = 50;
    set headerHeight(value: number){
        const oldValue = this._headerHeight;
        this._headerHeight = value;
        if(oldValue !== value){
            this.style.setProperty('--header-height', this._headerHeight + "px");
        }
        this.requestUpdate('headerHeight', value)
    }
    get headerHeight(){return this._headerHeight}

    private  _rowHeight: number = 30;
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
    @state() sortDirection: TSortDirections = 'ascend';
    @state() page: number = 0;
    private _data: Array<ISourceItem> = [];
    private _rect: DOMRect | null = null;
    private _stopResize = false;

    private _filters: Map<string, TFilterItem[]> = new Map();
/*
    connectedCallback(): void {
        super.connectedCallback()
        setTimeout(() => {
            this.requestUpdate();
        }, 5000);
    }
    */
    get rect(){
        return this._rect;
    }
    private recalcPageLength(){
        if(!this.paginationToHeight || !this.pagination || !this._rect  || this._stopResize) return;
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
    private _updateSort(){
        const data = this.columns.filter(it => it.defaultSort)[0];
        if(data && data?.key !== this.sort){
            this.sort = data.key;
            this.sortDirection = data.sortDirections?.[0] || 'ascend';
        }
    }
    hasFilters(){
        return !!this._filters.size
    }
    getFilteredData(){
        if(!this.hasFilters()){
            return [...this.dataSource];
        }
        const cols: Record<string, TFilterItem[]> = {};

        for(const [key, filters] of this._filters){
            filters?.forEach(f => {
                if(f.checked){
                    if(!cols[key]) cols[key] = [];
                    cols[key].push(f);
                }
            })
        }

        return this.dataSource.filter(it => {
            const keys = Object.keys(cols);
            for(const key of keys){
                const rowFilters: boolean[] = [];
                cols[key].forEach(f => {
                    if (f.value) {
                        const result = f.onFilter 
                                        ? f.onFilter(f.value, it)
                                        : it[key] == f.value
                        rowFilters.push(result);
                    }
                });
                if (rowFilters.length && rowFilters.filter(it => !it)[0] === false) {
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
            if(data){
                const sorter = (a: ISourceItem, b: ISourceItem) => {
                    if(typeof data.sorter === 'function'){
                        return data.sorter(a, b, this.sortDirection);
                    }
                    return this.sortFunction(a, b, this.sortDirection);
                }
                dataSource.sort(sorter);
            }
        }
        this._data = dataSource;

    }
    private _headerTemplate(){
        return this.columns.map((col, i) => {
            return html`<lit-table-header 
                .filters = "${this._filters.get(col.key)}"
                @changeFilter = "${this._changeFilter}"
                @resetFilter = "${this._resetFilter}"
                style = "min-width: ${col.width ? col.width + "px" : "auto" }"
                .align = "${col.align || "left"}"
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
            <lit-table-row 
            
            >
                ${this.columns.map((col, i) => {
                    const classes = {
                        ellipses: !!col.ellipses,
                        'half-hidden': col.halfHidden ? col.halfHidden(it) : false
                    }                    
                    return html`<lit-table-cell 
                                    .align = "${col.align || "left"}"
                                    class = "${classMap(classes)}">${col.valueFn ? col.valueFn(it) : it[col.key]}</lit-table-cell>`
                })}
            </lit-table-row>`
        )
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
                            @focus = "${this._onFocus}"
                            @blur = "${this._onBlur}"
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
    
    private _onResize = (rect: DOMRect) => {
        this._rect = rect;
        this.recalcPageLength();
        this.dispatchEvent(new CustomEvent('tableResize', {
            detail: rect
        }));
        Promise.resolve().then(() => {
            this.recalcPageLength();
        })
    }
    private _onFocus(){
        this._stopResize = true;
    }
    private _onBlur(){
        this._stopResize = false;
    }
    private _changeFilter(e: CustomEvent){
        const item = e.detail as {key: string, filters: TFilterItem[]};
        this._filters.set(item.key, item.filters);
        this.requestUpdate();
    }
    private _resetFilter(e: CustomEvent){
        this._filters.delete(e.detail);
        this.requestUpdate();
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