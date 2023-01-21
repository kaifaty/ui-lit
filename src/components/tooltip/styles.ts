import {css} from 'lit'

import {makeCSSNameProxy, makeCSSProxy} from '../../helpers/cssproxy'

const tooltipCSSVars = {
    background: {
        name: 'background',
        default: 'white',
    },
    color: {
        name: 'color',
        default: 'inherit',
    },
    fontSize: {
        name: 'font-size',
        default: '12px',
    },
    weight: {
        name: 'weight',
        default: 'normal',
    },
    shadow: {
        name: 'shadow',
        default: '0 0 8px var(--lit-tooltip-shadow, rgba(0,0,0,0.5))',
    },
    iconColor: {
        name: 'icon-color',
        default: '#fff',
    },
    iconBackground: {
        name: 'icon-background',
        default: 'rgba(0,0,0,0.7)',
    },
    iconShadow: {
        name: 'icon-shadow',
        default: '0 0 6px rgba(0,0,0,0.5)',
    },
}

const _v = makeCSSProxy(tooltipCSSVars, '--lit-tooltip-')

export const tooltipCSSValues = _v
export const tooltipCSSVarsNames = makeCSSNameProxy(tooltipCSSVars, '--lit-tooltip-')

export const tooltipStyles = css`
:host{
    display: block;    
    top: 0;
    left: 0;
    padding: 8px 10px;
    box-sizing: border-box;
    border-radius: 5px;
    background: ${_v.background};
    color: ${_v.color};
    min-width: 100px;
    min-height: 40px;
    opacity: 0;
    font-size: ${_v.fontSize};
    font-weight: ${_v.weight};
    transition: opacity 0.3s ease-out;
    box-shadow: ${_v.shadow};
    position: fixed;
    isolation: isolate;
    z-index: 10;
}
div{
    max-width: 320px;
    overflow-y: auto;
    overflow-x: hidden;
}
:host([visible]){
    opacity: 1;
}
lit-icon{
    position: absolute;
    right: -8px;
    top: -8px;
    border-radius: 12px;
    padding: 2px;
    width: 12px;
    height: 12px;
    color: ${_v.iconColor};
    background: ${_v.iconBackground};
    box-shadow: ${_v.iconShadow};
    display: flex;
    align-items: center;
    justify-content: center;
}
`