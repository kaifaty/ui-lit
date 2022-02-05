import { LitElement, TemplateResult } from 'lit';
import type { FormAssociated } from '../mixins/form-associated/interface';
import '../icon';
import { Focusable } from '../mixins/focusable/inderface';
export interface NumberProps extends FormAssociated, Focusable {
    replaceToRange: boolean;
    useCancelButton: boolean;
    placeholder: string;
    value: string;
    decimals: number;
    valueAsNumber: number;
    min: number;
    max: number;
    icon: string | TemplateResult;
}
declare const LitNumberField_base: (new (...args: any[]) => Focusable & LitElement) & (new (...args: any[]) => import("../mixins/labled/inderface").ILabled) & (new (...args: any[]) => import("../mixins/form-associated/interface").FormAssociatedElement) & (new (...args: any[]) => import("../mixins/form-associated/interface").FormAssociatedElement) & typeof LitElement;
export declare class LitNumberField extends LitNumberField_base implements NumberProps {
    static get styles(): import("lit").CSSResultOrNative[];
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
    replaceToRange: boolean;
    placeholder: string;
    inputmode: 'decimal' | 'numeric';
    useCancelButton: boolean;
    icon: string | TemplateResult;
    private _selectionBeforeRender;
    private _inputRef;
    get valueAsNumber(): number;
    set valueAsNumber(value: number);
    private _value;
    get value(): string;
    set value(value: string);
    private _valueResolve;
    private _cancelIconTemplate;
    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void;
    render(): TemplateResult<1>;
    updated(props: Map<string | number | symbol, unknown>): void;
    validate(): void;
    private _clearValue;
    private _handleChange;
    private _handleInput;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-numberfield': LitNumberField;
    }
}
export {};
