import {css} from 'lit'

import {makeCSSNameProxy, makeCSSProxy} from '../../helpers/cssproxy'


const noteCSSVars = {
    border: {
        name: 'border',
        default: '1px solid hsl(264, 70%, 50%)',
    },
    color: {
        name: 'color',
        default: 'hsl(264, 50%, 95%)',
    },
    background: {
        name: 'background',
        default: 'hsl(264, 70%, 65%)',
    },
    shadow: {
        name: 'shadow',
        default: '1px 1px 3px hsla(264, 70%, 5%, 0.5)',
    },
    errorColor: {
        name: 'error-color',
        default: '1px solid hsl(5, 80%, 5%)',
    },
    errorBackground: {
        name: 'error-background',
        default: 'hsl(5, 70%, 80%)',
    },
    errorBorder: {
        name: 'error-border',
        default: '1px solid hsl(5, 50%, 50%)',
    },
    errorShadow: {
        name: 'error-shadow',
        default: '1px 1px 3px hsla(5, 70%, 5%, 0.5)',
    },
}

const _v = makeCSSProxy(noteCSSVars, '--lit-note-')

export const noteCSSValues = _v
export const noteCSSVarsNames = makeCSSNameProxy(noteCSSVars, '--lit-note-')

export const noteStyles = css`
:host{
    display: block;
    position: absolute;
    transition: 0.4s ease-in;
    border: ${_v.border};
    z-index: 10;
    padding: 5px 10px;
    border-radius: 1px;
    box-sizing: border-box;
    background-color: ${_v.background};
    color: ${_v.color};
    box-shadow: ${_v.shadow};
}
:host([visible]){
    visibility: visible;
    opacity: 1;
}
:host([error]){
    background-color: ${_v.errorBackground};
    color: ${_v.errorColor};
    border: ${_v.errorBorder};
    box-shadow: ${_v.errorShadow};
}
`