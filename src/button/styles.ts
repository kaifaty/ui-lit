import { iconCSSVarNames } from './../icon/styles';
import { css, unsafeCSS } from 'lit';
import { noselect } from '../styles/noselect';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';


const defaultStates = [{
    key: 'primary',
    defaultColor: 264
}, {
    key: 'success', 
    defaultColor: 110
}, {
    key: 'danger',
    defaultColor: 5
}];

export const buttonCSSVars = {
    display: {
        name: "display",
        default: "inline-flex",
    },
    primaryColor: {
        name: "primary-color",
        default: "hsl(264, 80%, 98%)",
    },
    primaryBackground: {
        name: "primary-background",
        default: "hsl(264, 80%, 55%)",
    },
    primaryRipple: {
        name: "primary-ripple",
        default: "hsl(264, 80%, 98%)",
    },
    primaryBorder: {
        name: "primary-border",
        default: "1px solid hsl(264, 80%, 55%)",
    },
    primaryOutlineFocus: {
        name: "primary-outline-focus",
        default: "1px solid hsl(264, 80%, 75%)",
    },
    successColor: {
        name: "success-color",
        default: "hsl(110, 80%, 4%)",
    },
    successBackground: {
        name: "success-background",
        default: "hsl(110, 80%, 55%)",
    },
    successRipple: {
        name: "success-ripple",
        default: "hsl(110, 80%, 98%)",
    },
    successBorder: {
        name: "success-border",
        default: "1px solid hsl(110, 80%, 55%)",
    },
    successOutlineFocus: {
        name: "success-outline-focus",
        default: "1px solid hsl(110, 80%, 35%)",
    },
    dangerColor: {
        name: "danger-color",
        default: "hsl(5, 80%, 98%)",
    },
    dangerRipple: {
        name: "danger-ripple",
        default: "hsl(5, 80%, 98%)",
    },
    dangerBackground: {
        name: "danger-background",
        default: "hsl(5, 80%, 55%)",
    },
    dangerBorder: {
        name: "danger-border",
        default: "1px solid hsl(5, 80%, 55%)",
    },
    dangerOutlineFocus: {
        name: "danger-outline-focus",
        default: "1px solid hsl(5, 80%, 35%)",
    },
    iconGap: {
        name: "icon-gap",
        default: "8px",
    },
    justify: {
        name: "justify",
        default: "center",
    },
    smallHeight: {
        name: "small-height",
        default: "25px",
    },
    smallPadding: {
        name: "small-padding",
        default: "0 6px",
    },
    smallFontSize: {
        name: "small-font-size",
        default: "inherit",
    },
    mediumHeight: {
        name: "height",
        default: "30px",
    },
    mediumPadding: {
        name: "padding",
        default: "0 20px",
    },
    mediumFontSize: {
        name: "font-size",
        default: "inherit",
    },
    largeHeight: {
        name: "large-height",
        default: "30px",
    },
    largePadding: {
        name: "large-padding",
        default: "0 20px",
    },
    largeFontSize: {
        name: "large-font-size",
        default: "inherit",
    },
    borderRadius: {
        name: "border-radius",
        default: "2px",
    },
    weight: {
        name: "weight",
        default: "600",
    },
    textTransform: {
        name: "weight",
        default: "uppercase",
    },
    letterSpacing: {
        name: "weight",
        default: "normal",
    },
    outline: {
        name: "outline",
        default: "none",
    },
    outlineFocus: {
        name: "outline-focus",
        default: "1px #ccc solid",
    },
    border: {
        name: "border",
        default: "1px solid hsl(264, 50%, 85%)",
    },
    color: {
        name: "color",
        default: "hsl(264, 100%, 46%)",
    },
    background: {
        name: "background",
        default: "initial",
    },
    backgroundFocus: {
        name: "background-focus",
        default: "hsl(264, 100%, 55%)",
    },
    switchColor: {
        name: "switch-color",
        default: "hsl(264, 100%, 46%)",
    },
    switchOnColor: {
        name: "switch-on-color",
        default: "hsl(264, 80%, 98%)",
    },
    switchOnBackground: {
        name: "switch-on-background",
        default: "hsl(264, 80%, 60%)",
    },
    switchOutlineFocus: {
        name: "switch-outline-focus",
        default: "1px solid hsl(264, 100%, 46%)",
    },
    switchOnOutlineFocus: {
        name: "switch-outline-focus",
        default: "1px solid hsl(264, 100%, 46%)",
    },
    
} 

