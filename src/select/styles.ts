import { iconCSSVarNames, iconCSSVars } from './../icon/styles';
import { buttonCSSVarsNames } from './../button/styles';
import { css } from 'lit';
import { buttonCSSVarsNames as button } from '../button/styles';
import { buttonCSSValues as buttonValues } from '../button/styles';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';

export const selectCSSVars = {
    
    color: {
        name: "color",
        default: `hsl(264, 65%, 50%)`
    },
    height: {
        name: "height",
        default: "30px"
    },
    listboxHeight: {
        name: "listbox-height",
        default: "330px"
    },
    mobileHeight: {
        name: "mobileHeight",
        default: "40px"
    },
    background: {
        name: "background",
        default: "initial"
    },
    backgroundHover: {
        name: "background-hover",
        default: "initial"
    },
    outlineFocus: {
        name: "outline-focus",
        default: "1px solid hsl(264, 65%, 70%)"
    },
    ripple: {
        name: "ripple",
        default: "initial"
    },
    border: {
        name: "border",
        default: "1px solid #ccc"
    },
    padding: {
        name: "padding",
        default: "0 14px"
    },
    optionColor: {
        name: "option-color",
        default: "#333"
    },
    optionBackground: {
        name: "option-background",
        default: "hsl(264, 65%, 99%)"
    },
    optionRipple: {
        name: "option-ripple",
        default: "hsl(264, 65%, 60%)"
    },
    optionBackgroundHover: {
        name: "option-background-hover",
        default: "hsl(264, 65%, 99%)"
    },
    circleColor:{
        name: "option-circle-color",
        default: "hsl(264, 65%, 55%)"
    },
    listboxBorder:{
        name: "listbox-border",
        default: "1px solid #eee"
    },
    listboxShadow:{
        name: "listbox-shadow",
        default: "rgba(0,0,0,0.07)"
    },
    fullscreenColor:{
        name: "fullscreen-color",
        default: "hsl(246, 15%, 99%)"
    },
    fullscreenBackground:{
        name: "fullscreen-background",
        default: "hsl(246, 15%, 18%)"
    },
    fullscreenOverlayBackground:{
        name: "fullscreen-overlay-background",
        default: "rgba(0,0,0,0.6)"
    },
    fullscreenShadow:{
        name: "fullscreen-shadow",
        default: "rgba(0,0,0,0.3)"
    }
}

const _v = makeCSSProxy(selectCSSVars, "--lit-select-");

export const selectCSSVarNames = makeCSSNameProxy(selectCSSVars, "--lit-select-");

export const selectStyles = css`
:host{
    display: inline-block;
    height: ${_v.height};
    ${button.mediumPadding}: ${_v.padding};
    ${button.border}: ${_v.border};
    ${button.color}: ${_v.color};
    ${button.justify}: normal;
    ${iconCSSVarNames.color}: ${_v.color};
    ${button.borderRadius}: 0;
    --input-width: 0;
}
:host([multiple]){
    height: initial;
}
:host(:not([multiple])) .wrapper{
    display: flex;
    align-items: center;
}

:host([multiple][searchable]) .wrapper{
    cursor: text;
}
:host([multiple]) .wrapper{
    cursor: text;
    border: ${_v.border};
    min-width: 100px;
}
.wrapper{
    min-height: ${_v.height};
    box-sizing: border-box;
    padding: 1px;
    padding-right: 22px;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-wrap: wrap;
}
.wrapper:focus{
    outline:  ${buttonValues.outlineFocus};
}
.icon-wrapper{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    top: 0;
    right: 0;
    height: 100%;
}
.selected{
    display: flex;
    flex-wrap: wrap;
}
.search-wrapper{
    padding: 0 4px;
    display: inline-block;
}
input{ 
    width: 100%;
    background: transparent;
    box-sizing: border-box;
    color: ${_v.color};
    border: none;
    min-width: 4px;
    min-height: calc(${_v.height} - 4px);
    outline: none;
    appearance: none;
    margin: 0;
    padding: 0 8px;
}
:host(:not([multiple])) input{
    margin: 6px 14px 6px 14px;
    padding: 0 5px;
    width: calc(100% - 32px);
    border: ${_v.listboxBorder};
}
:host([multiple]:not([empty])) input{
    padding: 0;
}

:host([multiple]) input{
    width: var(--input-width);
}
button{
    margin: 2px;
    ${iconCSSVarNames.color}: ${buttonValues.primaryColor};
    color: ${buttonValues.primaryColor};
    border: ${buttonValues.primaryBorder};
    background: ${buttonValues.primaryBackground};
    padding: 2px 5px;
}
::part(content){
    overflow: hidden;
    text-overflow: ellipsis;
}
lit-button{
    width: 100%;
    min-width: 70px;
    height: 100%;
    ${button.color}: ${_v.color};
    ${button.mediumHeight}: 100%;
    ${button.background}: ${_v.background};    
    ${button.backgroundHover}: ${_v.backgroundHover};    
    ${button.ripple}: ${_v.ripple};
    ${button.outlineFocus}: ${_v.outlineFocus};
}
.cancel{
    cursor: pointer;
    fill: ${buttonValues.primaryColor};
}
.search, .dropdown{
    fill: ${buttonValues.color};
}
`;

export const optionStyles = css`
:host{
    display: block;
    ${button.color}: ${_v.optionColor};
    ${button.background}: ${_v.optionBackground};
    ${button.backgroundHover}: ${_v.optionBackgroundHover};
    ${button.ripple}: ${_v.optionRipple};
    ${button.mediumHeight}: ${_v.height};

}
:host([mobile]){
    ${buttonCSSVarsNames.mediumHeight}: ${_v.mobileHeight};
}
:host([selected]) span::after{
    width: 8px;
    height: 8px;
    background-color: ${_v.circleColor} ;
}
:host span::after{
    content: '';
    border-radius: 8px;
    width: 8px;
    height: 8px;
    position: absolute;
    top: 2px;
    left: 2px !important;
}
:host(:not([visability])){
    display: none;
}
lit-button{
    width: 100%;
    height: 100%;
    display: block;
    ${button.outlineFocus}: none;    
}
:host(:not([selected])) lit-button:hover span::after,
:host(:not([selected])) lit-button[pressed] span::after{
    opacity: 0.3;
    background-color: ${_v.circleColor};
}
:host(:not([selected])) lit-button[pressed] span::after{
    opacity: 0.5;
}
span{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 15px;
    border-radius: 12px;
    border: 2px solid ${_v.circleColor};
    position: relative;
}`;

export const listboxStyles = css`
:host{
    display: none;
    box-sizing: border-box;
    position: absolute;
    box-sizing: border-box;
    z-index: 10;
    --shadow-pos: -1;
    ${button.border}: none;
    background: ${_v.optionBackground};

}
:host([open]){
    display: block;
}
.wrapper{
    overflow-y: auto;
    overflow-x: hidden;
    max-height: ${_v.listboxHeight};
    border: ${_v.listboxBorder};
    box-shadow: 3px calc(3px * var(--shadow-pos)) 6px ${_v.listboxShadow};    
}
:host([mobile]) .wrapper{
    border-radius: 5px;
    min-width: 280px;
    max-width: 90%;
    max-height: 50%;
    margin: 0 auto;
    border: none;
    color: ${_v.fullscreenColor};
    box-shadow: 3px 3px 3px ${_v.fullscreenShadow};    
    ${button.background}: ${_v.fullscreenBackground}; 

}
:host([mobile]){
    display: none;
    background-color: ${_v.fullscreenOverlayBackground};
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1;
}
:host([mobile][open]) {
    display: flex;
}`