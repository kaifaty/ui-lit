import {LitElement} from 'lit'
import {property} from 'lit/decorators.js'

import type {LitForm, FormAssociatedElement, TValidationMessages, TValidationMessageKey} from '@ui-lit/types'
import {OuterClickRemoveController} from '../../controllers/click.js'
import {KeyDownController} from '../../controllers/key.js'

import {defaultValidationMessages, defaultValidity} from './consts.js'
import {styles} from './styles.js'

const getLang = () => document.querySelector('html')?.lang || window.navigator.language.split('-')[0]

let lastReportValidity = 0

export class LitFormAssoc extends LitElement implements FormAssociatedElement {
  static styles = [styles]

  #submitForm: LitForm | null = null
  #keyDown = new KeyDownController(this, (e) => {
    if (e.key === 'Enter') {
      this.dispatchEvent(
        new CustomEvent('submitForm', {
          bubbles: true,
          composed: true,
        }),
      )
    }
  })
  #click = new OuterClickRemoveController(this, () => {
    if (performance.now() - lastReportValidity < 200) {
      return
    }
    if (this.hasAttribute('invalid')) {
      this.setAttribute('invalid-viewed', '')
    }
  })
  @property({type: String, reflect: true, attribute: true}) name = ''
  @property({type: Boolean, attribute: true, reflect: true}) disabled = false
  @property({type: Boolean, attribute: true, reflect: true}) required = false
  @property({type: Boolean, attribute: true, reflect: true}) readonly = false
  @property({type: String, attribute: true, reflect: true}) customMessage = ''

  /**
   * Validation on each input. Logic must realazied in child class
   */
  @property({type: Boolean, attribute: true, reflect: true}) inputValidation = false

  /**
   * Whet false validation will only when current value not equal default value
   */
  @property({type: Boolean, attribute: true}) initValidation = true

  /**
   * Validation of component (off on false).
   */
  @property({type: Boolean, attribute: true}) willValidate = true

  /**
   * Node to report validation state
   */
  @property({type: Object}) reporterNode?: HTMLElement

  validity: ValidityStateFlags = {...defaultValidity}

  /** @ignore */
  minlength?: number

  /** @ignore */
  maxlength?: number

  /** @ignore */
  #min?: number
  get min() {
    return this.#min
  }
  set min(value: number | undefined) {
    this.#min = value
  }

  /** @ignore */
  #max?: number
  get max() {
    return this.#max
  }
  set max(value: number | undefined) {
    this.#max = value
  }

  /** @ignore */

  #step?: number
  get step() {
    return this.#step
  }
  set step(value: number | undefined) {
    this.#step = value
  }

  /** @ignore */
  pattern?: string

  #value = ''
  get value() {
    return this.#value
  }
  set value(value: string) {
    this.#value = value
  }

  #valueOnInit?: string
  #isFirstUpdated = false
  #removeDataTimer = 0

  /** @ignore  */
  async firstUpdated() {
    this.#valueOnInit = this.value
    this.#isFirstUpdated = true
  }

  get form() {
    return this.#submitForm
  }

  get validationMessage() {
    const keys = Object.keys(this.validity)
    for (const key of keys) {
      const v = this.validity[key as TValidationMessageKey]
      if (v) {
        return this.#getErrorText(key as TValidationMessageKey)
      }
    }
    return ''
  }

  /**
   * Checks if an element meets any constraint validation rules applied to it.
   */
  checkValidity(): boolean {
    //Skip check on initial state
    if (!this.#isFirstUpdated) {
      return true
    }
    if (!this.initValidation && this.#valueOnInit === this.value) {
      return true
    }
    return !Object.values(this.validity).find(Boolean)
  }

  /**
   * Checks if an element meets any constraint validation rules applied to it, and also sends a validation message to the user agent.
   */
  reportValidity(): boolean {
    const valid = this.checkValidity()
    clearTimeout(this.#removeDataTimer)
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
        this.#removeDataTimer = window.setTimeout(() => {
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
        this.#setValidity({tooShort: true})
        return
      } else if (this.validity.tooShort) {
        this.#setValidity({tooShort: false})
      }
    }

    if (this.maxlength && this.maxlength > 0) {
      if (this.value && this.value.length > this.maxlength) {
        this.#setValidity({tooLong: true})
        return
      } else if (this.validity.tooLong) {
        this.#setValidity({tooLong: false})
      }
    }

    if (this.pattern) {
      const patten = new RegExp(this.pattern)
      if (this.value && !patten.test(this.value)) {
        this.#setValidity({patternMismatch: true})
        return
      } else if (this.validity.patternMismatch) {
        this.#setValidity({patternMismatch: false})
      }
    }

    if (this.required) {
      if (!this.value && !this.disabled) {
        this.#setValidity({valueMissing: true})
        return
      } else if (this.validity.valueMissing) {
        this.#setValidity({valueMissing: false})
      }
    }
  }

  validityDefault() {
    this.#setValidity({...defaultValidity})
    this.reportValidity()
  }

  /** @ignore*/
  #setValidity(flags: ValidityStateFlags): void {
    if (!this.willValidate) {
      return
    }
    this.validity = Object.assign(this.validity, flags)
    this.#updateValidity()
  }

  /**
   * Validation
   *
   * @ignore
   */
  #getErrorText(key: TValidationMessageKey) {
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
  #updateValidity() {
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
    super.connectedCallback()

    this.dispatchEvent(
      new CustomEvent('fromAttached', {
        bubbles: true,
        composed: true,
        detail: {
          element: this,
          onAttatch: (form: LitForm) => {
            this.#submitForm = form
          },
        },
      }),
    )
  }

  /** @ignore  */
  disconnectedCallback() {
    super.disconnectedCallback()
    this.#submitForm?.detatchElement(this)
  }
}

declare global {
  interface Window {
    ValidationsMessages?: TValidationMessages
    ValidationsMessagesLang?: string
  }
}
