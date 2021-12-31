import { TemplateResult, LitElement } from 'lit';
import { KeyDownController } from '../controllers/KeyController';
import '../spinner';
export interface ButtonProps {
    type: 'button' | 'submit';
    size: TSize;
    primary?: boolean;
    disabled?: boolean;
    borderless?: boolean;
    switch?: boolean;
    success?: boolean;
    danger?: boolean;
    switchOn?: boolean;
    notifyOnClick?: boolean;
    center?: boolean;
    loading?: boolean;
}
declare type TSize = 'small' | 'medium' | 'large';
export declare class LitButton extends LitElement implements ButtonProps {
    static styles: import("lit").CSSResult[];
    iconBefore: boolean;
    iconAfter: boolean;
    _notifyIcon: boolean;
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
    notifyOnClick: boolean;
    center: boolean;
    loading: boolean;
    tabindex: number;
    enter: KeyDownController;
    notifyTimeout: number;
    get classes(): {
        wrapper: boolean;
        noselect: boolean;
    };
    private _contentTemplate;
    render(): TemplateResult<1>;
    handlekeyDown(e: KeyboardEvent): void;
    focus(): void;
    click(): void;
    toggleSwitch(): void;
    submit(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-button': LitButton;
    }
}
export {};
