import { iconCSSVarNames } from './../icon/styles';
import { buttonCSSVarsNames } from './../button/styles';
import { selectCSSVarNames } from './../select/styles';
import { linkCSSVarsNames } from './../link/styles';
import { css } from 'lit';
import { makeCSSNameProxy, makeCSSProxy } from '../helpers/cssproxy';


export const SidebarCSSVars = {
    color: {
        name: "color",
        default: "#fff"
    },
    background: {
        name: "background",
        default: "#000"
    },
    backgroundHover: {
        name: "background-hover",
        default: "#111"
    },
    backgroundFocus: {
        name: "background-focus",
        default: "#111"
    },
    ripple: {
        name: "ripple",
        default: "#222"
    },
    outlineFocus: {
        name: "outline-focus",
        default: "1px solid #555"
    },
    border: {
        name: "border",
        default: "1px solid #444"
    },
    circle: {
        name: "circle",
        default: "#666"
    },
    shadow: {
        name: "shadow",
        default: "#000"
    },
    padding: {
        name: "padding",
        default: "6px 10px"
    },

}


const _v = makeCSSProxy(SidebarCSSVars, "--lit-sidebar-");

export const rangeCSSNames = makeCSSNameProxy(SidebarCSSVars, "--lit-sidebar-");

export const styles = css`
:host{
    --position: -270px;
    display: block;
    position: fixed;
    width: 270px;
    top: 0;
    height: var(--viewport-height, 100vh);
    transform: translateX(var(--position)); 
    background: ${_v.background};
    color: ${_v.color};
    z-index: 100;
    box-sizing: border-box;
    left: 0;
    padding: 5px;

    ${buttonCSSVarsNames.color}: ${_v.color};
    ${buttonCSSVarsNames.background}: #111;
    ${buttonCSSVarsNames.backgroundHover}: #111;
    ${buttonCSSVarsNames.ripple}: #111;
    ${buttonCSSVarsNames.border}: ${_v.border};
    
    ${buttonCSSVarsNames.color}: ${_v.color};
    ${buttonCSSVarsNames.background}: ${_v.background};
    ${buttonCSSVarsNames.backgroundHover}: ${_v.backgroundHover};
    ${buttonCSSVarsNames.ripple}: ${_v.ripple};
    ${buttonCSSVarsNames.backgroundFocus}: ${_v.backgroundFocus};

    ${selectCSSVarNames.color}: ${_v.color};
    ${selectCSSVarNames.background}: ${_v.background};
    ${selectCSSVarNames.backgroundHover}: ${_v.backgroundHover};
    ${selectCSSVarNames.ripple}: ${_v.ripple};
    ${selectCSSVarNames.outlineFocus}: ${_v.outlineFocus};

    ${selectCSSVarNames.border}: ${_v.border};
    ${selectCSSVarNames.circleColor}: ${_v.circle};
    ${selectCSSVarNames.optionColor}: ${_v.color};
    ${selectCSSVarNames.optionBackground}: ${_v.background};
    ${selectCSSVarNames.optionBackgroundHover}:  ${_v.backgroundHover};
    ${selectCSSVarNames.optionRipple}: ${_v.ripple};
    ${selectCSSVarNames.listboxBorder}: ${_v.outlineFocus};
    ${selectCSSVarNames.listboxShadow}: ${_v.shadow};

    ${buttonCSSVarsNames.justify}: start;
    ${buttonCSSVarsNames.mediumPadding}: ${_v.padding};
    ${selectCSSVarNames.padding}: ${_v.padding};
    ${iconCSSVarNames.color}: ${_v.color};

    will-change: transform;
    transition: transform 0.4s linear;
}
:host([opened]){
    transition: transform 0.4s linear;
    box-shadow: 3px 0 8px rgba(0, 0, 0, 0.5);
}
:host([moving]){
    transition: none !important;
}
#arrow{
    position: absolute;
    top: 5px;
    right: 5px;
    ${iconCSSVarNames.fontSize}: 20px;
}
`;