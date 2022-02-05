import { iconCSSVarNames } from './../icon/styles';
import { css } from 'lit';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';


const textCSSVars = {
    colorDanger: {
        name: "color-danger",
        default: "red",
    },
    colorAttention: {
        name: "color-attention",
        default: "#c4c10d",
    },
    colorSuccess: {
        name: "color-success",
        default: "#24d40d",
    },
    colorAccented: {
        name: "color-accented",
        default: "#24d40d",
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

const _v = makeCSSProxy(textCSSVars, "--lit-text-");

export const textCSSValues = _v;
export const textCSSVarsNames = makeCSSNameProxy(textCSSVars, "--lit-text-");

export const textStyles = css`
:host{
    display: inline;
}
:host([status="error"]),
:host([status="danger"]){
    color: ${_v.colorDanger};
    ${iconCSSVarNames.color}: ${_v.colorDanger};
}
:host([status="attention"]){
    color: ${_v.colorAttention};
    ${iconCSSVarNames.color}: ${_v.colorAttention};
}
:host([status="success"]){
    color: ${_v.colorSuccess};
    ${iconCSSVarNames.color}: ${_v.colorSuccess};
}
:host([status="accented"]){
    color: ${_v.colorAccented};
    ${iconCSSVarNames.color}: ${_v.colorAccented};
}
:host([center]){
    text-align: center;
}
:host([pulse]){
    animation: pulse 1.8s ease infinite;
}
@keyframes pulse {
    0% {
        opacity: 1
    }
    50%{
        opacity: 0.5
    }
    100%{
        opacity: 1
    }
}`;