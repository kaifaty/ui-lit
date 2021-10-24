import { LitElement, TemplateResult } from 'lit';
import { FormAssociatedProps } from '../form-associated/interface';
export declare type TSelectItem = {
    text: string | TemplateResult;
    value: string;
};
export interface IPropsSelect extends FormAssociatedProps {
    items: TSelectItem[];
    disabled: boolean;
    optionsWidth: number;
    optionsHeight: number;
}
declare const SelectElement_base: (new (...args: any[]) => import("../form-associated/interface").FormAssociatedElement) & typeof LitElement;
export declare class SelectElement extends SelectElement_base implements IPropsSelect {
    static styles: import("lit").CSSResult[];
    items: TSelectItem[];
    value: string;
    optionsWidth: number;
    optionsHeight: number;
    open: boolean;
    private _clickController;
    private _keyPressController;
    private _isFocus;
    private _focusTime;
    private _focusedOption;
    private _optionsPosition;
    selected(): TSelectItem;
    currentOption(): number;
    firstUpdated(): void;
    willUpdate(): void;
    private _contentTemplate;
    focus(): void;
    render(): TemplateResult<1>;
    updated(p: Map<string, unknown>): void;
    setValue(value: string): void;
    nextSelect(): void;
    prevSelect(): void;
    private _handleOptionFocus;
    private _handleSelectClick;
    handlekeyDown(e: KeyboardEvent): void;
    handleDocumentClick(e: Event): void;
    private handleClick;
}
export {};
