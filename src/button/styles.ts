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
    iconGap: {
        name: "icon-gap",
        default: "8px",
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
        default: "hsl(264, 100%, 46%)",
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
    }
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
        gap: var(--lit-button-icon-gap, 8px);
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
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
        background-color: initial;
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
        
    }`,
    ...defaultStates.map(k => {
        const key = unsafeCSS(k.key);
        const h = unsafeCSS(k.defaultColor);
        const color = unsafeCSS(((k.defaultColor < 30 || k.defaultColor > 190) ? 95 : 5) + "%");

        return css`
        :host([${key}]){
            --${key}-hue: var(--lit-${key}-hue, ${h});       
            --ripple-background:  hsl(var(--${key}-hue), 95%, 14%);
            ${iconCSSVarNames.color}: var(--lit-button-${key}-color, hsl(var(--${key}-hue), 95%, 98%));
        }
        :host([${key}]) .wrapper{
            color: var(${buttonCSSPrefix}${key}-color, hsl(var(--${key}-hue), 95%, ${color}));
            border: var(${buttonCSSPrefix}${key}-border, 1px solid hsl(var(--${key}-hue), 50%, 85%));
            background: var(${buttonCSSPrefix}${key}-background, hsl(var(--${key}-hue), 95%, 55%));
        }
        `
    })
];
