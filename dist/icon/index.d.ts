import { LitElement } from 'lit';
declare const ICONS_CODE_MAP: Record<string, number>;
export declare class IconElement extends LitElement {
    icon: keyof typeof ICONS_CODE_MAP;
    static styles: import("lit").CSSResult;
    render(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'icon-element': IconElement;
    }
}
export {};
