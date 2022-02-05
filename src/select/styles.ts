import { css } from 'lit';
import { buttonCSSVarsNames as button } from '../button/styles';
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
    position: relative;
    height: ${_v.height};
    ${button.mediumPadding}: ${_v.padding};
    ${button.border}: ${_v.border};
    ${button.color}: ${_v.color};
    ${button.borderRadius}: 0;
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
    ${button.color}: ${_v.color};
    ${button.mediumHeight}: 100%;
    ${button.background}: ${_v.background};    
    ${button.backgroundHover}: ${_v.backgroundHover};    
    ${button.ripple}: ${_v.ripple};
    ${button.outlineFocus}: ${_v.outlineFocus};
}`;

export const optionStyles = css`
:host{
    display: block;
    height: ${_v.height};
    ${button.color}: ${_v.optionColor};
    ${button.background}: ${_v.optionBackground};
    ${button.backgroundHover}: ${_v.optionBackgroundHover};
    ${button.ripple}: ${_v.optionRipple};
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
lit-button{
    width: 100%;
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