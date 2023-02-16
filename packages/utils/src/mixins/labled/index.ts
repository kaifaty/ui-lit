import type {Constructor, FormAssociatedElement, LitLabel} from '@ui-wc/types'

export interface ILabled extends HTMLElement {
  readonly labels: LitLabel[]
  addLabel(data: LitLabel): void
  removeLabel(data: LitLabel): void
}

/**
 * Mixin append labels for component
 */
export const labled = <T extends Constructor<FormAssociatedElement>>(superClass: T) => {
  return class LabledElement extends superClass implements ILabled {
    private _labels: LitLabel[] = []

    /** @ignore  */
    private _notify() {
      this.dispatchEvent(
        new CustomEvent('labledConnected', {
          composed: true,
          bubbles: true,
          detail: this,
        }),
      )
    }

    /** @ignore  */
    private _updateDisabled() {
      this._labels.forEach((it) => {
        if (this.disabled) {
          it.setAttribute('disabled', '')
        } else {
          it.removeAttribute('disabled')
        }
      })
    }

    /** @ignore  */
    private _getExistLabelIndex(label: LitLabel) {
      return this._labels.findIndex((el) => el === label)
    }

    get labels() {
      return this._labels
    }
    set disabled(value: boolean) {
      super.disabled = value
      this._updateDisabled()
    }

    /**
     * @param label {LitLabel} - custom label
     */
    addLabel(label: LitLabel): void {
      const i = this._getExistLabelIndex(label)
      if (i >= 0) return
      this._labels.push(label)
      this._updateDisabled()
    }

    /**
     * @param label {LitLabel} - custom label
     */
    removeLabel(label: LitLabel): void {
      const i = this._getExistLabelIndex(label)
      if (i < 0) return
      this._labels.splice(i, 1)
      this._labels = this._labels.filter((l) => l !== label)
    }

    /** @ignore  */
    connectedCallback() {
      super.connectedCallback()
      this._notify()
    }

    /** @ignore  */
    disconnectedCallback() {
      super.disconnectedCallback()
      this._labels = []
    }
  } as Constructor<ILabled> & T
}
