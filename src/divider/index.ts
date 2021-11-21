import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators';

export interface IDividerProps{

}

@customElement("lit-divider")
export class LitDivider extends LitElement{
    static styles = css`
    :host{
        display: block;
        height: var(--lit-divider-height, 1px);
        background-color: var(--lit-divider-color, #333);
        width: 100%;
        margin: var(--lit-divider-margin, 10px 0);
    }`;
}