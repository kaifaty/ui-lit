import {css, html, LitElement, TemplateResult} from 'lit'
import {property, state} from 'lit/decorators.js'
import {classMap} from 'lit/directives/class-map.js'
import {styleMap} from 'lit/directives/style-map.js'

import {LitIcon} from '@ui-lit/icon'

import {definable, noselect, focusable, stylable} from '@ui-lit/utils'

import {LinkTarget, LitLink} from '@ui-lit/link'
import {LitSpinner} from '@ui-lit/spinner'

import {buttonCCSVarsMap, PREFIX} from './styles.map'
import type {ButtonEvents, ButtonSize, ButtonType} from './types'

const stringProps = {type: String, attribute: true, reflect: true}
const numerProps = {type: Number, attribute: true, reflect: true}
const booleanProps = {type: Boolean, attribute: true, reflect: true}

/**
 * # Lit button element
 * ## Features
 * - Form assosiated - can submit `lit-form`
 * - May set `href` propperty for a link button
 * - Can be `notificable`:  on click appears a checkmark confirm icon
 * - Has ripple effect
 * - Button can be a switcher. It contain pressed boolean property
 *
 * ## Examples
 *
 * ```html
 * <lit-button type = "submit" primary>Button</lit-button>
 * ```
 * <lit-button type = "submit" primary>Button</lit-button>
 *
 * @element lit-button - UI Lit button element
 *
 *
 * ```html
 * <thing-doer></thing-doer>
 * ```
 *
 * @attr {'start' | 'center' | 'end'} [align="center"] - Align of button content
 * @attr {'submit' | 'button' | 'switch' | 'close'} [type="button"] - Button Type
 * @attr {'small' | 'medium' | 'large'} [size="medium"] - Size
 * @attr {boolean} [borderless=false] - Borderless element
 * @attr {boolean} [disabled=false] - Disable element
 * @attr {boolean} [success=false] - Success
 * @attr {boolean} [danger=false] - Danger style
 * @attr {boolean} [primary=false] - Primary style
 * @attr {boolean} [between=false] - justify space between on button content
 *
 * @slot icon-before - You can put some elements before content
 * @slot icon-after - You can put some elements after content
 *
 * @CSS
 * @cssprop [--lit-buttonbackground=initial] - background
 * @cssprop [--lit-buttonbackground-focus=hsl(264, 100%, 55%)] - background-focus
 * @cssprop [--lit-buttonbackground-hover=hsl(264, 100%, 93%)] - background-hover
 * @cssprop [--lit-buttonborder=1px solid hsl(264, 50%, 85%)] - border
 * @cssprop [--lit-buttonborder-radius=2px] - border-radius
 * @cssprop [--lit-buttoncolor=hsl(264, 100%, 46%)] - color
 * @cssprop [--lit-buttondanger-background=hsl(5, 80%, 55%)] - danger-background
 * @cssprop [--lit-buttondanger-background-hover=hsl(5, 80%, 60%)] - danger-background-hover
 * @cssprop [--lit-buttondanger-border=1px solid hsl(5, 80%, 55%)] - danger-border
 * @cssprop [--lit-buttondanger-color=hsl(5, 80%, 98%)] - danger-color
 * @cssprop [--lit-buttondanger-outline-focus=1px solid hsl(5, 80%, 35%)] - danger-outline-focus
 * @cssprop [--lit-buttondanger-ripple=hsl(5, 80%, 65%)] - danger-ripple
 * @cssprop [--lit-buttondisplay=inline-flex] - default display position of button
 * @cssprop [--lit-buttonfont-size=inherit] - Medium size fontsize
 * @cssprop [--lit-buttonheight=30px] - Medium size height
 * @cssprop [--lit-buttonicon-gap=8px] - icon-gap
 * @cssprop [--lit-buttonjustify=center] - justify
 * @cssprop [--lit-buttonlarge-font-size=inherit] - large-font-size
 * @cssprop [--lit-buttonlarge-height=0 40px] - large-height
 * @cssprop [--lit-buttonlarge-padding=0 20px] - large-padding
 * @cssprop [--lit-buttonletter-spacing=normal] - letter-spacing
 * @cssprop [--lit-buttonoutline=none] - outline
 * @cssprop [--lit-buttonoutline-focus=1px #ccc solid] - outline-focus
 * @cssprop [--lit-buttonpadding=0 20px] - Medium size padding
 * @cssprop [--lit-buttonprimary-background=hsl(264, 80%, 55%)] - primary-background
 * @cssprop [--lit-buttonprimary-background-hover=hsl(264, 80%, 60%)] - primary-background-hover
 * @cssprop [--lit-buttonprimary-border=1px solid hsl(264, 80%, 55%)] - primary-border
 * @cssprop [--lit-buttonprimary-color=hsl(264, 80%, 98%)] - Primary text color
 * @cssprop [--lit-buttonprimary-outline-focus=1px solid hsl(264, 80%, 75%)] - primary-outline-focus
 * @cssprop [--lit-buttonprimary-ripple=hsl(264, 80%, 75%)] - primary-ripple
 * @cssprop [--lit-buttonripple=hsl(264, 100%, 88%)] - ripple
 * @cssprop [--lit-buttonsmall-font-size=inherit] - Small size font-size
 * @cssprop [--lit-buttonsmall-height=25px] - Small size height
 * @cssprop [--lit-buttonsmall-padding=0 6px] - Small size padding
 * @cssprop [--lit-buttonsuccess-background=hsl(110, 80%, 55%)] - success-background
 * @cssprop [--lit-buttonsuccess-background-hover=hsl(110, 80%, 60%)] - success-background-hover
 * @cssprop [--lit-buttonsuccess-border=1px solid hsl(110, 80%, 55%)] - success-border
 * @cssprop [--lit-buttonsuccess-color=hsl(110, 80%, 4%)] - success-color
 * @cssprop [--lit-buttonsuccess-outline-focus=1px solid hsl(110, 80%, 35%)] - success-outline-focus
 * @cssprop [--lit-buttonsuccess-ripple=hsl(110, 80%, 65%)] - success-ripple
 * @cssprop [--lit-buttonswitch-color=hsl(264, 100%, 46%)] - switch-color
 * @cssprop [--lit-buttonswitch-on-background=hsl(264, 80%, 60%)] - switch-on-background
 * @cssprop [--lit-buttonswitch-on-color=hsl(264, 80%, 98%)] - switch-on-color
 * @cssprop [--lit-buttonswitch-on-outline-focus=1px solid hsl(264, 100%, 46%)] - switch-on-outline-focus
 * @cssprop [--lit-buttonswitch-outline-focus=1px solid hsl(264, 100%, 46%)] - switch-outline-focus
 * @cssprop [--lit-buttontext-transform=uppercase] - text-transform
 * @cssprop [--lit-buttonweight=600] - weight
 * @CSS
 *
 */

