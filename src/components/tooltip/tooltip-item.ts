import {isClickInElement} from '@kai/utils'
import {html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import {tooltipStyles} from './styles'

/**
 * @tag tooltip-item
 */
@customElement('tooltip-item')
export class TooltimItem extends LitElement{
    static styles = tooltipStyles
    @property({type: Object}) props: Record<string, string> | null = null
    @property({type: Boolean, attribute: true, reflect: true}) visible = false

    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(_changedProperties.has('props') && this.props){
            this.style.top = this.props.top
            this.style.bottom = this.props.bottom
            this.style.left = this.props.left
            this.style.right = this.props.right
        }
    }
    connectedCallback(): void {
        super.connectedCallback()
        setTimeout(() => {
            document.addEventListener('click', this._onClick)
        })
    }
    disconnectedCallback(): void {
        super.connectedCallback()
        document.removeEventListener('click', this._onClick)
    }

    firstUpdated(){
        setTimeout(() => {
            this.visible = true
        }, 1)
    }
    private _onClick = (e: Event) => {        
        if(!isClickInElement(e, this)){
            this._onClose()
        }
    }
    
    render(){
        return html`
        <div><slot></slot></div>
        <lit-icon 
            @click = "${this._onClose}"
            icon = "cancel"></lit-icon>`
    }
    private _onClose(){
        this.dispatchEvent(new CustomEvent('close'))
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'tooltip-item': TooltimItem;
    }
}
