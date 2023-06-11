import {pallets} from '@ui-wc/colors'

export const SELECT_PREFIX = '--wc-select-'

export const selectCSSVarsMap = {
  background: 'initial',
  'background-hover': 'initial',
  border: '1px solid #ccc',
  color: 'hsl(264, 65%, 50%)',
  'fullscreen-background': 'hsl(246, 15%, 99%)',
  'fullscreen-color': 'hsl(246, 15%, 99%)',
  'fullscreen-overlay-background': 'rgba(0,0,0,0.6)',
  'fullscreen-shadow': 'rgba(0,0,0,0.3)',
  height: '30px',
  'listbox-border': '1px solid #eee',
  'listbox-height': 'initial',
  'listbox-max-height': '300px',
  'listbox-shadow': 'rgba(0,0,0,0.07)',
  'mobile-height': '40px',
  'option-background': pallets.neutral[100],
  'option-background-selected': pallets.primary[400],
  'option-background-hover': pallets.primary[200],
  'option-circle-color': pallets.primary[500],
  'option-color': '#333',
  'option-ripple': 'hsl(264, 65%, 60%)',
  'outline-focus': '1px solid hsl(264, 65%, 70%)',
  padding: '0 14px',
  ripple: 'initial',
}
