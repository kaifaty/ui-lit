import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';
import { css } from 'lit';

const dividerCSSVars = {
    color: {
        name: "color",
        default: "#333",
    },
    height: {
        name: "height",
        default: "1px",
    },
    margin: {
        name: "margin",
        default: "10px 0",
    },
}

const _v = makeCSSProxy(dividerCSSVars, "--lit-divider-");

export const dividerCSSValues = _v;
export const dividerCSSVarsNames = makeCSSNameProxy(dividerCSSVars, "--lit-divider-");

export const dividerStyles = css`
:host{
    display: block;
    height: ${_v.height};
    background-color: ${_v.color};
    width: 100%;
    margin: ${_v.margin};
}`