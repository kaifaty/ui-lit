import { TemplateResult, LitElement } from 'lit';
import { EnterController } from '../controllers/EnterController';
export interface ButtonProps {
    type?: 'button' | 'submit';
    primary?: boolean;
    disabled?: boolean;
    borderless?: boolean;
    switch?: boolean;
    success?: boolean;
    error?: boolean;
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
    success: boolean;
    error: boolean;
    switchOn: boolean;
    enter: EnterController;
    connectedCallback(): void;
    disconnectedCallback(): void;
    get classes(): {
        borderless: boolean;
        switch: boolean;
        "switch-on": boolean;
        primary: boolean;
        success: boolean;
        error: boolean;
        disabled: boolean;
        wrapper: boolean;
        noselect: boolean;
        "icon-before": boolean;
        "icon-after": boolean;
    };
    private _iconBeforeTemplate;
    private _iconAfterTemplate;
    render(): TemplateResult<1>;
    onkeyEnter(): void;
    private _click;
    toggleSwitch(): void;
    submit(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'button-element': ButtomElement;
    }
}
