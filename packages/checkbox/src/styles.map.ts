import {pallets} from '@ui-wc/colors'

export const CHECKBOX_PREFIX = '--wc-checkbox-'

export const checkboxCCSVarsMap = {
  'checkbox-background': ['#fff', 'Background color of checkbox'],
  'checkbox-border': ['1px solid ' + pallets.neutral['700'], 'Border of checkbox'],
  'checkmark-color': [pallets.neutral['700'], 'Checkmark color'],
  'checkmark-shadow-hover': '0 0 2px ' + pallets.neutral['700'],
  'switcher-control-background': '#fff',
  'switcher-control-shadow': '1px 1px 2px rgba(0,0,0,0.6)',
  'switcher-off-background': [pallets.danger['500'], 'Disabled switcher color'],
  'switcher-on-background': [pallets.success['500'], 'Enabled switcher color'],
  'switcher-shadow': ['inset 1px 1px 2px rgba(0,0,0,0.7)', 'Shadow of switcher circle'],
} as const
