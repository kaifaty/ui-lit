import type {TemplateResult} from 'lit'

export type DialogType = 'modal' | 'bottomsheet' | 'smart'
export type Content = TemplateResult | string

export type DialogEvents = {
    'requestBackDialog': undefined
    'requestCloseDialog': undefined
}
export interface DialogState{
    header?: Content
    body?: Content
    footer?: Content
    action?: (data: any) => Promise<unknown> | unknown
}

export interface DialogParams {
    type?: DialogType
}