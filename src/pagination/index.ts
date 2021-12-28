import { customElement, property } from 'lit/decorators';
import { LitElement, css, html } from 'lit';
import '../icon'
import '../number'

export interface IPaginationProps{
    page: number
    pageLength: number
    length: number
}

@customElement("lit-pagination")
export class LitPagination extends LitElement{
    @property({type: Number}) page: number | null = 0;
    @property({type: Number}) pageLength: number = 5;
    static get properties(){
        return {
            length: {type: Number}
        }
    }
    static styles = [
        css`
        :host{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            
        }
        lit-numberfield{
            --lit-input-align: center;
            --lit-input-font-size: 12px;
            --lit-input-padding: 3px 6px;
            width: 40px;
        }
        button{
            box-sizing: border-box;
            padding: 3px 7px;
            outline: none;
            border: none;
            background: transparent;
            color: var(--lit-font-color, black);
            margin: 0 1px;
            cursor: pointer;
            border-radius: 2px;
            font-size: var(--lit-font-size, 12px);
        }
        button.selected{
            background-color: var(--lit-button-background, #eee);
        }
        button:not(:focus):hover{
            background-color: var(--lit-button-background-hover, #eee);
        }
        .arrow-right{
            transform-origin: center;
            transform: rotate(-90deg);
        }
        .arrow-left{
            transform-origin: center;
            transform: rotate(90deg);
        }
        .page-list{
            margin-left: 5px;
            font-size: var(--lit-font-size, 12px);
        }
    `
    ];
    _length: number = 20;

    get length(){
        return this._length;
    }
    set length(value: number){
        const oldValues = this._length;
        this._length = value
        this.requestUpdate('length', oldValues);
        if((this.page || 0) * this.pageLength > this.length){
            this.setPage(Math.floor(this.length / this.pageLength))
        }
    }
    get pageCount(){
        return Math.max(Math.ceil(this.length / this.pageLength) - 1, 0);
    }
    get pageList(){
        const pagesCount = this.pageCount;
        const page = this.page || 0;
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
            if(a > b) return 1;
            if(a < b) return -1;
            return 0;
        });
        const newArr: {value: number, label: string}[] = [];
        for(let i = 0; i < list.length; i++){
            newArr.push({
                value: list[i],
                label: (list[i] + 1).toString()
            });
            if(list[i + 1] - list[i] > 1){
                newArr.push({
                    value: Math.round(list[i] + (list[i + 1] - list[i]) / 2), 
                    label: '..'
                });
            }
        }
        return newArr;
    }
    setPage(page: number | null){
        if(page === null){
            this.page = null;
        }
        else{
            if(page > this.pageCount) page = this.pageCount;
            this.page = page;
        }
        // this.page = page;
        console.log(page)
        this.dispatchEvent(new CustomEvent('changed', {
            detail: page
        }));
    }
    getPage(){
        return this.page === null ? 0 : this.page + 1;
    }
    private _pagesTemplate(){        
        return this.pageList.map(n => 
        html`<button type = "button"
                    data-page = "${n.value}"
                    @click = "${this._onChange}"
                    class = "${n.value === this.page ? 'selected' : ''}">${n.label}</button>`);
    }
    render(){
        console.log(this.page)
        return html`
        <button @click = "${this._decrementPage}" 
                type = "button">
            <lit-icon class = "arrow-left" icon = "arrow-down-2"></lit-icon>
        </button>
        <lit-numberfield 
            type = "number"
            .min = "${1}"
            decimals = "0"
            .max = "${this.pageCount + 1}"
            .valueAsNumber = "${this.getPage() as any}"
            @changed = "${this._onInputChange}"
            .decimals = "${0}"
        ></lit-numberfield>                
        <button @click = "${this._incrementPage}" 
                type = "button">
            <lit-icon class = "arrow-right" icon = "arrow-down-2"></lit-icon>
        </button>
        <div class = "page-list">${this._pagesTemplate()}</div>`;
    }

    private _onChange(e: Event){
        const page = Number((e.target as HTMLElement).dataset.page as string);
        this.setPage(page);
    }
    private _onInputChange(e: CustomEvent){
        if(!e.detail){
            this.setPage(null);
        }
        else{
            this.setPage(e.detail - 1);
        }
        
    }
    private _incrementPage(){
        this.setPage(this.page || 0 + 1);
    }
    private _decrementPage(){
        this.setPage(this.page || 0 - 1);
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-pagination': LitPagination;
    }
}