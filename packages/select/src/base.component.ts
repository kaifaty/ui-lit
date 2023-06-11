import {definable, withProps, AccessorParam, FormAssociated, labled, stylable} from '@ui-wc/utils'
import {SELECT_PREFIX, selectCSSVarsMap} from './styles.map'
import type {WcSelect} from './select.component'
export type TListboxPosition = 'auto' | 'top'

type ComponentProps = {
  value: string
  multiple: boolean
  searchable: boolean
  searchPlaceholder: string
  listboxPosition: TListboxPosition
}

const multiple: AccessorParam<boolean> = {
  defaultValue: false,
  name: 'multiple',
  options: {attribute: true, reflect: true},
}

const value: AccessorParam<string | string[]> = {
  defaultValue: '',
  name: 'value',
  options: {
    attribute: true,
    reflect: true,
  },
  set(target, old, value) {
    const t = target as WcSelect
    if (old === value) {
      return false
    }

    const slot = target.shadowRoot.querySelector<HTMLElement>('slot[name="select"]')

    if (t.multiple) {
    } else {
      const option = target.querySelector(`wc-option[value="${value}"]`)
      if (slot) {
        slot.innerHTML = option.innerHTML
      }
      // Update selected option
      target.querySelectorAll(`wc-option`).forEach((node) => {
        const same = node.value === value
        const hasSelected = node.hasAttribute('selected')

        if (same && hasSelected) {
          node.selected = true
        } else if (!same && hasSelected) {
          node.selected = false
        }
      })
    }

    if (t.open) {
      queueMicrotask(() => document.querySelector('wc-listbox')?.updateValue(t))
    }

    return true
  },
}

const Base = labled(stylable(definable(FormAssociated), selectCSSVarsMap, SELECT_PREFIX))
export const PropsedBase = withProps<ComponentProps, typeof Base>(Base, [multiple, value])
