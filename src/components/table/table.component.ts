
import {css, html, LitElement, nothing, svg} from 'lit'
import {property, state} from 'lit/decorators.js'
import {classMap} from 'lit/directives/class-map.js'
import {repeat} from 'lit/directives/repeat.js'


import '../pagination'
import {ResizeObserverController} from '../../controllers/resize-observer'
import {definable, stylable} from '../../mixins'
import {scrollbar} from '../../styles/scrollbar'
import {PREFIX} from '../sidebar/styles.map'

import {LitIcon} from './../icon/icon.component'
import {LitText} from './../text'
import {tableCSSMap} from './styles.map'
import {LitTableHeader} from './table-header'
import type {ISourceItem, TColumnItem, TFilterItem, TRowSelected, TSortDirections} from './types'


const nodataSVG = svg`
<svg class = "nodata-svg" width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
<path d="M46.0625 44.7083L4.97917 3.60416L2.3125 6.24999L6.25 10.2083V39.5833C6.25 40.6884 6.68899 41.7482 7.47039 42.5296C8.25179 43.311 9.3116 43.75 10.4167 43.75H39.7917L43.4167 47.3542L46.0625 44.7083ZM10.4167 39.5833V14.3542L35.6458 39.5833H10.4167ZM17.0833 10.4167L12.9167 6.24999H39.5833C40.6884 6.24999 41.7482 6.68898 42.5296 7.47038C43.311 8.25178 43.75 9.31159 43.75 10.4167V37.0833L39.5833 32.9167V10.4167H17.0833Z"/>
</svg>`


