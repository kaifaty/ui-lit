import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../ripple';
import type { LitSelect } from './select';

@customElement("lit-option")
export class LitOption extends LitElement{
    static styles = css`
    lit-ripple{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 7px 18px;
        white-space: nowrap;
        position: relative;
        contain: content;
    }
    :host span::after{
        content: '';
        border-radius: 8px;
        width: 8px;
        height: 8px;
        position: absolute;
        top: 2px;
        left: 2px;
    }
    lit-ripple[pressed] span::after{
        opacity: 0.5;
        background-color:  var(--lit-option-circle, hsl(246, 65%, 69%));
    }
    :host([selected]) span::after{
        width: 8px;
        height: 8px;
        background-color:  var(--lit-option-circle, hsl(246, 65%, 69%));
    }
    span{
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-left: 15px;
        border-radius: 12px;
        border: 2px solid var(--lit-option-circle, hsl(246, 65%, 69%));
        position: relative;
    }
    `;
    // @property({type: Boolean, reflect: true}) disabled: boolean = false;
    @property({type: Boolean, reflect: true}) selected: boolean = false;
    @property({type: String}) label: string = '';
    @property({type: String}) value: string = '';
    private _selectHost: LitSelect | null = null
    
    setSelectHost(host: LitSelect){
        this._selectHost = host;
    }
    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('click', this._select);        
        this.dispatchEvent(new CustomEvent('optionConnected', {
            bubbles: true,
            composed: true,
            detail: this
        }))
    }
    disconnectedCallback(): void {
        super.disconnectedCallback();
        this._selectHost?.optionDisconnect(this)
        this.removeEventListener('click', this._select);
    }
    private _select = () => {
        this.dispatchEvent(new CustomEvent('optionSelect', {
            detail: this.value,
            composed: true,
            bubbles: true
        }))
    }
    updated(_changedProperties: Map<string | number | symbol, unknown>): void {
        this.ariaLabel = this.label || this.textContent || "";
    }

    render(){
        return html`<lit-ripple><slot></slot> <span></span></lit-ripple>`
    }
}