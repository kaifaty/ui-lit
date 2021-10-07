import { classMap } from 'lit/directives/class-map';
import { html, LitElement, css, TemplateResult } from 'lit';
import { formAssociated } from '../form-associated/index';
import { customElement, property, state } from 'lit/decorators';
import { input } from '../styles/input';
import { getEventDataset, isChildOfElement } from '../helpers';
import { ClickController } from '../controllers/ClickController';
import { KeyDownController } from '../controllers/KeyController';


type TSelectItem = {
    text: string | TemplateResult
    value: string
}

export interface IPropsSelect {
    items: TSelectItem[],
    value: string,
    disabled: boolean

}

@customElement("select-element")
export class SelectElement extends formAssociated(LitElement) implements IPropsSelect{
    static styles = [
        input, 
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
    @state() open: boolean = false;
    clickController = new ClickController(this);
    keyPressController = new KeyDownController(this);
    isFocus = false;
    focusTime = 0;
    _focusedOption: string = '';

    selected(){
        return this.items.filter(it => this.value === it.value)[0];
    }
    currentOption(){
        const el = this.shadowRoot?.querySelector(".value-" + this.value) as HTMLElement;
        if(el !== undefined){
            return Number(el.dataset.index);
        }
        return -1;
    }
    firstUpdated(){
        if(!this.optionsWidth){
            this.optionsWidth = this.clientWidth;
        }
    }
    private _contentTemplate(){
        const optionsClass = {
            options: true,
            open: this.open
        }
        return html`<div
            style = "width: ${this.optionsWidth}px;"
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
                @click = "${this._onSelect}" 
                @focus = "${this._onOptionFocus}" 
                class = "${classMap(className)}">${it.text}</div>`
        })}</div>`;
    }
    render(){
        return html`
        <div 
            @click = "${this.onClick}"
            @focus = "${this.onFocus}"
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
    
    nextSelect(){
        let current = this.currentOption();
        current++;
        if(current > this.items.length - 1){
            current = 0;
        }
        this.value = this.items[current].value;

    }
    prevSelect(){
        let current = this.currentOption();
        current--;
        if(current < 0){
            current = this.items.length - 1;
        }
        this.value = this.items[current].value;

    }
    private _onOptionFocus(e: Event){
        this._focusedOption = (e.target as HTMLElement).dataset.value!;
    }
    private _onSelect(e: Event){
        this.value = getEventDataset(e, 'value');
        this.open = false;
        e.stopPropagation();
    }
    
    onkeyDown(e: KeyboardEvent){
        if(e.key === "ArrowDown"){
            this.nextSelect();
        }
        if(e.key === "ArrowUp"){
            this.prevSelect();
        }
        if(e.key === "Enter"){
            if(this.open){
                this.value = this._focusedOption;
                this.open = false;
            }
        }
    }
    onDocumentClick(e: Event){
        const isChild = isChildOfElement(e.target as HTMLElement, this);
        if(!isChild){
            this.open = false;
        }
    }
    private onClick(){
        if(this.isFocus && Date.now() - this.focusTime > 250){
            this.open = !this.open;
        }
    }
    private onBlur(){
        this.open = false;
        this.isFocus = false;
    }
    private onFocus(){
        this.isFocus = true;
        this.focusTime = Date.now();
        this.open = true;
        
    }
}

