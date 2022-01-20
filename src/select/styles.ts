import { buttonCSSVarsNames } from './../button/styles';
import { css } from 'lit';
import { buttonCSSVarsNames as button, buttonCSSVars  } from '../button/styles';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';

export const selectCSSVars = {
    color: {
        name: "color",
        default: `var(--lit-button-${buttonCSSVars.color.name}, ${buttonCSSVars.color.default})`
    },
    height: {
        name: "height",
        default: "30px"
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
        default: "hsl(246, 65%, 69%)"
    },
    circleColor:{
        name: "option-circle-color",
        default: "hsl(246, 65%, 55%)"
    },
    listboxBackground:{
        name: "listbox-background",
        default: "#fff"
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
        name: "fullscreen-color",
        default: "hsl(246, 15%, 18%)"
    },
    fullscreenOverlayBackground:{
        name: "fullscreen-overlay-background",
        default: "rgba(0,0,0,0.6)"
    },
    fullscreenShadow:{
        name: "fullscreen-color",
        default: "rgba(0,0,0,0.3)"
    }
}

const _v = makeCSSProxy(selectCSSVars, "--lit-select-");

export const selectCSSVarNames = makeCSSNameProxy(selectCSSVars, "--lit-select-");

export const selectStyles = css`
:host{
    display: inline-block;
    position: relative;
    height: ${_v.height};
    ${button.mediumPadding}: ${_v.padding};
    
}
::part(content){
    overflow: hidden;
    text-overflow: ellipsis;
}
.wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
lit-button{
    width: 100%;
    min-width: 70px;
    height: 100%;
    ${button.mediumHeight}: 100%;
    color: ${_v.color};
}`;

export const optionStyles = css`
:host{
    display: block;
    height: ${_v.height};
    color: ${_v.optionColor};
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
    left: 2px;
}
lit-button{
    width: 100%;
}
:host(:not([selected])) lit-button:hover span::after,
:host(:not([selected])) lit-button[pressed] span::after
{
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
    outline: 2px solid ${_v.circleColor};
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
    ${buttonCSSVarsNames.border}: none;
}
:host([open]){
    display: block;
}
.wrapper{
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 330px;
    border: ${_v.listboxBorder};
    box-shadow: 3px calc(3px * var(--shadow-pos)) 6px ${_v.listboxShadow};    
    background-color: ${_v.listboxBackground};    
}
:host([mobile][open]) {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${_v.fullscreenOverlayBackground};
    z-index: 1;
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
    --ripple-background: ${_v.fullscreenBackground};    

}
:host([mobile]){
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
}`