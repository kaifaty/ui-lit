import {definable, withProps, withControllers, createGetParams, focusable, stylable} from '@ui-wc/utils'

import type {LinkTarget} from '@ui-wc/link'
import {buttonCCSVarsMap, BUTTON_PREFIX} from './styles.map'
import {getButton} from './utils'
import {ButtonSize, ButtonType, ButtonVariant, ButtonProps} from './types'


const withReflect = createGetParams({
  reflect: true,
  attribute: true,
})
const getParams = createGetParams({
  attribute: true,
})

const loading = getParams('loading', false)
const disabled = getParams('disabled', false)
const pressed = getParams('pressed', false, {
  set(target, _, value) {
    const variant = target.getAttribute('variant')
    return true
  },
})
const notificable = getParams('notificable', false)
const tabIndex = getParams('tabIndex', 0, {
  set(target, _, value) {
    getButton(target).then((button) => button.setAttribute('tabIndex', value.toString()))
    return true
  },
})
const href = getParams<string | null>('href', null, {
  set(target, _, value) {
    getButton(target).then((button) => {
      if (value) {
        button.setAttribute('href', value)
      } else {
        button.removeAttribute('href')
      }
    })
    return true
  },
})
const target = getParams<LinkTarget>('target', '_self', {
  set(target, _, value) {
    getButton(target).then((button) => {
      button.setAttribute('target', value)
    })
    return true
  },
})
const type = getParams<ButtonType>('type', 'button')
const size = getParams<ButtonSize>('size', 'medium')

const variant = withReflect<ButtonVariant>('variant', 'default')

const withoutProps = withControllers(focusable(stylable(definable(HTMLElement), buttonCCSVarsMap, BUTTON_PREFIX)))

export const BaseButton = withProps<ButtonProps, typeof withoutProps>(withoutProps, [
  variant,
  loading,
  tabIndex,
  notificable,
  pressed,
  href,
  target,
  type,
  disabled,
  size,
])
