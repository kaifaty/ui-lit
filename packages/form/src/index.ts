import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import type {FormAssociatedElement} from '@ui-lit/types'
import type {LitButton} from '@ui-lit/button'
import type {LitCheckbox} from '@ui-lit/checkbox'
import type {LitNumberField} from '../number'
import type {LitSelect} from '../select'

import '../label'

type TReturnData = Record<string, string | boolean | number | string[]>

export type TAction = (data?: TReturnData) => Promise<TReturnData | false>

/**
 * @fires submit - Submit form data
 *
 * @prop [noValidate = false]
 */

@customElement('lit-form')
export class LitFrom extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  @property({type: Boolean})
  noValidate = false

  @property({type: Object})
  onAction?: TAction

  private _elements: FormAssociatedElement[] = []
  private _defaults: Record<string, string> = {}
  private _button: LitButton | null = null
  private _loading = false

  get button(): LitButton | null {
    if (this._button) return this._button
    const slots = this.querySelectorAll('slot')
    for (const slot of slots) {
      for (const el of slot.assignedElements()) {
        if (el.tagName.toLowerCase() === 'lit-button' && (el as LitButton).type === 'submit') {
          return el as LitButton
        }
      }
    }
    return null
  }
  get length() {
    return this._elements.length
  }
  get elements() {
    return this._elements
  }

  private _disabled = false
  get disabled() {
    return this.disabled
  }
  set disabled(value: boolean) {
    if (value !== this._disabled) {
      this._disabled = value
      this._elements.forEach((el) => (el.disabled = this.disabled))
    }
  }

  render() {
    return html`<slot></slot>`
  }
  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('submitForm', this._handleSubmit)
    this.addEventListener('fromAttached', this._handleFormAttached as EventListener)
    //this.addEventListener("fromDettached", this._handleFormDettached as EventListener);
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('submitForm', this._handleSubmit)
    this.removeEventListener('fromAttached', this._handleFormAttached as EventListener)
    //this.removeEventListener("fromDettached", this._handleFormDettached as EventListener);
  }

  // ==== Events ====
  private _handleSubmit = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()

    this._button = e.target as LitButton
    this.submit()
  }
  private _handleFormAttached = (e: CustomEvent) => {
    this._elements.push(e.detail.element)
    this._addToDefault(e.detail.element)
    e.detail.onAttatch?.(this)
    e.stopPropagation()
  }
  private _addToDefault(el: FormAssociatedElement) {
    if (el.name) {
      this._defaults[el.name] = el.value
    }
  }
  public detatchElement(el: HTMLElement) {
    this._elements = this._elements.filter((it) => el !== it)
  }
  public getData(): TReturnData {
    const data: TReturnData = {}
    this._elements.forEach((it) => {
      if (!it.name || it.disabled) return
      if (it.tagName.toLocaleLowerCase() === 'lit-checkbox') {
        data[it.name] = (it as LitCheckbox).checked
      } else if (it.tagName.toLocaleLowerCase() === 'lit-numberfield') {
        data[it.name] = (it as LitNumberField).valueAsNumber
      } else if (it.tagName.toLocaleLowerCase() === 'lit-range') {
        data[it.name] = (it as LitNumberField).valueAsNumber
      } else if (it.tagName.toLocaleLowerCase() === 'lit-select' && (it as LitSelect).multiple) {
        data[it.name] = (it as LitSelect).selectedValues
      } else {
        data[it.name] = it.value
      }
    })
    return data
  }

  public checkValidity(): boolean {
    for (const el of this.elements) {
      if (!el.checkValidity()) {
        return false
      }
    }
    return true
  }
  public reportValidity(): boolean {
    for (const el of this.elements) {
      el.validate()
      if (!el.reportValidity()) {
        return false
      }
    }
    return true
  }
  private _startLoading() {
    this._loading = true
    if (this.button) {
      this.button.loading = true
    }
  }
  private _stopLoading() {
    this._loading = false
    const btn = this.button
    if (btn) {
      btn.loading = false
    }
    this._button = null
  }
  public async submit(): Promise<false | TReturnData> {
    if (this._loading) return false
    if (!this.noValidate && !this.reportValidity()) {
      return false
    }
    const data = this.getData()
    if (this.onAction) {
      try {
        this._startLoading()
        await this.onAction(data)
        this._stopLoading()
      } catch {
        this._stopLoading()
        return false
      }
    }

    this.dispatchEvent(
      new CustomEvent('submit', {
        detail: {data},
        bubbles: true,
      }),
    )
    return data
  }
  public async reset() {
    // Check tabss on reset
    this.elements.forEach((it) => {
      if (!['lit-tabs', 'lit-select'].includes(it.tagName.toLowerCase())) {
        it.value = this._defaults[it.name]
        it.notify()
      }
    })
    return new Promise((r) => {
      setTimeout(() => {
        this.elements.forEach((it) => it.validityDefault())
        r(true)
      })
    })
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'lit-form': LitFrom
  }
}
