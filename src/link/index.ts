import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined';
import { linkStyles } from './styles';

export type TLinkTartget = "_blank" | "_parent" | "_self" | "_top"

export interface ILinkProps {
    href?: string
    rel?: string
    target?: TLinkTartget
    underlined?: boolean

}
@customElement("lit-link")
export class LitLink extends LitElement{
    static styles = linkStyles;
    @property({type: String}) href: string | undefined = undefined;
    @property({type: String, reflect: true}) type: "button" | "link" = 'link';
    @property({type: String}) rel?: string = "nofollow";
    @property({type: String}) target: TLinkTartget = "_self";
    @property({type: Boolean, reflect: true}) underlined: boolean = false;


    render(){
        return html`<a 
                    @mouseover = "${this.onMouseover}"
                    @mouseout = "${this.onMouseout}"
                    rel = "${ifDefined(this.rel)}"
                    target = "${this.target}" 
                    href = "${ifDefined(this.href)}"><slot></slot></a>`;
    }
    private onMouseover(){
        if(this.type === 'button') return;
        this.setAttribute("hover", "");
    }
    private onMouseout(){
        this.removeAttribute("hover");
    }

}

declare global {
    interface HTMLElementTagNameMap {
      'lit-link': LitLink;
    }
}