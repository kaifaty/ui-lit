import { LitElement } from 'lit';
import { FormAssociatedElement } from '../mixins/form-associated/interface';
import '../label';
import type { LitButton } from '../button/index';
declare type TReturnData = Record<string, string | boolean | number | string[]>;
export interface IFormProps {
    disabled: boolean;
    noValidate: boolean;
}
export declare type TAction = (data?: TReturnData) => Promise<TReturnData | false>;
export interface IFormElement {
    checkValidity(): boolean;
    reportValidity(): boolean;
    submit(): void;
    getData(): TReturnData;
}
export declare class LitFrom extends LitElement implements IFormElement, IFormProps {
    static styles: import("lit").CSSResult;
    noValidate: boolean;
    onAction?: TAction;
    private _elements;
    private _defaults;
    private _button;
    private _loading;
    get button(): LitButton | null;
    get length(): number;
    get elements(): FormAssociatedElement[];
    private _disabled;
    get disabled(): boolean;
    set disabled(value: boolean);
    render(): import("lit").TemplateResult<1>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleSubmit;
    private _handleFormAttached;
    private _addToDefault;
    detatchElement(el: HTMLElement): void;
    getData(): TReturnData;
    checkValidity(): boolean;
    reportValidity(): boolean;
    private _startLoading;
    private _stopLoading;
    submit(): Promise<false | TReturnData>;
    reset(): Promise<unknown>;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-form': LitFrom;
    }
}
export {};
