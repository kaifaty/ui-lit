import { LitElement } from 'lit';
/**
 *
 * @cssprop --lit-checkbox-background Background of checkbox
 * @cssprop --lit-checkbox-border Border of checkbox
 *
 * @cssprop --lit-switcher-shadow Inset shadow of switcher
 * @cssprop --lit-switcher-control-background Switcher control background
 * @cssprop --lit-switcher-control-shadow Switcher control shadow
 * @cssprop --lit-switcher-off-background Switcher control background
 *
 *
 *
 *
 *
 */
export interface ICheckboxProps {
    checked: boolean;
    readonly: boolean;
    value: TCkeckboxValue;
    type: TCheckboxType;
}
export declare type TCkeckboxValue = 'on' | 'off';
export declare type TCheckboxType = "switcher" | "checkbox";
declare const LitCheckbox_base: (new (...args: any[]) => import("../mixins/labled/inderface").ILabled) & (new (...args: any[]) => import("../mixins/form-associated/interface").FormAssociatedElement) & typeof LitElement;
export declare class LitCheckbox extends LitCheckbox_base implements ICheckboxProps {
    static styles: import("lit").CSSResult[];
    type: TCheckboxType;
    static get properties(): {
        value: {
            type: StringConstructor;
        };
        name: {
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
    render(): import("lit").TemplateResult<1>;
    private _click;
    toggle(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-checkbox': LitCheckbox;
    }
}
export {};
