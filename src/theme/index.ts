import { circleCSSVarsNames as circle} from './../circlepercent/styles';
import { menuCSSVarsNames } from './../menu/styles';
import { textCSSVarsNames as text } from './../text/styles';
import { linkCSSVarsNames as link } from './../link/styles';
import { tooltipCSSVarsNames as tooltip} from './../tooltip/styles';
import { panelCSSVarsNames as panel } from './../panel/styles';
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TTheme } from './interface';
import { rangeCSSNames as range } from '../range/style';
import { buttonCSSVarsNames as button } from '../button/styles';
import { tabsCSSVars as tabs } from '../tabs/styles';
import './reconfig';
import { selectCSSVarNames as select } from '../select/styles';
import { spinnerCSSVarsNames as spinner } from '../spinner/styles';
import { tableCSSVarsNames as table} from '../table/styles';
import { checkboxCSSVarsNames as checkbox } from '../checkbox/styles';
import { inputCSSVarNames as input} from '../styles/input';
import { dialogCSSVarNames as dialog } from '../dialog/styles';
import { paginationCSSVarsNames as pagination } from '../pagination/style';
import { dividerCSSVarsNames as divider } from '../divider/styles';
import { noteCSSVarsNames as note} from '../note/styles';

@customElement("lit-theme")
export class LitTheme extends LitElement{
    static styles = css`
        :host{
            --h: 300;
            --s: 80%;
            --l: 80%;
            --h-success: 110;
            --h-danger: 360;
            display: block;
            min-height: 100%;
            width: 100%;

        }
        :host([theme = "light"]){
            color: hsl(var(--h), var(--s), 5%);;
            background-color: hsl(var(--h), calc(var(--s) * 0.1), 100%);;
            --ripple-background: hsl(var(--h), var(--s), 80%);
            
            
            ${text.colorAttention}: hsl(38, calc(90% + var(--s) * 0.2), calc(40% + var(--l) * 0.1));

            ${link.color} : hsl(var(--h), calc(80% + var(--s) * 0.2), calc(55% + var(--l) * 0.1));
            ${link.colorHover} : hsl(var(--h), calc(95% + var(--s) * 0.05), calc(70% + var(--l) * 0.1));

            ${divider.color} : hsl(var(--h), calc(50% + var(--s) * 0.2), calc(75% + var(--l) * 0.1));

            ${note.color}: hsl(var(--h), calc(50% + var(--s) * 0.2), calc(98% + var(--l) * 0.1));
            ${note.background}: hsl(var(--h), calc(50% + var(--s) * 0.2), calc(55% + var(--l) * 0.1));
            ${note.border}: 1px solid hsl(var(--h), calc(50% + var(--s) * 0.2), calc(55% + var(--l) * 0.1));
            ${note.shadow}: 1px 1px 3px hsla(var(--h), calc(50% + var(--s) * 0.2), calc(70% + var(--l) * 0.1), 0.5);

            
            ${note.errorColor}: hsl(var(--h-danger), calc(50% + var(--s) * 0.2), calc(98% + var(--l) * 0.1));
            ${note.errorBackground}: hsl(var(--h-danger), calc(50% + var(--s) * 0.2), calc(55% + var(--l) * 0.1));
            ${note.errorBorder}: 1px solid hsl(var(--h-danger), calc(50% + var(--s) * 0.2), calc(55% + var(--l) * 0.1));
            ${note.errorShadow}: 1px 1px 3px hsla(var(--h-danger), calc(50% + var(--s) * 0.2), calc(70% + var(--l) * 0.1), 0.5);

            ${tooltip.color}: hsl(var(--h),  calc(50% + var(--s) * 0.2), calc(5% + var(--l) * 0.1));
            ${tooltip.background}: hsl(var(--h),  calc(50% + var(--s) * 0.2), calc(90% + var(--l) * 0.1));
            ${tooltip.shadow}: 1px 1px 3px hsl(var(--h), calc(10% + var(--s) * 0.2), calc(70% + var(--l) * 0.1));

            ${panel.color}: hsl(var(--h),  calc(50% + var(--s) * 0.2), 5%);
            ${panel.background}: hsl(var(--h), calc(70% + var(--s) * 0.2), calc(65% + var(--l) * 0.1));
            ${panel.border}: 1px solid hsl(var(--h),  calc(35% + var(--s) * 0.2), calc(40% + var(--l) * 0.1));

            ${panel.dangerColor}: hsl(var(--h-danger), calc(50% + var(--s) * 0.2), calc(5% + var(--l) * 0.1));
            ${panel.dangerBackground}: hsl(var(--h-danger), calc(var(--s) * 0.2 + 70%), calc(65% + var(--l) * 0.1));            
            ${panel.dangerBorder}: 1px solid hsl(var(--h-danger), calc(35% + var(--s) * 0.2), calc(40% + var(--l) * 0.1));

            ${button.color}: hsl(var(--h), var(--s), 8%);
            ${button.background}: initial;
            ${button.backgroundFocus}: hsl(var(--h), var(--s), 65%);
            ${button.border}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 80%);

            ${button.switchColor}:  hsl(var(--h), var(--s), 8%);
            ${button.switchOnColor}:  hsl(var(--h), var(--s), 95%);
            ${button.switchOnBackground}:  hsl(var(--h), var(--s), 55%);

            ${button.outlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 40%);
            ${button.switchOutlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 40%);
            ${button.switchOnOutlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.7), 60%);
            
            ${button.primaryColor}: hsl(var(--h), calc(var(--s) ), 99%);
            ${button.primaryBackground}: hsl(var(--h), calc(var(--s) ), 53%);
            ${button.primaryBorder}: 1px solid hsl(var(--h), calc(var(--s)), 65%);
            
            ${button.successColor}: hsl(var(--h-success), calc(var(--s) ), 5%);
            ${button.successBackground}: hsl(var(--h-success), calc(var(--s) ), 53%);
            ${button.successBorder}: 1px solid hsl(var(--h-success), calc(var(--s)), 65%);
            
            ${button.dangerColor}: hsl(var(--h-danger), calc(var(--s) ), 20%);
            ${button.dangerBackground}: hsl(var(--h-danger), calc(var(--s) ), 60%);
            ${button.dangerBorder}: 1px solid hsl(var(--h-danger), calc(var(--s)), 65%);

            
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
            ${range.thumbShadow}: 1px 1px 8px hsl(var(--h), calc(var(--s) * 0.3), 5%);

            ${range.pointBackground}: var(--background);

            ${tabs.color}: hsl(var(--h), calc(var(--s)), 60%);
            ${tabs.indicator}: hsl(var(--h), calc(var(--s)), 60%);
            ${tabs.colorDefault}: hsl(var(--h), calc(var(--s) * 0.1), 45%);
            ${tabs.outline}: 1px dashed hsl(var(--h), calc(var(--s) ), 45%);
            ${tabs.background}: transparent;

            
            ${select.rippleBackground}: var(--ripple-background);
            ${select.border}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 80%);
            ${select.circleColor}: hsl(var(--h), var(--s), 61%);
            ${select.optionColor}: hsl(var(--h), var(--s), 98%);
            ${select.optionBackground}: hsl(var(--h), var(--s), 98%);
            ${select.listboxBorder}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 90%);
            ${select.listboxShadow}: hsl(var(--h), calc(var(--s) * 0.3), 80%);

            ${select.fullscreenColor}: hsl(var(--h), calc(var(--s) * 0.3), 99%);
            ${select.fullscreenBackground}: hsl(var(--h), calc(var(--s) * 0.3), 30%);
            ${select.fullscreenOverlayBackground}: hsla(var(--h), calc(var(--s) * 0.1), 5%, 0.7);
            ${select.fullscreenShadow}: hsl(var(--h), calc(var(--s) * 0.3), 5%);

            ${menuCSSVarsNames.itemBackground}: hsl(var(--h), var(--s), 98%);

            
            ${spinner.color}: hsl(var(--h), var(--s), 65%);
            ${spinner.background}: hsl(var(--h), calc(var(--s) * 0.3), 99%);
            

            ${table.headerColor}: hsl(var(--h), calc(var(--s) * 0.3), 25%);
            ${table.headerBackground}: hsl(var(--h), calc(var(--s) * 0.5), 95%);
            ${table.headerIconColor}: hsl(var(--h), calc(var(--s) * 0.3), 60%);
            ${table.headerIconColorHover}: hsl(var(--h), calc(var(--s) * 0.3), 45%);
            ${table.headerIconColorSelected}: hsl(var(--h), calc(var(--s) * 0.6), 70%);
            ${table.headerIconBackgroundHover}: hsl(var(--h), calc(var(--s) * 0.3), 80%);
            ${table.headerFilterContentBackground}: hsl(var(--h), calc(var(--s) * 0.3), 98%);
            ${table.headerFilterContentShadow}: hsl(var(--h), calc(var(--s) * 0.3), 70%);
            ${pagination.backgroundSelected}: hsl(var(--h), calc(var(--s) * 0.3), 92%);

            
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
            background-color: hsl(var(--h), calc(var(--s) * 0.3), 9%);

            --ripple-background: hsl(var(--h), var(--s), 65%);
            --ripple-opacity-hover: 0.1;
            --ripple-opacity-focus: 0.1;
            --ripple-opacity-pressed: 0.08;
            
            --ripple-accent-opacity-hover: 0.85;
            --ripple-accent-opacity-focus: 0.90;
            --ripple-accent-opacity-pressed: 1;

            ${text.colorAttention}: hsl(38, calc(90% + var(--s) * 0.2), calc(55% + var(--l) * 0.1));

            ${link.color}: hsl(var(--h), calc(80% + var(--s) * 0.2), calc(60% + var(--l) * 0.1));
            ${link.colorHover}: hsl(var(--h), calc(95% + var(--s) * 0.05), calc(75% + var(--l) * 0.1));


            ${divider.color}: hsl(var(--h), calc(30% + var(--s) * 0.2), calc(20% + var(--l) * 0.1));


            ${note.color}: hsl(var(--h), calc(50% + var(--s) * 0.2), calc(98% + var(--l) * 0.1));
            ${note.background}: hsl(var(--h), calc(50% + var(--s) * 0.2), calc(50% + var(--l) * 0.1));
            ${note.border}: 1px solid hsl(var(--h), calc(50% + var(--s) * 0.2), calc(55% + var(--l) * 0.1));
            ${note.shadow}: 1px 1px 3px hsla(var(--h), calc(50% + var(--s) * 0.2), calc(70% + var(--l) * 0.1), 0.5);


            ${note.errorColor}: hsl(var(--h-danger), calc(50% + var(--s) * 0.2), calc(98% + var(--l) * 0.1));
            ${note.errorBackground}: hsl(var(--h-danger), calc(50% + var(--s) * 0.2), calc(50% + var(--l) * 0.1));
            ${note.errorBorder}: 1px solid hsl(var(--h-danger), calc(50% + var(--s) * 0.2), calc(55% + var(--l) * 0.1));
            ${note.errorShadow}: 1px 1px 3px hsla(var(--h-danger), calc(50% + var(--s) * 0.2), calc(70% + var(--l) * 0.1), 0.5);


            ${tooltip.color}: hsl(var(--h),  calc(50% + var(--s) * 0.2), calc(98% + var(--l) * 0.1));
            ${tooltip.background}: hsl(var(--h),  calc(50% + var(--s) * 0.2), calc(30% + var(--l) * 0.1));
            ${tooltip.shadow}: 2px 2px 3px hsl(var(--h), calc(50% + var(--s) * 0.2), calc(5% + var(--l) * 0.1));

            ${panel.color}: hsl(var(--h),  calc(50% + var(--s) * 0.2), calc(98% + var(--l) * 0.1));
            ${panel.background}: hsl(var(--h), calc(50% + var(--s) * 0.2), calc(8% + var(--l) * 0.1));
            ${panel.border}: 1px solid hsl(var(--h),  calc(50% + var(--s) * 0.2), calc(27% + var(--l) * 0.1));
            ${panel.dangerBackground}: hsl(var(--h-danger), calc(var(--s-danger) * 0.2 + 55%), calc(35% + var(--l-danger) * 0.1));
            ${panel.dangerColor}: hsl(var(--h-danger), var(--s-danger), calc(90% + var(--l-danger) * 0.1));
            ${panel.dangerBorder}: hsl(var(--h-danger), calc(var(--s-danger) * 0.2 + 65%), calc(27% + var(--l-danger) * 0.1));

    
            ${button.color}: hsl(var(--h), var(--s), 95%);
            ${button.background}: initial;
            ${button.backgroundFocus}: hsl(var(--h), var(--s), 65%);
            ${button.border}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 40%);

            ${button.switchColor}:  hsl(var(--h), var(--s), 95%);
            ${button.switchOnColor}:  hsl(var(--h), var(--s), 95%);
            ${button.switchOnBackground}:  hsl(var(--h), var(--s), 55%);

            ${button.outlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 40%);
            ${button.switchOutlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 40%);
            ${button.switchOnOutlineFocus}: 1px solid hsl(var(--h), calc(var(--s) * 0.7), 60%);


            ${button.primaryColor}: hsl(var(--h), calc(var(--s) ), 99%);
            ${button.primaryBackground}: hsl(var(--h), calc(var(--s) ), 56%);
            ${button.primaryBorder}: 1px solid hsl(var(--h), calc(var(--s) ), 65%);

            ${button.successColor}: hsl(var(--h-success), calc(var(--s) ), 20%);
            ${button.successBackground}: hsl(var(--h-success), calc(var(--s) ), 60%);
            ${button.successBorder}: 1px solid hsl(var(--h-success), calc(var(--s) ), 65%);

            ${button.dangerColor}: hsl(var(--h-danger), calc(var(--s) ), 20%);
            ${button.dangerBackground}: hsl(var(--h-danger), calc(var(--s) ), 60%);
            ${button.dangerBorder}: 1px solid hsl(var(--h-danger), calc(var(--s) ), 65%);


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
            ${range.thumbShadow}: 1px 1px 8px hsl(var(--h), calc(var(--s) * 0.3), 5%);
            ${range.pointBackground}: var(--background);
            
            
            ${tabs.color}: hsl(var(--h), calc(var(--s)), 60%);
            ${tabs.indicator}: hsl(var(--h), calc(var(--s)), 60%);
            ${tabs.colorDefault}: hsl(var(--h), calc(var(--s) * 0.1), 45%);
            ${tabs.outline}: 1px dashed hsl(var(--h), calc(var(--s) ), 45%);
            ${tabs.background}: transparent;
            

            ${select.rippleBackground}: var(--ripple-background);
            ${select.border}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 40%);
            ${select.circleColor}: hsl(var(--h), var(--s), 61%);
            ${select.optionColor}: hsl(var(--h), var(--s), 98%);
            ${select.optionBackground}: hsl(var(--h), calc(var(--s) * 0.3), 14%);
            ${select.listboxBorder}: 1px solid hsl(var(--h), calc(var(--s) * 0.3), 30%);
            ${select.listboxShadow}: hsl(var(--h), calc(var(--s) * 0.3), 5%);
            
            ${menuCSSVarsNames.itemBackground}: hsl(var(--h), calc(var(--s) * 0.3), 14%);


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
            ${pagination.backgroundSelected}: hsl(var(--h), calc(var(--s) * 0.3), 22%);
            
            
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
