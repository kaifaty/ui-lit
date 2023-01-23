export type TValidationMessageKey = keyof ValidityStateFlags
export type TValidationMessages = Record<TValidationMessageKey, {[k: string]: string}>
import type {LitElement} from 'lit'

import type {LitForm} from './form.js'

export interface ValidityStateFlags {
  badInput?: boolean
  customError?: boolean
  patternMismatch?: boolean
  rangeOverflow?: boolean
  rangeUnderflow?: boolean
  stepMismatch?: boolean
  tooLong?: boolean
  tooShort?: boolean
  typeMismatch?: boolean
  valueMissing?: boolean
}

export interface FormAssociatedProps {
  readonly: boolean
  disabled: boolean
  name: string
  required: boolean
  value: string
}
export interface FormAssociated extends FormAssociatedProps {
  //findLabel(): LitLabel | null
  name: string
  readonly form: LitForm | null
  readonly validationMessage: string
  validity: ValidityStateFlags
  validate(): void
  checkValidity(): boolean
  reportValidity(): boolean
  validityDefault(): void
  //setValidity(flags: ValidityStateFlags): void;
}

export type ProxyElement = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement

export type FormAssociatedElement = FormAssociated & LitElement
