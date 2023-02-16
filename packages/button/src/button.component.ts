import {WcIcon} from '@ui-wc/icon'

import {definable, withProps, html, css, createGetParams, focusable, stylable, createTemplate} from '@ui-wc/utils'

import {LinkTarget, WcLink} from '@ui-wc/link'
// import {LitSpinner} from '@ui-wc/spinner'

import {buttonCCSVarsMap, PREFIX} from './styles.map'
import type {ButtonEvents, ButtonSize, ButtonType} from './types'

const notifyOnClick = Symbol()
const getParams = createGetParams({
  attribute: true,
})

const loading = getParams('loading', false)
const disabled = getParams('disabled', false)
const pressed = getParams('pressed', false, {
  set(target, _, value) {
    if ((target as HTMLElement & Props).type === 'switch') {
      target.querySelector('#button').ariaPressed = value.toString()
    } else {
      target.querySelector('#button').ariaPressed = 'undefined'
    }
    return true
  },
})
const notificable = getParams('notificable', false)
const tabIndex = getParams('tabIndex', 0, {
  set(target, _, value) {
    if ((target as HTMLElement & Props).href) {
      target.querySelector<HTMLButtonElement>('#link').tabIndex = value
      target.querySelector<HTMLButtonElement>('#button').tabIndex = -1
    } else {
      target.querySelector<HTMLButtonElement>('#link').tabIndex = -1
      target.querySelector<HTMLButtonElement>('#button').tabIndex = value
    }
    return true
  },
})
const href = getParams<string | null>('href', null, {
  set(target, _, value) {
    target.querySelector<HTMLLinkElement>('#link').href = value
    return true
  },
})
const target = getParams<LinkTarget>('target', '_self', {
  set(target, _, value) {
    target.querySelector<HTMLLinkElement>('#link').target = value
    return true
  },
})
const type = getParams<ButtonType>('type', 'button', {
  set(target, _, value) {
    if (value === 'switch') {
      target.querySelector('#button').ariaPressed = (target as HTMLElement & Props).pressed.toString()
    } else {
      target.querySelector('#button').ariaPressed = 'undefined'
    }
    return true
  },
})
const size = getParams<ButtonSize>('size', 'medium')

type Props = {
  loading: boolean
  disabled: boolean
  pressed: boolean
  notificable: boolean
  tabIndex: number
  href: string
  target: LinkTarget
  type: ButtonType
  size: ButtonSize
}

/**
 * 
      @focus="${this._onFocus}"
      @blur="${this._onBlur}"
      @mouseover="${this._onMouseOver}"
      @mouseout="${this._onMouseOut}"
      @mousedown="${this._onMouseDown}"
      @touchstart="${this._onTouchstart}"
      @touchcancel="${this._endPress}"
      @touchend="${this._endPress}"
 */
const template = createTemplate(html`
  <wc-link type="button" id="link">
    <button id="button" class="button wrapper noselect">
      <wc-icon id="checkmark" icon="checkmark"></wc-icon>
      <wc-spinner small id="spinner"></wc-spinner>
      <slot id="icon-before" name="icon-before"></slot>
      <div part="content" class="content"><slot></slot></div>
      <slot name="icon-after"></slot>
    </button>
  </wc-link>
`)

// noselect,
const Base = stylable(definable(HTMLElement), buttonCCSVarsMap, PREFIX)
const BaseWithProps = withProps<Props, typeof Base>(Base, [loading, tabIndex, notificable, pressed, href, target, type, disabled, size])

