import {WcIcon} from '@ui-wc/icon'

import {definable, withProps, html, css, noselect, createGetParams, focusable, stylable, createTemplate} from '@ui-wc/utils'

import {LinkTarget, WcLink} from '@ui-wc/link'
import {WcSpinner} from '@ui-wc/spinner'

import {buttonCCSVarsMap, BUTTON_PREFIX} from './styles.map'

export type ButtonEvents = {
  switchChanged: boolean
  submitForm: boolean
  buttonClose: boolean
}

type ButtonType = 'submit' | 'button' | 'switch' | 'close'
type ButtonVariant = 'text' | 'primary' | 'danger' | 'success' | 'neutral' | 'warning'
type ButtonSize = 'small' | 'medium' | 'large'

const notifyOnClick = Symbol()
const getParams = createGetParams({
  reflect: true,
})

const getButton = (target: HTMLElement) => {
  return target.shadowRoot.querySelector<HTMLLinkElement>('#button')
}

const loading = getParams('loading', false)
const disabled = getParams('disabled', false)
const pressed = getParams('pressed', false, {
  set(target, _, value) {
    if ((target as HTMLElement & Props).type === 'switch') {
      getButton(target).ariaPressed = value.toString()
    } else {
      getButton(target).ariaPressed = 'undefined'
    }
    return true
  },
})
const notificable = getParams('notificable', false)
const tabIndex = getParams('tabIndex', 0, {
  set(target, _, value) {
    getButton(target).setAttribute('tabIndex', value.toString())
    return true
  },
})
const href = getParams<string | null>('href', null, {
  set(target, _, value) {
    target.shadowRoot.querySelector<HTMLLinkElement>('#button').href = value
    return true
  },
})
const target = getParams<LinkTarget>('target', '_self', {
  set(target, _, value) {
    target.shadowRoot.querySelector<HTMLLinkElement>('#button').target = value
    return true
  },
})
const type = getParams<ButtonType>('type', 'button', {
  set(target, _, value) {
    if (value === 'switch') {
      getButton(target).ariaPressed = (target as HTMLElement & Props).pressed.toString()
    } else {
      getButton(target).ariaPressed = 'undefined'
    }
    return true
  },
})
const size = getParams<ButtonSize>('size', 'medium')

const getXY = (e: TouchEvent | MouseEvent, target: HTMLElement) => {
  const rect = target.getBoundingClientRect()

  if ('touches' in e) {
    return {
      x: e.targetTouches[0].clientX - rect.x,
      y: e.targetTouches[0].clientY - rect.y,
    }
  }

  return {
    x: e.clientX - rect.x,
    y: e.clientY - rect.y,
  }
}

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

const template = createTemplate(html` <a id="button" class="noselect" part="base">
  <wc-icon id="checkmark" icon="checkmark"></wc-icon>
  <wc-spinner id="spinner"></wc-spinner>
  <slot part="preffix" name="preffix"></slot>
  <slot part="label"></slot>
  <slot part="suffix" name="suffix"></slot>
</a>`)

