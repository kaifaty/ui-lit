import {css, LitElement} from 'lit'
import {property} from 'lit/decorators'

import {definable, stylable} from '@ui-lit/utils'

import {iconCSSVarMap, PREFIX} from './styles-vars'

export class LitIcon extends stylable(definable(LitElement), iconCSSVarMap, PREFIX) {
  static styles = css`
    :host {
      cursor: pointer;
      display: inline-block;
      cursor: pointer;
      text-transform: none !important;
      color: ${this.cssVar('color')};
      font-size: ${this.cssVar('font-size')};
      font-weight: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -moz-font-feature-settings: 'liga';
      -moz-osx-font-smoothing: grayscale;

      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                        supported by Chrome, Edge, Opera and Firefox */
    }
    :host([danger]),
    :host([error]) {
      color: ${this.cssVar('negative-color')};
    }
    :host([success]) {
      color: ${this.cssVar('positive-color')};
    }
    :host([icon='back']),
    :host([icon='arrow-left']) {
      transform-origin: center;
      transform: rotate(90deg);
    }
  `

  static iconsMap: Record<string, number> = {
    help: parseInt('006E', 16),
    back: parseInt('0069', 16),
    dropdown: parseInt('0069', 16),
    dropup: parseInt('0060', 16),
    'arrow-down': parseInt('004e', 16),
    'arrow-up': parseInt('004f', 16),
    'arrow-down-2': parseInt('0050', 16),
    'arrow-left': parseInt('0050', 16),
    'arrow-up-2': parseInt('0051', 16),
    waiting: parseInt('0041', 16),
    done: parseInt('0042', 16),
    canceled: parseInt('0046', 16),
    mobile: parseInt('0043', 16),
    'order-status-0': parseInt('0041', 16),
    'order-status-3': parseInt('0042', 16),
    'order-status-5': parseInt('006F', 16),
    'order-status-7': parseInt('0042', 16),
    'order-status-50': parseInt('0044', 16),
    'order-status-51': parseInt('0045', 16),
    'order-status-52': parseInt('0046', 16),
    info: parseInt('0047', 16),
    edit: parseInt('0048', 16),
    tag: parseInt('004a', 16),
    telegram: parseInt('004b', 16),
    switch: parseInt('004c', 16),
    toggle: parseInt('004d', 16),
    cancel: parseInt('0052', 16),
    remove: parseInt('0052', 16),
    checkmark: parseInt('0053', 16),
    connected: parseInt('0054', 16),
    disconnected: parseInt('0055', 16),
    deposit: parseInt('0056', 16),
    withdraw: parseInt('0057', 16),
    transfer: parseInt('0058', 16),
    share: parseInt('005A', 16),
    resize: parseInt('005B', 16),
    move: parseInt('005C', 16),
    save: parseInt('005D', 16),
    default: parseInt('005E', 16),
    filter: parseInt('005f', 16),
    'orderbook-mode-sym1sum': parseInt('0061', 16),
    'orderbook-mode-sym2sum': parseInt('0062', 16),
    'orderbook-mode-sym2vol': parseInt('0063', 16),
    'orderbook-mode-userOrders': parseInt('0064', 16),
    'orderbook-mode-percentPrice': parseInt('0025', 16),
    'orderbook-mode-avPrice': parseInt('0059', 16),
    user: parseInt('0064', 16),
    hide: parseInt('0065', 16),
    show: parseInt('0066', 16),
    //"filter": parseInt(`0067`, 16),
    exit: parseInt('0068', 16),
    buy: parseInt('006A', 16),
    sell: parseInt('006B', 16),
    makeposition: parseInt('0070', 16),
    copyto: parseInt('0071', 16),
    copy: parseInt('0071', 16),
    favorites: parseInt('0072', 16),
    favoritesChecked: parseInt('0073', 16),
    wallet: parseInt('0074', 16),
    zoom: parseInt('0075', 16),
    any2any: parseInt('0078', 16),
    markets: parseInt('0079', 16),
    book: parseInt('007a', 16),
    alert: parseInt('007b', 16),
    graf: parseInt('006d', 16),
    list: parseInt('007c', 16),
    manage: parseInt('007d', 16),
    settings: parseInt('007e', 16),
    cards: parseInt('0031', 16),
    '50x50': parseInt('0032', 16),
    youtube: parseInt('0033', 16),
    theme: parseInt('0034', 16),
    logout: parseInt('0035', 16),
    terminal: parseInt('0036', 16),
    lend: parseInt('0037', 16),
    loan: parseInt('0038', 16),
    message: parseInt('0039', 16),
    journal: parseInt('003A', 16),
    new: parseInt('003B', 16),
    home: parseInt('003C', 16),
    transactions: parseInt('003D', 16),
    account: parseInt('003E', 16),
    orders: parseInt('003F', 16),
    sun: parseInt('0022', 16),
    moon: parseInt('0021', 16),
    mail: parseInt('006c', 16),
    'column-one': parseInt('0023', 16),
    'column-two': parseInt('0024', 16),
  }
  static defaultIcons: Record<string, string> = {
    remove: '❌',
    info: 'ℹ️',
    config: '⚙️',
    user: '👤',
    message: '✉️',
    email: '📧',
  }
  static get properties() {
    return {
      status: {type: String},
      error: {type: String},
    }
  }
  @property({type: String, reflect: true}) icon = ''

  render() {
    const code = LitIcon.iconsMap[this.icon]
    if (code) {
      return String.fromCharCode(code)
    }
    if (LitIcon.defaultIcons[this.icon]) {
      return LitIcon.defaultIcons[this.icon]
    }
    return this.icon
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'lit-icon': LitIcon
  }
}
