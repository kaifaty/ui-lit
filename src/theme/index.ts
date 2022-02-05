import { lch2rgb } from 'kailib';

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './reconfig';
import { TTheme, TPallets, HCL  } from './interface';
import { stylesLight } from './light';
import { darkStyles } from './dark';

const endPallete = 1500;
const range = 2200;


@customElement("lit-theme")
export class LitTheme extends LitElement{
    static styles = [css`
    :host{
        display: block;
        min-height: 100%;
        width: 100%;
    }
    `, stylesLight, darkStyles]
    @property({type: String, reflect: true}) theme: TTheme = 'dark';
    @property({type: Object}) params: TPallets = {
        primary: [330, 75, 50],
        negative: [20, 75, 50],
        positive: [135, 75, 50],
    };
    connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener("changedPallete", this._changedParam as EventListener);
    }
    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener("changedPallete", this._changedParam as EventListener);
    }
    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(_changedProperties.has('theme')){
            document.dispatchEvent(new CustomEvent("themeHasChanged", {
                detail: this.theme
            }));
        }
    }
    private _themeSwitch(){
        this.theme = this.theme === 'light' ? 'dark' : 'light'
        localStorage.appTheme = this.theme;
    }
    private _changedParam = (e: CustomEvent) => {
        (this.params as any)[e.detail.name] = e.detail.params;
        this.requestUpdate();
    }
    public getLuminanceCoeff(n: number, pos: number, step: number, index: number){
        const steps = range / step;
        const oneStepDiff = (1 / steps) * 100;
        const coff = (1.5 - n / 100);
        const limit = 700;
        
        if(pos > limit){
            const leftSteps = (endPallete - limit) / step;
            const startDecrees = steps - leftSteps;
            const startDecreesValue = 100 - oneStepDiff * startDecrees * coff;
            const leftStep = startDecreesValue / leftSteps;
            const i = index - startDecrees;
            return startDecreesValue - leftStep * i;
        }
        
        return 100 - oneStepDiff * index * coff;
        
    }
    public getChroma(n: number, pos: number, step: number){
        const limit = 500;
        if(pos > limit ){
            const index = (pos - limit) / step;
            const steps = (endPallete - limit) / step;
            const oneStepDiff = (1 / steps) * 80;
            const res = n - oneStepDiff * index;

            if(res < 0) return 0;
            return res;

        }
        return n
    }
    protected genPallete(hcl: HCL, name: string, step = 50, opacity = 100){
        const result: string[] = [];
        for(let pos = endPallete - range, i = 0; pos <= endPallete; pos += step, i++){
            result.push(`--${name}-${pos}: ${(
                lch2rgb(
                    this.getLuminanceCoeff(hcl[2], pos, step, i), 
                    this.getChroma(hcl[1], pos, step), 
                    hcl[0], 
                    opacity
                ))};`);
        }
        return result;
    }
    render(){
        return html`
            <style>
                :host{
                    ${this.genPallete(this.params.primary, "primary")}
                    ${this.genPallete(this.params.primary, "primary-op-08", 200, 80)}
                    ${this.genPallete(this.params.positive, "positive")}
                    ${this.genPallete(this.params.negative, "negative")}
                }
            </style>
            <slot @themeSwitch = "${this._themeSwitch}"></slot>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-theme': LitTheme;
    }
}
