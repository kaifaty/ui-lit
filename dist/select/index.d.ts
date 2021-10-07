import { LitElement, TemplateResult } from 'lit';
import { ClickController } from '../controllers/ClickController';
import { KeyDownController } from '../controllers/KeyController';
declare type TSelectItem = {
    text: string | TemplateResult;
    value: string;
};
export interface IPropsSelect {
    items: TSelectItem[];
    value: string;
    disabled: boolean;
}
declare const SelectElement_base: (new (...args: any[]) => import("../form-associated/interface").FormAssociatedElement) & typeof LitElement;
export declare class SelectElement extends SelectElement_base implements IPropsSelect {
    static styles: import("lit").CSSResult[];
    items: TSelectItem[];
    value: string;
    optionsWidth: number;
    open: boolean;
    clickController: ClickController;
    keyPressController: KeyDownController;
    isFocus: boolean;
    focusTime: number;
    _focusedOption: string;
    selected(): TSelectItem;
    currentOption(): number;
    firstUpdated(): void;
    private _contentTemplate;
    render(): TemplateResult<1>;
    updated(p: Map<string, unknown>): void;
    nextSelect(): void;
    prevSelect(): void;
    private _onOptionFocus;
    private _onSelect;
    onkeyDown(e: KeyboardEvent): void;
    onDocumentClick(e: Event): void;
    private onClick;
    private onBlur;
    private onFocus;
}
export {};
