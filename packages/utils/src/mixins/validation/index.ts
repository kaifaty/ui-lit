import {css, LitElement} from 'lit'
import {property} from 'lit/decorators.js'

import {Constructor} from '../types.js'

type TValidationMessageKey = keyof ValidityStateFlags
type TValidationMessages = Record<TValidationMessageKey, {[k: string]: string}>

const defaultValidationMessages: TValidationMessages = {
  badInput: {
    en: 'Bad input',
  },
  customError: {
    en: 'Custom error',
  },
  patternMismatch: {
    en: 'Pattern ${pattern} error',
  },
  rangeOverflow: {
    en: 'Value must be less then ${max}',
  },
  rangeUnderflow: {
    en: 'Value must be more then ${min}',
  },
  stepMismatch: {
    en: 'Value must be in step of ${step}',
  },
  tooLong: {
    en: 'Value is too long',
  },
  tooShort: {
    en: 'Value is too short',
  },
  valueMissing: {
    en: 'Value is required',
  },
  typeMismatch: {
    en: 'Type mismatch',
  },
}

const getLang = () => window.ValidationsMessagesLang || window.navigator.language.split('-')[0]

const defaultValidity = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
}

export const validated = <T extends Constructor<LitElement>>(superClass: T) => {
  class BaseValidation extends superClass implements BaseValidation {
    static styles = [
      ...(superClass as any).elementStyles,
      css`
        :host([disabled]) {
          opacity: 0.5;
          pointer-events: none;
        }
        :host([readonly]) {
          opacity: 0.7;
          pointer-events: none;
        }
      `,
    ]

    @property({type: Boolean, attribute: true, reflect: true}) disabled = false
    @property({type: Boolean, attribute: true, reflect: true}) required = false
    @property({type: Boolean, attribute: true, reflect: true}) readonly = false

    @property({type: String, attribute: true, reflect: true}) customMessage = ''

    /**
     * Validation of component
     * If false - validation off
     */
    @property({type: Boolean}) willValidate = true

    /**
     * Validate component only if current value not equal default value
     */
    @property({type: Boolean}) validateOnChange = false

    validity: ValidityStateFlags = {...defaultValidity}

    min?: number
    max?: number
    step?: number
    pattern?: string
    value?: string | number

    #valueOnInit?: string | number
    #isFirstUpdated = false

    /** @ignore  */
    async firstUpdated() {
      this.#valueOnInit = this.value
      this.#isFirstUpdated = true
    }
    get valid() {
      return this.checkValidity()
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
    checkValidity(): boolean {
      if (!this.#isFirstUpdated) {
        return true
      }
      if (this.validateOnChange && this.#valueOnInit === this.value) {
        return true
      }
      return !Object.values(this.validity).filter((it) => it).length
    }
    reportValidity(): boolean {
      const valid = this.checkValidity()
      if (!valid) {
        this.dispatchEvent(new CustomEvent('reportInvalid'))
      }
      return valid
    }
    validate() {
      if (this.required && !this.value && !this.disabled) {
        this.setValidity({valueMissing: true})
      } else if (this.validity.valueMissing) {
        this.setValidity({valueMissing: false})
      } else if (!this.value) {
        this.validityDefault()
      }
    }
    /**
     *
     * @param flags {ValidityStateFlags} - A dictionary object containing one or more flags indicating the validity state of the element
     *
     * @param message {string} - A string containing a message, which will be set if any flags are true.
     * This parameter is only optional if all flags are false.
     *
     * @param anchor {HTMLElement} - An HTMLElement which can be used by the user agent to report problems with this form submission.
     */
    setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void {
      if (!this.willValidate) {
        return
      }
      this.validity = {...this.validity, ...flags}
      if (message) {
        this.customMessage = message
      }
      this._updateValidity()
    }

    validityDefault() {
      this.setValidity({...defaultValidity})
      this.reportValidity()
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

    /**
     * @ignore
     */
    notify() {
      this.dispatchEvent(new CustomEvent('changed', {detail: this.value, bubbles: true}))
    }
  }

  return BaseValidation as T
}

declare global {
  interface Window {
    ValidationsMessages?: TValidationMessages
    ValidationsMessagesLang?: string
  }
}
