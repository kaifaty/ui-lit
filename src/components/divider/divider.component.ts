import {css, LitElement} from 'lit'

import {definable, stylable} from '../../mixins'

import {dividerCSSMap, PREFIX} from './styles.map'


export class LitDivider extends stylable(definable(LitElement), dividerCSSMap, PREFIX){
    static styles = css`
    :host{
        display: block;
        height: ${LitDivider.cssVar('height')};
        background-color: ${LitDivider.cssVar('color')};
        width: 100%;
        margin: ${LitDivider.cssVar('margin')};
    }`
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-divider': LitDivider;
    }
}