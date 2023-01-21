import {lch2rgb} from '@kai/utils'
import {css, html, LitElement} from 'lit'
import {property} from 'lit/decorators.js'


import {definable} from '../../mixins/definable'
import {formAssocCSSNames as formassoc} from '../../nesting'
import {inputCSSVarNames as input} from '../../styles/input'
import {scrollbarCSSVarNames} from '../../styles/scrollbar'
import {LitButton} from '../button'
import {checkboxCSSVarsNames as checkbox} from '../checkbox/styles'
import {LitCircle} from '../circlepercent'
import {LitDivider} from '../divider'
import {LitIcon} from '../icon'
import {LitLink} from '../link'
import {markdownCssVarNames as markdown} from '../markdown/styles'
import {LitMenu} from '../menu'
import {noteCSSVarsNames as note} from '../note/styles'
import {paginationCSSVarsNames as pagination} from '../pagination/style'
import {panelCSSVarsNames as panel} from '../panel/styles'
import {LitRange} from '../range'
import {LitSelect} from '../select'
import {LitSidebar} from '../sidebar'
import {spinnerCSSVarsNames as spinner} from '../spinner/styles'
import {LitTable} from '../table'
import {tabsCSSVarNames as tabs} from '../tabs/styles'
import {LitText} from '../text'
import {tooltipCSSVarsNames as tooltip} from '../tooltip/styles'
import {treeViewVarNames as treeview} from '../treeview/styles'

import './reconfig.component'

import {PREFIX} from './styles.map'
import {HCL, TPallets, TTheme} from './types'

const endPallete = 1500
const range = 2200

