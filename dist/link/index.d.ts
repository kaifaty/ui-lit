import { LitElement } from 'lit';
export declare type TLinkTartget = "_blank" | "_parent" | "_self" | "_top";
export interface ILinkProps {
    href?: string;
    rel?: string;
    target?: TLinkTartget;
}
export declare class LitLink extends LitElement {
    static styles: import("lit").CSSResult;
    href: string | undefined;
    type: "button" | "link";
    rel?: string;
    target: TLinkTartget;
    underlined: boolean;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'lit-link': LitLink;
    }
}
