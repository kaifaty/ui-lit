import {createcssMap} from '@kai/utils'
import {css} from 'lit'

export const PREFIX = '--lit-description-'
const {getVar} = createcssMap({
    'display': 'block',
    'font-style': 'normal',
    'font-size': '0.9em',
    'line-height': '1.5',
    'opacity': '0.6',
}, '--lit-description-')

/**
 * @tag lit-description
 * 
 * 
 * @cssprop --lit-description-display
 * @cssprop --lit-description-padding
 * @cssprop --lit-description-font-style
 * @cssprop --lit-description-font-size
 * @cssprop --lit-description-line-height
 * @cssprop --lit-description-opacity
 * 
 */
export const styles = css`
:host{
    display: ${getVar('display')};
    font-style: ${getVar('font-style')};
    font-size: ${getVar('font-size')};
    line-height: ${getVar('line-height')};
    opacity: ${getVar('opacity')};
}
`