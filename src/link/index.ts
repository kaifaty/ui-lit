import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators';
import { ifDefined } from 'lit/directives/if-defined';

export type TLinkTartget = "_blank" | "_parent" | "_self" | "_top"

export interface ILinkProps {
    href?: string
    rel?: string
    target?: TLinkTartget

}
@customElement("link-element")
export class LinkElement extends LitElement{
    static styles = css`
    :host{
        display: inline-block;
        box-sizing: border-box;
    }
    :host(.underlined) a{
        border-bottom: 1px solid var(--link-color, hsl(200, 80%, 55%));
    }
    a:focus{
        outline: 1px solid var(--link-color, hsl(200, 80%, 55%));
        border-bottom: 1px solid transparent;
    }
    a{
        color: var(--link-color, hsl(200, 80%, 55%));
        text-decoration: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
    }
    a:hover:not(:focus){
        color: var(--link-color-hover, hsl(200, 80%, 60%));
        box-shadow: 0 4px 4px -4px  hsl(200, 80%, 55%);
        -webkit--shadow: 0 4px 4px -4px  hsl(200, 80%, 55%);
        -moz-box-shadow: 0 4px 4px -4px  hsl(200, 80%, 55%);
    }
    `;
    @property({type: String}) href: string | undefined= undefined;
    @property({type: String}) type: "button" | "link" = 'link';
    @property({type: String}) rel?: string = "nofollow";
    @property({type: String}) target: TLinkTartget = "_self";
    render(){
        return html`<a 
                    rel = "${ifDefined(this.rel)}"
                    target = "${this.target}" 
                    href = "${ifDefined(this.href)}"><slot></slot></a>`;
    }
}