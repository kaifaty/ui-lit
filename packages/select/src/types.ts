import {TemplateResult} from 'lit'

import type {FormAssociatedProps} from '@ui-lit/types'

export type TSelectItem = {
  content: string | TemplateResult
  value: string
}

export type TListboxPosition = 'auto' | 'top'

export interface IPropsSelect extends FormAssociatedProps {
  multiple: boolean
  searchable: boolean
}
