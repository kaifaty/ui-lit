import { LitElement } from 'lit';
import type { LitTextField } from '../textfield/index';
import type { LitNumberField } from '../number/index';
import type { LitCheckbox } from '../checkbox/index';
declare type TLabled = LitNumberField | LitTextField | LitCheckbox;
export declare class LitLabel extends LitElement {
    static styles: import("lit").CSSResult;
    for: string;
    _connectedNode: TLabled | HTMLInputElement | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    appendConnectedField(el: TLabled | HTMLInputElement | null): void;
    removeConnectedField(el?: TLabled | HTMLInputElement | null): void;
    private _findConnectedField;
    _handleClick: (e: Event) => void;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-label': LitLabel;
    }
}
export {};
