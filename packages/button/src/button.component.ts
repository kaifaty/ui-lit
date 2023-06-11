import {WcIcon} from '@ui-wc/icon'

import {html, WCStyleSheet, HoverController, noselect, clickPosition, createTemplate} from '@ui-wc/utils'

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
const notifyOnClick = Symbol()

/**
 * @element wc-button - button element
 *
 *
 * @attr {boolean} [disabled=false] - Disable element *withprop*
 * @attr {boolean} [loading=false] - Loading button state. If defined - render spinner *withprop*
 * @attr {boolean} [notificable=false] - Notify on click. Render checked icon for a while. *withprop*
 * @attr {boolean} [outline=false] - Use the outline attribute to draw outlined buttons with transparent backgrounds. *withprop*
 *
 *
 * @attr {'_blank' | '_parent' | '_self' | '_top'} [target='_self'] - Target for `link`. Work with `href`.
 * @attr {string | null} [href=null] - Button can be `link` if href defined
 * @attr {'small' | 'medium' | 'large'} [size='medium'] - Use the size attribute to change a button's size.
 * @attr {'submit' | 'button' | 'switch' | 'close'} [type='button'] - Use type to change button behavour
 * @attr {'text' | 'primary' | 'danger' | 'success' | 'default'} [variant='default'] - Use the variant attribute to set the button's variant.
 *
 *
 *
 * @slot preffix - You can put some elements before content
 * @slot suffix - You can put some elements after content
 * @slot - default slot for content
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The button's label.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart caret - The button's caret icon, an `<sl-icon>` element.
 *
 * #CSS
 * @cssprop [--wc-button-background=initial] - background 
 * @cssprop [--wc-button-background-focus=rgba(217, 234, 255, 0.4)] - background-focus 
 * @cssprop [--wc-button-background-hover=rgba(217, 234, 255, 0.4)] - background-hover 
 * @cssprop [--wc-button-background-pressed=rgba(190, 218, 255, 0.2)] - background-pressed 
 * @cssprop [--wc-button-border=1px solid rgb(166, 168, 169)] - border 
 * @cssprop [--wc-button-border-hover=1px solid rgb(68, 153, 255)] - border-hover 
 * @cssprop [--wc-button-border-radius=3px] - border-radius 
 * @cssprop [--wc-button-color=rgb(38, 41, 45)] - color 
 * @cssprop [--wc-button-color-focus=rgb(86, 88, 91)] - color-focus 
 * @cssprop [--wc-button-color-hover=rgb(86, 88, 91)] - color-hover 
 * @cssprop [--wc-button-color-pressed=rgb(86, 88, 91)] - color-pressed 
 * @cssprop [--wc-button-danger-background=hsl(5, 80%, 55%)] - danger-background 
 * @cssprop [--wc-button-danger-background-hover=hsl(5, 80%, 60%)] - danger-background-hover 
 * @cssprop [--wc-button-danger-border=1px solid hsl(5, 80%, 55%)] - danger-border 
 * @cssprop [--wc-button-danger-color=hsl(5, 80%, 92%)] - danger-color 
 * @cssprop [--wc-button-danger-color-hover=hsl(5, 80%, 98%)] - danger-color-hover 
 * @cssprop [--wc-button-danger-outline-focus=2px solid hsl(5, 80%, 35%)] - danger-outline-focus 
 * @cssprop [--wc-button-danger-ripple=hsl(5, 80%, 65%)] - danger-ripple 
 * @cssprop [--wc-button-display=inline-flex] - default display position of button 
 * @cssprop [--wc-button-font-family=-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol'] - font-family 
 * @cssprop [--wc-button-font-size=1rem] - Medium size fontsize 
 * @cssprop [--wc-button-font-weight=500] - font-weight 
 * @cssprop [--wc-button-gap=10px] - gap 
 * @cssprop [--wc-button-height=40px] - Medium size height 
 * @cssprop [--wc-button-justify=center] - justify 
 * @cssprop [--wc-button-large-font-size=inherit] - large-font-size 
 * @cssprop [--wc-button-large-height=48px] - large-height 
 * @cssprop [--wc-button-large-padding=0 20px] - large-padding 
 * @cssprop [--wc-button-letter-spacing=normal] - letter-spacing 
 * @cssprop [--wc-button-outline=none] - outline 
 * @cssprop [--wc-button-outline-focus=2px solid rgb(68, 153, 255)] - outline-focus 
 * @cssprop [--wc-button-outline-offset=1px] - outline-offset 
 * @cssprop [--wc-button-padding=0 16px] - Medium size padding 
 * @cssprop [--wc-button-primary-background=rgb(0, 120, 231)] - primary-background 
 * @cssprop [--wc-button-primary-background-hover=rgb(14, 135, 255)] - primary-background-hover 
 * @cssprop [--wc-button-primary-border=1px solid transparent] - primary-border 
 * @cssprop [--wc-button-primary-color=rgb(255, 255, 255)] - Primary text color 
 * @cssprop [--wc-button-primary-color-hover=rgb(255, 255, 255)] - Primary text color 
 * @cssprop [--wc-button-primary-outline-focus=2px solid rgb(14, 135, 255)] - primary-outline-focus 
 * @cssprop [--wc-button-primary-ripple=rgb(0, 105, 205)] - primary-ripple 
 * @cssprop [--wc-button-ripple=rgba(0, 105, 205, 0.2)] - ripple 
 * @cssprop [--wc-button-small-font-size=inherit] - Small size font-size 
 * @cssprop [--wc-button-small-height=32px] - Small size height 
 * @cssprop [--wc-button-small-padding=0 6px] - Small size padding 
 * @cssprop [--wc-button-success-background=hsl(110, 80%, 55%)] - success-background 
 * @cssprop [--wc-button-success-background-hover=hsl(110, 80%, 60%)] - success-background-hover 
 * @cssprop [--wc-button-success-border=1px solid hsl(110, 80%, 55%)] - success-border 
 * @cssprop [--wc-button-success-color=hsl(110, 80%, 4%)] - success-color 
 * @cssprop [--wc-button-success-color-hover=hsl(110, 80%, 8%)] - success-color-hover 
 * @cssprop [--wc-button-success-outline-focus=2px solid hsl(110, 80%, 35%)] - success-outline-focus 
 * @cssprop [--wc-button-success-ripple=hsl(110, 80%, 65%)] - success-ripple 
 * @cssprop [--wc-button-text-transform=normal] - text-transform 
 * #CSS
 *
 */