export class LitButton extends focusable(stylable(definable(LitElement), buttonCCSVarsMap, PREFIX)) {
  static define() {
    LitSpinner.define()
    LitIcon.define()
    LitLink.define()
    super.define()
  }

  /** @ignore */
  static styles = [
    noselect,
    css`
      :host {
        ${LitIcon.cssKey('color')}: ${LitButton.cssVar('color')};
        --click-x: 0;
        --click-y: 0;
        --radiant: 5%;
        box-sizing: border-box;
        display: ${LitButton.cssVar('display')};
        position: relative;
      }

      :host([size='small']) .wrapper {
        padding: ${LitButton.cssVar('small-padding')};
        font-size: ${LitButton.cssVar('small-font-size')};
      }
      :host([size='medium']) .wrapper {
        padding: ${LitButton.cssVar('padding')};
        font-size: ${LitButton.cssVar('font-size')};
      }
      :host([size='large']) .wrapper {
        padding: ${LitButton.cssVar('large-padding')};
        font-size: ${LitButton.cssVar('large-font-size')};
      }

      :host([size='small']) {
        height: ${LitButton.cssVar('small-height')};
      }
      :host([size='medium']) {
        height: ${LitButton.cssVar('height')};
      }
      :host([size='large']) {
        height: ${LitButton.cssVar('large-height')};
      }

      :host([disabled]),
      :host([loading]) {
        pointer-events: none;
      }
      :host([disabled]) .wrapper {
        opacity: 0.4;
      }

      :host([between]) .wrapper {
        justify-content: space-between;
      }
      .wrapper {
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        align-items: center;
        background-color: ${LitButton.cssVar('background')};
        border-radius: ${LitButton.cssVar('border-radius')};
        border: ${LitButton.cssVar('border')};
        box-sizing: border-box;
        color: ${LitButton.cssVar('color')};
        cursor: pointer;
        display: grid;
        font-family: inherit;
        font-weight: ${LitButton.cssVar('weight')};
        gap: ${LitButton.cssVar('icon-gap')};
        grid-auto-flow: column;
        height: 100%;
        justify-content: ${LitButton.cssVar('justify')};
        letter-spacing: ${LitButton.cssVar('letter-spacing')};
        outline: ${LitButton.cssVar('outline')};
        overflow: hidden;
        position: relative;
        text-transform: ${LitButton.cssVar('text-transform')};
        white-space: nowrap;
        width: 100%;
      }
      .content {
        display: flex;
      }
      :host(:not([type='switch'])[hover]) .wrapper {
        background-color: ${LitButton.cssVar('background-hover')};
      }
      :host(:not([type='switch'])[pressed]) .wrapper {
        background: radial-gradient(
          circle at var(--click-x) var(--click-y),
          ${LitButton.cssVar('ripple')} 5px,
          ${LitButton.cssVar('background-hover')} var(--radiant)
        );
      }

      :host .wrapper:focus {
        outline: ${LitButton.cssVar('outline-focus')};
      }
      :host([loading]) .wrapper {
        cursor: initial;
      }
      lit-spinner {
        height: 12.8px;
        width: 12.8px;
        justify-self: center;
      }
      lit-link {
        width: 100%;
      }

      :host([type='switch']) .wrapper {
        color: ${LitButton.cssVar('switch-color')};
        ${LitIcon.cssKey('color')}: ${LitButton.cssVar('switch-color')};
      }
      :host([type='switch'][switchOn]) .wrapper {
        color: ${LitButton.cssVar('switch-on-color')};
        ${LitIcon.cssKey('color')}: ${LitButton.cssVar('switch-on-color')};
        background-color: ${LitButton.cssVar('switch-on-background')};
      }
      :host([type='switch']) .wrapper:focus {
        outline: ${LitButton.cssVar('switch-outline-focus')};
        border: ${LitButton.cssVar('switch-outline-focus')};
      }
      :host([type='switch'][switchOn]) .wrapper:focus {
        outline: ${LitButton.cssVar('switch-on-outline-focus')};
        border: ${LitButton.cssVar('switch-on-outline-focus')};
      }

      :host([borderless]) .wrapper,
      :host([borderless]) .wrapper.hover {
        border: none;
      }

      :host([primary]) .wrapper {
        color: ${LitButton.cssVar('primary-color')};
        background: ${LitButton.cssVar('primary-background')};
        border: ${LitButton.cssVar('primary-border')};
        ${LitIcon.cssKey('color')}: ${LitButton.cssVar('primary-background')};
      }
      :host([primary]) .wrapper:focus {
        outline: ${LitButton.cssVar('primary-outline-focus')};
      }

      :host([primary][hover]) .wrapper {
        background-color: ${LitButton.cssVar('primary-background-hover')};
      }
      :host([primary][pressed]) .wrapper {
        background: radial-gradient(
          circle at var(--click-x) var(--click-y),
          ${LitButton.cssVar('primary-ripple')} 5px,
          ${LitButton.cssVar('primary-background-hover')} var(--radiant)
        );
      }

      :host([success]) {
        ${LitIcon.cssKey('color')}: ${LitButton.cssVar('success-color')};
      }
      :host([success]) .wrapper {
        color: ${LitButton.cssVar('success-color')};
        background: ${LitButton.cssVar('success-background')};
        border: ${LitButton.cssVar('success-border')};
        ${LitIcon.cssKey('color')}: ${LitButton.cssVar('success-color')};
      }
      :host([success]) .wrapper:focus {
        outline: ${LitButton.cssVar('success-outline-focus')};
      }
      :host([success][hover]) .wrapper {
        background-color: ${LitButton.cssVar('success-background-hover')};
      }
      :host([success][pressed]) .wrapper {
        background: radial-gradient(
          circle at var(--click-x) var(--click-y),
          ${LitButton.cssVar('success-ripple')} 5px,
          ${LitButton.cssVar('success-background-hover')} var(--radiant)
        );
      }

      :host([danger]) {
        ${LitIcon.cssKey('color')}: ${LitButton.cssVar('danger-color')};
      }
      :host([danger]) .wrapper {
        ${LitIcon.cssKey('color')}: ${LitButton.cssVar('danger-color')};
        background: ${LitButton.cssVar('danger-background')};
        border: ${LitButton.cssVar('danger-border')};
        color: ${LitButton.cssVar('danger-color')};
      }
      :host([danger]) .wrapper:focus {
        outline: ${LitButton.cssVar('danger-outline-focus')};
      }
      :host([danger][hover]) .wrapper {
        background-color: ${LitButton.cssVar('danger-background-hover')};
      }
      :host([danger][pressed]) .wrapper {
        background: radial-gradient(
          circle at var(--click-x) var(--click-y),
          ${LitButton.cssVar('danger-ripple')} 5px,
          ${LitButton.cssVar('danger-background-hover')} var(--radiant)
        );
      }
    `,
  ]

