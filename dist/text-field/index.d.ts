import { LitElement, TemplateResult } from 'lit';
import '../icon';
import '../note/index';
export interface TextProps {
    size: number;
    readonly: boolean;
    useCancelButton: boolean;
    spellcheck: boolean;
    autofocus: boolean;
    placeholder: string;
    inputmode: string;
    value: string;
    type: 'text' | 'email' | 'password';
}
declare const TextField_base: (new (...args: any[]) => import("../form-associated/interface").FormAssociatedElement) & typeof LitElement;
export declare class TextField extends TextField_base implements TextProps {
    static styles: import("lit").CSSResult[];
    inputRef: import("lit-html/directives/ref").Ref<HTMLInputElement>;
    static get properties(): {
        value: {
            type: StringConstructor;
        };
        pattern: {
            type: StringConstructor;
        };
        maxlength: {
            type: NumberConstructor;
        };
        minlength: {
            type: NumberConstructor;
        };
    };
    size: number;
    readonly: boolean;
    spellcheck: boolean;
    autofocus: boolean;
    placeholder: string;
    inputmode: string;
    type: 'text' | 'email' | 'password';
    useCancelButton: boolean;
    icon: string | TemplateResult;
    _value: string;
    get value(): string;
    set value(value: string);
    _pattern: string;
    get pattern(): string;
    set pattern(value: string);
    _minlength: number;
    get minlength(): number;
    set minlength(value: number);
    _maxlength: number;
    get maxlength(): number;
    set maxlength(value: number);
    validate(): void;
    private _iconTemplate;
    private _cancelIconTemplate;
    render(): TemplateResult<1>;
    private clearValue;
    private _onChange;
    private _onInput;
}
export {};
