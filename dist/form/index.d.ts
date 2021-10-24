import { LitElement } from 'lit';
import { FormAssociatedElement } from '../form-associated/interface';
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
export declare class FromElement extends LitElement implements IFormElement, IFormProps {
    _elements: FormAssociatedElement[];
    get length(): number;
    get elements(): FormAssociatedElement[];
    noValidate: boolean;
    disabled: boolean;
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleSubmit;
    private _handleFormAttached;
    private _handleFormDettached;
    private _getData;
    checkValidity(): boolean;
    reportValidity(): boolean;
    updated(props: Map<string, string | boolean>): void;
    submit(): false | TReturnData;
    reset(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'form-element': FromElement;
    }
}
export {};
