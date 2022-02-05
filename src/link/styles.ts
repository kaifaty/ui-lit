import { iconCSSVarNames } from './../icon/styles';
import { css } from 'lit';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';

const linkCSSVars = {
    color: {
        name: "color",
        default: "hsl(200, 80%, 55%)",
    },
    colorHover: {
        name: "color-hover",
        default: "hsl(200, 80%, 60%)",
    },
}

const _v = makeCSSProxy(linkCSSVars, "--lit-link-");

export const linkCSSValues = _v;
export const linkCSSVarsNames = makeCSSNameProxy(linkCSSVars, "--lit-link-");

export const linkStyles = css`
    :host{
        display: inline-block;
        box-sizing: border-box;
        position: relative;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    :host([type=button]) a{
        color: inherit;
    }
    :host(:not([type=button])) a{
        color: ${_v.color};
        ${iconCSSVarNames.color}: ${_v.color};
        text-decoration: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        width: 100%;
    }
    :host::after{
        content: '';
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        background-color: ${_v.color};
        height: 1px;
        opacity: 0;
        transition: opacity .1s ease;
        border-radius: 2px;
    }
    :host(:not([type=button])[hover]) a{
        color: ${_v.colorHover};
    }
    :host([hover])::after{
        opacity: 1;
        background-color: ${_v.colorHover};
    }
    :host(:not([type=button])[underlined])::after{
        opacity: 1;
    }`;

    