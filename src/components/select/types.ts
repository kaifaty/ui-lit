import {TemplateResult} from 'lit'

import {FormAssociatedProps} from '../../mixins/form-associated/types'


export type TSelectItem = {
    content: string | TemplateResult
    value: string
}

export type TListboxPosition = 'auto' | 'top';

export interface IPropsSelect extends FormAssociatedProps{
    multiple: boolean
    searchable: boolean
}