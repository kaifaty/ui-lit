import { LitElement } from 'lit';
export interface IIconProps {
    material: boolean;
    icon: string;
}
export declare class LitIcon extends LitElement {
    static iconsMap: Record<string, number>;
    static defaultIcons: Record<string, string>;
    static get properties(): {
        status: {
            type: StringConstructor;
        };
        error: {
            type: StringConstructor;
        };
    };
    icon: string;
    static styles: import("lit").CSSResult;
    render(): string;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-icon': LitIcon;
    }
}
