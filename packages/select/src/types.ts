import {TemplateResult} from 'lit'

import type {FormAssociatedProps} from '@ui-wc/types'

export type TSelectItem = {
  content: string | TemplateResult
  value: string
}

export interface IPropsSelect extends FormAssociatedProps {
  multiple: boolean
  searchable: boolean
}
