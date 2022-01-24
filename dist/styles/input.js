import { css } from 'lit';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';
const inputCSSVar = {
    display: {
        name: "display",
        default: "inline-block"
    },
    height: {
        name: "height",
        default: ""
    },
    color: {
        name: "color",
        default: "inherit"
    },
    background: {
        name: "background",
        default: "#fff"
    },
    fontSize: {
        name: "font-size",
        default: "inherit"
    },
    padding: {
        name: "padding",
        default: "6px 8px"
    },
    border: {
        name: "border",
        default: "1px solid hsla(222, 20%, 60%, 0.5)"
    },
    align: {
        name: "align",
        default: "initial"
    },
    outlineFocus: {
        name: "outline-focus",
        default: "1px solid  hsla(222, 20%, 60%, 0.5)"
    },
    errorBorder: {
        name: "error-border",
        default: "1px solid hsl(5, 66%, 55%)"
    },
    errorOutline: {
        name: "error-outline",
        default: "1px solid hsl(5, 66%, 55%)"
    },
};
const _v = makeCSSProxy(inputCSSVar, "--lit-input-");
export const inputCSSVarNames = makeCSSNameProxy(inputCSSVar, "--lit-input-");
export const input = css `
:host{
    display: ${_v.display};
    height: ${_v.height};
}
.wrapper{
    position: relative;
    height: 100%;
    width: 100%;
}
.icon{
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
}
input, textarea{
    height: 100%;
    width: 100%;
    font-size: ${_v.fontSize};
    box-sizing: border-box;
    padding: ${_v.padding};
    border: ${_v.border};
    text-align: ${_v.align};
    background: ${_v.background};
    color: ${_v.color};
    font-family: inherit;
}
input::-webkit-calendar-picker-indicator { display: none }

input[type=date]::-webkit-inner-spin-button, 
input[type=date]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
input:focus, 
textarea:focus{
    outline: ${_v.outlineFocus};
}
input:focus::-webkit-input-placeholder {opacity: 0; transition: opacity 0.3s ease;}
input:focus::-moz-placeholder          {opacity: 0; transition: opacity 0.3s ease;}
input:focus:-moz-placeholder           {opacity: 0; transition: opacity 0.3s ease;}
input:focus:-ms-input-placeholder      {opacity: 0; transition: opacity 0.3s ease;}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active{
    box-shadow: 0 0 0 30px white inset
}
  
:host([invalid]) input{
    border: ${_v.errorBorder};
}
:host([invalid]) input:focus{
    outline: ${_v.errorOutline};
}

textarea:focus::-webkit-input-placeholder {opacity: 0; transition: opacity 0.3s ease;}
textarea:focus::-moz-placeholder          {opacity: 0; transition: opacity 0.3s ease;}
textarea:focus:-moz-placeholder           {opacity: 0; transition: opacity 0.3s ease;}
textarea:focus:-ms-input-placeholder      {opacity: 0; transition: opacity 0.3s ease;}
`;
