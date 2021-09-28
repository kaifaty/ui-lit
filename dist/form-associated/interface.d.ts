import { LitElement } from 'lit';
import type { LabelText } from '../label/index';
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
    findLabel(): LabelText | null;
    readonly: boolean;
    disabled: boolean;
    name: string;
    required: boolean;
    value: string;
    readonly validationMessage: string;
    validity: ValidityStateFlags;
    validate(): void;
    checkValidity(): boolean;
    reportValidity(): boolean;
    setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void;
}
export declare type ProxyElement = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement;
export declare type FormAssociatedElement = FormAssociated & LitElement;
