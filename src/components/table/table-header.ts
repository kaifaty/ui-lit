import {getHost, isClickInElement} from '@kai/utils'
import {css, html, LitElement, nothing} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'
import {classMap} from 'lit/directives/class-map.js'
import {ifDefined} from 'lit/directives/if-defined.js'

import {definable, stylable} from '../../mixins'
import {noselect} from '../../styles/noselect'
import {LitButton} from '../button'
import {LitDivider} from '../divider'
import {PREFIX} from '../sidebar/styles.map'
import {LitTextfield} from '../textfield'

import {LitIcon} from './../icon/icon.component'
import {tableCSSMap} from './styles.map'
import type {LitTable} from './table.component'
import type {TColumnItem, TFilterItem, TSortDirections,} from './types'


import '../number'
import '../select'


export const filterWidth = 265

let dialogOpened = false


@customElement('lit-table-header')
export class LitTableHeader extends stylable(definable(LitElement), tableCSSMap, PREFIX){
    static define(name?: string){
        LitTextfield.define()
        LitButton.define()
        LitDivider.define()
        super.define(name)

    }
    static styles = [
        css`
        :host{
            ${LitIcon.cssKey('color')}: ${LitTableHeader.cssVar('header-icon-color')};
            ${LitIcon.cssKey('font-size')}: 8px;
            --left-offset: initial;
            --right-offset: initial;
            background-color: ${LitTableHeader.cssVar('header-background')};
            display: flex;
            font-size: ${LitTableHeader.cssVar('header-font-size')};
            font-weight: 600;
            height: 100%;
            padding: ${LitTableHeader.cssVar('header-padding')};
            position: relative;
        }
        
        .sort-icons{
            display: flex;
            padding: ${LitTableHeader.cssVar('header-sort-padding')};
            flex-direction: column;
            align-items: center;
            line-height: 0.9;
            margin-left: 4px;
        }
        :host([sortDirection = "descend"]) .sorted lit-icon[icon = "dropdown"],
        :host([sortDirection = "ascend"]) .sorted lit-icon[icon = "dropup"],
        .filters-checked{
            ${LitIcon.cssKey('color')}: ${LitTableHeader.cssVar('header-icon-color-selected')};
        }
        [icon = "filter"]{
            padding: ${LitTableHeader.cssVar('header-filter-padding')};
            border-radius: 3px;
        }
        .sort-icons[hover],
        [icon = "filter"][hover]{
            background-color: ${LitTableHeader.cssVar('header-icon-background-hover')};
            ${LitIcon.cssKey('color')}: ${LitTableHeader.cssVar('header-icon-color-hover')};
        }
        .sorter{
            cursor: pointer;
        }
        .wrapper{
            display: flex;
            align-items: center;
        }
        .filter-template{
            background-color: ${LitTableHeader.cssVar('header-content-background')};
            border-radius: 5px;
            box-shadow: 0 0 6px ${LitTableHeader.cssVar('header-content-shadow')};
            box-sizing: border-box;
            display: grid;
            font-size: 12px;
            font-weight: 400;
            gap: 10px;
            grid-template-rows: auto 25px;
            left: var(--left-offset);
            padding: 10px;
            position: absolute;
            right: var(--right-offset);
            top: 1px;
            width: ${filterWidth}px;
            z-index: 3;
            
        }
        .filter-template footer{
            display: flex;
            justify-content: space-between;
        
        }
        .filter-template checkbox-element{
            margin-right: 7px;
        }
        lit-label{
            flex-direction: column;
            align-items: start;
            text-align: left;
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
        `, 
        noselect]
    
    @property({type: String, reflect: true}) align = 'left'
    @property({type: Object}) item?: TColumnItem
    @property({type: Array}) filters?: TFilterItem[]
    @property({type: String}) sort = ''
    @property({type: String, reflect: true}) sortDirection = 'ascend'
    private _filterVisible = false
    private _host: LitTable | null = null
    @state() _sortHover = false
    @state() _filterHover = false
    
