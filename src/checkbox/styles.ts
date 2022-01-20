import { css } from 'lit';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';

const checkboxCSSVars = {
    border: {
        name: "border",
        default: "1px solid #999"
    },
    checkmarkColor: {
        name: "checkmark-Color",
        default: "hsl(100, 65%, 5%)"
    },
    background: {
        name: "background",
        default: "#fff"
    },
    shadowHover: {
        name: "shadow-hover",
        default: "0 0 2px #999"
    },
    switcherShadow: {
        name: "switcher-shadow",
        default: "inset 1px 1px 2px rgba(0,0,0,0.7)"
    },
    switcherControlBackground: {
        name: "switcher-control-background",
        default: "#fff"
    },
    switcherControlShadow: {
        name: "switcher-control-shadow",
        default: "1px 1px 2px rgba(0,0,0,0.6)"
    },
    switcherOnBackground: {
        name: "switcher-on-background",
        default: "hsl(110, 65%, 50%)"
    },
    switcherOffBackground: {
        name: "switcher-off-background",
        default: "hsl(0, 65%, 50%)"
    }
}

const _v = makeCSSProxy(checkboxCSSVars, "--lit-checkbox-");

export const checkboxCSSVarsNames = makeCSSNameProxy(checkboxCSSVars, "--lit-checkbox-")

export const checkboxStyles = css`
:host{
    --switcher-width: 32px;
    --switcher-height: 14px;
    --control-size: 14px;
    --offset: calc((var(--switcher-height) - var(--control-size) - 2px ) / 2);

    --checkmark-border: 2px;
    --checkmark-width: 5px;
    --checkmark-height: 8px;
    --checkmark-left: calc(var(--control-size) - var(--checkmark-width) - var(--checkmark-border) - 3px);
    --checkmark-top: calc(var(--control-size) - var(--checkmark-height) - var(--checkmark-border) - 4px);

}
:host([readonly]),
:host([disabled]){
    opacity: 0.5;
}

:host([type=checkbox]) .control{
    display: none;
}
:host([type=checkbox]) #content{
    width: var(--control-size);
    height: var(--control-size);
    border: ${_v.border};
    position: relative;
    cursor: pointer;
    background-color: ${_v.background};
    
}
:host([type=checkbox]) #content:hover{
    box-shadow: ${_v.shadowHover};
}
:host([type=checkbox][value=on]) #content:after{
    content:'';
    position: absolute;
    top: var(--checkmark-top);
    left: var(--checkmark-left);
            
    transform-origin: center;
    transform:  rotate(45deg) skewX(15deg) ;
    height: var(--checkmark-height);
    width: var(--checkmark-width);
    border-bottom: var(--checkmark-border) solid var(--checkmark-color, ${_v.checkmarkColor});
    border-right: var(--checkmark-border) solid var(--checkmark-color, ${_v.checkmarkColor});
}

:host([type=switcher]) #content{
    cursor: pointer;
    position: relative;
    width: var(--switcher-width);
    height: var(--switcher-height);
    border-radius: var(--switcher-height);
    transition: background-color ease 0.2s;
    box-shadow: ${_v.switcherShadow};
}
:host([type=switcher]) .control{
    position: absolute;
    background-color: ${_v.switcherControlBackground};
    border-radius: 100%;
    width: var(--control-size);
    height: var(--control-size);
    top: 0;
    left: var(--offset);
    box-shadow: ${_v.switcherControlShadow};
    transition: transform ease 0.2s;
}

:host([type=switcher][value=on]) #content{
    background-color: ${_v.switcherOnBackground};
}
:host([type=switcher]) #content{
    background-color: ${_v.switcherOffBackground};
}
:host([type=switcher][value=on]) .control{
    transform: translateX(calc(var(--switcher-width) - var(--control-size) + 1px));
}
`