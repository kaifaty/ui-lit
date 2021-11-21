import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';


export type TTheme = 'light' | 'dark';
export interface IThemeProps{
    theme: TTheme
}

@customElement("lit-theme")
export class LitTheme extends LitElement{
    static styles = css`
        :host{
            --h: 240;
            --s: 50%;
            display: block;
            min-height: 100%;
            width: 100%;
        }
        :host([theme = "light"]){

        }
        :host([theme = "dark"]){
            color: hsl(var(--h), var(--s), 99%);;
            /* Button */
            --lit-button-color: var(--dark-button-color, hsl(var(--h), var(--s), 99%));
            --lit-button-background: var(--dark-button-background, hsl(var(--h), var(--s), 35%));
            --lit-button-border: var(--dark-button-border, 1px solid hsl(var(--h), var(--s), 50%));
            --lit-button-background-hover: var(--dark-button-background-hover, hsl(var(--h), var(--s), 45%));

            /** Input  */
            --lit-input-background: var(--dark-input-background, hsl(var(--h), var(--s), 99%));
            --lit-input-border: var(--dark-input-border, 1px solid hsl(var(--h), var(--s), 50%));
            --lit-input-color: var(--dark-input-color, hsl(var(--h), var(--s), 10%));

            /** Checkbox */
            --lit-switcher-off-background: var(--dark-switcher-off-background, hsl(0, 80%, 60%));
            --lit-switcher-on-background: var(--dark-switcher-on-background, hsl(110, 80%, 60%));


            /** Tabs */
            --lit-tab-background: var(--dark-tab-background, transparent);
            --lit-tab-background-selected: var(--dark-tab-background-selected, hsl(var(--h), var(--s), 50%));
            --lit-tab-border: var(--dark-tab-border, 1px solid hsl(var(--h), var(--s), 50%));
            --lit-tab-color-selected: var(--dark-tab-color-selected, hsl(var(--h), var(--s), 99%));

            /** Selected */

            --lit-select-background: var(--dark-select-background, hsl(var(--h), var(--s), 50%));
            --lit-select-border: 1px solid hsl(var(--h), var(--s), 50%);
            --lit-select-outline-focus: 1px solid hsl(var(--h), var(--s), 60%);
            --lit-select-item-background: hsl(var(--h), var(--s), 10%);
            --lit-select-item-background-hover: hsl(var(--h), var(--s), 50%);
            
            /** TreeView */
            --lit-treeitem-selected-color: hsl(var(--h), var(--s), 98%);
            --lit-treeitem-selected-background: hsl(var(--h), var(--s), 50%);

            /** Spinner */
            --lit-spinner-color: white;
            --lit-circle-color: white;

            background-color: black;
        }
    `;
    @property({type: String, reflect: true}) theme: TTheme = 'light';
    render(){
        return html`<slot></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-theme': LitTheme;
    }
}
