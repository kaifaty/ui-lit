import { LitElement } from 'lit';
import { FormAssociatedElement } from '../mixins/form-associated/interface';
import '../label';
export interface IFormProps {
    disabled: boolean;
    noValidate: boolean;
}
export interface IFormElement {
    checkValidity(): boolean;
    reportValidity(): boolean;
    submit(): void;
}
declare type TReturnData = Record<string, string | boolean | number>;
export declare class LitFrom extends LitElement implements IFormElement, IFormProps {
    static styles: import("lit").CSSResult;
    _elements: FormAssociatedElement[];
    get length(): number;
    get elements(): FormAssociatedElement[];
    noValidate: boolean;
    _disabled: boolean;
    get disabled(): boolean;
    set disabled(value: boolean);
    render(): import("lit").TemplateResult<1>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleSubmit;
    private _handleFormAttached;
    detatchElement(el: HTMLElement): void;
    getData(): TReturnData;
    checkValidity(): boolean;
    reportValidity(): boolean;
    submit(): false | TReturnData;
    reset(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-form': LitFrom;
    }
}
export {};
