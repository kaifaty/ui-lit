import type {FormAssociatedElement} from './form-assosiated.js'

export interface LitForm extends HTMLElement {
  detatchElement(element: FormAssociatedElement): void
}
