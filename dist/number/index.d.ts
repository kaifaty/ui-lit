import { LitElement, TemplateResult } from 'lit';
import type { FormAssociated } from '../form-associated/interface';
import '../icon';
import { Ref } from 'lit/directives/ref.js';
import { TInputMode } from '../textfield/index';
export interface NumberProps extends FormAssociated {
    replaceToRange: boolean;
    useCancelButton: boolean;
    autofocus: boolean;
    placeholder: string;
    inputmode: string;
    value: string;
    decimals: number;
    valueAsNumber: number;
    min: number;
    max: number;
    icon: string | TemplateResult;
}
declare const LitNumberField_base: (new (...args: any[]) => import("../form-associated/interface").FormAssociatedElement) & typeof LitElement;
export declare class LitNumberField extends LitNumberField_base implements NumberProps {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        value: {
            type: StringConstructor;
            hasChanged: () => boolean;
        };
        valueAsNumber: {
            type: StringConstructor;
        };
    };
    min: number;
    max: number;
    decimals: number;
    readonly: boolean;
    autofocus: boolean;
    replaceToRange: boolean;
    placeholder: string;
    inputmode: TInputMode;
    useCancelButton: boolean;
    icon: string | TemplateResult;
    _selectionBeforeRender: number;
    inputRef: Ref<HTMLInputElement>;
    _valueAsNumber: number;
    get valueAsNumber(): number;
    set valueAsNumber(value: number);
    _value: string;
    get value(): string;
    set value(value: string);
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _valueResolve;
    private _cancelIconTemplate;
    willUpdate(): void;
    render(): TemplateResult<1>;
    updated(props: Map<string | number | symbol, unknown>): void;
    firstUpdated(props: Map<string | number | symbol, unknown>): Promise<void>;
    validate(): void;
    private _clearValue;
    focus(): void;
    private _handleChange;
    private _handleInput;
    private _handleKeyDown;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-numberfield': LitNumberField;
    }
}
export {};
