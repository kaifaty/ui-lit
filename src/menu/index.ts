import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '../button';
import './item';
import { menuStyles } from './styles';
import { mobileAndTabletCheck } from 'kailib';

@customElement('lit-menu')
export class LitMenu extends LitElement{
    static styles = menuStyles
    @property({type: String}) label: string = '';
    @property({type: Boolean, reflect: true}) mobile: boolean = mobileAndTabletCheck();

    protected render() {
        return html`
        <lit-select 
            @menuSelect = "${this.onMenuSelect}" 
            .isMenu = "${true}">
            <div slot = "selected"><slot name = "label">${this.label}</slot></div>
            <slot></slot>
        </lit-select>`;
    }
    private onMenuSelect(){
        const el = this.shadowRoot?.querySelector(`lit-select`)!;
        el.hide();
        el.focus();
    }

}
