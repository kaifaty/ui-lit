import { css } from 'lit';
import { buttonCSSValues } from './../button/styles';
import { buttonCSSVarsNames } from './../button/styles';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';


const menuCSSVars = {
    itemBackground: {
        name: "item-background",
        default: "initial",
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
    background-color: ${_v.itemBackground};
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
    ${buttonCSSVarsNames.mediumHeight}: var(--lit-menu-item-height, 30px);
    ${buttonCSSVarsNames.justify}: start;
}
lit-select{
    width: 100%;
}`