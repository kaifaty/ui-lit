import type {FormAssociatedElement} from './form-assosiated'

export interface LitForm extends HTMLElement {
  detatchElement(element: FormAssociatedElement): void
}
