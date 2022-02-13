import { scrollbarCSSVarNames } from './../styles/scrollbar';
import { css } from 'lit';
import { rangeCSSNames as range } from '../range/style';
import { buttonCSSVarsNames as button } from '../button/styles';
import { tabsCSSVarNames as tabs } from '../tabs/styles';
import { selectCSSVarNames as select } from '../select/styles';
import { spinnerCSSVarsNames as spinner } from '../spinner/styles';
import { tableCSSVarsNames as table} from '../table/styles';
import { checkboxCSSVarsNames as checkbox } from '../checkbox/styles';
import { inputCSSVarNames as input} from '../styles/input';
import { dialogCSSVarNames as dialog } from '../dialog/styles';
import { paginationCSSVarsNames as pagination } from '../pagination/style';
import { dividerCSSVarsNames as divider } from '../divider/styles';
import { noteCSSVarsNames as note} from '../note/styles';
import { circleCSSVarsNames as circle} from './../circlepercent/styles';
import { iconCSSVarNames as icon} from './../icon/styles';
import { menuCSSVarsNames } from './../menu/styles';
import { textCSSVarsNames as text } from './../text/styles';
import { linkCSSVarsNames as link } from './../link/styles';
import { tooltipCSSVarsNames as tooltip} from './../tooltip/styles';
import { panelCSSVarsNames as panel } from './../panel/styles';
import { rangeCSSNames as sidebar } from '../sidebar/style';



