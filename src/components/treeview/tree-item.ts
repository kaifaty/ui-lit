import {html, LitElement} from 'lit'
import {property} from 'lit/decorators.js'

import {definable} from '../../mixins/definable'
import {PREFIX} from '../sidebar/styles.map'

import {treeItemStyles} from './styles'



export class LitTreeItem extends definable(LitElement){
    static styles = [
        treeItemStyles
    ]
    @property({type: String, reflect: true, attribute: true}) value = ''
    @property({type: String, reflect: true, attribute: true}) href = ''

    connectedCallback(){
        super.connectedCallback()
        this.addEventListener('click', this._onClick)
    }
    disconnectedCallback(){
        super.disconnectedCallback()
        this.removeEventListener('click', this._onClick)
    }

    updateSelection(selected: string){
        const isSelected = selected === this.value
        if(this.hasAttribute('selected') !== isSelected){
            isSelected 
                ? this.setAttribute('selected', '')
                : this.removeAttribute('selected')
        }
        if(isSelected){
            this.dispatchEvent(new CustomEvent('subviewSelected', {
                detail: isSelected,
                bubbles: true
            }))
        }
         
    }
    private _onClick(){
        this.dispatchEvent(new CustomEvent('changed', {
            detail: this.value,
            bubbles: true
        }))
    }
    render(){
        if(this.href){
            return html`<a href = "${this.href}"><slot></slot></a>`
        }
        return html`<slot></slot>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-tree-item': LitTreeItem;
    }
}