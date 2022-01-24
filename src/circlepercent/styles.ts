import { css } from 'lit';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';

const circleCSSVars = {
    color: {
        name: "color",
        default: "inherit",
    },
}

const _v = makeCSSProxy(circleCSSVars, "--lit-circle-");
export const circleCSSValues = _v;
export const circleCSSVarsNames = makeCSSNameProxy(circleCSSVars, "--lit-circle-");


export const circleStyles = css`
:host{
    display: block;
    --size: 14px;
    height: var(--size);
    width: var(--size);
    contain: strict;
    color: inherit;
}
canvas{
    width: 100%;
    height: 100%;
    display: block;
}`