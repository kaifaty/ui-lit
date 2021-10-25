import { customElement, property } from 'lit/decorators';
import { LitElement, css, html } from 'lit';
import '../icon'
import '../number'

export interface IPaginationProps{
    page: number
    pageLength: number
    length: number
}

@customElement("pagination-element")
export class PaginationElement extends LitElement{
    @property({type: Number}) page: number = 0;
    @property({type: Number}) pageLength: number = 5;
    @property({type: Number}) length: number = 20;
    static styles = [
        css`
        :host{
            display: flex;
            align-items: center;
            box-sizing: border-box;
        }
        number-field{
            --input-align: center;
            --input-font-size: 12px;
            width: 40px;
        }
        button{
            box-sizing: border-box;
            padding: 3px 7px;
            outline: none;
            border: none;
            background: transparent;
            color: var(--font-color, black);
            margin: 0 1px;
            cursor: pointer;
            border-radius: 2px;
            font-size: var(--font-size, 12px);
        }
        button.selected{
            background-color: var(--button-background, #eee);
        }
        button:not(:focus):hover{
            background-color: var(--button-background-hover, #eee);
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
            font-size: var(--font-size, 12px);
        }
    `
    ];

    get pageCount(){
        return Math.ceil(this.length / this.pageLength) - 1;
    }
    get pageList(){
        const pagesCount = this.pageCount;
        const list: number[] = [...new Set([
            0, pagesCount, 
            this.page, 
            //this.page - 2, 
            this.page - 1,
            //this.page + 2, 
            this.page + 1,
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
    setPage(page: number){
        const pageCount = this.pageCount;
        if(page < 0) page = 0;
        if(page > pageCount) page = pageCount;
        this.page = page;
        this.dispatchEvent(new CustomEvent('changed', {
            detail: page
        }));
    }

    private _pagesTemplate(){        
        return this.pageList.map(n => 
        html`<button type = "button"
                    data-page = "${n.value}"
                    @click = "${this._onChange}"
                    class = "${n.value === this.page ? 'selected' : ''}">${n.label}</button>`);
    }
    render(){
        return html`
        <button @click = "${this._decrementPage}" 
                type = "button">
            <icon-element class = "arrow-left" icon = "arrow-down-2"></icon-element>
        </button>
        <number-field 
            type = "number"
            .min = "${1}"
            .max = "${this.pageCount + 1}"
            .value = "${(this.page + 1).toFixed(0)}"
            @changed = "${this._onInputChange}"
            .decimals = "${0}"
        ></number-field>                
        <button @click = "${this._incrementPage}" 
                type = "button">
            <icon-element class = "arrow-right" icon = "arrow-down-2"></icon-element>
        </button>
        <div class = "page-list">${this._pagesTemplate()}</div>`;
    }

    private _onChange(e: Event){
        const page = Number((e.target as HTMLElement).dataset.page as string);
        this.setPage(page);
    }
    private _onInputChange(e: CustomEvent){
        this.setPage(e.detail - 1);
    }
    private _incrementPage(){
        this.setPage(this.page + 1);
    }
    private _decrementPage(){
        this.setPage(this.page - 1);
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'pagination-element': PaginationElement;
    }
}