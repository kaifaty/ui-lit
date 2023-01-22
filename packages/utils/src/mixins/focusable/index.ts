import type {LitElement} from 'lit'
import {property} from 'lit/decorators.js'

import {Focusable} from './types.js'

type Constructor<T> = new (...args: any[]) => T

export const focusable = <T extends Constructor<LitElement>>(superClass: T) => {
  class FocusableElement extends superClass implements Focusable {
    @property({type: Boolean, reflect: true}) autofocus = false

    public get isFocused() {
      const focusable = this.shadowRoot?.querySelector('[focusable]')
      if (focusable) {
        return (focusable as Focusable).isFocused
      }
      return !!this.shadowRoot?.querySelector('*:focus')
    }
    private _getElement() {
      return this.shadowRoot?.querySelector('input, button, textarea, lit-button, [focusable]')
    }
    connectedCallback(): void {
      super.connectedCallback()
      this.setAttribute('focusable', '')
    }
    blur(): void {
      const el = this._getElement()
      if (el) {
        ;(el as HTMLElement).blur()
      } else {
        super.blur()
      }
    }
    focus() {
      const el = this._getElement()
      if (el) {
        ;(el as HTMLElement).focus()
        if (el instanceof HTMLInputElement) {
          el.setSelectionRange(el.value.length, el.value.length)
        }
      } else {
        super.focus()
      }
    }

    firstUpdated(props: Map<string | number | symbol, unknown>) {
      super.firstUpdated(props)
      if (this.autofocus) {
        this.focus()
      }
    }
  }

  return FocusableElement as Constructor<Focusable & LitElement> & T
}
