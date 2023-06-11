import {isiOS, IsSafari} from '@kai/utils'
import {html, nothing, TemplateResult} from 'lit'
import {CSSResult} from 'lit-element'
import {property, state} from 'lit/decorators.js'
import {live} from 'lit/directives/live.js'
import {createRef, ref, Ref} from 'lit/directives/ref.js'

import {definable} from '../../mixins/definable'
import {focusable} from '../../mixins/focusable/index'
import '../icon'
import {labled} from '../../mixins/labled'
import {LitFormAssoc} from '../../nesting/form-assosiated'
import {input} from '../../styles/input'

const _isIOS = isiOS()

export type TInputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'

export type TFileldTypes = 'text' | 'password' | 'date'

export interface TextProps {
  size: number
  minlength: number
  maxlength: number
  readonly: boolean
  withCancalation: boolean
  spellcheck: boolean
  placeholder: string
  inputmode: TInputMode
  pattern: string
  value: string
  icon: string | TemplateResult
  type: TFileldTypes
}

/**
 * #CSS
 *
 * #CSS
 */

export class LitTextfield extends focusable(labled(definable(LitFormAssoc))) implements TextProps {
  static styles = [...(super.elementStyles as CSSResult[]), input]

  static get properties() {
    return {
      value: {type: String},
    }
  }

  @property({type: Number}) size = 0
  @property({type: Number}) minlength = 0
  @property({type: Number}) maxlength = 0
  @property({type: Boolean}) spellcheck = false

  @property({type: String}) pattern = ''
  @property({type: String}) placeholder = ''
  @property({type: String}) autocomplete: 'on' | 'off' | 'current-password' = 'off'
  @property({type: String}) inputmode: TInputMode = 'text'
  @property({type: String}) type: TFileldTypes = 'text'

  @property({type: Boolean}) withCancalation = false
  @property() icon: string | TemplateResult = ''

  #selectionBeforeRender = 0
  #inputRef: Ref<HTMLInputElement> = createRef()

  @state() hiddenPassword = true

  get selectionStart() {
    return this.#inputRef.value?.selectionStart || 0
  }
  get valueAsDate() {
    return new Date(this.value)
  }
  set valueAsDate(value: Date) {
    if (this.type === 'date') {
      this.value = value.toISOString().substring(0, 10)
    }
  }

  get valueAsNumber() {
    if (this.type === 'date') {
      return this.value ? new Date(this.value).getTime() : 0
    }
    return Number(this.value)
  }
  set valueAsNumber(value: number) {
    if (this.type === 'date') {
      this.value = new Date(value).toISOString().substring(0, 10)
    } else {
      this.value = value.toString()
    }
  }

  #value = ''
  get value() {
    return this.#value
  }
  set value(value: string) {
    const oldValue = this.#value
    this.#value = value
    this.requestUpdate('value', oldValue)
  }

  validate(): void {
    if (this.type === 'date') {
      return
    }
    super.validate()
  }

  /** @ignore */
  render() {
    return html` ${super.render()}
      <div class="wrapper">
        <input
          type="${this.#getType()}"
          ${ref(this.#inputRef)}
          autocomplete="${this.autocomplete}"
          placeholder="${this.placeholder}"
          spellcheck="${this.spellcheck}"
          inputmode="${this.inputmode}"
          .readOnly="${this.readonly}"
          .disabled="${this.disabled}"
          size="${this.size}"
          @input="${this.#onInput}"
          @change="${this.#onChange}"
          @click="${this.#onClick}"
          name="${this.name}"
          .value=${live(this.value)}
        />
        ${this.#iconslotTemplate()}
      </div>`
  }

  /** @ignore */
  willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
    super.willUpdate(_changedProperties)
    this.#selectionBeforeRender = this.selectionStart
  }

  /** @ignore */
  updated(_changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(_changedProperties)
    if (this.#selectionBeforeRender !== this.selectionStart && !_isIOS && !IsSafari) {
      this.#inputRef.value?.setSelectionRange(this.#selectionBeforeRender, this.#selectionBeforeRender)
    }
    this.validate()
  }

  /** @ignore */
  #getType() {
    if (this.type === 'password') {
      return this.hiddenPassword ? 'password' : 'text'
    }
    return this.type
  }

  /** @ignore */
  #iconslotTemplate() {
    if (!this.withCancalation) {
      if (this.type === 'password') {
        return html`<div class="icon toggle-password" @click="${this.#toggleHiddenPassword}">
          <lit-icon icon="${this.hiddenPassword ? 'show' : 'hide'}"></lit-icon>
        </div>`
      }

      return html` <div class="icon">
        <slot name="icon"></slot>
      </div>`
    }
    if (!this.value) return nothing
    return html`<lit-icon @click="${this.#clearValue}" icon="cancel" danger class="icon cancel"></lit-icon>`
  }

  /** @ignore */
  #onClick(e: Event) {
    e.stopPropagation()
  }

  /** @ignore */
  #clearValue() {
    this.value = ''
    this.#notify()
  }

  /** @ignore */
  #onChange() {
    this.reportValidity()
    this.#notify()
  }

  /** @ignore */
  #onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value as string
    if (this.inputValidation) {
      this.validate()
      this.reportValidity()
    }
    this.#notify()
  }

  /** @ignore */
  #toggleHiddenPassword() {
    this.hiddenPassword = !this.hiddenPassword
  }

  /** @ignore */
  #notify() {
    this.dispatchEvent(
      new CustomEvent<string>('changed', {
        bubbles: true,
        detail: this.value,
      }),
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-textfield': LitTextfield
  }
  interface HTMLElementEventMap {
    LitTextField: {
      changed: CustomEvent
    }
  }
}
