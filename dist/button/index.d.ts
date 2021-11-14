import { TemplateResult, LitElement } from 'lit';
import { KeyDownController } from '../controllers/KeyController';
export interface ButtonProps {
    type?: 'button' | 'submit';
    size?: TSize;
    primary?: boolean;
    disabled?: boolean;
    borderless?: boolean;
    switch?: boolean;
    success?: boolean;
    danger?: boolean;
    switchOn?: boolean;
}
declare type TSize = 'small' | 'medium' | 'large';
export declare class LitButton extends LitElement implements ButtonProps {
    static styles: import("lit").CSSResult[];
    iconBefore: boolean;
    iconAfter: boolean;
    type: 'submit' | 'button';
    size: TSize;
    disabled: boolean;
    borderless: boolean;
    switch: boolean;
    primary: boolean;
    secondary: boolean;
    success: boolean;
    danger: boolean;
    switchOn: boolean;
    tabindex: number;
    enter: KeyDownController;
    connectedCallback(): void;
    disconnectedCallback(): void;
    get classes(): {
        wrapper: boolean;
        noselect: boolean;
        "icon-before": boolean;
        "icon-after": boolean;
    };
    render(): TemplateResult<1>;
    private _onIconBefore;
    private _onIconAfter;
    handlekeyDown(e: KeyboardEvent): void;
    private _click;
    toggleSwitch(): void;
    submit(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-button': LitButton;
    }
}
export {};
