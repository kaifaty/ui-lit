import { LitElement } from 'lit';
import type { TextField } from '../text-field/index';
import type { NumberField } from '../number/index';
import type { CheckboxElement } from '../checkbox/index';
declare type TLabled = NumberField | TextField | CheckboxElement;
export declare class LabelText extends LitElement {
    static styles: import("lit").CSSResult;
    for: string;
    _connectedNode: TLabled | HTMLInputElement | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
    appendConnectedField(el: TLabled | HTMLInputElement | null): void;
    removeConnectedField(el?: TLabled | HTMLInputElement | null): void;
    private _findConnectedField;
    _handleClick: () => void;
}
declare global {
    interface HTMLElementTagNameMap {
        'label-text': LabelText;
    }
}
export {};
