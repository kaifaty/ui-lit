import {createcssMap} from '@kai/utils'
import {css} from 'lit'

import {checkboxCCSVarsMap, PREFIX} from './styles.map'


const {getVar, getKey} = createcssMap(checkboxCCSVarsMap, PREFIX)


export const checkboxCSSVarsNames = getKey

export const checkboxStyles = css`
.checkmark{
    stroke: ${getVar('checkmark-color')};
    stroke-width: 2;
    width: 100%;
    height: 100%;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.1s ease-in;
}
:host([type=checkbox]) #content{
    background-color: ${getVar('checkbox-background')};
    border: ${getVar('checkbox-border')};
    cursor: pointer;
    height: var(--control-size);
    position: relative;
    width: var(--control-size);
}
:host([type=checkbox]) #content:hover{
    box-shadow: ${getVar('checkmark-shadow-hover')};
}
:host([type=checkbox][value=on]) .checkmark{
    visibility: visible;
    opacity: 1;
}
:host([type=checkbox][value=off]) .checkmark{
    visibility: visible;
}
`
export const switcherStyles = css`

:host{
    contain: content;
    display: inline-block;
    --control-size: 16px;
    --offset: calc((var(--switcher-height) - var(--control-size) ) / 2);
    --switcher-height: 16px;
    --switcher-width: 34px;
}

:host([type=switcher]) #content{
    border-radius: var(--switcher-height);
    box-shadow: ${getVar('switcher-shadow')};
    cursor: pointer;
    height: var(--switcher-height);
    position: relative;
    transition: background-color ease 0.2s;
    width: var(--switcher-width);
}

:host([type=switcher]) .control{
    background-color: ${getVar('switcher-control-background')};
    border-radius: 100%;
    box-shadow: ${getVar('switcher-control-shadow')};
    height: var(--control-size);
    left: var(--offset);
    position: absolute;
    top: 0;
    transition: transform ease 0.2s;
    width: var(--control-size);
}

:host([type=switcher][value=on]) #content{
    background-color: ${getVar('switcher-on-background')};
}

:host([type=switcher]) #content{
    background-color: ${getVar('switcher-off-background')};
}

:host([type=switcher][value=on]) .control{
    transform: translateX(calc(var(--switcher-width) - var(--control-size)));
}

`