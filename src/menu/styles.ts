import { css } from 'lit';
import { buttonCSSValues } from './../button/styles';
import { buttonCSSVarsNames } from './../button/styles';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';


const menuCSSVars = {
    color: {
        name: "color",
        default: "#000",
    },
    background: {
        name: "background",
        default: "#fff",
    },
    backgroundHover: {
        name: "background-hover",
        default: "hsl(340, 50%, 55%)",
    },
    ripple: {
        name: "ripple",
        default: "hsl(340, 50%, 60%)",
    },
    height: {
        name: "height",
        default: "30px",
    },
    mobileHeight: {
        name: "mobileHeight",
        default: "40px",
    },
}

const _v = makeCSSProxy(menuCSSVars, "--lit-menu-");

export const menuCSSValues = _v;
export const menuCSSVarsNames = makeCSSNameProxy(menuCSSVars, "--lit-menu-");

export const menuItemStyles = css`
:host{
    min-width: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    position: relative;
    ${buttonCSSVarsNames.color}: ${_v.color};
    ${buttonCSSVarsNames.background}: ${_v.background};
    ${buttonCSSVarsNames.backgroundHover}: ${_v.backgroundHover};
    ${buttonCSSVarsNames.ripple}: ${_v.ripple};
    ${buttonCSSVarsNames.outlineFocus}: none;
}
.wrapper{
    padding: 10px;
}

lit-button:focus-within{
    background-color: ${buttonCSSValues.backgroundFocus};
}
lit-button{
    width: 100%;
}`

export const menuStyles = css`
:host{
    display: inline-block;
    ${buttonCSSVarsNames.mediumHeight}: ${_v.height};
    ${buttonCSSVarsNames.justify}: start;
}
:host([mobile]){
    ${buttonCSSVarsNames.mediumHeight}: ${_v.mobileHeight};
}
lit-select{
    width: 100%;
}
`