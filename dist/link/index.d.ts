import { LitElement } from 'lit';
import { TLinkTartget } from './interface';
export declare class LitLink extends LitElement {
    static styles: import("lit").CSSResult;
    href: string | undefined;
    type: "button" | "link";
    rel?: string;
    target: TLinkTartget;
    underlined: boolean;
    tabindex: number;
    render(): import("lit").TemplateResult<1>;
    private onMouseover;
    private onMouseout;
    click(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-link': LitLink;
    }
}
