import { css } from 'lit';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';

const iconCSSVars = {
    fontFamily: {
        name: 'font-family',
        default: 'Icons'
    },
    fontSize: {
        name: 'font-size',
        default: '12px'
    },
    color: {
        name: 'color',
        default: '#000'
    },
    positiveColor: {
        name: 'positive-color',
        default: 'green'
    },
    negativeColor: {
        name: 'negative-color',
        default: 'red'
    },
}

const _v = makeCSSProxy(iconCSSVars, "--lit-icon-");

export const iconCSSVarNames = makeCSSNameProxy(iconCSSVars, "--lit-icon-");


export const iconStyle = css`
:host{
    cursor: pointer;
    display: inline-block;
    cursor: pointer;
    text-transform: none !important;
    font-family: ${_v.fontFamily};
    color: ${_v.color};
    font-size: ${_v.fontSize};
    
    font-weight: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -moz-font-feature-settings: 'liga';
    -moz-osx-font-smoothing: grayscale;

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
}
:host([danger]),
:host([error]){
    color: ${_v.negativeColor};
}
:host([success]){
    color: ${_v.positiveColor};
}
:host([icon=back]),
:host([icon=arrow-left]){
    transform-origin: center;
    transform: rotate(90deg);
}`;