    connectedCallback(){
        super.connectedCallback()
        this.sortDirection = this.directions[0] || 'ascend'
        this._host = getHost(this)! as LitTable
    }
    willUpdate() {
        if(this.filterVisible && this._host?.rect){  
            const width = this.clientWidth     
            const avalableLeft = this.offsetLeft + width
            const avalableRight = this._host.rect.width - this.offsetLeft

            const overflowLeft = filterWidth - avalableLeft > 0
            const overflowRight = filterWidth - avalableRight > 0

            if(!overflowRight){
                this.style.setProperty('--left-offset', '1px')
                this.style.setProperty('--right-offset', 'initial')
            }
            else if(!overflowLeft){
                this.style.setProperty('--left-offset', 'initial')
                this.style.setProperty('--right-offset', '1px')
            }
            else if(avalableRight > avalableLeft)
            {
                this.style.setProperty('--left-offset', `-${this.offsetLeft - 5}px`)
                this.style.setProperty('--right-offset', 'initial')
            }
            else{
                this.style.setProperty('--left-offset', 'initial')
                this.style.setProperty('--right-offset', `-${avalableRight - width - 5}px`)
            }
        }
    }
    get filterVisible(){
        return this._filterVisible
    }
    set filterVisible(value: boolean){
        const oldValue = this._filterVisible
        this._filterVisible = value
        this.requestUpdate('filterVisible', oldValue)
    }
    get isSort(){
        return this.sort === this.item?.key
    }

    get directions() {
        return this.item?.sortDirections || ['ascend', 'descend']
    }

    get filtersData(){
        return this.filters || this.item?.filters
    }

    private _getNewDirection(){
        const directions = this.directions
        const index = directions.indexOf(this.sortDirection as TSortDirections)
        
        if(index === -1 || !this.isSort){
            return directions[0]
        }
        if(directions.length - 1 < index){
            return ''
        }
        return directions[index + 1]
    }
    private _pointer =  (type: string, state: boolean) => {
        if(type === 'sort' && !this._sortHover){
            this._sortHover = state
        }
        if(type === 'filter' && !this._filterHover){
            this._filterHover = state
        }
    }
    private _hover = (type: string, state: boolean) => {
        if(type === 'sort'){
            this._sortHover = state
        }
        if(type === 'filter'){
            this._filterHover = state
        }
    }
    /** Templates */
    private _sortTemplate(){
        if(this.item?.sorter){        
            return html`<div 
                @mouseover = "${() => this._hover('sort', true)}" 
                @mouseout = "${() => this._hover('sort', false)}" 
                @pointerdown = "${() => this._pointer('sort', true)}" 
                @pointerup = "${() => this._pointer('sort', false)}" 
                ?hover = "${this._sortHover}"
                class = "sort-icons">
                ${this.directions.slice().sort().map(it => {
                    if(it ==='ascend'){
                        return html`<lit-icon icon = "dropup"></lit-icon>`
                    }
                    else {
                        return html`<lit-icon icon = "dropdown"></lit-icon>`
                    }
                })}
            </div>`
        }
    }
    private _filterIconTemplate(){
        if(!this.filtersData) return nothing
        const map = {
            'filters-checked': this.filtersData.filter(it => it.checked).length
        }
        return html`<lit-icon 
                        @click = "${this._onFilterToggle}" 
                        @mouseover = "${() => this._hover('filter', true)}" 
                        @mouseout = "${() => this._hover('filter', false)}" 
                        @pointerdown = "${() => this._pointer('filter', true)}" 
                        @pointerup = "${() => this._pointer('filter', false)}" 
                        ?hover = "${this._filterHover}"
                        class = "${classMap(map)}"
                        icon = "filter"></lit-icon>`
    }

