import { LitElement } from 'lit';
import { FormAssociatedElement } from '../form-associated/interface';
export declare class FromElement extends LitElement {
    elements: FormAssociatedElement[];
    render(): import("lit-html").TemplateResult<1>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    checkValidity(): boolean;
    reportValidity(): boolean;
    private _onSubmit;
    private _onFormAttached;
    private _onFormDettached;
    private _getData;
    submit(): void;
}
