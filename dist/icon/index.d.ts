import { LitElement } from 'lit';
export interface IIconProps {
    material: boolean;
    icon: string;
}
export declare class IconElement extends LitElement {
    static iconsMap: Record<string, number>;
    static defaultIcons: Record<string, string>;
    icon: string;
    material: boolean;
    static styles: import("lit").CSSResult;
    willUpdate(): void;
    render(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'icon-element': IconElement;
    }
}
