import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TTheme } from './interface';
import { cssRangeNames as range } from '../range/style';
import { buttonCSSVarsNames as button } from '../button/styles';
import { tabsCSSVars as tabs } from '../tabs/styles';
import './reconfig';
import { selectCSSVarNames as select } from '../select/styles';
import { spinnerCSSVarsNames as spinner } from '../spinner/styles';
import { tableCSSVarsNames as table} from '../table/styles';
import { checkboxCSSVarsNames as checkbox } from '../checkbox/styles';
import { inputCSSVarNames as input} from '../styles/input';
import { dialogCSSVarNames as dialog } from '../dialog/styles';

@customElement("lit-theme")
export class LitTheme extends LitElement{
    static styles = css`
        :host{
            --h: 300;
            --s: 80%;
            --l: 80%;
            --success-h: 110;
            --danger-h: 360;
            display: block;
            min-height: 100%;
            width: 100%;
        }
        :host([theme = "light"]){
            color: hsl(var(--h), var(--s), 5%);;
            background-color: var(--background);
            --background: hsl(var(--h), calc(var(--s) * 0.3), 99%);

            --ripple-background: hsl(var(--h), var(--s), 65%);
            
            ${button.color}: hsl(var(--h), var(--s), 8%);
            ${button.background}: hsl(var(--h), var(--s), 65%);
            ${button.backgroundFocus}: hsl(var(--h), var(--s), 65%);
            ${button.border}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 80%);

            ${button.switchColor}:  hsl(var(--h), var(--s), 8%);
            ${button.switchOnColor}:  hsl(var(--h), var(--s), 50%);
            ${button.switchOnBackground}:  hsl(var(--h), var(--s), 55%);

            ${button.outlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 40%);
            ${button.switchOutlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 40%);
            ${button.switchOnOutlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.7), 60%);
            
            --lit-button-primary-color: hsl(var(--h), calc(var(--s) ), 99%);
            --lit-button-primary-background: hsl(var(--h), calc(var(--s) ), 53%);
            --lit-button-primary-border: 1px solid hsl(var(--h), calc(var(--s) ), 65%);

            --lit-button-success-color: hsl(var(--success-h), calc(var(--s) ), 20%);
            --lit-button-success-background: hsl(var(--success-h), calc(var(--s) ), 60%);
            --lit-button-success-border: 1px solid hsl(var(--success-h), calc(var(--s) ), 65%);

            --lit-button-danger-color: hsl(var(--danger-h), calc(var(--s) ), 20%);
            --lit-button-danger-background: hsl(var(--danger-h), calc(var(--s) ), 60%);
            --lit-button-danger-border: 1px solid hsl(var(--danger-h), calc(var(--s) ), 65%);

            
            ${range.outlineFocus}: 1px dashed hsl(var(--h), calc(var(--s)), 65%);
            ${range.filled}: hsl(var(--h), calc(var(--s) ), 55%);
            ${range.filledHover}: hsl(var(--h), calc(var(--s) ), 65%);

            ${range.trackBackground}: hsl(var(--h), calc(var(--s) * 0.3), 89%);
            ${range.trackBackgroundHover}: hsl(var(--h), calc(var(--s) * 1), 85%);
            ${range.trackOutline}: hsl(var(--h), calc(var(--s) * 0.3), 20%);

            ${range.thumbBackground}: hsl(var(--h), calc(var(--s) * 0.1), 40%);
            ${range.thumbBackgroundHover}: hsl(var(--h), calc(var(--s) * 0.1), 30%);
            ${range.thumbBackgroundPressed}: var(${range.filledHover});
            ${range.thumbOutline}: 2px solid hsl(var(--h), var(--s), 99%);

            ${range.pointBackground}: var(--background);
            ${range.pointOutlineColor}: var(${range.trackBackground});
            ${range.pointOutlineColorHover}: var(${range.trackBackgroundHover});

            ${range.thumbShadow}: 1px 1px 8px hsl(var(--h), calc(var(--s) * 0.3), 5%);

            ${tabs.color}: hsl(var(--h), calc(var(--s)), 60%);
            ${tabs.colorDefault}: hsl(var(--h), calc(var(--s) * 0.1), 45%);
            ${tabs.outline}: 1px dashed hsl(var(--h), calc(var(--s) ), 45%);
            ${tabs.background}: transparent;

            
            ${select.circleColor}: hsl(var(--h), var(--s), 61%);
            ${select.optionColor}: hsl(var(--h), var(--s), 98%);
            ${select.optionBackground}: hsl(var(--h), var(--s), 50%);
            ${select.listboxBorder}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 90%);
            ${select.listboxShadow}: hsl(var(--h), calc(var(--s) * 0.3), 80%);
            ${select.listboxBackground}: hsl(var(--h), calc(var(--s) * 0.3), 98%);


            ${select.fullscreenColor}: hsl(var(--h), calc(var(--s) * 0.3), 99%);
            ${select.fullscreenBackground}: hsl(var(--h), calc(var(--s) * 0.3), 30%);
            ${select.fullscreenOverlayBackground}: hsla(var(--h), calc(var(--s) * 0.1), 5%, 0.7);
            ${select.fullscreenShadow}: hsl(var(--h), calc(var(--s) * 0.3), 5%);

            
            ${spinner.color}: hsl(var(--h), var(--s), 65%);
            ${spinner.background}: hsl(var(--h), calc(var(--s) * 0.3), 10%);
            

            ${table.headerColor}: hsl(var(--h), calc(var(--s) * 0.3), 25%);
            ${table.headerBackground}: hsl(var(--h), calc(var(--s) * 0.5), 95%);
            ${table.headerIconColor}: hsl(var(--h), calc(var(--s) * 0.3), 60%);
            ${table.headerIconColorHover}: hsl(var(--h), calc(var(--s) * 0.3), 45%);
            ${table.headerIconColorSelected}: hsl(var(--h), calc(var(--s) * 0.6), 70%);
            ${table.headerIconBackgroundHover}: hsl(var(--h), calc(var(--s) * 0.3), 80%);
            ${table.headerFilterContentBackground}: hsl(var(--h), calc(var(--s) * 0.3), 98%);
            ${table.headerFilterContentShadow}: hsl(var(--h), calc(var(--s) * 0.3), 70%);

            
            ${checkbox.border}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 45%);
            ${checkbox.checkmarkColor}: hsl(var(--h), calc(var(--s)), 10%);
            ${checkbox.background}: hsl(var(--h), calc(var(--s) * 0.3), 98%);
            ${checkbox.shadowHover}: 0 0 5px hsl(var(--h), calc(var(--s) * 0.5), 85%);            
            ${checkbox.switcherControlBackground}: hsl(var(--h), calc(var(--s) * 0.3), 98%);
            ${checkbox.switcherControlShadow}: 1px 1px 3px hsl(var(--h), calc(var(--s) * 0.3), 10%);
            
            
            ${input.color}: hsl(var(--h), calc(var(--s) * 0.3), 10%);
            ${input.background}: hsl(var(--h), calc(var(--s) * 0.3), 99%);
            ${input.border}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 20%);
            ${input.outlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 60%);


            ${dialog.headerBackgroundColor}: hsl(var(--h), calc(var(--s) * 0.3), 7%);
            ${dialog.backgroundColor}: hsl(var(--h), calc(var(--s) * 0.3), 98%);
            ${dialog.color}: hsl(var(--h), calc(var(--s) * 0.3), 10%);
            ${dialog.headerColor}: hsl(var(--h), calc(var(--s) * 0.3), 98%);
            ${dialog.overlapBackground}: hsla(var(--h), calc(var(--s) * 0.3), 5%, 0.8);
            ${dialog.boxshadow}: hsl(var(--h), calc(var(--s) * 0.3), 2%);
        }
        
        :host([theme = "dark"]){
            color: hsl(var(--h), var(--s), 97%);;
            background-color: var(--background);
            --background: hsl(var(--h), calc(var(--s) * 0.3), 9%);

            --ripple-background: hsl(var(--h), var(--s), 65%);
            --ripple-opacity-hover: 0.1;
            --ripple-opacity-focus: 0.1;
            --ripple-opacity-pressed: 0.08;
            
            --ripple-accent-opacity-hover: 0.85;
            --ripple-accent-opacity-focus: 0.90;
            --ripple-accent-opacity-pressed: 1;

            ${button.color}: hsl(var(--h), var(--s), 95%);
            ${button.background}: hsl(var(--h), var(--s), 65%);
            ${button.backgroundFocus}: hsl(var(--h), var(--s), 65%);
            ${button.border}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 40%);

            ${button.switchColor}:  hsl(var(--h), var(--s), 95%);
            ${button.switchOnColor}:  hsl(var(--h), var(--s), 95%);
            ${button.switchOnBackground}:  hsl(var(--h), var(--s), 55%);

            ${button.outlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 40%);
            ${button.switchOutlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 40%);
            ${button.switchOnOutlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.7), 60%);

            --lit-button-primary-color: hsl(var(--h), calc(var(--s) ), 99%);
            --lit-button-primary-background: hsl(var(--h), calc(var(--s) ), 56%);
            --lit-button-primary-border: 1px solid hsl(var(--h), calc(var(--s) ), 65%);

            --lit-button-success-color: hsl(var(--success-h), calc(var(--s) ), 20%);
            --lit-button-success-background: hsl(var(--success-h), calc(var(--s) ), 60%);
            --lit-button-success-border: 1px solid hsl(var(--success-h), calc(var(--s) ), 65%);

            --lit-button-danger-color: hsl(var(--danger-h), calc(var(--s) ), 20%);
            --lit-button-danger-background: hsl(var(--danger-h), calc(var(--s) ), 60%);
            --lit-button-danger-border: 1px solid hsl(var(--danger-h), calc(var(--s) ), 65%);



            ${range.outlineFocus}: 1px dashed hsl(var(--h), calc(var(--s)), 65%);
            ${range.filled}: hsl(var(--h), calc(var(--s) ), 55%);
            ${range.filledHover}: hsl(var(--h), calc(var(--s) ), 65%);

            ${range.trackBackground}: hsl(var(--h), calc(var(--s) * 0.3), 18%);
            ${range.trackBackgroundHover}: hsl(var(--h), calc(var(--s) * 0.3), 24%);
            ${range.trackOutline}: hsl(var(--h), calc(var(--s) * 0.3), 20%);

            ${range.thumbBackground}: hsl(var(--h), calc(var(--s) * 0.3), 20%);
            ${range.thumbBackgroundHover}: hsl(var(--h), calc(var(--s) * 0.3), 15%);
            ${range.thumbBackgroundPressed}: var(${range.filledHover});
            ${range.thumbOutline}: 2px solid hsl(var(--h), var(--s), 99%);

            ${range.pointBackground}: var(--background);
            ${range.pointOutlineColor}: var(${range.trackBackground});
            ${range.pointOutlineColorHover}: var(${range.trackBackgroundHover});

            ${range.thumbShadow}: 1px 1px 8px hsl(var(--h), calc(var(--s) * 0.3), 5%);
            
            ${tabs.color}: hsl(var(--h), calc(var(--s)), 60%);
            ${tabs.colorDefault}: hsl(var(--h), calc(var(--s) * 0.1), 45%);
            ${tabs.outline}: 1px dashed hsl(var(--h), calc(var(--s) ), 45%);
            ${tabs.background}: transparent;
            

            ${select.circleColor}: hsl(var(--h), var(--s), 61%);
            ${select.optionColor}: hsl(var(--h), var(--s), 98%);
            ${select.optionBackground}: hsl(var(--h), var(--s), 50%);
            ${select.listboxBorder}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 30%);
            ${select.listboxShadow}: hsl(var(--h), calc(var(--s) * 0.3), 5%);
            ${select.listboxBackground}: hsl(var(--h), calc(var(--s) * 0.3), 14%);


            ${select.fullscreenColor}: hsl(var(--h), calc(var(--s) * 0.3), 99%);
            ${select.fullscreenBackground}: hsl(var(--h), calc(var(--s) * 0.3), 30%);
            ${select.fullscreenOverlayBackground}: hsla(var(--h), calc(var(--s) * 0.1), 5%, 0.7);
            ${select.fullscreenShadow}: hsl(var(--h), calc(var(--s) * 0.3), 5%);


            ${spinner.color}: hsl(var(--h), var(--s), 65%);
            ${spinner.background}: hsl(var(--h), calc(var(--s) * 0.3), 10%);
            

            ${table.headerBackground}: hsl(var(--h), calc(var(--s) * 0.3), 20%);
            ${table.headerIconColor}: hsl(var(--h), calc(var(--s) * 0.3), 5%);
            ${table.headerIconColorHover}: hsl(var(--h), calc(var(--s) * 0.3), 5%);
            ${table.headerIconColorSelected}: hsl(var(--h), calc(var(--s) * 0.6), 70%);
            ${table.headerIconBackgroundHover}: hsl(var(--h), calc(var(--s) * 0.3), 30%);
            ${table.headerFilterContentBackground}: hsl(var(--h), calc(var(--s) * 0.3), 20%);
            ${table.headerFilterContentShadow}: hsl(var(--h), calc(var(--s) * 0.3), 5%);            
            
            
            ${checkbox.border}: 2px solid hsl(var(--h), calc(var(--s) * 0.3), 30%);
            ${checkbox.checkmarkColor}: hsl(var(--h), calc(var(--s)), 99%);
            ${checkbox.background}: hsl(var(--h), calc(var(--s) * 0.3), 10%);
            ${checkbox.shadowHover}: 0 0 5px hsl(var(--h), calc(var(--s) * 0.5), 30%);            
            ${checkbox.switcherControlBackground}: currentColor;
            ${checkbox.switcherControlShadow}: 1px 1px 5px hsl(var(--h), calc(var(--s) * 0.5), 5%);
            
            
            ${input.color}: hsl(var(--h), calc(var(--s) * 0.3), 98%);
            ${input.background}: hsl(var(--h), calc(var(--s) * 0.3), 2%);
            ${input.border}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 20%);
            ${input.outlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 50%);


            ${dialog.headerBackgroundColor}: hsl(var(--h), calc(var(--s) * 0.3), 7%);
            ${dialog.backgroundColor}: hsl(var(--h), calc(var(--s) * 0.3), 12%);
            ${dialog.color}: hsl(var(--h), calc(var(--s) * 0.3), 98%);
            ${dialog.headerColor}: hsl(var(--h), calc(var(--s) * 0.3), 98%);
            ${dialog.overlapBackground}: hsla(var(--h), calc(var(--s) * 0.3), 5%, 0.8);
            ${dialog.boxshadow}: hsl(var(--h), calc(var(--s) * 0.3), 2%);


        }
    `;
    @property({type: String, reflect: true}) theme: TTheme = 'light';

    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(_changedProperties.has('theme')){
            document.dispatchEvent(new CustomEvent("themeHasChanged", {
                detail: this.theme
            }));
        }
    }
    render(){
        return html`<slot @themeSwitch = "${this._themeSwitch}"></slot>`;
    }
    private _themeSwitch(){
        this.theme = this.theme === 'light' ? 'dark' : 'light'
        localStorage.appTheme = this.theme;
    }
    
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-theme': LitTheme;
    }
}