  /**
   * Loading button state. If defined - render spinner.
   */
  @property(booleanProps)
  loading = false

  /**
   * Button can be `link` if href defined
   */
  @property(stringProps)
  href: string | null = null

  /**
   * Target for `link`. Work with `href` prop.
   *
   */
  @property(stringProps)
  target: LinkTarget = '_self'

  /**
   * Type of button.
   */
  @property(stringProps)
  type: ButtonType = 'button'

  /**
   * Button size
   *
   */
  @property(stringProps)
  size: ButtonSize = 'medium'

  /**
   * Disabled state
   */
  @property(booleanProps)
  disabled = false

  /**
   * Switcher state for type=switch button
   */
  @property(booleanProps)
  pressed = false

  /**
   * Notify on click. Render checked icon for a while.
   */
  @property(booleanProps)
  notificable = false

  /**
   * Tab index to native tabIntex of reflected inner conteiner. Pay attention - lowercase!
   */
  @property(numerProps)
  tabindex = 0

  /** @ignore  */
  @state()
  _notifyIcon = false

  /** @ignore  */
  private _notifyTimeout = 0

  /** @ignore  */
  private _width = 0

  /** @ignore  */
  private _radiant = 5

  /** @ignore  */
  private _animationFrame = 0

  /** @ignore  */
  private _pressed = false

