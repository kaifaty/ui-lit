interface Focusable extends HTMLElement {
  autofocus: boolean
  readonly isFocused: boolean
  focus(): void
}

type Constructor<T> = new (...args: any[]) => T

export const focusable = <T extends Constructor<HTMLElement>>(superClass: T) => {
  /**
   * @attr {boolean} autofocus - Auto focus on element after it was connected
   */
  return class FocusableElement extends superClass implements Focusable {
    private _getElement() {
      return this.shadowRoot?.querySelector('input, button, textarea, [autofocus]')
    }
    get isFocused() {
      const autofocus = this.shadowRoot?.querySelector('[autofocus]')
      if (autofocus) {
        return (autofocus as Focusable).isFocused
      }
      return !!this.shadowRoot?.querySelector('*:focus')
    }
    connectedCallback(): void {
      super.connectedCallback()

      setTimeout(() => {
        if (this.hasAttribute('autofocus')) {
          this.focus()
        }
      })
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
  } as Constructor<Focusable> & T
}
