import { selectCSSVarNames } from './../select/styles';
import { ifDefined } from 'lit/directives/if-defined';
import { classMap } from 'lit/directives/class-map';
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TColumnItem, TFilterItem, TSortDirections,  } from './interface';
import type { TableElement  } from './table';
import { noselect } from '../styles/noselect';
import '../textfield';
import '../number';
import '../divider';
import '../button';
import '../select';
import { isClickInElement, getHost } from 'kailib';
import { tableHeaderStyles, filterWidth } from './styles';


let dialogOpened = false;
@customElement('lit-table-header')
export class LitTableHeader extends LitElement{
    static styles = [
        css`
        ${selectCSSVarNames.listboxHeight}: var(--max-select-height);
        `,
        tableHeaderStyles, 
        noselect];
    
    @property({type: String, reflect: true}) align: string = 'left';
    @property({type: Object}) item?: TColumnItem;
    @property({type: Array}) filters?: TFilterItem[];
    @property({type: String}) sort: string = '';
    @property({type: String, reflect: true}) sortDirection: string = 'ascend';
    private _filterVisible = false;
    private _host: TableElement | null = null;
    @state() _sortHover = false;
    @state() _filterHover = false;
    
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
    private _pointer =  (type: string, state: boolean) => {
        if(type === "sort" && !this._sortHover){
            this._sortHover = state;
        }
        if(type === "filter" && !this._filterHover){
            this._filterHover = state;
        }
    }
    private _hover = (type: string, state: boolean) => {
        if(type === "sort"){
            this._sortHover = state;
        }
        if(type === "filter"){
            this._filterHover = state;
        }
    }
    /** Templates */
    private _sortTemplate(){
        if(this.item?.sorter){        
            return html`<div 
                @mouseover = "${() => this._hover("sort", true)}" 
                @mouseout = "${() => this._hover("sort", false)}" 
                @pointerdown = "${() => this._pointer("sort", true)}" 
                @pointerup = "${() => this._pointer("sort", false)}" 
                ?hover = "${this._sortHover}"
                class = "sort-icons">
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
                        @mouseover = "${() => this._hover("filter", true)}" 
                        @mouseout = "${() => this._hover("filter", false)}" 
                        @pointerdown = "${() => this._pointer("filter", true)}" 
                        @pointerup = "${() => this._pointer("filter", false)}" 
                        ?hover = "${this._filterHover}"
                        class = "${classMap(map)}"
                        icon = "filter"></lit-icon>`;
    }

    protected updated(_changedProperties: Map<string | number | symbol, unknown>): void {
        
    }

    private _filterItemTemplate(item: TFilterItem, i: number){
        let type = item.type;
        const value = Array.isArray(item.value) ? item.value[0] : item.value;
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
        else if(type === 'number'){
            return html`
                <lit-label>
                    ${item.text}
                </lit-label>
                <lit-numberfield 
                    name = "${i.toString()}" 
                    value = "${item.value}"
                    placeholder = "${ifDefined(item.placeholder)}"></lit-numberfield>`;
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
                    placeholder = "${ifDefined(item.placeholder)}"></lit-textfield>`;
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
                    value = "${value}"
                    placeholder = "${ifDefined(item.placeholder)}">
                    ${
                        item.items?.map(it => html`<lit-option 
                            ?selected = "${Array.isArray(item.value) ? item.value.includes(it) : false}"
                            value = "${it}">${it}</lit-option>`)
                    }
                </lit-select>`;
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
        //e.stopPropagation();
        // Скрывать если открыт фильтр, предотвращать клик на смену сортировки
        // 
        if(!this.filterVisible){
           this._showFilter()
        }
        else{
            this._hideFilter();
        }
    }
    private _showFilter = () => {
        this.filterVisible = true;
        dialogOpened = true;
        document.addEventListener('click', this._documentClick);
    }
    private _hideFilter = () => {
        this.filterVisible = false;
        dialogOpened = false;
        document.removeEventListener('click', this._documentClick);
    }
    private _documentClick = (e: Event) => {
        if(!isClickInElement(e, this)){
            this._onFilterToggle(e);
        }
    }
    private _onChangeSort(){
        if(dialogOpened) return;
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
            if(it.type === 'select'){
                return {
                    ...it, 
                    value: data[i],
                    checked: data[i].length
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
            bubbles: true,
            composed: true,
        }));
    }

    private _onReset(){
        this._hideFilter()
        this.dispatchEvent(new CustomEvent("resetFilter", {
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