  /** @ignore  */
  private get classes() {
    return {
      button: true,
      wrapper: true,
      noselect: true,
      checkmark: this._notifyIcon,
    }
  }

  /** @ignore  */
  private _contentTemplate() {
    if (this._notifyIcon) {
      return html`<lit-icon icon="checkmark"></lit-icon>`
    }
    return html`${this.loading
        ? html`<lit-spinner small></lit-spinner>`
        : html`<slot name="icon-before"></slot>`}
      <div part="content" class="content"><slot></slot></div>
      <slot name="icon-after"></slot>`
  }

  /** @ignore  */
  private wrapperTemplate(content: TemplateResult) {
    if (this.href) {
      return html`<lit-link type="button" target="${this.target}" href="${this.href}">${content}</lit-link>`
    }
    return content
  }

  /** @ignore  */
  render() {
    const styles = this._width ? {width: this._width + 'px'} : {}
    const template = html` <button
      role="button"
      aria-pressed="${this.type === 'switch' ? this.pressed : 'undefined'}"
      tabindex="${this.href ? -1 : this.tabindex}"
      style="${styleMap(styles)}"
      class="${classMap(this.classes)}"
      @click="${this.click}"
      @focus="${this._onFocus}"
      @blur="${this._onBlur}"
      @mouseover="${this._onMouseOver}"
      @mouseout="${this._onMouseOut}"
      @mousedown="${this._onMouseDown}"
      @touchstart="${this._onTouchstart}"
      @touchcancel="${this._endPress}"
      @touchend="${this._endPress}"
    >
      ${this._contentTemplate()}
    </button>`

    return this.wrapperTemplate(template)
  }