    private _filterItemTemplate(item: TFilterItem, i: number){
        console.log(item.value)
        let type = item.type
        const value = Array.isArray(item.value) ? item.value[0] : item.value
        if(item.type === 'number'){
            type = 'text'
        }
        if(type === 'checkbox' || !item.type){
            return html`
                <lit-label>
                    ${item.text}
                </lit-label>
                <lit-checkbox 
                    .checked = "${item.checked || false}"
                    name = "${i}"></lit-checkbox>`
        }
        else if(type === 'number'){
            return html`
                <lit-label>
                    ${item.text}
                </lit-label>
                <lit-numberfield 
                    name = "${i.toString()}" 
                    value = "${item.value}"
                    placeholder = "${ifDefined(item.placeholder)}"></lit-numberfield>`
        }
        else if(
            type === 'text' || 
            type === 'date'
        ){
            /// text 
            return html`
                <lit-label>
                    ${item.text}
                </lit-label>
                <lit-textfield 
                    type = "${type}"
                    name = "${i.toString()}" 
                    value = "${value}"
                    placeholder = "${ifDefined(item.placeholder)}"></lit-textfield>`
        }
        else if(
            type === 'select'
        ){
            return html`
                <lit-label>
                    ${item.text}
                </lit-label>
                <lit-select 
                    name = "${i.toString()}" 
                    searchable
                    multiple
                    listboxPosition = "top"
                    placeholder = "${ifDefined(item.placeholder)}">
                    ${
                        item.items?.map(it => 
                            html`<lit-option 
                                .selected = "${Array.isArray(item.value) 
                                    ? item.value.includes(it) 
                                    : item.value === it
                                    }"
                                value = "${it}">${it}</lit-option>`)
                    }
                </lit-select>`
        }
        return nothing
    }
    private _filterTemplate(){
        if(!this.filterVisible) return nothing
        return html`<lit-form 
                        @submit = "${this._onSubmitFilter}"
                        class = "filter-template">
                    <div class = "rows">
                        ${this.filtersData!.map((it, i) => 
                            html`<div class = "row">
                                    ${it.title && html`<div style = "grid-column: 1/3;">${it.title}</div>`}
                                    ${this._filterItemTemplate(it, i)}
                                    ${it.divider && html`<lit-divider style = "grid-column: 1/3;"></lit-divider>`}
                                </div>`
                        )}
                    </div>
                    <footer>
                        <lit-button 
                            @click = "${this._onReset}"                            
                            type = "button"
                            size = "small">Reset</lit-button>
                        <lit-button 
                            type = "submit"
                            primary 
                            size = "small">OK</lit-button>
                    </footer>
                </lit-form>`
    }


    render(){
        const map = {
            'wrapper': true,
            'noselect': true,
            'sorted': this.isSort,
            'sorter': !!this.item?.sorter
        }
        return html`<div 
            @click = "${this._onChangeSort}" 
            class = "${classMap(map)}">
            <div>${this.item?.title}</div>${this._sortTemplate()}${this._filterIconTemplate()}
        </div>
        ${this._filterTemplate()}`
    }

    private _onFilterToggle(e: Event){
        //e.stopPropagation();
        // Скрывать если открыт фильтр, предотвращать клик на смену сортировки
        // 
        if(!this.filterVisible){
           this._showFilter()
        }
        else{
            this._hideFilter()
        }
    }
    private _showFilter = () => {
        this.filterVisible = true
        dialogOpened = true
        document.addEventListener('click', this._documentClick)
    }
    private _hideFilter = () => {
        this.filterVisible = false
        dialogOpened = false
        document.removeEventListener('click', this._documentClick)
    }
    private _documentClick = (e: Event) => {
        if(!isClickInElement(e, this)){
            this._onFilterToggle(e)
        }
    }
    private _onChangeSort(){
        if(dialogOpened) return
        if(!this.item?.sorter) return
        const direction = this._getNewDirection()
        this.dispatchEvent(new CustomEvent('changeSort', {
            detail: {
                sort: direction ? this.item!.key : '',
                direction
            },
            bubbles: true
        }))
    }
    private _onSubmitFilter(e: CustomEvent){
        this._hideFilter()
        const data = e.detail.data

        const filters = this.filtersData!.map((it, i) => {
            if(!it.type || it.type === 'checkbox'){
                return {
                    ...it, 
                    checked: data[i]
                }
            }
            if(it.type === 'select'){
                return {
                    ...it, 
                    value: data[i],
                    checked: Boolean(data[i].length)
                }
            }
            return {
                ...it, 
                value: data[i], 
                checked: !!data[i]
            }
        })
        console.log(filters)
        this.dispatchEvent(new CustomEvent('changeFilter', {
            detail: {key: this.item?.key, filters},
            bubbles: true,
            composed: true,
        }))
    }

    private _onReset(){
        this._hideFilter()
        this.dispatchEvent(new CustomEvent('resetFilter', {
            detail: this.item?.key,
            bubbles: true,
            composed: true,
        }))
    }

}
declare global {
    interface HTMLElementTagNameMap {
      'lit-table-header': LitTableHeader;
    }
}