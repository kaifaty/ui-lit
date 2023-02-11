import type {LitForm, FormAssociatedElement, TValidationMessages, TValidationMessageKey} from '@ui-lit/types'
import {OuterClickRemoveController} from '../controllers/click.js'
import {KeyDownController} from '../controllers/key.js'

import {defaultValidationMessages, defaultValidity} from './consts.js'
import {css} from '../helpers/literals.js'
import {AccessorParams, withProps} from '../mixins/withProps/index.js'
import {FormAssosiatedProps} from './types.js'
import {createcssMap} from '../create-css-map.js'
import {formAssocCCSVarsMap} from './styles.map.js'
import {PREFIX} from './styles.map.js'
import {withControllers} from '../mixins/withControllers/index.js'

const getLang = () => document.querySelector('html')?.lang || window.navigator.language.split('-')[0]

const options = {attribute: true, reflect: true}

const props: AccessorParams[] = [
  {name: 'customMessage', defaultValue: '', options},
  {name: 'disabled', defaultValue: false, options},
  {name: 'initValidation', defaultValue: true, options},
  {name: 'inputValidation', defaultValue: false, options},
  {name: 'max', defaultValue: undefined, options},
  {name: 'min', defaultValue: undefined, options},
  {name: 'name', defaultValue: '', options},
  {name: 'readonly', defaultValue: false, options},
  {name: 'reporterNode', defaultValue: undefined, options},
  {name: 'required', defaultValue: false, options},
  {name: 'step', defaultValue: undefined, options},
  {name: 'value', defaultValue: '', options},
  {name: 'willValidate', defaultValue: true, options},
]

const {getVar} = createcssMap(formAssocCCSVarsMap, PREFIX)

let lastReportValidity = 0

