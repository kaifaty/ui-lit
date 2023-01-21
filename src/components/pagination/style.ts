import {css, unsafeCSS} from 'lit'

import {makeCSSNameProxy, makeCSSProxy} from '../../helpers/cssproxy'

export const paginationCSSVars = {
    backgroundSelected: {
        name: 'background-selected',
        default: '#eee',
    },
    background: {
        name: 'background',
        default: 'transparent',
    },
    fontSize: {
        name: 'font-size',
        default: '12px',
    },
}
const _prefix = '--lit-pagination-' 

export const paginationCSSPrefix = unsafeCSS(_prefix)
const _v = makeCSSProxy(paginationCSSVars, _prefix)

export const paginationCSSValues = _v
export const paginationCSSVarsNames = makeCSSNameProxy(paginationCSSVars, _prefix)

export const paginationStyles = css`
:host{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 1px 0;
}
lit-numberfield{
    --lit-input-align: center;
    --lit-input-font-size: 12px;
    --lit-input-padding: 3px 6px;
    width: 40px;
}
lit-button{
    --lit-button-background: ${_v.background};
}
.selected{
    --lit-button-background: ${_v.backgroundSelected};
}
.arrow-right{
    transform-origin: center;
    transform: rotate(-90deg);
}
.arrow-left{
    transform-origin: center;
    transform: rotate(90deg);
}
.page-list{
    margin-left: 5px;
    font-size: ${_v.fontSize};
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 1px;
    
}
`