export class LitTable extends stylable(definable(LitElement), tableCSSMap, PREFIX){
    static define(name?: string){
        LitTableHeader.define()
        super.define(name)
    }
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
        font-size: ${LitTable.cssVar('font-size')};
        position: relative;
    }
    :host([pagination]){
        display: grid;
        grid-template-rows: auto 26px;
    }
    :host(:not([pagination])) footer{
        display: none;
    }
    
    table{
        border-collapse: collapse;
        width: 100%;
    }
    table.nodata {
        height: 100%;
    }
    table.nodata td{
        height: auto;
    }
    tbody td{
        padding: ${LitTable.cssVar('cell-header-padding')};
        height:  var(--row-height);
        white-space: nowrap;
    }
    tbody td.ellipses{
        max-width: 1px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    tbody td.half-hidden{
        opacity: 0.5;
    }
    tbody td.status-error{
        color: ${LitText.cssVar('color-danger')};
        ${LitIcon.cssKey('color')}: ${LitText.cssVar('color-danger')}
    }
    th{
        height: var(--header-height, 35px);
        padding: 0;
        color: ${LitTable.cssVar('header-color')};
    }
    
    
    th:not(:last-child) lit-table-header::after{
        content: '';
        position: absolute;
        width: 1px;
        height: 50%;
        display: inline-block;
        background-color: ${LitTable.cssVar('header-separator-color')};
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
    }
    tbody tr{
        cursor: ${LitTable.cssVar('cursor')}; 
    }
    tbody tr:hover{
        background-color: ${LitTable.cssVar('row-hover')};
    }
    tbody tr.selected{
        background-color: ${LitTable.cssVar('row-selected')};
    }
    main{
        overflow-y: auto;
    }
    .nodata svg{
        fill: ${LitIcon.cssKey('color')};
        opacity: 0.1;
    }
    lit-pagination{
        display: flex;
        align-content: end;
    }
    footer{
        display: flex;
        justify-content: space-between;
    }
    .ellipses.col-wrapper{
        display: flex;
        align-items: center;
        overflow:hidden;
    }
    .ellipses.col-wrapper > *{
        text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
    }
    `, scrollbar]
    private  RO = new ResizeObserverController(this)
    private  _columns: TColumnItem[] = []
    set columns(value: TColumnItem[]){
        const oldValue = this._columns
        this._columns = value
        if(oldValue.length !== value.length){
            this.style.setProperty('--lit-cells', this.columns.length.toString())
        }
        this._updateSort()
        this.requestUpdate('columns', oldValue)
    }
    get columns(){
        return this._columns
    }
    private _headerHeight = 50
    set headerHeight(value: number){
        const oldValue = this._headerHeight
        this._headerHeight = value
        if(oldValue !== value){
            this.style.setProperty('--header-height', this._headerHeight + 'px')
        }
        this.requestUpdate('headerHeight', value)
    }
    get headerHeight(){return this._headerHeight}

    private  _rowHeight = 30
    set rowHeight(value: number){
        const oldValue = this._rowHeight
        this._rowHeight = value
        if(oldValue !== value){
            this.style.setProperty('--row-height', this._rowHeight + 'px')
        }
        this.requestUpdate('rowHeight', value)
    }
    get rowHeight(){return this._rowHeight}

    @property({type: Object}) rowSelect?: TRowSelected
    @property({type: Array}) dataSource: Array<ISourceItem> = []
    @property({type: Boolean, reflect: true}) pagination = false
    @property({type: Boolean}) paginationToHeight = false
    @property({type: Number}) pageLength = 5
    @state() sort = ''
    @state() sortDirection: TSortDirections = 'ascend'
    @state() page = 0
    private _data: Array<ISourceItem> = []
    private _rect: DOMRect | null = null
    private _stopResize = false

    private _filters: Map<string, TFilterItem[]> = new Map()

    setPage(page: number){
        this.shadowRoot?.querySelector('lit-pagination')?.setPage(page)
    }
    get rect(){
        return this._rect
    }
    private recalcPageLength(){
        if(!this.paginationToHeight || !this.pagination || !this._rect  || this._stopResize) return
        const availableHeight = this._rect!.height - this.headerHeight 
        this.pageLength = Math.floor(availableHeight / this.rowHeight)
    }
    private sortFunction(
        a: ISourceItem, 
        b: ISourceItem,
        direction: TSortDirections
    ){        
        if(a[this.sort] > b[this.sort]){
            return direction === 'descend' ? -1 : 1
        }
        if(a[this.sort] < b[this.sort]){
            return direction === 'descend' ? 1 : -1
        }
        return 0
    }
    private _updateSort(){
        if(this.sort) return
        const data = this.columns.filter(it => it.defaultSort)[0]
        if(data && data?.key !== this.sort){
            this.sort = data.key
            this.sortDirection = data.sortDirections?.[0] || 'ascend'
        }
    }
    hasFilters(){
        return !!this._filters.size
    }
    getFilteredData(){
        if(!this.hasFilters()){
            return [...this.dataSource]
        }
        const cols: Record<string, TFilterItem[]> = {}

        for(const [key, filters] of this._filters){
            filters?.forEach(f => {
                if(f.checked){
                    if(!cols[key]) cols[key] = []
                    cols[key].push(f)
                }
            })
        }

        return this.dataSource.filter(it => {
            const keys = Object.keys(cols)            
            for(const key of keys){
                const data = cols[key].filter(f => f.value || f.checked)
                if(!data.length){
                    continue
                }
                let colFilter = false
                for(const f of cols[key]){
                    if(f.onFilter){
                        if(f.onFilter(f.value, it, this._filters)){
                            colFilter = true
                        }
                    }
                    else if(Array.isArray(f.value)){
                        if(f.value.includes(it[key]) || f.value.includes(it[key].toString())){
                            colFilter = true
                        }
                    }
                    else if(it[key] === f.value){
                        colFilter = true
                    }
                    if(colFilter){
                        break
                    }
                };
                if (!colFilter) {
                    return false
                }
            };
            return true
        })
        
    }
    willUpdate(){
        const dataSource = this.getFilteredData()
        if(this.sort){
            const data = this.columns.filter(it => it.key === this.sort)[0]
            if(data){
                const sorter = (a: ISourceItem, b: ISourceItem) => {
                    if(typeof data.sorter === 'function'){
                        return data.sorter(a, b, this.sortDirection)
                    }
                    return this.sortFunction(a, b, this.sortDirection)
                }
                dataSource.sort(sorter)
            }
        }
        this._data = dataSource

    }
    getColumnFilters(key: string){
        const filters = this._filters.get(key)
        const CFilters = this.columns.filter(c => c.key === key)[0].filters!
        
        return filters?.map((f, i) => ({...f, text: CFilters[i].text})) || CFilters
    }
    setFilter(key: string, id: number, filter: TFilterItem){
        const filters = this.getColumnFilters(key)
        if(filters && id < filters.length){
            filters[id] = filter
        }
        this._filters.set(key, filters || [filter])
        this.requestUpdate()
    }
    private _headerTemplate(){
        return this.columns.map((col, i) => {
            return html`<th>
                <lit-table-header 
                    .filters = "${this.getColumnFilters(col.key)}"
                    @changeFilter = "${this._changeFilter}"
                    @resetFilter = "${this._resetFilter}"
                    style = "min-width: ${col.width ? col.width + 'px' : 'auto' }"
                    .align = "${col.align || 'left'}"
                    .sort = "${this.sort}"
                    .sortDirection = "${this.sortDirection}"
                    .item = "${col}"></lit-table-header>
            </th>`
        })
    }
    private _rowsTemplate(){
        return repeat(
            this.pagination 
                ? this._data.slice(this.page * this.pageLength, (this.page + 1) * this.pageLength) 
                : this._data, 
            it => it.key, 
            it => html`
            <tr @click = "${this._onRowClick}" 
                class = "${this.rowSelect?.(it) ? 'selected' : ''}"
                data-key = "${it.key}">
                ${this.columns.map((col, i) => {
                    const classes = {
                        ellipses: !!col.ellipses,
                        ['status-' + (col.getStatus?.(it) || 'none')]: true,
                        'half-hidden': col.halfHidden ? col.halfHidden(it) : false
                    }                    
                    return html `<td .align = "${col.align || 'left'}"
                                     style = "width: ${col.percent ? col.percent + '%' : 'auto'}"
                                     class = "${classMap(classes)}">
                                    <div 
                                        style = "min-width: ${col.width ? col.width + 'px' : 'auto'}"
                                         class = "col-wrapper ${col.ellipses ? 'ellipses' : ''}">
                                        ${col.valueFn ? col.valueFn(it) : it[col.key]}
                                    </div>
                                </td>`
                })}
            </tr>`
        )
    }
    render(){
        return html`
        <main class = "ff-scrollbar" ${this.RO.observe(this._onResize)}>
            <table class = " ${!this._data.length ? 'nodata' : ''}" 
                    @changeSort = "${this._onSortChanged}">
                <thead>
                    <tr>
                        ${this._headerTemplate()}
                    </tr>
                </thead>
                <tbody>
                ${
                    !this._data.length 
                        ? html`<tr><td colspan = "200" style = "text-align: center;">
                                    ${nodataSVG}
                                </td></tr>` 
                        : this._rowsTemplate()
                }
                </tbody>
            </table>
        </main>
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
        </footer>`
    }

    private _onRowClick(e: Event){
        const key = (e.target as HTMLElement).closest('tr')?.dataset.key
        this.dispatchEvent(new CustomEvent('rowClick', {
            detail: key,
            bubbles: true,
            composed: true
        }))
    }
    private _onResize = (rect: DOMRect) => {
        this._rect = rect
        this.recalcPageLength()
        this.dispatchEvent(new CustomEvent('tableResize', {
            detail: rect
        }))
        Promise.resolve().then(() => {
            this.recalcPageLength()
        })
    }
    private _onFocus(){
        this._stopResize = true
    }
    private _onBlur(){
        this._stopResize = false
    }
    private _changeFilter(e: CustomEvent){
        const item = e.detail as {key: string, filters: TFilterItem[]}
        this._filters.set(item.key, item.filters)
        this.requestUpdate()
    }
    private _resetFilter(e: CustomEvent){
        this._filters.delete(e.detail)
        this.requestUpdate()
    }
    private _onSortChanged(e: CustomEvent){
        this.sort = e.detail.sort
        this.sortDirection = e.detail.direction
        this.requestUpdate()
    }
    private _onPageChanged(e: CustomEvent){
        this.page = e.detail
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-table': LitTable;
    }
}