import { LitElement } from 'lit';
import type { FormAssociatedElement, ValidityStateFlags } from './interface';
import '../note';
declare type TValidationMessageKey = keyof ValidityStateFlags;
declare type TValidationMessages = Record<TValidationMessageKey, {
    [k: string]: string;
}>;
declare type Constructor<T> = new (...args: any[]) => T;
export declare const formAssociated: <T extends Constructor<LitElement>>(superClass: T) => Constructor<FormAssociatedElement> & T;
declare global {
    interface Window {
        ValidationsMessages?: TValidationMessages;
        ValidationsMessagesLang?: string;
    }
}
export {};
