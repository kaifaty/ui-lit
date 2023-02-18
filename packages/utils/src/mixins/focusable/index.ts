type FocusableProps = {
  autofocus: boolean
  readonly isFocused: boolean
  focus(): void
}
type Focusable<T extends Constructor<HTMLElement>> = T & Constructor<FocusableProps>

type Constructor<T> = new (...args: any[]) => T

export function focusable<T extends Constructor<HTMLElement>>(superClass: T): Focusable<T> {
  /**
   * @attr {boolean} autofocus - Auto focus on element after it was connected
   */
  return class FocusableElement extends superClass {
    private _getElement() {
      return this.shadowRoot?.querySelector('input, button, textarea, a, [autofocus]')
    }
    get isFocused() {
      const autofocus = this.shadowRoot?.querySelector<HTMLElement & FocusableProps>('[autofocus]')
      if (autofocus) {
        return autofocus.isFocused
      }
      return Boolean(this.shadowRoot?.querySelector('*:focus'))
    }
    blur() {
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
  }
}
