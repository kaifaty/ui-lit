import { ifDefined } from 'lit/directives/if-defined';
import { classMap } from 'lit/directives/class-map';
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import { TColumnItem, TFilterItem } from './table';
import { noselect } from '../styles/noselect';
import '../text-field';
import '../number';
import { ClickController } from '../controllers/ClickController';
import { isClickInElement } from 'kailib';

@customElement('table-header')
export class TableHeader extends LitElement{
    static styles = [css`
    :host{
        padding: var(--cell-header-padding, 0 15px);
        font-weight: 600;
        position: relative;
        --icon-font-size: 8px;
        --icon-color: rgba(0,0,0,0.2);
    }
    :host(:not(:last-child))::after{
        content: '';
        position: absolute;
        width: 1px;
        height: 50%;
        display: inline-block;
        background-color: rgba(0,0,0,0.1);
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
    }
    .sort-icons{
        display: flex;
        padding: 0 5px 0 10px;
        flex-direction: column;
        align-items: center;
        line-height: 0.9;
    }
    :host([sortDirection = "descend"]) .sorted icon-element[icon = "dropdown"],
    :host([sortDirection = "ascend"]) .sorted icon-element[icon = "dropup"],
    .filters-checked
    {
        --icon-color: hsl(210, 90%, 60%);
    }
    [icon = "filter"]{
        padding: 6px 5px ;
        border-radius: 3px;
    }
    [icon = "filter"]:hover{
        background-color: rgba(0, 0, 0, 0.1);
        --icon-color: rgba(0, 0, 0, 0.5);
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
        width: 120px;
        border-radius: 5px;
        background-color: #fff;
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
    .row{
        padding: 5px 0;
    }
    `, noselect];
    @property({type: Object}) item?: TColumnItem = undefined;
    @property({type: String}) sort: string = '';
    @property({type: String, reflect: true}) sortDirection: string = 'descend';
    _filterVisible = false;
    get filterVisible(){
        return this._filterVisible;
    }
    set filterVisible(value: boolean){
        const oldValue = this._filterVisible;
        this._filterVisible = value;
        this.requestUpdate('filterVisible', oldValue);
    }
    
    _clickController = new ClickController(this);
    

    get directions() {
        return this.item?.sortDirections || ['ascend', 'descend'];
    }

    private _getNewDirection(){
        const directions = this.directions;

        if(this.isSort && directions.length > 1){
            return this.sortDirection === 'descend' ? "ascend" : "descend";
        }
        return directions[0];
    }
    get isSort(){
        return this.sort === this.item?.key;
    }
    private _sortTemplate(){
        if(this.item?.sorter){
            
            return html`<div class = "sort-icons">
                ${this.directions.map(it => {
                    if(it ==='ascend'){
                        return html`<icon-element icon = "dropup"></icon-element>`;
                    }
                    else {
                        return html`<icon-element icon = "dropdown"></icon-element>`
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
        return html`<icon-element 
                        @click = "${this._onFilterToggle}" 
                        class = "${classMap(map)}"
                        icon = "filter"></icon-element>`;
    }
    private _filterItemTemplate(item: TFilterItem, i: number){
        if(item.type === 'checkbox' || !item.type){
            return html`<div class = "flex-center">
                <checkbox-element 
                    .checked = "${item.checked || false}"
                    name = "${i}" 
                    type = "checkbox"></checkbox-element> ${item.text}
            </div>`;
        }
        if(item.type === 'input' && typeof item.value === 'number'){
            return html`
                <label-text>
                    ${item.text}
                    <number-field 
                        name = "${i}" 
                        value = "${item.value}"
                        placeholder = "${ifDefined(item.placeholder)}"></number-field>
                </label-text>`;
        }
        if(item.type === 'input'){
            return html`
                <label-text>
                    ${item.text}
                    <text-field 
                        name = "${i}" 
                        value = "${item.value}"
                        placeholder = "${ifDefined(item.placeholder)}"></text-field>
                </label-text>`;
        }
        return nothing;
    }
    private _filterTemplate(){
        if(!this.filterVisible) return nothing;
        return html`<form-element 
                    @submit = "${this._onSubmitFilter}"
                    class = "filter-template">
                <div class = "rows">
                    ${this.item!.filters!.map((it, i) => html`<div class = "row">${this._filterItemTemplate(it, i)}</div>`)}
                </div>
                <footer>
                    <button-element 
                        @click = "${this._onReset}"
                        borderless
                        type = "button"
                        size = "small">Reset</button-element>
                    <button-element 
                        type = "submit"
                        primary 
                        size = "small">OK</button-element>
                </footer>
            </form-element>`;
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
        ${this._filterTemplate()}
        `;
    }
    private _onFilterToggle(e: Event){
        e.stopPropagation();
        this.filterVisible = !this.filterVisible;
    }
    private _onChangeSort(){
        if(!this.item?.sorter) return;
        this.dispatchEvent(new CustomEvent("changeSort", {
            detail: {
                sort: this.item!.key,
                direction: this._getNewDirection()
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
                checked: !!data[i],
                value: data[i]
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
      'table-header': TableHeader;
    }
}