import {WcIcon} from '@ui-wc/icon'

import {html, WCStyleSheet, noselect, getXY, createTemplate} from '@ui-wc/utils'

import {WcLink} from '@ui-wc/link'
import {WcSpinner} from '@ui-wc/spinner'
import {BaseButton} from './base.component'
import {getButtonStyles} from './styles'
import {getButtonSync} from './utils'

export type ButtonEvents = {
  switchChanged: boolean
  submitForm: boolean
  buttonClose: boolean
}

const notifyOnClick = Symbol()

const template = createTemplate(html` <a id="button" class="noselect" part="base">
  <wc-icon id="checkmark" icon="checkmark"></wc-icon>
  <wc-spinner id="spinner"></wc-spinner>
  <slot part="preffix" name="preffix"></slot>
  <slot part="label"></slot>
  <slot part="suffix" name="suffix"></slot>
</a>`)

const action = Symbol()
const start = Symbol()
const end = Symbol()
const blur = Symbol()
const focus = Symbol()
const keydown = Symbol()
const notifyTimeout = Symbol()

/**
 * @element wc-button - button element
 *
 *
 * @attr {boolean} [pressed=false] - Switcher state for type=switch button
 * @attr {boolean} [disabled=false] - Disable element
 * @attr {boolean} [loading=false] - Loading button state. If defined - render spinner
 * @attr {boolean} [notificable=false] - Notify on click. Render checked icon for a while.
 * @attr {boolean} [outline=false] - Use the outline attribute to draw outlined buttons with transparent backgrounds.
 *
 *
 * @attr {'_blank' | '_parent' | '_self' | '_top'} [target='_self'] - Target for `link`. Work with `href` prop.
 * @attr {string | null} [href=null] - Button can be `link` if href defined
 * @attr {'start' | 'center' | 'end'} [align='center'] - Align of button content
 * @attr {'small' | 'medium' | 'large'} [size='medium'] - Use the size attribute to change a button's size.
 * @attr {'submit' | 'button' | 'switch' | 'close'} [type='button'] - Use type to change button behavour
 * @attr {'text' | 'primary' | 'danger' | 'success' | 'neutral' | 'warning'} [variant='default'] - Use the variant attribute to set the button's variant.
 *
 *
 *
 * @slot prefix - You can put some elements before content
 * @slot suffix - You can put some elements after content
 * @slot - default slot for content
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The button's label.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart caret - The button's caret icon, an `<sl-icon>` element.
 *
 * @CSS
 * @cssprop [--wc-button-background=initial] - background
 * @cssprop [--wc-button-background-focus=hsl(264, 90%, 58%)] - background-focus
 * @cssprop [--wc-button-background-hover=hsl(264, 140%, 96%)] - background-hover
 * @cssprop [--wc-button-border=1px solid hsl(264, 50%, 85%)] - border
 * @cssprop [--wc-button-border-radius=3px] - border-radius
 * @cssprop [--wc-button-color=hsl(264, 90%, 71%)] - color
 * @cssprop [--wc-button-color-hover=hsl(264, 75%, 46%)] - color-hover
 * @cssprop [--wc-button-danger-background=hsl(5, 80%, 55%)] - danger-background
 * @cssprop [--wc-button-danger-background-hover=hsl(5, 80%, 60%)] - danger-background-hover
 * @cssprop [--wc-button-danger-border=1px solid hsl(5, 80%, 55%)] - danger-border
 * @cssprop [--wc-button-danger-color=hsl(5, 80%, 98%)] - danger-color
 * @cssprop [--wc-button-danger-outline-focus=1px solid hsl(5, 80%, 35%)] - danger-outline-focus
 * @cssprop [--wc-button-danger-ripple=hsl(5, 80%, 65%)] - danger-ripple
 * @cssprop [--wc-button-display=inline-flex] - default display position of button
 * @cssprop [--wc-button-font-size=1rem] - Medium size fontsize
 * @cssprop [--wc-button-gap=10px] - gap
 * @cssprop [--wc-button-height=40px] - Medium size height
 * @cssprop [--wc-button-justify=center] - justify
 * @cssprop [--wc-button-large-font-size=inherit] - large-font-size
 * @cssprop [--wc-button-large-height=48px] - large-height
 * @cssprop [--wc-button-large-padding=0 20px] - large-padding
 * @cssprop [--wc-button-letter-spacing=normal] - letter-spacing
 * @cssprop [--wc-button-outline=none] - outline
 * @cssprop [--wc-button-outline-focus=1px #ccc solid] - outline-focus
 * @cssprop [--wc-button-padding=0 16px] - Medium size padding
 * @cssprop [--wc-button-primary-background=hsl(264, 80%, 56%)] - primary-background
 * @cssprop [--wc-button-primary-background-hover=hsl(264, 80%, 61%)] - primary-background-hover
 * @cssprop [--wc-button-primary-border=1px solid hsl(264, 80%, 56%)] - primary-border
 * @cssprop [--wc-button-primary-color=hsl(264, 80%, 98%)] - Primary text color
 * @cssprop [--wc-button-primary-color-hover=hsl(264, 80%, 98%)] - Primary text color
 * @cssprop [--wc-button-primary-outline-focus=1px solid hsl(264, 80%, 71%)] - primary-outline-focus
 * @cssprop [--wc-button-primary-ripple=hsl(264, 80%, 66%)] - primary-ripple
 * @cssprop [--wc-button-ripple=hsl(264, 100%, 88%)] - ripple
 * @cssprop [--wc-button-small-font-size=inherit] - Small size font-size
 * @cssprop [--wc-button-small-height=32px] - Small size height
 * @cssprop [--wc-button-small-padding=0 6px] - Small size padding
 * @cssprop [--wc-button-success-background=hsl(110, 80%, 55%)] - success-background
 * @cssprop [--wc-button-success-background-hover=hsl(110, 80%, 60%)] - success-background-hover
 * @cssprop [--wc-button-success-border=1px solid hsl(110, 80%, 55%)] - success-border
 * @cssprop [--wc-button-success-color=hsl(110, 80%, 4%)] - success-color
 * @cssprop [--wc-button-success-outline-focus=1px solid hsl(110, 80%, 35%)] - success-outline-focus
 * @cssprop [--wc-button-success-ripple=hsl(110, 80%, 65%)] - success-ripple
 * @cssprop [--wc-button-switch-color=hsl(264, 90%, 56%)] - switch-color
 * @cssprop [--wc-button-switch-on-background=hsl(264, 80%, 61%)] - switch-on-background
 * @cssprop [--wc-button-switch-on-color=hsl(264, 80%, 100%)] - switch-on-color
 * @cssprop [--wc-button-switch-on-outline-focus=1px solid hsl(264, 80%, 51%)] - switch-on-outline-focus
 * @cssprop [--wc-button-switch-outline-focus=1px solid hsl(264, 80%, 51%)] - switch-outline-focus
 * @cssprop [--wc-button-text-transform=normal] - text-transform
 * @cssprop [--wc-button-weight=600] - weight
 * @CSS
 *
 */
