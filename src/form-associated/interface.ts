import { LitElement } from 'lit';
import type { LitLabel } from '../label/index';

 export interface ValidityStateFlags {
    badInput?: boolean;
    customError?: boolean;
    patternMismatch?: boolean;
    rangeOverflow?: boolean;
    rangeUnderflow?: boolean;
    stepMismatch?: boolean;
    tooLong?: boolean;
    tooShort?: boolean;
    typeMismatch?: boolean;
    valueMissing?: boolean;
}

export interface FormAssociatedProps {
    readonly: boolean,
    disabled: boolean;
    name: string;
    required: boolean;
    value: string;
}
 export interface FormAssociated extends FormAssociatedProps{
    findLabel(): LitLabel | null
    readonly validationMessage: string;
    validity: ValidityStateFlags;
    validate(): void;
    checkValidity(): boolean;
    reportValidity(): boolean;
    setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void;
}

 export type ProxyElement = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement;

 export type FormAssociatedElement = FormAssociated & LitElement 
 