import { LitElement } from 'lit';
export declare class IconElement extends LitElement {
    static iconsMap: Record<string, number>;
    static defaultIcons: Record<string, string>;
    icon: string;
    static styles: import("lit").CSSResult;
    render(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'icon-element': IconElement;
    }
}
