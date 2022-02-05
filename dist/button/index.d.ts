import { LitElement, TemplateResult } from 'lit';
import '../spinner';
import '../icon';
import '../link';
import { TLinkTartget } from '../link/interface';
/**
 *
 * @cssprop --lit-button-display - Controls the display of button
 *
 *
 * @cssprop --lit-button-small-height - small size Height
 * @cssprop --lit-button-small-padding - small size Padding
 * @cssprop --lit-button-small-font-size - small size FontSize
 *
 * @cssprop --lit-button-height - medium size Height
 * @cssprop --lit-button-padding - medium size Padding
 * @cssprop --lit-button-font-size - medium size FontSize
 *
 * @cssprop --lit-button-large-height - large size Height
 * @cssprop --lit-button-large-padding - large size Padding
 * @cssprop --lit-button-large-font-size - large size FontSize
 *
 * @cssprop --lit-button-border - border
 * @cssprop --lit-button-outline - outline
 * @cssprop --lit-button-radius - border-radius
 *
 *
 * @cssprop --lit-button-text-transform - text-transform
 * @cssprop --lit-button-letter-spacing - letter-spacing
 *
 *
 * @cssprop --lit-button-color - color
 * @cssprop --lit-button-background - background
 *
 * @cssprop --lit-button-background-hover - hover background-color
 * @cssprop --lit-button-background-focus - focus background-color
 * @cssprop --lit-button-background-pressed - pressed background-color
 *
 * @cssprop --lit-button-outline-hover - hover outline
 * @cssprop --lit-button-outline-focus - focus outline
 * @cssprop --lit-button-outline-pressed - pressed outline
 *
 * @cssprop --lit-button-color-hover - hover color
 * @cssprop --lit-button-color-focus - focus color
 * @cssprop --lit-button-color-pressed - pressed color
 *
 *
 * @cssprop --lit-button-primary-color - color
 * @cssprop --lit-button-primary-background - background
 * @cssprop --lit-button-primary-border - border
 *
 * @cssprop --lit-button-primary-color-hover - hover color
 * @cssprop --lit-button-primary-color-focus - focus color
 * @cssprop --lit-button-primary-color-pressed - pressed color
 *
 * @cssprop --lit-button-primary-background-hover - hover background
 * @cssprop --lit-button-primary-background-focus - focus background
 * @cssprop --lit-button-primary-background-pressed - pressed background
 *
 * @cssprop --lit-button-primary-outline-hover - outline hover
 * @cssprop --lit-button-primary-outline-focus - outline hover
 * @cssprop --lit-button-primary-outline-pressed - outline pressed
 *
 *
 * @cssprop --lit-button-success-color - color
 * @cssprop --lit-button-success-background - background
 * @cssprop --lit-button-success-border - border
 *
 * @cssprop --lit-button-success-color-hover - hover color
 * @cssprop --lit-button-success-color-focus - focus color
 * @cssprop --lit-button-success-color-pressed - pressed color
 *
 * @cssprop --lit-button-success-background-hover - hover background
 * @cssprop --lit-button-success-background-focus - focus background
 * @cssprop --lit-button-success-background-pressed - pressed background
 *
 * @cssprop --lit-button-success-outline-hover - outline hover
 * @cssprop --lit-button-success-outline-focus - outline hover
 * @cssprop --lit-button-success-outline-pressed - outline pressed
 *
 *
 * @cssprop --lit-button-danger-color - color
 * @cssprop --lit-button-danger-background - background
 * @cssprop --lit-button-danger-border - border
 *
 * @cssprop --lit-button-danger-color-hover - hover color
 * @cssprop --lit-button-danger-color-focus - focus color
 * @cssprop --lit-button-danger-color-pressed - pressed color
 *
 * @cssprop --lit-button-danger-background-hover - hover background
 * @cssprop --lit-button-danger-background-focus - focus background
 * @cssprop --lit-button-danger-background-pressed - pressed background
 *
 * @cssprop --lit-button-danger-outline-hover - outline hover
 * @cssprop --lit-button-danger-outline-focus - outline hover
 * @cssprop --lit-button-danger-outline-pressed - outline pressed
 *
 * @cssprop --lit-button-switch-color Switch color
 * @cssprop --lit-button-switch-background Switch background color
 *
 * @cssprop --lit-button-switch-on-color Switch-On color
 * @cssprop --lit-button-switch-on-background Switch-On background color
 *
 *
 */
export interface ButtonProps {
    type: Type;
    size: TSize;
    primary?: boolean;
    disabled?: boolean;
    borderless?: boolean;
    success?: boolean;
    danger?: boolean;
    switchOn?: boolean;
    notifyOnClick?: boolean;
    center?: boolean;
    loading?: boolean;
}
declare type Type = 'submit' | 'button' | 'switch';
declare type TSize = "small" | "medium" | "large";
declare const LitButton_base: (new (...args: any[]) => import("../mixins/focusable/inderface").Focusable & LitElement) & typeof LitElement;
/** @tag lit-button */
export declare class LitButton extends LitButton_base implements ButtonProps {
    static styles: import("lit").CSSResult[];
    static get properties(): {
        loading: {
            type: BooleanConstructor;
        };
    };
    /** @ignore  */
    private _loading;
    get loading(): boolean;
    set loading(value: boolean);
    /** @prop {"button" | "submit"} type */
    align: 'start' | 'center' | 'end';
    href: string | null;
    target: TLinkTartget;
    /** @prop {"button" | "submit"} type */
    type: Type;
    size: TSize;
    /** @prop {boolean} disabled - Disable element */
    disabled: boolean;
    /** @prop {boolean} borderless - Borderless element */
    borderless: boolean;
    /** @prop {boolean} primary - Primary  */
    primary: boolean;
    /** @prop {boolean} success - Success  */
    success: boolean;
    /** @prop {boolean} danger - Danger  */
    danger: boolean;
    between: boolean;
    /** @prop {boolean} switchOn - switch State. true - enabled, false disabled */
    switchOn: boolean;
    accent: boolean;
    notifyOnClick: boolean;
    /** @ignore  */
    _notifyIcon: boolean;
    tabindex: number;
    /** @ignore  */
    private _notifyTimeout;
    /** @ignore  */
    private _width;
    /** @ignore  */
    private _radiant;
    /** @ignore  */
    private _animationFrame;
    /** @ignore  */
    private _pressed;
    /** @ignore  */
    private get classes();
    /** @ignore  */
    private _contentTemplate;
    private wrapperTemplate;
    /**
     * @slot icon-before - You can put some elements before content
     * @slot icon-after - You can put some elements after content
     */
    render(): TemplateResult<1 | 2>;
    private _startAnimation;
    private _onTouchstart;
    private _onMouseOver;
    private _onMouseOut;
    private _onMouseDown;
    private _startPress;
    private _endPress;
    /** @ignore  */
    private _onBlur;
    /** @ignore  */
    private _onFocus;
    /** @ignore  */
    private _onKeyDown;
    click(): void;
    /** @event {CustomEvent} switchChanged - for type = 'switch'. Return current switchOn state. */
    toggleSwitch(): void;
    /** @event {CustomEvent} submitForm - for type = 'submit'. Submit to lit-form */
    submit(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-button': LitButton;
    }
}
export {};
