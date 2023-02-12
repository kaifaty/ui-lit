export const CHECKBOX_PREFIX = '--wc-checkbox-'

export const checkboxCCSVarsMap = {
  'checkbox-background': ['#fff', 'Background color of checkbox'],
  'checkbox-border': ['1px solid #999', 'Border of checkbox'],
  'checkmark-color': ['hsl(100, 65%, 5%)', 'Checkmark color'],
  'checkmark-shadow-hover': '0 0 2px #999',
  'switcher-control-background': '#fff',
  'switcher-control-shadow': '1px 1px 2px rgba(0,0,0,0.6)',
  'switcher-off-background': ['hsl(0, 65%, 50%)', 'Disabled switcher color'],
  'switcher-on-background': ['hsl(110, 65%, 50%)', 'Enabled switcher color'],
  'switcher-shadow': ['inset 1px 1px 2px rgba(0,0,0,0.7)', 'Shadow of switcher circle'],
} as const