export class WcButton extends BaseButton {
  /** @ignore */
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

  hoverController = new HoverController(this, () => getButtonSync(this))

  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
    this.addEventListener('mousedown', this[start])
    this.addEventListener('touchstart', this[start])
    this.addEventListener('touchend', this[end])
    this.addEventListener('touchcancel', this[end])
    this.addEventListener('focusout', this[blur])
    this.addEventListener('focus', this[focus])
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
    e.preventDefault()
    window.navigator.vibrate?.(20)

    const {x, y} = clickPosition(e, this.getBoundingClientRect())

    if (!('touches' in e)) {
      document.addEventListener('mouseup', this[end])
    }

    this.style.setProperty('--click-x', x + 'px')
    this.style.setProperty('--click-y', y + 'px')

    this[action]()
  };

  /** @ignore  */
  [end] = () => {
    const button = getButtonSync(this)
    button.removeAttribute('pressed')
    document.removeEventListener('mouseup', this[end])
  };

  /** @ignore  */
  [keydown] = (e: KeyboardEvent) => {
    const button = getButtonSync(this)
    if (e.key === 'Enter' || e.key === ' ') {
      this[action]({byKey: true})
      const onKeyUp = (e: Event) => {
        e.preventDefault()
        button.removeAttribute('pressed')
        document.removeEventListener('keyup', onKeyUp)
      }
      document.addEventListener('keyup', onKeyUp)
      e.preventDefault()
    }
  };

  /** @ignore  */
  [action](data?: {byKey?: true}) {
    if (this.isUnavailable) return
    const button = getButtonSync(this)
    button.setAttribute('pressed', '')
    if (this.type === 'submit') {
      this.submit()
    } else if (this.href && data?.byKey) {
      button.click()
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
  [notifyOnClick]() {
    if (this.notificable && !this[notifyTimeout]) {
      const button = this.shadowRoot.querySelector<HTMLButtonElement>('#button')
      this.style.setProperty('--width', getComputedStyle(this).width)
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
   * Submit for WcForm element
   */
  submit(): void {
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
    buttonClose: CustomEvent<ButtonEvents['buttonClose']> // TODO переименовать?
  }
}
