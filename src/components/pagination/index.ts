import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import '../icon'
import '../number'
import {paginationStyles} from './style'

export interface IPaginationProps{
    page: number
    pageLength: number
    length: number
}

@customElement('lit-pagination')
export class LitPagination extends LitElement{
    @property({type: Number}) pageLength = 5
    static get properties(){
        return {
            length: {type: Number},
            page: {type: Number},
        }
    }
    static styles = paginationStyles


    _page: number | null = 0
    set page(value: null | number){
        //this._page = value;
        const oldValue = this._page
        this._page = this._calcPage(value)
        this.requestUpdate('page', oldValue)
    }
    get page(){
        return this._page
    }

    _length = 20

    get length(){
        return this._length
    }
    set length(value: number){
        const oldValues = this._length
        this._length = value
        this.requestUpdate('length', oldValues)
        const newPage = this._calcPage(this.page)
        if(newPage !== this.page){
            this._setPage(newPage)
        }
        /*if((this.page || 0) * this.pageLength > this.length){
            this._setPage(Math.floor(this.length / this.pageLength))
        }*/
    }
    get pageCount(){
        return Math.max(Math.ceil(this.length / this.pageLength), 0)
    }
    get pageList(){
        const pagesCount = this.pageCount - 1
        const page = this.page || 0
        const list: number[] = [...new Set([
            0, pagesCount, 
            page, 
            //this.page - 2, 
            page - 1,
            //this.page + 2, 
            page + 1,
        ])]
        .filter(n => n >= 0 && n <= pagesCount)
        .sort((a, b) => {
            if(a > b) return 1
            if(a < b) return -1
            return 0
        })
        const newArr: {value: number, label: string}[] = []
        for(let i = 0; i < list.length; i++){
            newArr.push({
                value: list[i],
                label: (list[i] + 1).toString()
            })
            if(list[i + 1] - list[i] > 1){
                newArr.push({
                    value: Math.round(list[i] + (list[i + 1] - list[i]) / 2), 
                    label: '..'
                })
            }
        }
        return newArr
    }
    public getPage(){
        return this.page === null ? 0 : this.page + 1
    }
    public next(){
        this._setPage((this.page || 0) + 1)
    }
    public prev(){
        this._setPage((this.page || 0) - 1)
    }
    private _calcPage(page: number | null): null | number{
        if((page || 0) < 0) {
            return 0
        }
        if(page === null){
            return null
        }
        if(page >= this.pageCount) {
            return this.pageCount - 1
        }
        return page
    }
    setPage(page: number){
        this._setPage(page)
        this.shadowRoot?.querySelectorAll('lit-button').forEach(n => n.blur())
    }
    private _setPage(page: number | null){
        const oldValue = this.page
        this.page = page
        if(this.page !== oldValue){
            this.dispatchEvent(new CustomEvent('changed', {
                detail: this.page
            }))
        }
    }
    private _pagesTemplate(){        
        return this.pageList.map(n => 
        html`<lit-button 
                borderless
                type = "button"
                size = "small"
                data-page = "${n.value}"
                @click = "${this._onChange}"
                class = "${n.value === this.page ? 'selected' : ''}">${n.label}</lit-button>`)
    }
    render(){
        return html`
        <lit-button 
            borderless
            size = "small"
            @click = "${this.prev}" 
            type = "button">
            <lit-icon class = "arrow-left" icon = "arrow-down-2"></lit-icon>
        </lit-button>
        <lit-numberfield 
            type = "number"
            .min = "${1}"
            decimals = "0"
            .max = "${this.pageCount }"
            .valueAsNumber = "${this.getPage() as any}"
            @changed = "${this._onInputChange}"
            .decimals = "${0}"
        ></lit-numberfield>                
        <lit-button 
            @click = "${this.next}" 
            borderless
            size = "small"
            type = "button">
            <lit-icon class = "arrow-right" icon = "arrow-down-2"></lit-icon>
        </lit-button>
        <div class = "page-list">${this._pagesTemplate()}</div>`
    }

    private _onChange(e: Event){
        const page = Number((e.target as HTMLElement).dataset.page as string)
        this._setPage(page)
    }
    private _onInputChange(e: CustomEvent){
        if(!e.detail){
            this._setPage(null)
        }
        else{
            this._setPage(e.detail - 1)
        }                
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-pagination': LitPagination;
    }
}