export class WcButton extends BaseButton {
  static define() {
    WcSpinner.define()
    WcIcon.define()
    WcLink.define()
    super.define()
  }

  /** @ignore */
  static styles: WCStyleSheet[] = [noselect, getButtonStyles(this)];

  /** @ignore */
  [notifyTimeout] = 0

  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
    this.addEventListener('mouseover', () => this.setAttribute('hover', ''))
    this.addEventListener('mouseout', () => this.removeAttribute('hover'))
    this.addEventListener('mousedown', this[start])
    this.addEventListener('touchstart', this[start])
    this.addEventListener('touchend', this[end])
    this.addEventListener('touchcancel', this[end])
    this.addEventListener('focusout', this[blur])
    this.addEventListener('focus', this[focus])
  }
  connectedCallback() {
    super.connectedCallback?.()
    setTimeout(() => {
      if (this.hasAttribute('autofocus')) {
        this.focus()
      }
    })
  }

  /** @ignore  */
  [blur] = () => {
    document.removeEventListener('keydown', this[keydown])
  };

  /** @ignore  */
  [focus] = () => {
    document.addEventListener('keydown', this[keydown])
  };

  /** @ignore  */
  [start] = (e: TouchEvent | MouseEvent) => {
    window.navigator.vibrate?.(20)

    const {x, y} = getXY(e, this.getBoundingClientRect())

    if (!('touches' in e)) {
      document.addEventListener('mouseup', this[end])
    }

    this.style.setProperty('--click-x', x + 'px')
    this.style.setProperty('--click-y', y + 'px')

    this[action]()
  };

  /** @ignore  */
  [action](data?: {byKey?: true}) {
    if (this.isUnavailable) return

    if (this.type === 'submit') {
      this.submit()
    } else if (this.variant === 'switch') {
      return this.toggleSwitch()
    } else if (this.href && data.byKey) {
      getButtonSync(this).click()
      return
    } else if (this.type === 'close') {
      this.dispatchEvent(
        new CustomEvent<ButtonEvents['buttonClose']>('buttonClose', {
          bubbles: true,
          composed: true,
        }),
      )
    }
    this[notifyOnClick]()
  }

  /** @ignore  */
  [end] = () => {
    this.removeAttribute('pressed')
    this.removeAttribute('hover')
    document.removeEventListener('mouseup', this[end])
  };

  /** @ignore  */
  [keydown] = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this[action]({byKey: true})
      e.preventDefault()
    }
  };

  /** @ignore  */
  [notifyOnClick]() {
    if (this.notificable && !this[notifyTimeout]) {
      const button = this.shadowRoot.querySelector<HTMLButtonElement>('#button')
      this.style.setProperty('--width', this.clientWidth + 'px')
      button.setAttribute('checkmark', '')
      clearTimeout(this[notifyTimeout])

      this[notifyTimeout] = window.setTimeout(() => {
        button.removeAttribute('width')
        button.removeAttribute('checkmark')
        this[notifyTimeout] = 0
      }, 1000)
    }
  }

  /** @ignore  */
  get isUnavailable() {
    return this.disabled || this.loading || this[notifyTimeout]
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
