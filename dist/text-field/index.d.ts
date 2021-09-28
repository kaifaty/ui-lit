import { LitElement, TemplateResult } from 'lit';
import type { FormAssociated } from '../form-associated/interface';
import '../icon';
import { Ref } from 'lit/directives/ref.js';
export declare type TInputMode = 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
export interface TextProps extends FormAssociated {
    size: number;
    minlength: number;
    maxlength: number;
    readonly: boolean;
    useCancelButton: boolean;
    spellcheck: boolean;
    autofocus: boolean;
    placeholder: string;
    inputmode: TInputMode;
    pattern: string;
    value: string;
    icon: string | TemplateResult;
    type: 'text' | 'password';
}
declare const TextField_base: (new (...args: any[]) => import("../form-associated/interface").FormAssociatedElement) & typeof LitElement;
export declare class TextField extends TextField_base implements TextProps {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        value: {
            type: StringConstructor;
        };
    };
    size: number;
    minlength: number;
    maxlength: number;
    spellcheck: boolean;
    autofocus: boolean;
    pattern: string;
    placeholder: string;
    inputmode: TInputMode;
    type: 'text' | 'password';
    useCancelButton: boolean;
    icon: string | TemplateResult;
    inputRef: Ref<HTMLInputElement>;
    _value: string;
    get value(): string;
    set value(value: string);
    connectedCallback(): void;
    disconnectedCallback(): void;
    validate(): void;
    private _iconTemplate;
    private _cancelIconTemplate;
    render(): TemplateResult<1>;
    updated(_changedProperties: Map<string | number | symbol, unknown>): void;
    firstUpdated(props: Map<string | number | symbol, unknown>): void;
    focus(): void;
    private clearValue;
    private _onChange;
    private _onInput;
}
declare global {
    interface HTMLElementTagNameMap {
        'text-field': TextField;
    }
}
export {};
