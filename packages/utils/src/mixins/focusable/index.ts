type FocusableProps = {
  autofocus: boolean
  readonly isFocused: boolean
  focus(): void
}
type Focusable<T extends Constructor<HTMLElement>> = T & Constructor<FocusableProps>

type Constructor<T> = new (...args: any[]) => T

const getElement = Symbol()

export function focusable<T extends Constructor<HTMLElement>>(superClass: T): Focusable<T> {
  /**
   * @attr {boolean} autofocus - Auto focus on element after it was connected
   */
  return class FocusableElement extends superClass {
    /**
     * @ignore
     */
    [getElement]() {
      return this.shadowRoot?.querySelector('input, button, textarea, a, [autofocus]')
    }
    connectedCallback() {
      super.connectedCallback?.()
      setTimeout(() => {
        if (this.hasAttribute('autofocus')) {
          this.focus()
        }
      })
    }
    get isFocused() {
      return Boolean(this.querySelector('*:focus'))
    }
    blur() {
      const el = this[getElement]()
      if (el) {
        ;(el as HTMLElement).blur()
      } else {
        super.blur()
      }
    }
    focus() {
      const el = this[getElement]()
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