export class LitTheme extends definable(LitElement){
    static get styles () {
        return [
        css`:host([theme = "light"]){
                color: var(--primary-1300);
                background-color: var(--primary--700);
                
                ${LitText.cssKey('color-accented')}: var(--positive-400);
                ${LitText.cssKey('color-attention')}: hsl(38, calc(90% + var(--s) * 0.2), calc(75% + var(--l) * 0.1));
                ${LitText.cssKey('color-danger')}: var(--negative-400);
                ${LitText.cssKey('color-success')}: var(--positive-400);

                ${LitIcon.cssKey('color')}: var(--primary-1300);
                ${LitIcon.cssKey('negative-color')}: var(--negative-0);
                ${LitIcon.cssKey('positive-color')}: var(--positive-0);
                

                ${LitCircle.cssKey('color')}: var(--primary-800);


                ${LitLink.cssKey('color')}: var(--primary-500);
                ${LitLink.cssKey('color-hover')}: var(--primary-500);
                

                ${LitDivider.cssKey('color')}: var(--primary-500);
                

                ${scrollbarCSSVarNames('thumb-webkit')}: var(--primary--500);
                ${scrollbarCSSVarNames('track-webkit')}: var(--primary--650);


                ${note.background}: var(--primary-200);
                ${note.border}: 1px solid var(--primary-300);
                ${note.color}: var(--primary--600);
                ${note.errorBackground}: var(--negative-200);
                ${note.errorBorder}: 1px solid var(--negative-300);
                ${note.errorColor}: var(--negative--600);
                ${note.errorShadow}: 1px 1px 3px var(--negative-400);
                ${note.shadow}: 1px 1px 3px var(--primary-700);

                ${tooltip.background}: var(--primary--500);
                ${tooltip.color}: var(--primary-1300);
                ${tooltip.shadow}: 2px 2px 3px var(--primary--200);

                
                ${panel.background}: var(--primary--500);
                ${panel.border}: 1px solid var(--primary--100);
                ${panel.color}: var(--primary-400);
                ${panel.dangerBackground}: var(--negative--500);
                ${panel.dangerBorder}: 1px solid var(--negative--100);
                ${panel.dangerColor}: var(--negative-400);
                ${panel.successBackground}: var(--positive--500);
                ${panel.successBorder}: 1px solid var(--positive--100);
                ${panel.successColor}: var(--positive-400);

                
                ${LitButton.cssKey('background')}: initial;
                ${LitButton.cssKey('background-focus')}: var(--primary-300);
                ${LitButton.cssKey('background-hover')}: var(--primary--550);
                ${LitButton.cssKey('border')}: 1px solid var(--primary--200);
                ${LitButton.cssKey('color')}: var(--primary-500);
                ${LitButton.cssKey('danger-background')}: var(--negative-300);
                ${LitButton.cssKey('danger-background-hover')}: var(--negative-500);
                ${LitButton.cssKey('danger-border')}: 1px solid var(--negative-200);
                ${LitButton.cssKey('danger-color')}: var(--negative--650);
                ${LitButton.cssKey('danger-ripple')}: var(--negative-100);
                ${LitButton.cssKey('outline-focus')}: 1px solid var(--primary-600);
                ${LitButton.cssKey('primary-background')}: var(--primary-300);
                ${LitButton.cssKey('primary-background-hover')}: var(--primary-500);
                ${LitButton.cssKey('primary-border')}: 1px solid var(--primary-500);
                ${LitButton.cssKey('primary-color')}: var(--primary--650);
                ${LitButton.cssKey('primary-outline-focus')}: 1px solid var(--primary-300);
                ${LitButton.cssKey('primary-ripple')}: var(--primary-100);
                ${LitButton.cssKey('ripple')}: var(--primary--450);
                ${LitButton.cssKey('success-background')}: var(--positive-300);
                ${LitButton.cssKey('success-background-hover')}: var(--positive-500);
                ${LitButton.cssKey('success-border')}: 1px solid var(--positive-200);
                ${LitButton.cssKey('success-color')}: var(--positive--650);
                ${LitButton.cssKey('success-ripple')}: var(--positive-100);
                ${LitButton.cssKey('switch-color')}: var(--primary-500);
                ${LitButton.cssKey('switch-on-background')}: var(--primary-500);
                ${LitButton.cssKey('switch-on-color')}: var(--primary--650);
                ${LitButton.cssKey('switch-on-outline-focus')}: 1px solid var(--primary-400);
                ${LitButton.cssKey('switch-outline-focus')}: 1px solid var(--primary-400);


                ${LitRange.cssKey('filled')}: var(--primary-400);
                ${LitRange.cssKey('filled-hover')}: var(--primary-200);
                ${LitRange.cssKey('outline-focus')}: 1px dashed var(--primary-200);                    
                ${LitRange.cssKey('point-background')}: var(--primary--700);
                ${LitRange.cssKey('thumb-background')}: var(--primary--300);
                ${LitRange.cssKey('thumb-background-hover')}: var(--primary--100);
                ${LitRange.cssKey('thumb-background-pressed')}: var(--primary--200);
                ${LitRange.cssKey('thumb-outline')}: 2px solid var(--primary--700);
                ${LitRange.cssKey('thumb-shadow')}: 1px 1px 8px var(--primary-1200);
                ${LitRange.cssKey('track-background')}: var(--primary--500);
                ${LitRange.cssKey('track-background-hover')}: var(--primary--350);
                ${LitRange.cssKey('track-outline')}: 1px solid var(--primary--450);
                

                ${tabs.backgroundHover}: var(--primary--500);
                ${tabs.background}: transparent;
                ${tabs.colorDefault}: #bbb;
                ${tabs.color}: var(--primary-500);
                ${tabs.indicator}: var(--primary-500);
                ${tabs.outline}: 1px dashed var(--primary-500);
                ${tabs.ripple}: var(--primary--400);

                
                ${LitMenu.cssKey('background')}: var(--primary--700);
                ${LitMenu.cssKey('background-hover')}: var(--primary--550);
                ${LitMenu.cssKey('color')}: var(--primary-1450);
                ${LitMenu.cssKey('ripple')}: var(--primary--400);


                ${LitSelect.cssKey('background')}: initial;
                ${LitSelect.cssKey('background-hover')}: var(--primary--550);
                ${LitSelect.cssKey('border')}: 1px solid var(--primary--300);
                ${LitSelect.cssKey('color')}: var(--primary-1350);
                ${LitSelect.cssKey('fullscreen-background')}: var(--primary-800);
                ${LitSelect.cssKey('fullscreen-color')}: var(--primary--700);
                ${LitSelect.cssKey('fullscreen-overlay-background')}: var(--primary-op-08-1500);
                ${LitSelect.cssKey('fullscreen-shadow')}: var(--primary-1300);
                ${LitSelect.cssKey('listbox-border')}: 1px solid var(--primary--300);
                ${LitSelect.cssKey('listbox-shadow')}: var(--primary--550);
                ${LitSelect.cssKey('option-background')}: var(--primary--700);
                ${LitSelect.cssKey('option-background-hover')}: var(--primary--550);
                ${LitSelect.cssKey('option-circle-color')}: var(--primary-500);
                ${LitSelect.cssKey('option-color')}:  var(--primary-1350);
                ${LitSelect.cssKey('option-ripple')}: var(--primary--400);
                ${LitSelect.cssKey('outline-focus')}: 1px solid var(--primary--100);
                ${LitSelect.cssKey('ripple')}: var(--primary--450);


                ${spinner.color}: var(--primary-500);
                ${spinner.background}: var(--primary--650);
                

                ${LitTable.cssKey('header-background')}: var(--primary--600);
                ${LitTable.cssKey('header-content-background')}: var(--primary--650);
                ${LitTable.cssKey('header-content-shadow')}: var(--primary--100);
                ${LitTable.cssKey('header-icon-background-hover')}: var(--primary--100);
                ${LitTable.cssKey('header-icon-color')}: var(--primary--350);
                ${LitTable.cssKey('header-icon-color-hover')}: var(--primary--550);
                ${LitTable.cssKey('header-icon-color-selected')}: var(--primary-100);
                ${LitTable.cssKey('row-hover')}: var(--primary--650);
                ${LitTable.cssKey('row-selected')}: var(--primary--500);


                ${pagination.backgroundSelected}: var(--primary--500);
                

                ${checkbox('checkbox-background')}: var(--primary--700);
                ${checkbox('checkbox-border')}: 2px solid var(--primary--1000);
                ${checkbox('checkmark-color')}: var(--primary-1250);
                ${checkbox('checkmark-shadow-hover')}: 0 0 5px var(--primary-400);
                ${checkbox('switcher-control-background')}: var(--primary--700);
                ${checkbox('switcher-control-shadow')}: 1px 1px 5px var(--primary-900);

            
                ${input.background}: var(--primary--600);
                ${input.border}: 1px solid var(--primary--100);
                ${input.color}: var(--primary-1300);
                ${input.outlineFocus}: 1px solid var(--primary-200);

                
                ${LitSidebar.cssKey('background')}: var(--primary-1300);
                ${LitSidebar.cssKey('background-focus')}: var(--primary-300);
                ${LitSidebar.cssKey('background-hover')}: var(--primary-1200);
                ${LitSidebar.cssKey('border')}: 1px solid var(--primary-900);
                ${LitSidebar.cssKey('color')}: var(--primary--600);
                ${LitSidebar.cssKey('outline-focus')}: 1px solid var(--primary-700);

                
                ${markdown('background')}: hsl(var(--primary-h), 3%, 10%);
                ${markdown('background-code')}: hsl(var(--primary-h), 3%, 90%);
                ${markdown('background-color-subtle')}: hsl(var(--primary-h), 3%, 95%);
                ${markdown('border-default')}: hsl(var(--primary-h), 20%, 77%);
                ${markdown('border-muted')}: hsl(var(--primary-h), 20%, 88%);
                ${markdown('box-shadow')}: hsla(var(--primary-h), 5%, 5%, 0.2);
                ${markdown('color')}: hsl(var(--primary-h), 3%, 80%);
                ${markdown('color-blockquote')}: hsl(var(--primary-h), 90%, 60%);
                ${markdown('color-lang')}: hsl(var(--primary-h), 98%, 85%);
                ${markdown('color-line-counter')}: hsl(var(--primary-h), 3%, 40%);
                ${markdown('color-link')}: hsl(211, 98%, 55%);
                ${markdown('color-muted')}: hsl(var(--primary-h), 3%, 50%);
                

                ${treeview('item-background-color-hover')}: hsl(var(--primary-h), 30%, 90%);
                ${treeview('item-background-color-selected')}: hsl(var(--primary-h), 30%, 15%);
                ${treeview('item-color')}: hsl(var(--primary-h), 65%, 10%);
                ${treeview('item-color-selected')}: hsl(var(--primary-h), 85%, 96%);
            }`, 
        css`:host([theme = "dark"]){
            color: var(--primary--650);
            background-color: hsl(var(--primary-h), 25%, 5%);

            ${LitText.cssKey('color-accented')}: var(--positive-0);
            ${LitText.cssKey('color-attention')}: hsl(38, calc(90% + var(--s) * 0.2), calc(55% + var(--l) * 0.1));
            ${LitText.cssKey('color-danger')}: var(--negative-0);
            ${LitText.cssKey('color-success')}: var(--positive-0);

            ${LitIcon.cssKey('color')}: var(--primary--650);
            ${LitIcon.cssKey('negative-color')}: var(--negative-0);
            ${LitIcon.cssKey('positive-color')}: var(--positive-0);

            ${LitCircle.cssKey('color')}: var(--primary--100);

            ${LitLink.cssKey('color')}: var(--primary--100);
            ${LitLink.cssKey('color-hover')}: var(--primary--300);


            ${LitDivider.cssKey('color')}: var(--primary-800);

            
            ${scrollbarCSSVarNames('thumb-webkit')}: var(--primary-1000);
            ${scrollbarCSSVarNames('track-webkit')}: var(--primary-1500);


            ${note.background}: var(--primary-200);
            ${note.border}: 1px solid var(--primary-100);
            ${note.color}: var(--primary--600);
            ${note.errorBackground}: var(--negative-200);
            ${note.errorBorder}: 1px solid var(--negative-100);
            ${note.errorColor}: var(--negative--600);
            ${note.errorShadow}: 1px 1px 3px var(--negative-1450);
            ${note.shadow}: 1px 1px 3px var(--primary-1450);


            ${tooltip.color}: var(--primary--600);
            ${tooltip.background}: var(--primary-300);
            ${tooltip.shadow}: 2px 2px 3px var(--primary-700);


            ${panel.background}: var(--primary-1200);
            ${panel.border}: 1px solid var(--primary-300);;
            ${panel.color}: var(--primary--200);
            ${panel.dangerBackground}: var(--negative-1200);
            ${panel.dangerBorder}: 1px solid var(--negative-300);
            ${panel.dangerColor}: var(--negative--200);
            ${panel.successBackground}: var(--positive-1200);
            ${panel.successBorder}: 1px solid var(--positive-300);
            ${panel.successColor}: var(--positive--200);


            ${LitButton.cssKey('background')}: initial;
            ${LitButton.cssKey('background-focus')}: var(--primary-300);
            ${LitButton.cssKey('background-hover')}: var(--primary-1200);
            ${LitButton.cssKey('border')}: 1px solid var(--primary-900);
            ${LitButton.cssKey('color')}: var(--primary--600);
            ${LitButton.cssKey('danger-background')}: var(--negative-300);
            ${LitButton.cssKey('danger-background-hover')}: var(--negative-500);
            ${LitButton.cssKey('danger-border')}: 1px solid var(--negative-200);
            ${LitButton.cssKey('danger-color')}: var(--negative--650);
            ${LitButton.cssKey('danger-ripple')}: var(--negative-100);
            ${LitButton.cssKey('outline-focus')}: 1px solid var(--primary-700);
            ${LitButton.cssKey('primary-background')}: var(--primary-300);
            ${LitButton.cssKey('primary-background-hover')}: var(--primary-500);
            ${LitButton.cssKey('primary-border')}: 1px solid var(--primary-500);
            ${LitButton.cssKey('primary-color')}: var(--primary--650);
            ${LitButton.cssKey('primary-outline-focus')}: 1px solid var(--primary-300);
            ${LitButton.cssKey('primary-ripple')}: var(--primary-100);
            ${LitButton.cssKey('ripple')}: var(--primary-900);
            ${LitButton.cssKey('success-background')}: var(--positive-300);
            ${LitButton.cssKey('success-background-hover')}: var(--positive-500);
            ${LitButton.cssKey('success-border')}: 1px solid var(--positive-200);
            ${LitButton.cssKey('success-color')}: var(--positive--650);
            ${LitButton.cssKey('success-ripple')}: var(--positive-100);
            ${LitButton.cssKey('switch-color')}: var(--primary--600);
            ${LitButton.cssKey('switch-on-background')}: var(--primary-400);
            ${LitButton.cssKey('switch-on-color')}: var(--primary--600);
            ${LitButton.cssKey('switch-on-outline-focus')}: 1px solid var(--primary-700);
            ${LitButton.cssKey('switch-outline-focus')}: 1px solid var(--primary-700);


            ${formassoc('invalid-background-color')}: var(--negative-700);
            ${formassoc('invalid-color')}: var(--negative--800);
            ${formassoc('invalid-shadow-color')}: var(--negative-1400);


            ${LitRange.cssKey('filled')}: var(--primary-300);
            ${LitRange.cssKey('filled-hover')}: var(--primary-0);
            ${LitRange.cssKey('outline-focus')}: 1px dashed var(--primary-200);
            ${LitRange.cssKey('point-background')}: var(--primary-1300);
            ${LitRange.cssKey('thumb-background')}: var(--primary-1200);
            ${LitRange.cssKey('thumb-background-hover')}: var(--primary-800);
            ${LitRange.cssKey('thumb-background-pressed')}: ${LitRange.cssVar('filled-hover')};
            ${LitRange.cssKey('thumb-outline')}: 2px solid var(--primary--600);
            ${LitRange.cssKey('thumb-shadow')}: 1px 1px 8px var(--primary-1450);
            ${LitRange.cssKey('track-background')}: var(--primary-1100);
            ${LitRange.cssKey('track-background-hover')}: var(--primary-900);
            ${LitRange.cssKey('track-outline')}: 1px solid var(--primary-1050);
            
            
            ${tabs.backgroundHover}: var(--primary-1200);
            ${tabs.background}: transparent;
            ${tabs.colorDefault}: #777;
            ${tabs.color}: var(--primary-100);
            ${tabs.indicator}: var(--primary-100);
            ${tabs.outline}: 1px dashed  var(--primary-100);
            ${tabs.ripple}: var(--primary-1000);
            

            ${LitMenu.cssKey('background-hover')}: var(--primary-1000);
            ${LitMenu.cssKey('background')}: var(--primary-1200);
            ${LitMenu.cssKey('color')}: var(--primary--650);
            ${LitMenu.cssKey('ripple')}: var(--primary-800);

            
            ${LitSelect.cssKey('background-hover')}: var(--primary-1200);
            ${LitSelect.cssKey('background')}: initial;
            ${LitSelect.cssKey('border')}: 1px solid var(--primary-900);
            ${LitSelect.cssKey('option-circle-color')}: var(--primary-500);
            ${LitSelect.cssKey('color')}: var(--primary--650);
            ${LitSelect.cssKey('fullscreen-background')}: var(--primary-800);
            ${LitSelect.cssKey('fullscreen-color')}: var(--primary--700);
            ${LitSelect.cssKey('fullscreen-overlay-background')}: var(--primary-op-08-1500);
            ${LitSelect.cssKey('fullscreen-shadow')}: var(--primary-1300);
            ${LitSelect.cssKey('listbox-border')}: 1px solid var(--primary-900);
            ${LitSelect.cssKey('listbox-shadow')}: var(--primary-1100);
            ${LitSelect.cssKey('option-background-hover')}: var(--primary-1100);
            ${LitSelect.cssKey('option-background')}: var(--primary-1200);
            ${LitSelect.cssKey('option-color')}:  var(--primary--700);
            ${LitSelect.cssKey('option-ripple')}: var(--primary-800);
            ${LitSelect.cssKey('outline-focus')}: 1px solid var(--primary-700);
            ${LitSelect.cssKey('ripple')}: var(--primary-900);


            ${spinner.background}: var(--primary-1400);
            ${spinner.color}: var(--primary-500);
            

            ${LitTable.cssKey('header-background')}: var(--primary-1150);
            ${LitTable.cssKey('header-content-background')}: var(--primary-1200);
            ${LitTable.cssKey('header-content-shadow')}: var(--primary-1400);
            ${LitTable.cssKey('header-icon-background-hover')}: var(--primary-1250);
            ${LitTable.cssKey('header-icon-color')}: #777;
            ${LitTable.cssKey('header-icon-color-hover')}: var(--primary--500);
            ${LitTable.cssKey('header-icon-color-selected')}: var(--primary-0);
            ${LitTable.cssKey('row-hover')}: var(--primary-1250);
            ${LitTable.cssKey('row-selected')}: var(--primary-1150);

            ${pagination.backgroundSelected}: var(--primary-1000);
            
            
            ${checkbox('checkbox-background')}: var(--primary-1300);
            ${checkbox('checkbox-border')}: 2px solid var(--primary-800);
            ${checkbox('checkmark-color')}: var(--primary--650);
            ${checkbox('checkmark-shadow-hover')}: 0 0 5px var(--primary-800);
            ${checkbox('switcher-control-background')}: var(--primary--700);
            ${checkbox('switcher-control-shadow')}: 1px 1px 5px var(--primary-1300);
            
            
            ${input.background}: var(--primary-1350);
            ${input.border}: 1px solid var(--primary-900);
            ${input.color}: var(--primary--650);
            ${input.outlineFocus}: 1px solid var(--primary-700);


            ${LitSidebar.cssKey('background-focus')}: var(--primary-300);
            ${LitSidebar.cssKey('background-hover')}: var(--primary-1200);
            ${LitSidebar.cssKey('background')}: var(--primary-1400);
            ${LitSidebar.cssKey('border')}: 1px solid var(--primary-900);
            ${LitSidebar.cssKey('color')}: var(--primary--600);
            ${LitSidebar.cssKey('outline-focus')}: 1px solid var(--primary-700);


            ${markdown('background')}: hsl(var(--primary-h), 22%, 2%);
            ${markdown('background-code')}: hsl(var(--primary-h), 22%, 11%);
            ${markdown('background-color-subtle')}: hsl(var(--primary-h), 25%, 7%);
            ${markdown('border-default')}: hsl(var(--primary-h), 20%, 19%);
            ${markdown('border-muted')}: hsl(var(--primary-h), 20%, 14%);
            ${markdown('box-shadow')}: hsla(var(--primary-h), 5%, 5%, 0.2);
            ${markdown('color')}: hsl(var(--primary-h), 3%, 80%);
            ${markdown('color-blockquote')}: hsl(var(--primary-h), 98%, 80%);
            ${markdown('color-lang')}: hsl(var(--primary-h), 98%, 80%);
            ${markdown('color-line-counter')}: hsl(var(--primary-h), 3%, 20%);
            ${markdown('color-link')}: hsl(211, 98%, 67%);
            ${markdown('color-muted')}: hsl(var(--primary-h), 3%, 50%);


            ${treeview('item-background-color-hover')}: hsl(var(--primary-h), 30%, 17%);
            ${treeview('item-background-color-selected')}: hsl(var(--primary-h), 30%, 15%);
            ${treeview('item-color')}: hsl(var(--primary-h), 65%, 98%);
            ${treeview('item-color-selected')}: hsl(var(--primary-h), 85%, 90%);
        }
        `,
        css`:host{
            display: block;
            min-height: 100%;
            border: none !important;
            width: 100%;
        }`]
    }
    @property({type: String, reflect: true}) theme: TTheme = localStorage.appTheme || 'dark'
    @property({type: Object}) params: TPallets = {
        primary: [20, 75, 50],
        negative: [20, 75, 50],
        positive: [135, 75, 50],
    }
    connectedCallback(): void {
        super.connectedCallback()
        this.addEventListener('changedPallete', this._changedParam as EventListener)
    }
    disconnectedCallback(): void {
        super.disconnectedCallback()
        this.removeEventListener('changedPallete', this._changedParam as EventListener)
    }
    willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
        if(_changedProperties.has('theme')){
            document.dispatchEvent(new CustomEvent('themeHasChanged', {
                detail: this.theme
            }))
        }
    }
    private _themeSwitch(){
        this.theme = this.theme === 'light' ? 'dark' : 'light'
        localStorage.appTheme = this.theme
    }
    private _changedParam = (e: CustomEvent) => {
        (this.params as any)[e.detail.name] = e.detail.params
        this.requestUpdate()
    }
    public getLuminanceCoeff(n: number, pos: number, step: number, index: number){
        const steps = range / step
        const oneStepDiff = (1 / steps) * 100
        const coff = (1.5 - n / 100)
        const limit = 50
        
        if(pos > limit){
            const leftSteps = (endPallete - limit) / step
            const startDecrees = steps - leftSteps
            const startDecreesValue = 100 - oneStepDiff * startDecrees * coff
            const leftStep = startDecreesValue / leftSteps
            const i = index - startDecrees
            return startDecreesValue - leftStep * i
        }
        
        return 100 - oneStepDiff * index * coff
        
    }
    public getChroma(n: number, pos: number, step: number){
        const limit = 500
        if(pos > limit ){
            const index = (pos - limit) / step
            const steps = (endPallete - limit) / step
            const oneStepDiff = (1 / steps) * 70
            const res = n - oneStepDiff * index

            if(res < 0) return 0
            return res

        }
        return n
    }
    protected genPallete(hcl: HCL, name: string, step = 50, opacity = 100){
        const result: string[] = []
        for(let pos = endPallete - range, i = 0; pos <= endPallete; pos += step, i++){
            result.push(`--${name}-${pos}: ${(
                lch2rgb(
                    this.getLuminanceCoeff(hcl[2], pos, step, i), 
                    this.getChroma(hcl[1], pos, step), 
                    hcl[0], 
                    opacity
                ))};`)
        }
        return result
    }
    render(){
        return html`
            <style>
                :host{
                  --primary-h: ${this.params.primary[0]};
                  ${this.genPallete(this.params.primary, 'primary')}
                  ${this.genPallete(this.params.primary, 'primary-op-08', 200, 80)}
                  ${this.genPallete(this.params.positive, 'positive')}
                  ${this.genPallete(this.params.negative, 'negative')}
                }
            </style>
            <slot @themeSwitch = "${this._themeSwitch}"></slot>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-theme': LitTheme;
    }
}
