import { TemplateResult, LitElement } from 'lit';
import { KeyDownController } from '../controllers/KeyController';
export interface ButtonProps {
    type?: 'button' | 'submit';
    primary?: boolean;
    disabled?: boolean;
    borderless?: boolean;
    switch?: boolean;
    success?: boolean;
    danger?: boolean;
    switchOn?: boolean;
}
export declare class ButtomElement extends LitElement implements ButtonProps {
    static styles: import("lit").CSSResult[];
    iconBefore: string | TemplateResult;
    iconAfter: string | TemplateResult;
    type: 'submit' | 'button';
    size: 'small' | 'medium' | 'large';
    tabindex: number;
    disabled: boolean;
    borderless: boolean;
    switch: boolean;
    primary: boolean;
    secondary: boolean;
    success: boolean;
    danger: boolean;
    switchOn: boolean;
    enter: KeyDownController;
    connectedCallback(): void;
    disconnectedCallback(): void;
    get classes(): {
        borderless: boolean;
        switch: boolean;
        "switch-on": boolean;
        primary: boolean;
        secondary: boolean;
        success: boolean;
        danger: boolean;
        disabled: boolean;
        wrapper: boolean;
        noselect: boolean;
        "icon-before": boolean;
        "icon-after": boolean;
    };
    private _iconBeforeTemplate;
    private _iconAfterTemplate;
    render(): TemplateResult<1>;
    handlekeyDown(e: KeyboardEvent): void;
    private _click;
    toggleSwitch(): void;
    submit(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'button-element': ButtomElement;
    }
}
