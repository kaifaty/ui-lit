import type {LinkTarget} from '@ui-wc/link'

export type ButtonType = 'submit' | 'button' | 'close'
export type ButtonVariant = 'text' | 'primary' | 'danger' | 'success' | 'default'
export type ButtonSize = 'small' | 'medium' | 'large'

export type ButtonProps = {
  loading: boolean
  disabled: boolean
  pressed: boolean
  notificable: boolean
  tabIndex: number
  href: string
  variant: ButtonVariant
  target: LinkTarget
  type: ButtonType
  size: ButtonSize
}