/**
 * @element wc-button - button element
 *
 *
 * @attr {boolean} [pressed=false] - Switcher state for type=switch button
 * @attr {boolean} [disabled=false] - Disable element
 * @attr {boolean} [loading=false] - Loading button state. If defined - render spinner
 * @attr {boolean} [loading=notificable] - Notify on click. Render checked icon for a while.
 *
 *
 * === tabIndex ===
 * @attr {number} [tabIndex=0] - Tab index
 *
 * === target ===
 * @attr {_blank | _parent | _self | _top} [target=_self] - Target for `link`. Work with `href` prop.
 *
 * === href ===
 * @attr {string | null} [href=null] - Button can be `link` if href defined
 *
 * === align ===
 * @attr {start | center | end} [align=center] - Align of button content
 *
 * === size ===
 * @attr {small | medium | large} [size=medium] - Size
 *
 * === type ===
 * @attr {submit | button | switch | close} [type=button] - Type of button.
 *
 *
 * @attr {boolean} [borderless=false] - Borderless element
 * @attr {boolean} [success=false] - Success
 * @attr {boolean} [danger=false] - Danger style
 * @attr {boolean} [primary=false] - Primary style
 * @attr {boolean} [between=false] - justify space between on button content
 *
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
export class WcButton extends BaseWithProps {
  static define(name?: string) {
    // LitSpinner.define()
    WcIcon.define()
    WcLink.define()
    super.define(name)
  }

  /** @ignore */
  static styles = [
    css`
      :host {
        ${this.cssKey('color')}: ${this.cssVar('color')};
        --click-x: 0;
        --click-y: 0;
        --radiant: 5%;
        box-sizing: border-box;
        display: ${this.cssVar('display')};
        position: relative;
      }
      :host(:not([href])) wc-link {
        display: contents;
      }
      :host([size='small']) .wrapper {
        padding: ${this.cssVar('small-padding')};
        font-size: ${this.cssVar('small-font-size')};
      }
      :host([size='large']) .wrapper {
        padding: ${this.cssVar('large-padding')};
        font-size: ${this.cssVar('large-font-size')};
      }

      :host([size='small']) {
        height: ${this.cssVar('small-height')};
      }
      :host([size='medium']) {
        height: ${this.cssVar('height')};
      }
      :host([size='large']) {
        height: ${this.cssVar('large-height')};
      }

      :host([disabled]),
      :host([loading]) {
        pointer-events: none;
      }
      :host([disabled]) .wrapper {
        opacity: 0.4;
      }
      :host(:not([loading])) #spinner {
        display: none;
      }

      :host([between]) .wrapper {
        justify-content: space-between;
      }

      #checkmark {
        display: none;
      }
      .wrapper[checkmark] {
        width: var(--width);
      }
      .wrapper[checkmark] #checkmark {
        display: block;
      }
      .wrapper[checkmark] :not(#checkmark) {
        display: none;
      }

      .wrapper {
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        align-items: center;
        background-color: ${this.cssVar('background')};
        border-radius: ${this.cssVar('border-radius')};
        border: ${this.cssVar('border')};
        box-sizing: border-box;
        color: ${this.cssVar('color')};
        cursor: pointer;
        display: grid;
        font-family: inherit;
        font-size: ${this.cssVar('font-size')};
        font-weight: ${this.cssVar('weight')};
        gap: ${this.cssVar('icon-gap')};
        grid-auto-flow: column;
        height: 100%;
        justify-content: ${this.cssVar('justify')};
        letter-spacing: ${this.cssVar('letter-spacing')};
        outline: ${this.cssVar('outline')};
        overflow: hidden;
        padding: ${this.cssVar('padding')};
        position: relative;
        text-transform: ${this.cssVar('text-transform')};
        white-space: nowrap;
        width: 100%;
      }
      .content {
        display: flex;
      }
      :host(:not([type='switch'])[hover]) .wrapper {
        background-color: ${this.cssVar('background-hover')};
      }
      :host(:not([type='switch'])[pressed]) .wrapper {
        background: radial-gradient(
          circle at var(--click-x) var(--click-y),
          ${this.cssVar('ripple')} 5px,
          ${this.cssVar('background-hover')} var(--radiant)
        );
      }

      :host .wrapper:focus {
        outline: ${this.cssVar('outline-focus')};
      }
      :host([loading]) .wrapper {
        cursor: initial;
      }
      wc-spinner {
        height: 12.8px;
        width: 12.8px;
        justify-self: center;
      }
      wc-link {
        width: 100%;
      }

      :host([type='switch']) .wrapper {
        color: ${this.cssVar('switch-color')};
        ${this.cssKey('color')}: ${this.cssVar('switch-color')};
      }
      :host([type='switch'][switchOn]) .wrapper {
        color: ${this.cssVar('switch-on-color')};
        ${this.cssKey('color')}: ${this.cssVar('switch-on-color')};
        background-color: ${this.cssVar('switch-on-background')};
      }
      :host([type='switch']) .wrapper:focus {
        outline: ${this.cssVar('switch-outline-focus')};
        border: ${this.cssVar('switch-outline-focus')};
      }
      :host([type='switch'][switchOn]) .wrapper:focus {
        outline: ${this.cssVar('switch-on-outline-focus')};
        border: ${this.cssVar('switch-on-outline-focus')};
      }

      :host([borderless]) .wrapper,
      :host([borderless]) .wrapper.hover {
        border: none;
      }

      :host([primary]) .wrapper {
        color: ${this.cssVar('primary-color')};
        background: ${this.cssVar('primary-background')};
        border: ${this.cssVar('primary-border')};
        ${this.cssKey('color')}: ${this.cssVar('primary-background')};
      }
      :host([primary]) .wrapper:focus {
        outline: ${this.cssVar('primary-outline-focus')};
      }

      :host([primary][hover]) .wrapper {
        background-color: ${this.cssVar('primary-background-hover')};
      }
      :host([primary][pressed]) .wrapper {
        background: radial-gradient(
          circle at var(--click-x) var(--click-y),
          ${this.cssVar('primary-ripple')} 5px,
          ${this.cssVar('primary-background-hover')} var(--radiant)
        );
      }

      :host([success]) {
        ${this.cssKey('color')}: ${this.cssVar('success-color')};
      }
      :host([success]) .wrapper {
        color: ${this.cssVar('success-color')};
        background: ${this.cssVar('success-background')};
        border: ${this.cssVar('success-border')};
        ${this.cssKey('color')}: ${this.cssVar('success-color')};
      }
      :host([success]) .wrapper:focus {
        outline: ${this.cssVar('success-outline-focus')};
      }
      :host([success][hover]) .wrapper {
        background-color: ${this.cssVar('success-background-hover')};
      }
      :host([success][pressed]) .wrapper {
        background: radial-gradient(
          circle at var(--click-x) var(--click-y),
          ${this.cssVar('success-ripple')} 5px,
          ${this.cssVar('success-background-hover')} var(--radiant)
        );
      }

      :host([danger]) {
        ${this.cssKey('color')}: ${this.cssVar('danger-color')};
      }
      :host([danger]) .wrapper {
        ${this.cssKey('color')}: ${this.cssVar('danger-color')};
        background: ${this.cssVar('danger-background')};
        border: ${this.cssVar('danger-border')};
        color: ${this.cssVar('danger-color')};
      }
      :host([danger]) .wrapper:focus {
        outline: ${this.cssVar('danger-outline-focus')};
      }
      :host([danger][hover]) .wrapper {
        background-color: ${this.cssVar('danger-background-hover')};
      }
      :host([danger][pressed]) .wrapper {
        background: radial-gradient(
          circle at var(--click-x) var(--click-y),
          ${this.cssVar('danger-ripple')} 5px,
          ${this.cssVar('danger-background-hover')} var(--radiant)
        );
      }
    `,
  ]

  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
    this.shadowRoot.querySelector('#button').addEventListener('click', this.click.bind(this))
  }

  /** @ignore  */
  private _notifyTimeout = 0

  /** @ignore  */
  private _radiant = 5

  /** @ignore  */
  private _animationFrame = 0

  /** @ignore  */
  private _pressed = false

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
  };

  [notifyOnClick]() {
    if (this.notificable && !this._notifyTimeout) {
      const button = this.shadowRoot.querySelector<HTMLButtonElement>('#button')
      this.style.setProperty('--width', this.clientWidth + 'px')
      button.setAttribute('checkmark', '')
      clearTimeout(this._notifyTimeout)

      this._notifyTimeout = window.setTimeout(() => {
        button.removeAttribute('width')
        button.removeAttribute('checkmark')
        this._notifyTimeout = 0
      }, 1000)
    }
  }

  get isUnavailable() {
    return this.disabled || this.loading || this.href || this._notifyTimeout
  }

  /**
   * Click button action
   */
  click() {
    window.navigator.vibrate?.(20)

    if (this.isUnavailable) return

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

    this[notifyOnClick]()
  }

  /**
   * Toggle switchOn state for type=switch button.
   */
  toggleSwitch() {
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
  submit() {
    if (this.isUnavailable || this.type !== 'submit') return

    this.dispatchEvent(
      new CustomEvent<ButtonEvents['submitForm']>('submitForm', {
        bubbles: true,
        composed: true,
      }),
    )
    this[notifyOnClick]()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-button': WcButton
  }
  interface HTMLElementEventMap {
    submitForm: CustomEvent<ButtonEvents['submitForm']>
    switchChanged: CustomEvent<ButtonEvents['switchChanged']>
    buttonClose: CustomEvent<ButtonEvents['buttonClose']>
  }
}