export class FormAssociated
  extends withControllers(withProps<FormAssosiatedProps>(HTMLElement, props))
  implements FormAssociatedElement
{
  static styles = [
    css`
      :host {
        position: relative;
      }
      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }
      :host([readonly]) {
        opacity: 0.7;
        pointer-events: none;
      }
      :host::after {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
        background-color: ${getVar('invalid-background-color')};
        color: ${getVar('invalid-color')};
        padding: ${getVar('invalid-padding')};
        box-shadow: 3px 3px 3px ${getVar('invalid-shadow-color')};
        content: attr(data-message);
        top: 100%;
        left: 0;
        position: absolute;
        z-index: 1;
      }
      :host([invalid])::after {
        opacity: 1;
      }
      :host([invalid][invalid-viewed])::after {
        opacity: 0;
      }
    `,
  ]

  private _submitForm: LitForm | null = null

  private _keyDown = new KeyDownController(this, (e) => {
    if (e.key === 'Enter') {
      this.dispatchEvent(
        new CustomEvent('submitForm', {
          bubbles: true,
          composed: true,
        }),
      )
    }
  })
  private _click = new OuterClickRemoveController(this, () => {
    if (performance.now() - lastReportValidity < 200) {
      return
    }
    if (this.hasAttribute('invalid')) {
      this.setAttribute('invalid-viewed', '')
    }
  })

  validity: ValidityStateFlags = {...defaultValidity}

  /** @ignore */
  minlength?: number

  /** @ignore */
  maxlength?: number

  /** @ignore */
  pattern?: string

  private _valueOnInit?: string
  private _isFirstUpdated = false
  private _removeDataTimer = 0

  get form() {
    return this._submitForm
  }

  get validationMessage() {
    const keys = Object.keys(this.validity)
    for (const key of keys) {
      const v = this.validity[key as TValidationMessageKey]
      if (v) {
        return this._getErrorText(key as TValidationMessageKey)
      }
    }
    return ''
  }

  /**
   * Checks if an element meets any constraint validation rules applied to it.
   */
  checkValidity(): boolean {
    //Skip check on initial state
    if (!this._isFirstUpdated) {
      return true
    }
    if (!this.initValidation && this._valueOnInit === this.value) {
      return true
    }
    return !Object.values(this.validity).find(Boolean)
  }

  /**
   * Checks if an element meets any constraint validation rules applied to it, and also sends a validation message to the user agent.
   */
  reportValidity(): boolean {
    const valid = this.checkValidity()
    clearTimeout(this._removeDataTimer)
    lastReportValidity = performance.now()
    if (!valid) {
      if (this.reporterNode) {
        this.reporterNode.textContent = this.validationMessage
      } else {
        this.removeAttribute('invalid-viewed')
        this.dataset.message = this.validationMessage
        this.setAttribute('invalid', '')
      }
    } else {
      if (this.reporterNode) {
        this.reporterNode.textContent = this.validationMessage
      } else {
        this._removeDataTimer = window.setTimeout(() => {
          this.removeAttribute('invalid')
        }, 220)
      }
    }
    return valid
  }

  /**
   * Set custom message on any validation fallback
   * @param message - Custom validation message
   */
  setCustomValidity(message: string) {
    this.customMessage = message
  }

  validate() {
    if (this.minlength && this.minlength > 0) {
      if (this.value.length < this.minlength) {
        this._setValidity({tooShort: true})
        return
      } else if (this.validity.tooShort) {
        this._setValidity({tooShort: false})
      }
    }

    if (this.maxlength && this.maxlength > 0) {
      if (this.value && this.value.length > this.maxlength) {
        this._setValidity({tooLong: true})
        return
      } else if (this.validity.tooLong) {
        this._setValidity({tooLong: false})
      }
    }

    if (this.pattern) {
      const patten = new RegExp(this.pattern)
      if (this.value && !patten.test(this.value)) {
        this._setValidity({patternMismatch: true})
        return
      } else if (this.validity.patternMismatch) {
        this._setValidity({patternMismatch: false})
      }
    }

    if (this.required) {
      if (!this.value && !this.disabled) {
        this._setValidity({valueMissing: true})
        return
      } else if (this.validity.valueMissing) {
        this._setValidity({valueMissing: false})
      }
    }
  }

  validityDefault() {
    this._setValidity({...defaultValidity})
    this.reportValidity()
  }

  /** @ignore*/
  private _setValidity(flags: ValidityStateFlags): void {
    if (!this.willValidate) {
      return
    }
    this.validity = Object.assign(this.validity, flags)
    this._updateValidity()
  }

  /**
   * Validation
   *
   * @ignore
   */
  private _getErrorText(key: TValidationMessageKey) {
    const text =
      window.ValidationsMessages?.[key][getLang()] ||
      window.ValidationsMessages?.[key]['en'] ||
      defaultValidationMessages[key][getLang()] ||
      defaultValidationMessages[key]['en']
    const data: Record<string, number | string | undefined> = {
      min: this.min,
      max: this.max,
      step: this.step,
      pattern: this.pattern,
    }

    return text.replace(/\$\{([a-zA-Z0-9_.,=)( ]+)\}/g, (m, n) => {
      const value = data[n]
      if (typeof value === 'number' && Math.log10(value) < -4) {
        return value.toFixed(Math.abs(Math.ceil(Math.log10(value))) + 1)
      }
      return value !== undefined ? String(value) : m
    })
  }

  /**
   * @ignore
   */
  private _updateValidity() {
    this.dispatchEvent(
      new CustomEvent(this.checkValidity() ? 'valid' : 'invalid', {
        detail: this,
        composed: true,
        bubbles: true,
      }),
    )
  }

  /** @ignore  */
  connectedCallback(): void {
    //@ts-ignore
    super.connectedCallback()
    this.dispatchEvent(
      new CustomEvent('fromAttached', {
        bubbles: true,
        composed: true,
        detail: {
          element: this,
          onAttatch: (form: LitForm) => {
            this._submitForm = form
          },
        },
      }),
    )
    queueMicrotask(() => {
      this._valueOnInit = this.value
      this._isFirstUpdated = true
    })
  }

  /** @ignore  */
  disconnectedCallback() {
    this._submitForm?.detatchElement(this)
  }
}

declare global {
  interface Window {
    ValidationsMessages?: TValidationMessages
    ValidationsMessagesLang?: string
  }
}
