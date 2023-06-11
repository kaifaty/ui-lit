import {pallets} from '@ui-wc/colors'

export const BUTTON_PREFIX = '--wc-button-'

const primary = pallets.primary
const primary20 = pallets.primary20
const primary40 = pallets.primary40
const neutral = pallets.neutral

export const buttonCCSVarsMap = {
  display: ['inline-flex', 'default display position of button'],

  color: neutral['900'],
  'color-hover': neutral['700'],
  'color-focus': neutral['700'],
  'color-pressed': neutral['700'],
  background: 'initial',
  'background-focus': primary40['100'],
  'background-hover': primary40['100'],
  'background-pressed': primary20['200'],
  ripple: pallets.primary20['900'],
  border: `1px solid ${neutral[400]}`,
  'border-hover': `1px solid ${primary['600']}`,
  'outline-focus': `2px solid ${primary['600']}`,
  outline: 'none',
  'outline-offset': '1px',

  'primary-color': [neutral['100'], 'Primary text color'],
  'primary-color-hover': [neutral['100'], 'Primary text color'],
  'primary-background': primary['800'],
  'primary-background-hover': primary['700'],
  'primary-ripple': primary['900'],
  'primary-border': `1px solid transparent`,
  'primary-outline-focus': `2px solid ${pallets.primary['700']}`,

  'success-color': 'hsl(110, 80%, 4%)',
  'success-color-hover': 'hsl(110, 80%, 8%)',
  'success-background': 'hsl(110, 80%, 55%)',
  'success-background-hover': 'hsl(110, 80%, 60%)',
  'success-ripple': 'hsl(110, 80%, 65%)',
  'success-border': '1px solid hsl(110, 80%, 55%)',
  'success-outline-focus': '2px solid hsl(110, 80%, 35%)',

  'danger-color': 'hsl(5, 80%, 92%)',
  'danger-color-hover': 'hsl(5, 80%, 98%)',
  'danger-background': 'hsl(5, 80%, 55%)',
  'danger-background-hover': 'hsl(5, 80%, 60%)',
  'danger-border': '1px solid hsl(5, 80%, 55%)',
  'danger-outline-focus': '2px solid hsl(5, 80%, 35%)',
  'danger-ripple': 'hsl(5, 80%, 65%)',

  'border-radius': '3px',

  'font-size': ['1rem', 'Medium size fontsize'],
  height: ['40px', 'Medium size height'],
  gap: '10px',

  justify: 'center',

  'small-font-size': ['inherit', 'Small size font-size'],
  'small-height': ['32px', 'Small size height'],
  'small-padding': ['0 6px', 'Small size padding'],

  'large-font-size': 'inherit',
  'large-height': '48px',
  'large-padding': '0 20px',

  'text-transform': 'normal',
  'letter-spacing': 'normal',

  padding: ['0 16px', 'Medium size padding'],

  'font-family': `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol'`,
  'font-weight': '500',
} as const
