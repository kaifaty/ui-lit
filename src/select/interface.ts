import { TemplateResult } from 'lit';
import { FormAssociatedProps } from '../mixins/form-associated/interface';

export type TSelectItem = {
    content: string | TemplateResult
    value: string
}


export interface IPropsSelect extends FormAssociatedProps{
    
}