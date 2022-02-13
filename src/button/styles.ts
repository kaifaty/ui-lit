import { iconCSSVarNames } from './../icon/styles';
import { css, unsafeCSS } from 'lit';
import { noselect } from '../styles/noselect';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';

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
    primaryBackgroundHover: {
        name: "primary-background-hover",
        default: "hsl(264, 80%, 60%)",
    },
    primaryRipple: {
        name: "primary-ripple",
        default: "hsl(264, 80%, 75%)",
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
    successBackgroundHover: {
        name: "success-background-hover",
        default: "hsl(110, 80%, 60%)",
    },
    successRipple: {
        name: "success-ripple",
        default: "hsl(110, 80%, 65%)",
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
    dangerBackground: {
        name: "danger-background",
        default: "hsl(5, 80%, 55%)",
    },
    dangerBackgroundHover: {
        name: "danger-background-hover",
        default: "hsl(5, 80%, 60%)",
    },
    dangerRipple: {
        name: "danger-ripple",
        default: "hsl(5, 80%, 65%)",
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
        name: "text-transform",
        default: "uppercase",
    },
    letterSpacing: {
        name: "letter-spacing",
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
    backgroundHover: {
        name: "background-hover",
        default: "hsl(264, 100%, 93%)",
    },
    ripple: {
        name: "ripple",
        default: "hsl(264, 100%, 88%)",
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
        --click-x: 0;
        --click-y: 0;
        --radiant: 5%;

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
        position: relative;
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
    :host(:not([type=switch])[hover]) .wrapper{        
        background-color: ${_v.backgroundHover};
    }
    :host(:not([type=switch])[pressed]) .wrapper{
        background: radial-gradient(circle at var(--click-x) var(--click-y), ${_v.ripple} 5px , ${_v.backgroundHover} var(--radiant));
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
    lit-link{
        width: 100%;
    }

    :host([type=switch]) .wrapper{
        color: ${_v.switchColor};
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

    :host([primary]) .wrapper{
        color: ${_v.primaryColor};
        background: ${_v.primaryBackground};
        border: ${_v.primaryBorder};
        ${iconCSSVarNames.color}: ${_v.primaryBackground};
    }
    :host([primary]) .wrapper:focus{
        outline: ${_v.primaryOutlineFocus};
    }
    
    :host([primary][hover]) .wrapper{        
        background-color: ${_v.primaryBackgroundHover};
    }
    :host([primary][pressed]) .wrapper{
        background: radial-gradient(circle at var(--click-x) var(--click-y), ${_v.primaryRipple} 5px , ${_v.primaryBackgroundHover} var(--radiant));
    }

    :host([success]){
        ${iconCSSVarNames.color}: ${_v.successColor};
    }
    :host([success]) .wrapper{
        color: ${_v.successColor};
        background: ${_v.successBackground};
        border: ${_v.successBorder};
        ${iconCSSVarNames.color}: ${_v.successColor};
    }
    :host([success]) .wrapper:focus{
        outline: ${_v.successOutlineFocus};
    }
    :host([success][hover]) .wrapper{        
        background-color: ${_v.successBackgroundHover};
    }
    :host([success][pressed]) .wrapper{
        background: radial-gradient(circle at var(--click-x) var(--click-y), ${_v.successRipple} 5px , ${_v.successBackgroundHover} var(--radiant));
    }

    :host([danger]){
        ${iconCSSVarNames.color}: ${_v.dangerColor};
    }
    :host([danger]) .wrapper{
        color: ${_v.dangerColor};
        background: ${_v.dangerBackground};
        border: ${_v.dangerBorder};
        ${iconCSSVarNames.color}: ${_v.dangerColor};
    }
    :host([danger]) .wrapper:focus{
        outline: ${_v.dangerOutlineFocus};
    }
    :host([danger][hover]) .wrapper{        
        background-color: ${_v.dangerBackgroundHover};
    }
    :host([danger][pressed]) .wrapper{
        background: radial-gradient(circle at var(--click-x) var(--click-y), ${_v.dangerRipple} 5px , ${_v.dangerBackgroundHover} var(--radiant));
    }
    
    `
];