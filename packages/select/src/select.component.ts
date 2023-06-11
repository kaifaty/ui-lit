import {createTemplate, debounce, css, html} from '@ui-wc/utils'
import {PropsedBase} from './base.component'
import {WcListbox, createListbox} from './listbox'
import {WcOption} from './option'

export type TListboxPosition = 'auto' | 'top'

const template = createTemplate(html`
  <div id="select">
    <slot name="select">-</slot>
    <wc-icon icon="dropdown" id="icon"></wc-icon>
  </div>
  <slot id="content"></slot>
`)

const onClose = Symbol()
const open = Symbol()

const closeAnotherSelects = (target?: WcSelect) => {
  document.dispatchEvent(
    new CustomEvent('closeSelect', {
      detail: target,
    }),
  )
}

/**
 *
 * #content
 *  <wc-option value = "1" selected>1</wc-option>
 *  <wc-option value = "2">2</wc-option>
 * #content
 *
 * @element wc-select - UI WC select element
 *
 * @attr {boolean} [multiple=false] - Multiple select
 *
 *
 * @#CSS
 * @cssprop [--wc-select-background=initial] - background
 * @cssprop [--wc-select-background-hover=initial] - background-hover
 * @cssprop [--wc-select-border=1px solid #ccc] - border
 * @cssprop [--wc-select-color=hsl(264, 65%, 50%)] - color
 * @cssprop [--wc-select-fullscreen-background=hsl(246, 15%, 99%)] - fullscreen-background
 * @cssprop [--wc-select-fullscreen-color=hsl(246, 15%, 99%)] - fullscreen-color
 * @cssprop [--wc-select-fullscreen-overlay-background=rgba(0,0,0,0.6)] - fullscreen-overlay-background
 * @cssprop [--wc-select-fullscreen-shadow=rgba(0,0,0,0.3)] - fullscreen-shadow
 * @cssprop [--wc-select-height=30px] - height
 * @cssprop [--wc-select-listbox-border=1px solid #eee] - listbox-border
 * @cssprop [--wc-select-listbox-height=initial] - listbox-height
 * @cssprop [--wc-select-listbox-max-height=300px] - listbox-max-height
 * @cssprop [--wc-select-listbox-shadow=rgba(0,0,0,0.07)] - listbox-shadow
 * @cssprop [--wc-select-mobile-height=40px] - mobile-height
 * @cssprop [--wc-select-option-background=rgb(255, 255, 255)] - option-background
 * @cssprop [--wc-select-option-background-hover=rgb(190, 218, 255)] - option-background-hover
 * @cssprop [--wc-select-option-background-selected=rgb(133, 186, 255)] - option-background-selected
 * @cssprop [--wc-select-option-circle-color=rgb(103, 170, 255)] - option-circle-color
 * @cssprop [--wc-select-option-color=#333] - option-color
 * @cssprop [--wc-select-option-ripple=hsl(264, 65%, 60%)] - option-ripple
 * @cssprop [--wc-select-outline-focus=1px solid hsl(264, 65%, 70%)] - outline-focus
 * @cssprop [--wc-select-padding=0 14px] - padding
 * @cssprop [--wc-select-ripple=initial] - ripple
 * #CSS
 *
 */
export class WcSelect extends PropsedBase {
  static define() {
    WcListbox.define()
    WcOption.define()
    super.define()
  }
  static styles = css`
    :host {
      display: contents;
    }
    #select {
      padding: 10px;
      min-width: 80px;
      border: 1px solid #ccc;
      border-radius: 2px;
      position: relative;
      cursor: pointer;
      color: ${this.cssVar('color')};
    }
    #content {
      display: none;
    }
    #icon {
      transition: transform 150ms linear;
      position: absolute;
      right: 8px;
    }
    :host([open]) #icon {
      transform-origin: center;
      transform: rotate(180deg);
    }
  `;

  /**
   * @ignore
   */
  [open] = false
  set open(value: boolean) {
    this[open] = value
    if (value) {
      closeAnotherSelects(this)
      document.querySelector('wc-listbox').open(this)
      this.setAttribute('open', '')
    } else {
      document.querySelector('wc-listbox').close()
      this.removeAttribute('open')
    }
  }
  get open() {
    return this[open]
  }
  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))
    this.shadowRoot.querySelector('#select')?.addEventListener(
      'click',
      debounce(() => {
        this.open = !this.open
      }, 20),
    )
    this.addEventListener('optionSelected', ((e: CustomEvent<string>) => {
      this.value = e.detail
    }) as EventListener)

    createListbox()
  }
  connectedCallback(): void {
    document.addEventListener('closeSelect', this[onClose] as EventListener)
  }
  disconnectedCallback(): void {
    document.removeEventListener('closeSelect', this[onClose] as EventListener)
  }

  /**
   * @ignore
   */
  [onClose] = debounce((e: CustomEvent<WcSelect | undefined>) => {
    if (!e.detail || e.detail !== this) {
      this.open = false
    }
  }, 20)
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-select': WcSelect
  }
  interface HTMLElementEventMap {}
}
