import {html, LitElement} from 'lit'

import {definable} from '../../mixins/definable'

import {PREFIX, styles} from './styles'

export class LitDescription extends definable(LitElement){
    static styles = styles
    render(){
      return html`<slot></slot>`
    }
}


declare global {
    interface HTMLElementTagNameMap {
      'lit-description': LitDescription;
    }
}