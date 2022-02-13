import { makeCSSNameProxy } from './../helpers/cssproxy';
import { buttonCSSVarsNames } from './../button/styles';
import { makeCSSProxy } from '../helpers/cssproxy';
import { css } from 'lit';

export const TabsStyles = {
    outline: {
        name: "outline-focus",
        default: "1px dashed #999"
    },
    height: {
        name: "height",
        default: "30px"
    },
    background: {
        name: "background",
        default: "transparent"
    },
    backgroundHover: {
        name: "background-hover",
        default: "transparent"
    },
    ripple: {
        name: "ripple",
        default: "transparent"
    },
    color: {
        name: "color",
        default: "hsl(264, 100%, 66%)"
    },
    colorDefault: {
        name: "color-default",
        default: "#666"
    },
    indicator: {
        name: "indicator",
        default: "hsl(264, 100%, 66%)"
    }

};
export const _v = makeCSSProxy(TabsStyles, "--lit-tab-");
export const tabsCSSVarNames = makeCSSNameProxy(TabsStyles, "--lit-tab-");

export const tabStyles = css`
:host{
    display: block;
    flex: 1 0 auto;
    position: relative;
    ${buttonCSSVarsNames.background}: ${_v.background};
    ${buttonCSSVarsNames.color}: ${_v.color};
    ${buttonCSSVarsNames.borderRadius}: 0;
    ${buttonCSSVarsNames.backgroundHover}: ${_v.backgroundHover};
    ${buttonCSSVarsNames.ripple}: ${_v.ripple};
    height: 32px;
}
:host(:not([selected])){
    ${buttonCSSVarsNames.color}: ${_v.colorDefault};
}
:host([selected]) .border{
    display: block;
    
}
:host([tab]){
    border: none;
}
lit-button{
    width: 100%;
    contain: content;
    display: block;
    height: calc(100% - 2px);

}
.active.border{
    transform: none !important; 
    transition: 250ms transform cubic-bezier(0.4, 0, 0.2, 1);
}
.border{
    display: none;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: ${_v.indicator};
    bottom: 0;
    transform-origin: left;
}`;

export const tabsStyles = css`
    :host{
        display: inline-block;
        padding: 0 0 4px 0;
        box-sizing: border-box;
        position: relative;
        -webkit-overflow-scrolling: touch;
        overflow-y: hidden;
    }
    :host(:focus-within){
        outline: ${_v.outline};
        outline-offset: 2px;
    }
    :host([disabled]){
        opacity: 0.5;
    }
    .wrapper{
        display: flex;
        width: 100%;
    }
    .wrapper:focus{
        outline: none;
    }
    `