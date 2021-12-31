import { ifDefined } from 'lit/directives/if-defined';
import { classMap } from 'lit/directives/class-map';
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { TColumnItem, TFilterItem, TSortDirections,  } from './table';
import type { TableElement  } from './table';
import { noselect } from '../styles/noselect';
import '../textfield';
import '../number';
import { isClickInElement, getHost } from 'kailib';


const filterWidth = 230;
@customElement('lit-table-header')
export class LitTableHeader extends LitElement{
    static styles = [css`
    :host{
        padding: var(--lit-cell-header-padding, 0 15px);
        font-weight: 600;
        font-size: var(--lit-table-header-font-size, inherit);
        --lit-icon-font-size: 8px;
        --lit-icon-color: var(--lit-table-icon-color, rgba(0,0,0,0.2));
        background-color: var(--lit-table-header-background, #eee);
        position: relative;
        display: flex;
        height: 100%;
        
    }
    
    .sort-icons{
        display: flex;
        padding: var(--lit-table-sort-padding, 0 5px);
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
    .filters-checked{
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
    }
    .filter-template{
        position: absolute;
        font-size: 12px;
        top: 1px;
        left: 1px;
        font-weight: 400;
        padding: 10px;
        width: ${filterWidth}px;
        border-radius: 5px;
        background-color: var(--lit-table-filter-content-background, #fff);
        box-shadow: 0 0 6px rgba(0,0,0,0.6);
        z-index: 1;
        display: grid;
        grid-template-rows: auto 25px;
        gap: 10px;
        
    }
    :host([right]) .filter-template{
        right: 1px;
        left: initial;
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
    `, noselect];
    
    @property({type: String, reflect: true}) align: string = 'left';
    @property({type: Object}) item?: TColumnItem;
    @property({type: Array}) filters?: TFilterItem[];
    @property({type: String}) sort: string = '';
    @property({type: String, reflect: true}) sortDirection: string = 'ascend';
    _filterVisible = false;
    _host: TableElement | null = null
    
    connectedCallback(){
        super.connectedCallback();
        this.sortDirection = this.directions[0] || 'ascend';
        this._host = getHost(this)! as TableElement;
    }
    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(this.filterVisible && this._host?.rect){
            if(this.offsetLeft + filterWidth > this._host.rect.width){
                this.setAttribute("right", '');
            }
            else{
                this.removeAttribute("right");
            }
        }
    }
    get filterVisible(){
        return this._filterVisible;
    }
    set filterVisible(value: boolean){
        const oldValue = this._filterVisible;
        this._filterVisible = value;
        this.requestUpdate('filterVisible', oldValue);
    }
    get isSort(){
        return this.sort === this.item?.key;
    }

    get directions() {
        return this.item?.sortDirections || ['ascend', 'descend'];
    }

    get filtersData(){
        return this.filters || this.item?.filters;
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

    /** Templates */
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
        if(!this.filtersData) return nothing;
        const map = {
            "filters-checked": this.filtersData.filter(it => it.checked).length
        }
        return html`<lit-icon 
                        @click = "${this._onFilterToggle}" 
                        class = "${classMap(map)}"
                        icon = "filter"></lit-icon>`;
    }
    private _filterItemTemplate(item: TFilterItem, i: number){
        let type = item.type;
        if(item.type === 'number'){
            type = 'text';
        }
        if(type === 'checkbox' || !item.type){
            return html`
                <lit-label>
                    ${item.text}
                </lit-label>
                <lit-checkbox 
                    .checked = "${item.checked || false}"
                    name = "${i}"></lit-checkbox>`;
        }
        if(type === 'number'){
            return html`
                <lit-label>
                    ${item.text}
                </lit-label>
                <lit-numberfield 
                    name = "${i.toString()}" 
                    value = "${item.value}"
                    placeholder = "${ifDefined(item.placeholder)}"></lit-numberfield>`;
        }
        if(
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
        if(!this.filterVisible){
           this._showFilter()
        }
        else{
            this._hideFilter();
        }
    }
    private _showFilter = () => {
        this.filterVisible = true;
        document.addEventListener('click', this._documentClick);
    }
    private _hideFilter = () => {
        this.filterVisible = false;
        document.removeEventListener('click', this._documentClick);
    }
    private _documentClick = (e: Event) => {
        if(!isClickInElement(e, this)){
            this._onFilterToggle(e);
        }
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
        this._hideFilter()
        const data = e.detail.data;
        const filters = this.filtersData!.map((it, i) => {
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
            detail: {key: this.item?.key, filters},
            bubbles: true
        }));
    }

    private _onReset(){
        this._hideFilter()
        this.dispatchEvent(new CustomEvent("resetFilter", {
            detail: this.item?.key,
            bubbles: true
        }))
    }

}
declare global {
    interface HTMLElementTagNameMap {
      'lit-table-header': LitTableHeader;
    }
}