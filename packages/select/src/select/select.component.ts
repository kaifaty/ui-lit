import {getEventDataset} from '@kaifat/utils'
import {css, html, nothing, TemplateResult} from 'lit'
import {property} from 'lit/decorators.js'
import {unsafeHTML} from 'lit/directives/unsafe-html.js'

import {definable, LitFormAssoc, focusable, labled, stylable} from '@ui-lit/utils'
import {LitButton} from '@ui-lit/button'
import {LitIcon} from '@ui-lit/icon'
import {cancel, dropdown, search} from '../../svgIcons'
import type {LitOption} from '../option/option.component'
import {PREFIX, selectCSSVars} from '../styles.map'
import type {IPropsSelect, TListboxPosition} from '../types'

import '../../button/button.component'
import '../listbox/listbox.component'
import '../group/group.component'
import '../option/option.component'

export class LitSelect
  extends focusable(labled(stylable(definable(LitFormAssoc), selectCSSVars, PREFIX)))
  implements IPropsSelect
{
  static styles = [
    ...super.styles,
    css`
      :host {
        ${LitButton.cssKey('border')}: ${LitSelect.cssVar('border')};
        ${LitButton.cssKey('border-radius')}: 0;
        ${LitButton.cssKey('color')}: ${LitSelect.cssVar('color')};
        ${LitButton.cssKey('justify')}: normal;
        ${LitButton.cssKey('padding')}: ${LitSelect.cssVar('padding')};
        ${LitIcon.cssKey('color')}: ${LitSelect.cssVar('color')};
        --input-width: 0;
        display: inline-block;
        height: ${LitSelect.cssVar('height')};
      }
      :host([multiple]) {
        height: initial;
      }
      :host(:not([multiple])) .wrapper {
        display: flex;
        align-items: center;
      }
      :host(:not([multiple])) .search-wrapper {
        width: 100%;
      }
      :host([multiple][searchable]) .wrapper {
        cursor: text;
      }
      :host([multiple]) .wrapper {
        border: ${LitSelect.cssVar('border')};
        cursor: text;
        flex-wrap: wrap;
        min-width: 100px;
      }
      .wrapper {
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        min-height: ${LitSelect.cssVar('height')};
        padding-right: 22px;
        padding: 1px;
        position: relative;
      }
      .wrapper:focus {
        outline: ${LitSelect.cssVar('outline-focus')};
      }
      .icon-wrapper {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: center;
        position: absolute;
        right: 0;
        top: 0;
        width: 22px;
      }
      .selected {
        display: flex;
        flex-wrap: wrap;
      }
      .search-wrapper {
        display: inline-block;
        padding: 0 4px;
      }
      input {
        appearance: none;
        background: transparent;
        border: none;
        box-sizing: border-box;
        color: ${LitSelect.cssVar('color')};
        margin: 0;
        min-height: calc(${LitSelect.cssVar('height')} - 4px);
        min-width: 4px;
        outline: none;
        padding: 0 8px;
        width: 100%;
      }
      :host(:not([multiple])) input {
        border: ${LitSelect.cssVar('listbox-border')};
        margin: 6px 14px 6px 14px;
        padding: 0 5px;
        width: calc(100% - 32px);
      }
      :host([multiple]:not([empty])) input {
        padding: 0;
      }

      :host([multiple]) input {
        width: var(--input-width);
      }
      button {
        ${LitIcon.cssKey('color')}: ${LitButton.cssVar('primary-color')};
        background: ${LitButton.cssVar('primary-background')};
        border: ${LitButton.cssVar('primary-border')};
        color: ${LitButton.cssVar('primary-color')};
        margin: 2px;
        padding: 2px 5px;
      }
      button:disabled {
        opacity: 0.5;
      }
      ::part(content) {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      lit-button {
        ${LitButton.cssKey('background')}: ${LitSelect.cssVar('background')};
        ${LitButton.cssKey('background-hover')}: ${LitSelect.cssVar('background-hover')};
        ${LitButton.cssKey('color')}: ${LitSelect.cssVar('color')};
        ${LitButton.cssKey('outline-focus')}: ${LitSelect.cssVar('outline-focus')};
        ${LitButton.cssKey('ripple')}: ${LitSelect.cssVar('ripple')};
        height: 100%;
        min-width: 70px;
        width: 100%;
      }
      .cancel {
        cursor: pointer;
        fill: ${LitButton.cssVar('primary-color')};
      }
      .search,
      .dropdown {
        fill: ${LitButton.cssVar('color')};
      }
    `,
  ]
  static get properties() {
    return {
      open: {type: Boolean},
    }
  }

  @property({type: Number}) tabindex = 0
  @property({type: Boolean, reflect: true}) multiple = false
  @property({type: Boolean, reflect: true}) searchable = false
  @property({type: String}) searchPlaceholder = 'search'
  @property({type: String}) listboxPosition: TListboxPosition = 'auto'

  /** @ignore */
  #optionMap: Set<LitOption> = new Set()

  /** @ignore */
  #connectedTime = 0

  /** @ignore */
  #open = false

  public isMenu = false

  set open(value: boolean) {
    if (value === this.#open) {
      return
    }
    const oldValue = this.#open
    this.#open = value
    if (value) {
      this.searchValue = ''
    }
    this.requestUpdate('open', oldValue)
  }
  get open() {
    return this.#open
  }

  get value() {
    return this.selectedOptions[0]?.value
  }
  set value(value: string) {
    const option = this.#optionByValue(value)
    if (!option) {
      //Make possible to set value to lit-select on init
      if (Date.now() - this.#connectedTime < 20 || !this.#connectedTime) {
        this.#connectedTime = Date.now()
        setTimeout(() => {
          this.value = value
        }, 20)
      } else {
        console.warn('No option with value:', value)
      }
      return
    }
    this.selectOption(option)
  }

  #searchValue = ''
  get searchValue() {
    return this.#searchValue
  }
  set searchValue(value: string) {
    this.#searchValue = value
    this.options.forEach((it) => {
      it.visability = it.innerText.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    })
    this.requestUpdate()
  }

  get length() {
    return this.options.length
  }
  get options() {
    return [...this.#optionMap.values()]
  }
  get sortedOptions() {
    return [...this.querySelectorAll('lit-option')] as LitOption[]
  }

  set selectedIndex(value: number) {
    if (value > this.length - 1 || value < 0) return
    const option = this.sortedOptions[value]
    if (option) {
      this.selectOption(option)
    }
  }
  get selectedIndex() {
    const options = this.sortedOptions
    for (let i = 0; i < this.length; i++) {
      if (options[i].selected) return i
    }
    return -1
  }

  get selectedOptions() {
    return this.options.filter((item) => item.selected)
  }
  get selectedValues() {
    return this.selectedOptions.map((item) => item.value)
  }
  get selectedContent() {
    return this.selectedOptions[0]?.innerHTML || '-'
  }

  selectOption(option: LitOption) {
    if (this.multiple) {
      option.selected = !option.selected
    } else if (option.selected) {
      this.requestUpdate()
      return
    } else {
      this.selectedOptions.forEach((option) => (option.selected = false))
      option.selected = true
    }
    this.requestUpdate()
    this.notify()
    setTimeout(() => this.focus(), 20)
  }

  unSelectOption(option: LitOption) {
    option.selected = false
    this.requestUpdate()
  }

  hide() {
    if (!this.open) return
    this.open = false
  }

  show() {
    if (this.open) return
    this.open = true
  }

  /** @ignore */
  #optionByValue(value: string) {
    return this.options.find((item) => item.value === value)
  }

  /** @ignore */
  #selectValue(value: string) {
    const option = this.#optionByValue(value)
    if (!option) {
      console.warn('No option with value:', value)
      return
    }
    this.selectOption(option)
  }

  /** @ignore */
  #unSelectValue(value: string) {
    const option = this.#optionByValue(value)
    if (!option) {
      console.warn('No option with value:', value)
      return
    }
    this.unSelectOption(option)
  }

  /** @ignore */
  #onOptionChange = (e: CustomEvent) => {
    const option = e.detail as LitOption
    console.log('===>', option)
    this.selectOption(option)
    if (!this.multiple) {
      this.hide()
    }
  }

  /** @ignore */
  #onOptionSlotChanged = () => {
    this.requestUpdate()
  }

  /** @ignore */
  #onOptionConnect = (e: CustomEvent) => {
    const option = e.detail as LitOption
    this.#optionMap.add(option)
    option.setSelectHost(this)
    this.requestUpdate()
  }

  /** @ignore */
  optionDisconnect = (option: LitOption) => {
    this.#optionMap.delete(option)
    this.requestUpdate()
  }

  /** @ignore */
  willUpdate(_changedProperties: Map<string | number | symbol, unknown>): void {
    if (!this.#optionMap.size) {
      this.setAttribute('empty', '')
    } else {
      this.removeAttribute('empty')
    }
  }

  /** @ignore */
  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('optionConnected', this.#onOptionConnect as EventListener)
    this.addEventListener('optionSlotChanged', this.#onOptionSlotChanged as EventListener)
    this.addEventListener('optionChange', this.#onOptionChange as EventListener)
  }

  /** @ignore */
  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('optionConnected', this.#onOptionConnect as EventListener)
    this.removeEventListener('optionSlotChanged', this.#onOptionSlotChanged as EventListener)
    this.removeEventListener('optionChange', this.#onOptionChange as EventListener)
  }

  /** @ignore */
  #toggle() {
    if (this.disabled) return
    if (this.open) {
      this.hide()
    } else {
      this.show()
      if (this.multiple) {
        this.shadowRoot?.querySelector('input')?.focus()
      }
    }
  }

  /** @ignore */
  #clickCancel(e: Event) {
    const v = getEventDataset(e, '.cancel', 'value')!
    this.#unSelectValue(v)
    this.notify()
    e.stopPropagation()
  }

  /** @ignore */
  private _getSlotElements = (slot = this.shadowRoot!.querySelector('.slot')): any => {
    const elements = (slot as HTMLSlotElement)?.assignedElements()
    if (elements[0] instanceof HTMLSlotElement) {
      return this._getSlotElements(elements[0])
    }
    return elements.reduce((acc, v) => {
      if (['lit-menu-item', 'lit-option'].includes(v.tagName.toLowerCase())) {
        acc.push(v as HTMLElement)
      } else {
        v.querySelectorAll('lit-menu-item, lit-option').forEach((n) => acc.push(n as HTMLElement))
      }
      return acc
    }, [] as HTMLElement[])
  }

  /** @ignore */
  #onSearchValue(e: Event) {
    const value = (e.target as HTMLInputElement).value
    this.searchValue = value
    this.style.setProperty('--input-width', this.searchValue.length * 8 + 'px')
  }

  /** @ignore */
  #onSeatchClick(e: Event) {
    e.stopPropagation()
  }

  /** @ignore */
  #contentTemplate() {
    if (this.multiple) {
      return this.selectedOptions.map((option) => {
        if (!option) return ''
        return html`<button class="button" ?disabled="${option.disabled}">
          ${unsafeHTML(option.innerHTML)}
          <span class="cancel" data-value="${option.value}" @click="${this.#clickCancel}"> ${cancel()} </span>
        </button>`
      })
    }

    return html`<slot name="selected">${unsafeHTML(this.selectedOptions[0]?.innerHTML || '-')}</slot>`
  }

  /** @ignore */
  #searchTamplate() {
    if (!this.searchable) return nothing
    return html`<div class="search-wrapper">
      <input
        .value="${this.searchValue}"
        @click="${this.#onSeatchClick}"
        @input="${this.#onSearchValue}"
        placeholder="${this.multiple ? '' : this.searchPlaceholder}"
        type="text"
      />
    </div>`
  }

  /** @ignore */
  #containerTemplate(data: TemplateResult) {
    if (this.multiple) {
      return html` <div
        class="wrapper"
        tabindex="0"
        @keydown="${this.#handlekeyDown}"
        @click="${this.#toggle}"
      >
        ${data}
      </div>`
    }
    return html`<lit-button @keydown="${this.#handlekeyDown}" @click="${this.#toggle}">
      <div class="wrapper">${data}</div>
    </lit-button>`
  }

  /** @ignore */
  #wrapperTemplate() {
    return this.#containerTemplate(html` ${this.#contentTemplate()}
      ${this.multiple ? this.#searchTamplate() : nothing}
      <div class="icon-wrapper">
        ${this.multiple && this.searchable && this.open ? search() : dropdown(this.open)}
      </div>`)
  }

  /** @ignore */
  render() {
    return html` ${super.render()} ${this.#wrapperTemplate()}
      <lit-listbox
        .position="${this.listboxPosition}"
        @focusNext="${this.#focusNext}"
        @focusPrev="${this.#focusPrev}"
        @listboxClose="${this.hide}"
        .open="${this.open}"
      >
        ${this.multiple ? nothing : this.#searchTamplate()}
        <slot></slot>
      </lit-listbox>`
  }

  /** @ignore */
  #focusNext() {
    ;(document.activeElement?.nextElementSibling as HTMLElement)?.focus()
  }

  /** @ignore */
  #focusPrev() {
    ;(document.activeElement?.previousElementSibling as HTMLElement)?.focus()
  }

  /** @ignore */
  #handlekeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.#toggle()
    }
    if (e.key === 'ArrowDown') {
      if (this.isMenu) {
        const d = this._getSlotElements()
        d[this.selectedIndex + 1]?.focus()
      } else {
        this.selectedIndex = this.selectedIndex + 1
      }
      e.preventDefault()
    }
    if (e.key === 'ArrowUp') {
      this.selectedIndex = this.selectedIndex - 1
      e.preventDefault()
    }
    if (e.key === 'Escape') {
      this.hide()
    }
    if (e.key === 'Tab') {
      if (this.open) {
        this.hide()
        e.preventDefault()
      }
    }
  }

  /** @ignore */
  notify() {
    this.dispatchEvent(
      new CustomEvent('changed', {
        detail: this.value,
        bubbles: true,
        composed: true,
      }),
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-select': LitSelect
  }
}
