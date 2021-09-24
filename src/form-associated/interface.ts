import { LitElement } from 'lit';

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

 export interface FormAssociated {
    disabled: boolean;
    name: string;
    required: boolean;
    value: string;
    readonly validationMessage: string;
    validity: ValidityStateFlags;
    readonly willValidate: boolean;
    validate(): void;
    checkValidity(): boolean;
    reportValidity(): boolean;
    setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void;
}

 export type ProxyElement = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement;

 export type FormAssociatedElement = FormAssociated & LitElement 
 