  // ==== Events ====

  // +++ Ripple +++
  /** @ignore  */
  private _startAnimation = () => {
    if (this._radiant < 1000 && this._pressed) {
      this._radiant += 20
      this.style.setProperty('--radiant', this._radiant + 'px')
      this._animationFrame = requestAnimationFrame(this._startAnimation)
    }
  }

  /** @ignore  */
  private _onTouchstart(e: TouchEvent) {
    this._startPress(e.touches[0].clientX, e.touches[0].clientY)
    document.addEventListener('touchend', this._endPress)
    document.addEventListener('touchcancel', this._endPress)
  }

  /** @ignore  */
  private _onMouseOver() {
    this.setAttribute('hover', '')
  }

  /** @ignore  */
  private _onMouseOut() {
    this.removeAttribute('hover')
  }

  /** @ignore  */
  private _onMouseDown(e: MouseEvent) {
    this._startPress(e.clientX, e.clientY)
    document.addEventListener('mouseup', this._endPress)
  }

  /** @ignore  */
  private _startPress(x: number, y: number) {
    const rect = this.getBoundingClientRect()
    this._pressed = true
    this.setAttribute('pressed', '')
    const _x = x - rect.x
    const _y = y - rect.y
    this.style.setProperty('--click-x', _x + 'px')
    this.style.setProperty('--click-y', _y + 'px')
    this._startAnimation()
  }

  /** @ignore  */
  private _endPress = () => {
    this._pressed = false
    this._radiant = 5
    cancelAnimationFrame(this._animationFrame)
    this.removeAttribute('pressed')
    this.removeAttribute('hover')
    document.removeEventListener('mouseup', this._endPress)
    document.removeEventListener('touchend', this._endPress)
    document.removeEventListener('touchcancel', this._endPress)
  }

  // --- Ripple ---

  /** @ignore  */
  private _onBlur() {
    document.removeEventListener('keydown', this._onKeyDown)
  }

  /** @ignore  */
  private _onFocus() {
    document.addEventListener('keydown', this._onKeyDown)
  }

  /** @ignore  */
  private _onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.submit()
      e.preventDefault()
    }
  }

  /** @ignore  */
  private _notifyOnClick() {
    if (this.notificable) {
      this._notifyIcon = true
      this._width = this.clientWidth
      clearTimeout(this._notifyTimeout)
      this._notifyTimeout = window.setTimeout(() => {
        this._notifyIcon = false
        this._width = 0
      }, 1000)
    }
  }
  // +++ Actions +++

  /**
   * Click button action
   */
  public click(): void {
    window.navigator.vibrate?.(20)

    if (this.disabled || this.loading || this.href) return

    if (this.type === 'submit') {
      this.submit()
      return
    }

    if (this.type === 'close') {
      this.dispatchEvent(
        new CustomEvent<ButtonEvents['buttonClose']>('buttonClose', {
          bubbles: true,
          composed: true,
        }),
      )
    }

    this._notifyOnClick()
  }

  /**
   * Toggle switchOn state for type=switch button.
   */
  public toggleSwitch(): void {
    this.pressed = !this.pressed

    this.dispatchEvent(
      new CustomEvent<ButtonEvents['switchChanged']>('switchChanged', {
        detail: this.pressed,
        bubbles: true,
      }),
    )
  }

  /**
   * Submit for type='submit' button
   */
  public submit(): void {
    if (this.disabled || this.loading || this.href || this.type !== 'submit') return

    this.dispatchEvent(
      new CustomEvent<ButtonEvents['submitForm']>('submitForm', {
        bubbles: true,
        composed: true,
      }),
    )
    this._notifyOnClick()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-button': LitButton
  }
}
