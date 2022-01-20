import { LitElement, html } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { TTheme } from './interface';


@customElement("lit-theme-switcher")
export class ThemeSwitcher extends LitElement{
    
    @state() theme: TTheme = localStorage.appTheme || 'light';
    
    connectedCallback(): void {
        super.connectedCallback();
        document.addEventListener('themeHasChanged', this._onChanged as EventListener);
    }
    
    disconnectedCallback(): void {
        super.disconnectedCallback();
        document.removeEventListener('themeHasChanged', this._onChanged as EventListener);
    }

    private _onChanged = (e: CustomEvent) => {
        this.theme = e.detail;
    }
    
    protected render() {
        return html`<lit-button @click = "${this._themeChange}">
                        <slot><lit-icon icon = "${this.theme === 'dark' ? 'sun': 'moon'}"></lit-icon></slot>
                    </lit-button>`;
    }

    private _themeChange(){
        this.dispatchEvent(new CustomEvent('themeSwitch', {
            composed: true,
            bubbles: true,
        }))
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-theme-switcher': ThemeSwitcher;
    }
}
