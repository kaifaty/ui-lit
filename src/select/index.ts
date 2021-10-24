import { classMap } from 'lit/directives/class-map';
import { styleMap } from 'lit/directives/style-map';
import { html, LitElement, css, TemplateResult, nothing } from 'lit';
import { formAssociated } from '../form-associated/index';
import { customElement, property, state } from 'lit/decorators';
import { input } from '../styles/input';
import { getEventDataset, isChildOfElement } from '../helpers';
import { ClickController } from '../controllers/ClickController';
import { KeyDownController } from '../controllers/KeyController';
import { calcPositionForPopup } from '../helpers/position';
import { scrollbar } from '../styles/scrollbar';
import { FormAssociatedProps } from '../form-associated/interface';


export type TSelectItem = {
    text: string | TemplateResult
    value: string
}

export interface IPropsSelect extends FormAssociatedProps{
    items: TSelectItem[],
    disabled: boolean
    optionsWidth: number
    optionsHeight: number

}

@customElement("select-element")
export class SelectElement extends formAssociated(LitElement) implements IPropsSelect{
    static styles = [
        input, 
        scrollbar,
        css`
        :host{
            display: inline-block;
            min-width: 80px;
        }
        .content{
            display: grid;
            background-color: var(--select-background);
            border: 1px solid var(--select-border, #ccc);
            grid-template-columns: auto auto;
            padding: var(--select-padding, 5px 10px);
            cursor: pointer;
        }
        .content:focus{
            outline: 1px solid var(--select-outline-focus, #ccc);
        }
        .options.open{
            display: block;
        }
        .options{
            position: absolute;
            display: none;
            border: 1px solid var(--select-border, #ccc);
            box-sizing: border-box;
            overflow-y: auto;
        }
        .option{
            cursor: pointer;
            padding: var(--option-padding, 5px 10px);
        }
        .option:focus, 
        .option:hover{
            background-color: var(--option-hover, #ccc);
        }
        .disabled{
            opacity: 0.5;
        }
        .icon-dropdown{
            display: flex;
            align-items: center;
            justify-content: end;
        }`
    ];
    @property({type: Array}) items: TSelectItem[] = [];
    @property({type: String}) value: string = '';
    @property({type: Number}) optionsWidth: number = 0;
    @property({type: Number}) optionsHeight: number = 0;
    @state() open: boolean = false;
    private _clickController = new ClickController(this);
    private _keyPressController = new KeyDownController(this);
    private _isFocus = false;
    private _focusTime = 0;
    private _focusedOption: string = '';
    private _optionsPosition = {x: 0, y: 0};

    selected(){
        return this.items.filter(it => this.value === it.value)[0];
    }
    currentOption(){
        return this.items.findIndex(it => it.value === this.value);
    }
    firstUpdated(){
        if(!this.optionsWidth){
            this.optionsWidth = this.clientWidth;
        }
    }
    willUpdate(){
        if(this.open){
            this._optionsPosition = calcPositionForPopup(this, {width: this.optionsWidth, height: this.optionsHeight || 40});
        }
    }
    private _contentTemplate(){
        if(!this.open) return nothing;
        const optionsClass = {
            options: true,
            "ff-scrollbar": true,
            open: this.open,

        }
        const optionStyles = {
            width: this.optionsWidth + "px",
            height: (this.optionsHeight ? this.optionsHeight + "px" : "initial"),
            //transform: `translate(0, 100%);`
            left: this._optionsPosition.x + "px",
            top: this._optionsPosition.y + "px"
        };
        return html`<div
            style = "${styleMap(optionStyles)}"
            class = "${classMap(optionsClass)}">${this.items.map((it, i) => {
            const className = {
                selected: this.value === it.value,
                option: true,
                ['value-' + it.value]: true
            };
            return html`<div 
                tabindex = "0"
                data-index = "${i}"
                data-value = "${it.value}"
                @click = "${this._handleSelectClick}" 
                @focus = "${this._handleOptionFocus}" 
                class = "${classMap(className)}">${it.text}</div>`
        })}</div>`;
    }
    focus(){
        (this.shadowRoot?.querySelector(".content") as HTMLElement)?.focus();
    }
    render(){
        return html`
        <div 
            @click = "${this.handleClick}"
            tabindex = "0"
            class = "content">
            <div>${this.selected()?.text || '-'}</div>
            <slot name = "icon">
                <div class = "icon-dropdown"><icon-element 
                    class = "${this.open ? 'dropup' : ''}" 
                    icon = "dropdown"></icon-element></div>
            </slot>
        </div>
        ${this._contentTemplate()}`;
    }
    
    updated(p: Map<string, unknown>){
        super.updated(p);
        if(this.open){
            (this.shadowRoot?.querySelector(".value-" + this.value) as HTMLElement)?.focus()
        }
    }
    
    setValue(value: string){
        this.value = value;
        this.focus();
    }
    nextSelect(){
        let current = this.currentOption();
        current++;
        if(current > this.items.length - 1){
            current = 0;
        }
        this.setValue(this.items[current].value);
    }
    prevSelect(){
        let current = this.currentOption();
        current--;
        if(current < 0){
            current = this.items.length - 1;
        }
        this.setValue(this.items[current].value);
    }
    private _handleOptionFocus(e: Event){
        this._focusedOption = (e.target as HTMLElement).dataset.value!;
    }
    private _handleSelectClick(e: Event){
        this.setValue(getEventDataset(e, 'value'))
        this.open = false;
        e.stopPropagation();
    }  
    handlekeyDown(e: KeyboardEvent){
        if(e.key === "ArrowDown"){
            this.nextSelect();
        }
        if(e.key === "ArrowUp"){
            this.prevSelect();
        }
        if(e.key === "Enter"){
            if(this.open){                
                this.setValue(this._focusedOption)
                this.open = false;
            }
            else{
                this.open = true;
            }
        }
    }
    handleDocumentClick(e: Event){
        const isChild = isChildOfElement(e.target as HTMLElement, this);
        if(!isChild){
            this.open = false;
        }
    }
    private handleClick(){
        this.open = !this.open;
    }
}

