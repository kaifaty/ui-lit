import {css, AccessorParam, withProps, definable, stylable} from '@ui-wc/utils'

import {iconCSSVarMap, ICON_PREFIX} from './style.map'

import {IconKeys, IconsMap} from './svg-map'

const load = Symbol()
const icon: AccessorParam<IconKeys> = {
  name: 'icon',
  defaultValue: '',
  set(target, old, value) {
    if (value === old) {
      return false
    }
    ;(target as WcIcon)[load](value)
    return true
  },
  options: {
    attribute: true,
    reflect: true,
  },
}

const Basic = stylable(definable(HTMLElement), iconCSSVarMap, ICON_PREFIX)
const Base = withProps<{icon: IconKeys}, typeof Basic>(Basic, [icon])

/**
 * @element - wc-icon
 *
 * @attr {"" | "cancel" | "dropdown" | "search" | "checkmark"} [icon=''] - selected icon
 */
export class WcIcon extends Base {
  static styles = [
    css`
      :host {
        display: inline-block;
        font-weight: normal;
        direction: ltr;
        width: 16px;
        height: 16px;
      }
      svg {
        display: block;
        width: 100%;
        height: 100%;
        fill: ${WcIcon.cssVar('color')};
      }
      :host([opened]) .dropdown {
        transform: rotate(180deg);
      }

      :host([danger]) svg,
      :host([error]) svg {
        fill: ${WcIcon.cssVar('negative-color')};
      }
      :host([success]) svg {
        fill: ${WcIcon.cssVar('positive-color')};
      }

      /* TODO добавить рефлеты на значения */
      .dropdown {
        transform-origin: center;
        transition: transform 0.3s ease;
      }
      :host([icon='back']),
      :host([icon='arrow-left']) {
        transform-origin: center;
        transform: rotate(90deg);
      }
    `,
  ];

  [load](value: IconKeys) {
    if (!value) {
      return Promise.resolve('')
    }
    return fetch(IconsMap[value])
      .then((r) => r.text())
      .then((r) => {
        this.shadowRoot.innerHTML = r
      })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-icon': WcIcon
  }
}
