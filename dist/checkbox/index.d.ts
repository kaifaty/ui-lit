import { LitElement } from 'lit';
export interface ICheckboxProps {
    checked: boolean;
    readonly: boolean;
    value: TCkeckboxValue;
    type: TCheckboxType;
}
export declare type TCkeckboxValue = 'on' | 'off';
export declare type TCheckboxType = "switcher" | "checkbox";
declare const CheckboxElement_base: (new (...args: any[]) => import("../form-associated/interface").FormAssociatedElement) & typeof LitElement;
export declare class CheckboxElement extends CheckboxElement_base implements ICheckboxProps {
    static styles: import("lit").CSSResult[];
    type: TCheckboxType;
    static get properties(): {
        value: {
            type: StringConstructor;
        };
        checked: {
            type: BooleanConstructor;
        };
    };
    _checked: boolean;
    get checked(): boolean;
    set checked(value: boolean);
    _value: TCkeckboxValue;
    get value(): TCkeckboxValue;
    set value(value: TCkeckboxValue);
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _switcherTemplate;
    private _checkboxTemplate;
    render(): import("lit-html").TemplateResult<1>;
    private _onClick;
}
declare global {
    interface HTMLElementTagNameMap {
        'checkbox-element': CheckboxElement;
    }
}
export {};
