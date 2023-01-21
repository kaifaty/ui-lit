import {createcssMap} from '@kai/utils'
import {css} from 'lit'

import {formCCSVarsMap, PREFIX} from './styles.keys'

const {getVar, getKey} = createcssMap(formCCSVarsMap, PREFIX)

export const formAssocCSSNames = getKey

export const styles = css`    
:host{
    position: relative;
}
:host([disabled]){
    opacity: 0.5;
    pointer-events: none;
}
:host([readonly]){
    opacity: 0.7;
    pointer-events: none;
}
:host::after{
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    background-color: ${getVar('invalid-background-color')};
    color: ${getVar('invalid-color')};
    padding: ${getVar('invalid-padding')};
    box-shadow: 3px 3px 3px ${getVar('invalid-shadow-color')};
    content: attr(data-message);
    top: 100%;
    left: 0;
    position: absolute;
    z-index: 1;
}
:host([invalid])::after{
    opacity: 1;
}
:host([invalid][invalid-viewed])::after{
    opacity: 0;
}
`