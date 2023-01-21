import {css} from 'lit'

import {makeCSSNameProxy, makeCSSProxy} from '../../helpers/cssproxy'

const panelCSSVars = {
    background: {
        name: 'background',
        default: 'hsl(299, 10%, 92%)',
    },
    color: {
        name: 'color',
        default: 'hsl(299, 70%, 5%)',
    },
    border: {
        name: 'border',
        default: '1px solid hsl(299, 15%, 65%)',
    },
    padding: {
        name: 'padding',
        default: '10px 15px',
    },
    dangerBackground: {
        name: 'danger-background',
        default: 'hsl(0, 85%, 75%)',
    },
    dangerColor: {
        name: 'danger-color',
        default: 'hsl(0, 80%, 5%)',
    },
    dangerBorder: {
        name: 'danger-border',
        default: '1px solid initial',
    },
    successBackground: {
        name: 'success-background',
        default: 'hsl(110, 85%, 75%)',
    },
    successColor: {
        name: 'success-color',
        default: 'hsl(0, 80%, 5%)',
    },
    successBorder: {
        name: 'success-border',
        default: '1px solid initial',
    },
}

const _v = makeCSSProxy(panelCSSVars, '--lit-panel-')

export const panelCSSValues = _v
export const panelCSSVarsNames = makeCSSNameProxy(panelCSSVars, '--lit-panel-')

export const panelStyles = css`
:host{
    display: block;
    background-color: ${_v.background};
    color: ${_v.color};
    padding: ${_v.padding};
    border: ${_v.border};
}
:host([danger]){
    background-color: ${_v.dangerBackground};
    color: ${_v.dangerColor};
    border: ${_v.dangerBorder};
}
:host([success]){
    background-color: ${_v.successBackground};
    color: ${_v.successColor};
    border: ${_v.successBorder};
}`