export const stylesLight = css`
:host([theme = "light"]){
    color: var(--primary-1300);
    background-color: var(--primary--700);
    
    ${text.colorAttention}: hsl(38, calc(90% + var(--s) * 0.2), calc(75% + var(--l) * 0.1));
    ${text.colorDanger}: var(--negative-400);
    ${text.colorSuccess}: var(--positive-400);
    ${text.colorAccented}: var(--positive-400);

    ${icon.color}: var(--primary-1300);
    ${icon.positiveColor}: var(--positive-0);
    ${icon.negativeColor}: var(--negative-0);
    
    ${circle.color}: var(--primary-800);

    ${link.color}: var(--primary-500);
    ${link.colorHover}: var(--primary-500);
    

    ${divider.color}: var(--primary-500);
    
    ${scrollbarCSSVarNames.thumb}: var(--primary--500);
    ${scrollbarCSSVarNames.track}: var(--primary--650);

    ${note.color}: var(--primary--600);
    ${note.background}: var(--primary-200);
    ${note.border}: 1px solid var(--primary-300);
    ${note.shadow}: 1px 1px 3px var(--primary-700);

    
    ${note.errorColor}: var(--negative--600);
    ${note.errorBackground}: var(--negative-200);
    ${note.errorBorder}: 1px solid var(--negative-300);
    ${note.errorShadow}: 1px 1px 3px var(--negative-400);

    ${tooltip.color}: var(--primary-1300);
    ${tooltip.background}: var(--primary--500);
    ${tooltip.shadow}: 2px 2px 3px var(--primary--200);

    ${panel.color}: var(--primary-400);
    ${panel.background}: var(--primary--500);
    ${panel.border}: 1px solid var(--primary--100);

    ${panel.dangerColor}: var(--negative-400);
    ${panel.dangerBackground}: var(--negative--500);
    ${panel.dangerBorder}: 1px solid var(--negative--100);
    
    ${panel.successColor}: var(--positive-400);
    ${panel.successBackground}: var(--positive--500);
    ${panel.successBorder}: 1px solid var(--positive--100);

    ${button.color}: var(--primary-500);
    ${button.background}: initial;
    ${button.backgroundHover}: var(--primary--550);
    ${button.ripple}: var(--primary--450);
    ${button.backgroundFocus}: var(--primary-300);
    ${button.border}: 1px solid var(--primary--200);
    ${button.outlineFocus}: 1px solid var(--primary-600);


    ${button.switchColor}: var(--primary-500);
    ${button.switchOnColor}: var(--primary--650);
    ${button.switchOnBackground}: var(--primary-500);

    ${button.switchOutlineFocus}: 1px solid var(--primary-400);
    ${button.switchOnOutlineFocus}: 1px solid var(--primary-400);
    
    
    ${button.primaryColor}: var(--primary--650);
    ${button.primaryBackground}: var(--primary-300);
    ${button.primaryBackgroundHover}: var(--primary-500);
    ${button.primaryRipple}: var(--primary-100);
    ${button.primaryBorder}: 1px solid var(--primary-500);
    ${button.primaryOutlineFocus}: 1px solid var(--primary-300);

    
    ${button.successColor}: var(--positive--650);
    ${button.successBackground}: var(--positive-300);
    ${button.successBackgroundHover}: var(--positive-500);
    ${button.successRipple}: var(--positive-100);
    ${button.successBorder}: 1px solid var(--positive-200);


    ${button.dangerColor}: var(--negative--650);
    ${button.dangerBackground}: var(--negative-300);
    ${button.dangerBackgroundHover}: var(--negative-500);
    ${button.dangerRipple}: var(--negative-100);
    ${button.dangerBorder}: 1px solid var(--negative-200);


    ${range.outlineFocus}: 1px dashed var(--primary-200);
    ${range.filled}: var(--primary-400);
    ${range.filledHover}: var(--primary-200);
    
    ${range.trackBackground}: var(--primary--500);
    ${range.trackBackgroundHover}: var(--primary--350);
    ${range.trackOutline}: 1px solid var(--primary--450);


    ${range.thumbBackground}: var(--primary--300);
    ${range.thumbBackgroundHover}: var(--primary--100);
    ${range.thumbBackgroundPressed}: var(--primary--200);
    ${range.thumbOutline}: 2px solid var(--primary--700);
    ${range.thumbShadow}: 1px 1px 8px var(--primary-1200);
    ${range.pointBackground}: var(--primary--700);
    

    ${tabs.color}: var(--primary-500);
    ${tabs.indicator}: var(--primary-500);
    ${tabs.colorDefault}: #bbb;
    ${tabs.outline}: 1px dashed var(--primary-500);
    ${tabs.background}: transparent;
    ${tabs.backgroundHover}: var(--primary--500);
    ${tabs.ripple}: var(--primary--400);

    
    ${menuCSSVarsNames.color}: var(--primary-1450);
    ${menuCSSVarsNames.background}: var(--primary--700);
    ${menuCSSVarsNames.backgroundHover}: var(--primary--550);
    ${menuCSSVarsNames.ripple}: var(--primary--400);

    ${select.color}: var(--primary-1350);
    ${select.background}: initial;
    ${select.backgroundHover}: var(--primary--550);
    ${select.ripple}: var(--primary--450);
    ${select.outlineFocus}: 1px solid var(--primary--100);
    
    ${select.border}: 1px solid var(--primary--300);
    ${select.circleColor}: var(--primary-500);
    ${select.optionColor}:  var(--primary-1350);
    ${select.optionBackground}: var(--primary--700);
    ${select.optionBackgroundHover}: var(--primary--550);
    ${select.optionRipple}: var(--primary--400);
    ${select.listboxBorder}: 1px solid var(--primary--300);
    ${select.listboxShadow}: var(--primary--550);

    ${select.fullscreenColor}: var(--primary--700);
    ${select.fullscreenBackground}: var(--primary-800);
    ${select.fullscreenOverlayBackground}: var(--primary-op-08-1500);
    ${select.fullscreenShadow}: var(--primary-1300);

    ${spinner.color}: var(--primary-500);
    ${spinner.background}: var(--primary--650);
    

    ${table.rowSelected}: var(--primary--500);
    ${table.rowHover}: var(--primary--650);
    ${table.headerBackground}: var(--primary--600);

    ${table.headerIconColor}: var(--primary--350);
    ${table.headerIconColorHover}: var(--primary--550);
    ${table.headerIconColorSelected}: var(--primary-100);
    ${table.headerIconBackgroundHover}: var(--primary--100);

    ${table.headerFilterContentBackground}: var(--primary--650);
    ${table.headerFilterContentShadow}: var(--primary--100);

    ${pagination.backgroundSelected}: var(--primary--500);
    

    ${checkbox.border}: 2px solid var(--primary--1000);
    ${checkbox.checkmarkColor}: var(--primary-1250);
    ${checkbox.background}: var(--primary--700);
    ${checkbox.shadowHover}: 0 0 5px var(--primary-400);
    ${checkbox.switcherControlBackground}: var(--primary--700);
    ${checkbox.switcherControlShadow}: 1px 1px 5px var(--primary-900);

    
    ${input.color}: var(--primary-1300);
    ${input.background}: var(--primary--600);
    ${input.border}: 1px solid var(--primary--100);
    ${input.outlineFocus}: 1px solid var(--primary-200);


    ${dialog.headerBackgroundColor}: var(--primary-1400);
    ${dialog.backgroundColor}: var(--primary--700);
    ${dialog.color}: var(--primary-1300);
    ${dialog.headerColor}: var(--primary--650);
    ${dialog.overlapBackground}: var(--primary-op-08-1500);
    ${dialog.boxshadow}: var(--primary-1500);

    
    ${sidebar.color}: var(--primary--600);
    ${sidebar.background}: var(--primary-1300);
    ${sidebar.backgroundHover}: var(--primary-1200);
    ${sidebar.ripple}: var(--primary-900);
    ${sidebar.backgroundFocus}: var(--primary-300);
    ${sidebar.outlineFocus}: 1px solid var(--primary-700);
    ${sidebar.border}: 1px solid var(--primary-900);
    ${sidebar.circle}: var(--primary-500);

}`;