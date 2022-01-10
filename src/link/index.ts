import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined';

export type TLinkTartget = "_blank" | "_parent" | "_self" | "_top"

export interface ILinkProps {
    href?: string
    rel?: string
    target?: TLinkTartget

}
@customElement("lit-link")
export class LitLink extends LitElement{
    static styles = css`
    :host{
        display: inline-block;
        box-sizing: border-box;
    }
    :host([underlined]:not(type=button)) a{
        border-bottom: 1px solid var(--lit-link-color, hsl(200, 80%, 55%));
    }
    :host(:not([type=button])) a{
        color: var(--lit-link-color, hsl(200, 80%, 55%));
        --lit-icon-color: var(--lit-link-color);
        text-decoration: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        width: 100%;
    }
    :host(:not([type=button])) a:hover:not(:focus){
        color: var(--lit-link-color-hover, hsl(200, 80%, 60%));
        box-shadow: 0 4px 4px -4px  hsl(200, 80%, 55%);
        -webkit--shadow: 0 4px 4px -4px  hsl(200, 80%, 55%);
        -moz-box-shadow: 0 4px 4px -4px  hsl(200, 80%, 55%);
    }
    `;
    @property({type: String}) href: string | undefined = undefined;
    @property({type: String, reflect: true}) type: "button" | "link" = 'link';
    @property({type: String}) rel?: string = "nofollow";
    @property({type: String}) target: TLinkTartget = "_self";
    @property({type: Boolean, reflect: true}) underlined: boolean = false
    render(){
        return html`<a 
                    rel = "${ifDefined(this.rel)}"
                    target = "${this.target}" 
                    href = "${ifDefined(this.href)}"><slot></slot></a>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-link': LitLink;
    }
}