const start = Symbol()
const end = Symbol()
const blur = Symbol()
const focus = Symbol()
const keydown = Symbol()
const Base = focusable(stylable(definable(HTMLElement), buttonCCSVarsMap, BUTTON_PREFIX))
const BaseWithProps = withProps<Props, typeof Base>(Base, [loading, tabIndex, notificable, pressed, href, target, type, disabled, size])

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
 *
 *
 * @attr {'_blank' | '_parent' | '_self' | '_top'} [target='_self'] - Target for `link`. Work with `href` prop.
 * @attr {string | null} [href=null] - Button can be `link` if href defined
 * @attr {'start' | 'center' | 'end'} [align='center'] - Align of button content
 * @attr {'small' | 'medium' | 'large'} [size='medium'] - Use the size attribute to change a button's size.
 *
 * @attr {'submit' | 'button' | 'switch' | 'close'} [type='button'] - Use type to change button behavour
 *
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
  static define() {
    WcSpinner.define()
    WcIcon.define()
    WcLink.define()
    super.define()
  }

  /** @ignore */
  static styles = [
    noselect,
    css`
      #checkmark {
        display: none;
      }
      #button[checkmark] {
        width: var(--width);
      }
      #button[checkmark] #checkmark {
        display: block;
      }
      #button[checkmark] :not(#checkmark) {
        display: none;
      }
      wc-spinner {
        height: 12.8px;
        width: 12.8px;
        justify-self: center;
      }
      wc-link {
        width: 100%;
      }
      :host {
        ${this.cssKey('color')}: ${this.cssVar('color')};
        --click-x: 0;
        --click-y: 0;
        --radiant: 5%;
        box-sizing: border-box;
        display: ${this.cssVar('display')};
        height: ${this.cssVar('height')};
        position: relative;
      }
      :host(:not([href])) wc-link {
        display: contents;
      }
      :host([size='small']) #button {
        padding: ${this.cssVar('small-padding')};
        font-size: ${this.cssVar('small-font-size')};
        line-height: ${this.cssVar('small-height')};
      }
      :host([size='large']) #button {
        padding: ${this.cssVar('large-padding')};
        font-size: ${this.cssVar('large-font-size')};
        line-height: ${this.cssVar('large-height')};
      }

      :host([size='small']) {
        height: ${this.cssVar('small-height')};
      }
      :host([size='large']) {
        height: ${this.cssVar('large-height')};
        line-height: ${this.cssVar('height')};
      }

      :host([disabled]),
      :host([loading]) {
        pointer-events: none;
      }
      :host([disabled]) #button {
        opacity: 0.4;
      }
      :host(:not([loading])) #spinner {
        display: none;
      }

      :host([between]) #button {
        justify-content: space-between;
      }

      #button {
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
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
        gap: ${this.cssVar('gap')};
        grid-auto-flow: column;
        height: 100%;
        justify-content: ${this.cssVar('justify')};
        letter-spacing: ${this.cssVar('letter-spacing')};

        line-height: ${this.cssVar('height')};
        outline: ${this.cssVar('outline')};
        overflow: hidden;
        padding: ${this.cssVar('padding')};
        position: relative;
        text-transform: ${this.cssVar('text-transform')};
        text-decoration: none;
        white-space: nowrap;
        width: 100%;
        contain: content;
      }
      ::slotted(*) {
        align-self: center;
      }
      :host(:not([type='switch'])[hover]) #button {
        color: ${this.cssVar('color-hover')};
        background-color: ${this.cssVar('background-hover')};
      }
      :host(:not([type='switch'])[pressed]) #button {
        background: radial-gradient(
          circle at var(--click-x) var(--click-y),
          ${this.cssVar('ripple')} 5px,
          ${this.cssVar('background-hover')} var(--radiant)
        );
      }
      :host #button:focus {
        outline: ${this.cssVar('outline-focus')};
      }
      :host([loading]) #button {
        cursor: initial;
      }

      :host([type='switch']) #button {
        color: ${this.cssVar('switch-color')};
        ${this.cssKey('color')}: ${this.cssVar('switch-color')};
      }
      :host([type='switch'][switchOn]) #button {
        color: ${this.cssVar('switch-on-color')};
        ${this.cssKey('color')}: ${this.cssVar('switch-on-color')};
        background-color: ${this.cssVar('switch-on-background')};
      }
      :host([type='switch']) #button:focus {
        outline: ${this.cssVar('switch-outline-focus')};
        border: ${this.cssVar('switch-outline-focus')};
      }
      :host([type='switch'][switchOn]) #button:focus {
        outline: ${this.cssVar('switch-on-outline-focus')};
        border: ${this.cssVar('switch-on-outline-focus')};
      }

      :host([borderless]) #button,
      :host([borderless][hover]) #button {
        border: none;
      }

      :host([primary]) #button {
        color: ${this.cssVar('primary-color')};
        background: ${this.cssVar('primary-background')};
        border: ${this.cssVar('primary-border')};
        ${this.cssKey('color')}: ${this.cssVar('primary-background')};
      }
      :host([primary]) #button:focus {
        outline: ${this.cssVar('primary-outline-focus')};
      }

      :host([primary][hover]) #button {
        background-color: ${this.cssVar('primary-background-hover')};
      }
      :host([primary][pressed]) #button {
        background: radial-gradient(
          circle at var(--click-x) var(--click-y),
          ${this.cssVar('primary-ripple')} 5px,
          ${this.cssVar('primary-background-hover')} var(--radiant)
        );
      }

      :host([success]) {
        ${this.cssKey('color')}: ${this.cssVar('success-color')};
      }
      :host([success]) #button {
        color: ${this.cssVar('success-color')};
        background: ${this.cssVar('success-background')};
        border: ${this.cssVar('success-border')};
        ${this.cssKey('color')}: ${this.cssVar('success-color')};
      }
      :host([success]) #button:focus {
        outline: ${this.cssVar('success-outline-focus')};
      }
      :host([success][hover]) #button {
        background-color: ${this.cssVar('success-background-hover')};
      }
      :host([success][pressed]) #button {
        background: radial-gradient(
          circle at var(--click-x) var(--click-y),
          ${this.cssVar('success-ripple')} 5px,
          ${this.cssVar('success-background-hover')} var(--radiant)
        );
      }

      :host([danger]) {
        ${this.cssKey('color')}: ${this.cssVar('danger-color')};
      }
      :host([danger]) #button {
        ${this.cssKey('color')}: ${this.cssVar('danger-color')};
        background: ${this.cssVar('danger-background')};
        border: ${this.cssVar('danger-border')};
        color: ${this.cssVar('danger-color')};
      }
      :host([danger]) #button:focus {
        outline: ${this.cssVar('danger-outline-focus')};
      }
      :host([danger][hover]) #button {
        background-color: ${this.cssVar('danger-background-hover')};
      }
      :host([danger][pressed]) #button {
        background: radial-gradient(
          circle at var(--click-x) var(--click-y),
          ${this.cssVar('danger-ripple')} 5px,
          ${this.cssVar('danger-background-hover')} var(--radiant)
        );
      }
    `,
  ]

  private _notifyTimeout = 0

  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
    this.addEventListener('mouseover', () => this.setAttribute('hover', ''))
    this.addEventListener('mouseout', () => this.removeAttribute('hover'))
    this.addEventListener('mousedown', this[start])
    this.addEventListener('touchstart', this[start])
    this.addEventListener('touchend', this[end])
    this.addEventListener('touchcancel', this[end])
    this.addEventListener('blur', this[blur])
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
    if (this.isUnavailable) return
    window.navigator.vibrate?.(20)

    const {x, y} = getXY(e, this)

    if (!('touches' in e)) {
      document.addEventListener('mouseup', this[end])
    }

    this.setAttribute('pressed', '')
    this.style.setProperty('--click-x', x + 'px')
    this.style.setProperty('--click-y', y + 'px')

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
  };

  /** @ignore  */
  [end] = () => {
    this.removeAttribute('pressed')
    this.removeAttribute('hover')
    document.removeEventListener('mouseup', this[end])
  };

  /** @ignore  */
  [keydown] = (e: KeyboardEvent) => {
    console.log('down', document.activeElement)
    if (e.key === 'Enter' || e.key === ' ') {
      this.submit()
      e.preventDefault()
    }
  };

  /** @ignore  */
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

  /** @ignore  */
  get isUnavailable() {
    return this.disabled || this.loading || this.href || this._notifyTimeout
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
