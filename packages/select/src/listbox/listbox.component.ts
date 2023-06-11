import {stylable, css, html, createTemplate, definable} from '@ui-wc/utils'
import {SELECT_PREFIX, selectCSSVarsMap} from '../styles.map'
import type {WcSelect} from '../select.component'
export const base = stylable(definable(HTMLElement), selectCSSVarsMap, SELECT_PREFIX)

const template = createTemplate(html``)

const closeOnAnyClick = (container: WcListbox) => {
  document.addEventListener('click', (e) => {
    const donotNeedHide = e.composedPath().find((item) => {
      if (item instanceof HTMLElement) {
        return ['#select', 'wc-listbox'].includes(item.tagName.toLowerCase())
      }
    })
    if (!donotNeedHide) {
      container.close()
      document.dispatchEvent(new CustomEvent('closeSelect', {}))
    }
  })
}

const getRootOffset = (element: HTMLElement | undefined) => {
  let offset = 0
  while (element) {
    offset += element.offsetTop
    element = element.offsetParent as HTMLElement | undefined
  }

  return offset
}

const isFromTop = (rect: DOMRect): boolean => {
  return rect.top - window.innerHeight / 2 > 0
}

const onOptionSelected = Symbol()
const onValueChanged = Symbol()
const updateStyle = Symbol()

export class WcListbox extends base {
  static styles = [
    css`
      :host {
        display: block;
        position: absolute;
        visibility: hidden;
        top: 0;
        left: 0;
        border: 1px solid #ccc;
        opacity: 0;
        transition: opacity 150ms ease;
      }
      :host([visible]) {
        visibility: visible;
        opacity: 1;
      }
    `,
  ]

  _caller: WcSelect
  value: string | string[] = ''
  isVisible = false

  constructor() {
    super()
    this.shadowRoot.append(template.content.cloneNode(true))

    closeOnAnyClick(this)
    this.addEventListener('optionSelected', this[onOptionSelected] as EventListener)
    this.addEventListener('optionValueChanged', this[onValueChanged] as EventListener)
  }

  connectedCallback(): void {
    window.addEventListener('resize', this[updateStyle] as EventListener)
  }

  disconnectedCallback(): void {
    window.removeEventListener('resize', this[updateStyle] as EventListener)
  }

  [onValueChanged] = () => {};

  [updateStyle] = () => {
    if (!this.isVisible) {
      return
    }
    this.updateStyle()
  };

  [onOptionSelected] = (e: CustomEvent<string>) => {
    if (this._caller) {
      this._caller.value = e.detail
      this.updateStyle()
    }
  }

  updateValue(root: WcSelect) {
    this.value = root.value
    this.shadowRoot.querySelectorAll(`[selected]`).forEach((node) => node.removeAttribute('selected'))

    if (root.multiple) {
      this.shadowRoot.querySelector(`[value="${root.value}"]`)?.setAttribute('selected', '')
    } else {
      this.shadowRoot.querySelector(`[value="${root.value}"]`)?.setAttribute('selected', '')
    }
  }

  updateOptions(root: WcSelect) {
    this.shadowRoot.innerHTML = root.innerHTML
  }

  updateStyle() {
    const root = this._caller
    const button = root.shadowRoot.querySelector<HTMLElement>('#select')
    const rect = button.getBoundingClientRect()
    const fromTop = isFromTop(rect)
    const x = rect.x
    const y = Math.floor(getRootOffset(button) + (fromTop ? -this.clientHeight - 1 : rect.height))
    this.style.transform = `translate(${x}px, ${y}px)`
  }

  open(root: WcSelect) {
    this._caller = root
    this.isVisible = true

    this.updateOptions(root)
    this.updateStyle()
    this.updateValue(root)

    this.setAttribute('visible', '')
  }
  close() {
    this.isVisible = false
    this.removeAttribute('visible')
  }
}

const checkExist = () => {
  return Boolean(document.querySelector('wc-listbox'))
}

export const createListbox = () => {
  if (!checkExist()) {
    document.body.appendChild(document.createElement('wc-listbox'))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-listbox': WcListbox
  }
  interface HTMLElementEventMap {}
}
