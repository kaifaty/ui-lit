export const BUTTON_PREFIX = '--wc-button-'

const getDefaultColor = (diffL = 0, diffS = 0) => {
  const baseL = 56
  const baseS = 90
  return `hsl(264, ${baseS + diffS}%, ${baseL + diffL}%)`
}

export const buttonCCSVarsMap = {
  display: ['inline-flex', 'default display position of button'],

  'primary-color': ['hsl(264, 80%, 96%)', 'Primary text color'],
  'primary-color-hover': ['hsl(264, 80%, 100%)', 'Primary text color'],
  'primary-background': getDefaultColor(0, -10),
  'primary-background-hover': getDefaultColor(6, -10),
  'primary-ripple': getDefaultColor(10, -10),
  'primary-border': `1px solid ${getDefaultColor(0, -10)}`,
  'primary-outline-focus': `1px solid ${getDefaultColor(35, -10)}`,

  'success-color': 'hsl(110, 80%, 4%)',
  'success-color-hover': 'hsl(110, 80%, 8%)',
  'success-background': 'hsl(110, 80%, 55%)',
  'success-background-hover': 'hsl(110, 80%, 60%)',
  'success-ripple': 'hsl(110, 80%, 65%)',
  'success-border': '1px solid hsl(110, 80%, 55%)',
  'success-outline-focus': '1px solid hsl(110, 80%, 35%)',

  'danger-color': 'hsl(5, 80%, 92%)',
  'danger-color-hover': 'hsl(5, 80%, 98%)',
  'danger-background': 'hsl(5, 80%, 55%)',
  'danger-background-hover': 'hsl(5, 80%, 60%)',
  'danger-border': '1px solid hsl(5, 80%, 55%)',
  'danger-outline-focus': '1px solid hsl(5, 80%, 35%)',
  'danger-ripple': 'hsl(5, 80%, 65%)',

  color: getDefaultColor(15),
  'color-hover': getDefaultColor(-10, -15),
  background: 'initial',
  'background-focus': getDefaultColor(2),
  'background-hover': getDefaultColor(40, 50),
  border: '1px solid hsl(264, 50%, 85%)',
  ripple: 'hsl(264, 100%, 88%)',
  outline: 'none',
  'outline-focus': `1px solid ${getDefaultColor(35, -10)}`,

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

  'switch-color': getDefaultColor(),
  'switch-on-background': getDefaultColor(5, -10),
  'switch-on-color': getDefaultColor(44, -10),
  'switch-on-outline-focus': `1px solid ${getDefaultColor(-5, -10)}`,
  'switch-outline-focus': `1px solid ${getDefaultColor(-5, -10)}`,
  weight: '600',
} as const
