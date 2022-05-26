import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { LitSelect } from './select';
import { focusable } from '../mixins/focusable/index';
import { optionStyles } from './styles';
import { mobileAndTabletCheck } from 'kailib';

const options: [LitOption, string][] = []

setInterval(() => {
    options.forEach(item => {
        if(item[1] !== item[0].textContent){
            item[0].notify()
            item[1] = item[0].textContent || ""
        }
    })
}, 600)

@customElement("lit-option")
export class LitOption extends focusable(LitElement){
    static styles = optionStyles;
    // @property({type: Boolean, reflect: true}) disabled: boolean = false;
    @property({type: Boolean, reflect: true}) selected: boolean = false;
    @property({type: Boolean, reflect: true}) disabled: boolean = false;
    @property({type: String}) label: string = '';
    @property({type: String}) value: string = '';
    @property({type: Boolean, reflect: true}) visability: boolean = true;
    @property({type: Boolean, reflect: true}) mobile: boolean = mobileAndTabletCheck();
    private _selectHost: LitSelect | null = null
    
    public setSelectHost(host: LitSelect){
        this._selectHost = host;
    }
    connectedCallback(): void {
        super.connectedCallback();      
        setTimeout(() => {
            options.push([this, this.textContent || ""])
        })
        this.dispatchEvent(new CustomEvent('optionConnected', {
            bubbles: true,
            composed: true,
            detail: this
        }))
    }
    disconnectedCallback(): void {
        super.disconnectedCallback();
        options.filter(item => item[0] !== this)
        this._selectHost?.optionDisconnect(this)
    }
    updated(_changedProperties: Map<string | number | symbol, unknown>): void {
        this.ariaLabel = this.label || this.textContent || "";
    }
    render(){
        return html`<lit-button 
                        ?disabled = "${this.disabled}"
                        @click = "${this.toggleSelect}"
                        between
                        borderless
                        tabIndex = "1"
                        @focus = "${this._focus}" 
                        @blur = "${this._blur}" >
                    <slot @slotchange = "${this.notify}"></slot> <span slot = "icon-after"></span></lit-button>`
    }

    private toggleSelect(){
        this.dispatchEvent(new CustomEvent('optionChange', {
            composed: true,
            bubbles: true,
            detail: this
        }));
    }
    private _focus(){
        document.addEventListener('keydown', this._handleFocus);
    }
    private _blur(){
        document.removeEventListener('keydown', this._handleFocus);
    }
    private _handleFocus = (e: KeyboardEvent) => {
        let event = '';
        if(e.key === 'ArrowDown'){
            event = 'focusNext';
        }
        else if(e.key === 'ArrowUp'){
            event = 'focusPrev';
        }
        if(event){
            this.dispatchEvent(new CustomEvent(event, {
                detail: true,
                bubbles: true,
                composed: true
            }))
        }
    }

    notify(){
        this.dispatchEvent(new CustomEvent('optionSlotChanged', {
            composed: true,
            bubbles: true,
        }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-option': LitOption;
    }
}
