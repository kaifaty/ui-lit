import {css, html, LitElement} from 'lit'
import {customElement, property} from 'lit/decorators.js'

import {definable, stylable} from '../../mixins'
import {PREFIX} from '../sidebar/styles.map'

import {LitIcon} from './../icon/icon.component'
import {textCSSMap} from './styles.map'


type TextStatus = 'error' | 'danger' | 'attention' | 'success' | 'accented' | 'none';
export interface ITextProps {
    status: TextStatus,
    center: boolean
    pulse: boolean
}

/**
 *
 * Center:
 * @attr {boolean} [center=false] - Center style
 * 
 * Bold:
 * @attr {boolean} [bold=false] - Bold style
 * 
 * Status
 * @attr {"error" | "danger" | "attention" | "success" | "accented" | "none"} [status="none"]
 * 
 */

@customElement('lit-text')
export class LitText extends stylable(definable(LitElement), textCSSMap, PREFIX){
    static define(name?: string){
        LitIcon.define()
        super.define(name)
    }
    static styles = css`
    :host{
        display: inline;
    }
    :host([status=error]),
    :host([status=danger]){
        color: ${LitText.cssVar('color-danger')};
        ${LitIcon.cssKey('color')}: ${LitText.cssVar('color-danger')};
    }
    :host([status="attention"]){
        color: ${LitText.cssVar('color-attention')};
        ${LitIcon.cssKey('color')}: ${LitText.cssVar('color-attention')};
    }
    :host([status="success"]){
        color: ${LitText.cssVar('color-success')};
        ${LitIcon.cssKey('color')}: ${LitText.cssVar('color-success')};
    }
    :host([status="accented"]){
        color: ${LitText.cssVar('color-accented')};
        ${LitIcon.cssKey('color')}: ${LitText.cssVar('color-accented')};
    }
    :host([bold]){
        font-weight: bold;
    }
    :host([center]){
        text-align: center;
    }
    :host([pulse]){
        animation: pulse 1.8s ease infinite;
    }
    @keyframes pulse {
        0% {
            opacity: 1
        }
        50%{
            opacity: 0.5
        }
        100%{
            opacity: 1
        }
    }`
    @property({type: Boolean, attribute: true, reflect: true}) center = false
    @property({type: Boolean, attribute: true, reflect: true}) pulse = false
    @property({type: String, attribute: true, reflect: true}) status: TextStatus = 'none'
    render(){
        return html`<slot></slot>`
    }
}
declare global {
    interface HTMLElementTagNameMap {
      'lit-text': LitText;
    }
}