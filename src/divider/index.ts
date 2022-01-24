import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { dividerStyles } from './styles';

export interface IDividerProps{

}

@customElement("lit-divider")
export class LitDivider extends LitElement{
    static styles = dividerStyles;
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-divider': LitDivider;
    }
    
}