const _prefix = "--lit-button-" ;

export const buttonCSSPrefix = unsafeCSS(_prefix);
const _v = makeCSSProxy(buttonCSSVars, _prefix);

export const buttonCSSValues = _v;
export const buttonCSSVarsNames = makeCSSNameProxy(buttonCSSVars, _prefix);


export const button = [
    noselect,
    css`
    :host{
        display: ${_v.display};
        position: relative;
        ${iconCSSVarNames.color}: ${_v.color};
    }
    
    :host([size = "small"]) .wrapper{
        height: ${_v.smallHeight};
        padding: ${_v.smallPadding};
        font-size: ${_v.smallFontSize};
    }
    :host([size = "medium"]) .wrapper{
        height: ${_v.mediumHeight};
        padding: ${_v.mediumPadding};
        font-size: ${_v.mediumFontSize};
    }
    :host([size = "large"]) .wrapper{
        height: ${_v.largeHeight};
        padding: ${_v.largePadding};
        font-size: ${_v.largeFontSize};
    }

    :host([disabled]), 
    :host([loading]){
        pointer-events: none;
    }
    :host([disabled]) .wrapper{
        opacity: 0.4;
    }
    
    :host([between]) .wrapper{
        justify-content: space-between;
    }
    .wrapper{
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        display: grid;
        gap: ${_v.iconGap};
        box-sizing: border-box;
        align-items: center;
        justify-content: ${_v.justify};
        grid-auto-flow: column;
        width: 100%;
        height: 100%;
        border-radius: ${_v.borderRadius};
        letter-spacing: ${_v.letterSpacing};
        outline: ${_v.outline};
        border: ${_v.border};
        white-space: nowrap;
        text-transform: ${_v.textTransform};
        font-weight: ${_v.weight};
        color: ${_v.color};
        font-family: inherit;
        background-color: ${_v.background};
        overflow: hidden;
    }
    :host .wrapper:focus{
        outline: ${_v.outlineFocus};
    }
    :host([loading]) .wrapper{
        cursor: initial;
    }
    lit-spinner{
        height: 12.8px;
        width: 12.8px;
        justify-self: center;
    }

    :host([type=switch]) .wrapper{
        color: ${_v.switchColor};
        --ripple-background: transparent;
        ${iconCSSVarNames.color}: ${_v.switchColor};
    }
    :host([type=switch][switchOn]) .wrapper{
        color: ${_v.switchOnColor};
        background-color: ${_v.switchOnBackground};
        ${iconCSSVarNames.color}: ${_v.switchOnColor};
    }
    :host([type=switch]) .wrapper:focus{
        outline: ${_v.switchOutlineFocus};
        border: ${_v.switchOutlineFocus};
    }
    :host([type=switch][switchOn]) .wrapper:focus{
        outline: ${_v.switchOnOutlineFocus};
        border: ${_v.switchOnOutlineFocus};
    }
    :host([borderless]) .wrapper,
    :host([borderless]) .wrapper.hover{
        border: none;
    }

    :host([primary]){
        ${iconCSSVarNames.color}: ${_v.primaryColor};
        --ripple-background: ${_v.primaryRipple};
    }
    :host([primary]) .wrapper{
        color: ${_v.primaryColor};
        background: ${_v.primaryBackground};
        border: ${_v.primaryBorder};
    }
    :host([primary]) .wrapper:focus{
        outline: ${_v.primaryOutlineFocus};
    }

    :host([success]){
        ${iconCSSVarNames.color}: ${_v.successColor};
        --ripple-background: ${_v.successRipple};
    }
    :host([success]) .wrapper{
        color: ${_v.successColor};
        background: ${_v.successBackground};
        border: ${_v.successBorder};
    }
    :host([success]) .wrapper:focus{
        outline: ${_v.successOutlineFocus};
    }

    :host([danger]){
        ${iconCSSVarNames.color}: ${_v.dangerColor};
        --ripple-background: ${_v.dangerRipple};
    }
    :host([danger]) .wrapper{
        color: ${_v.dangerColor};
        background: ${_v.dangerBackground};
        border: ${_v.dangerBorder};
    }
    :host([danger]) .wrapper:focus{
        outline: ${_v.dangerOutlineFocus};
    }`
];