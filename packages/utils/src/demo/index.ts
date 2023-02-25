import {FormAssociated} from '../form-assosiated/index'
import {definable} from '../mixins/definable/index'

class TestAssoc extends definable(FormAssociated) {
  shadowRoot = this.attachShadow({mode: 'open'})
  private _template = document.createElement('template')
  connectedCallback(): void {
    super.connectedCallback()
    this._template.innerHTML = `<div>Message</div>`
    this.shadowRoot.appendChild(this._template.content.cloneNode(true))
  }
}

TestAssoc.define('test-assoc')
