import {css} from '@ui-wc/utils'
import {WcSpinner} from '@ui-wc/spinner'

import type {BaseButton} from './base.component'
import type {ButtonVariant, ButtonSize} from './types'

type ColorStyles = Extract<ButtonVariant, 'danger' | 'success' | 'primary' | 'default'>

const variantStyles = (Button: typeof BaseButton, color: ColorStyles) => {
  const preffix = (color !== 'default' ? color + '-' : '') as `${Exclude<ColorStyles, 'default'>}-` | ''
  return css`
    :host([variant='${color}']) #button {
      ${Button.cssKey('color')}: currentColor;
      background: ${Button.cssVar(`${preffix}background`)};
      border: ${Button.cssVar(`${preffix}border`)};
      color: ${Button.cssVar(`${preffix}color`)};
    }
    :host([variant='${color}']) #button:focus {
      color: ${Button.cssVar(`${preffix}color-focus`)};
      background-color: ${Button.cssVar(`${preffix}background-focus`)};
      outline: ${Button.cssVar(`${preffix}outline-focus`)};
    }
    :host([variant='${color}']) #button[hover] {
      color: ${Button.cssVar(`${preffix}color-hover`)};
      border: ${Button.cssVar(`${preffix}border-hover`)};
      background-color: ${Button.cssVar(`${preffix}background-hover`)};
    }
    :host([variant='${color}']) #button[pressed] {
      color: ${Button.cssVar(`${preffix}color-pressed`)};
      background-color: ${Button.cssVar(`${preffix}background-pressed`)};
    }
  `
}

const sizeStyles = (Button: typeof BaseButton, size: ButtonSize) => {
  return css`
    :host([size='${size}']) #button {
      padding: ${Button.cssVar(`${size}-padding`)};
      font-size: ${Button.cssVar(`${size}-font-size`)};
      line-height: ${Button.cssVar(`${size}-height`)};
      height: ${Button.cssVar(`${size}-height`)};
    }
  `
}

//todo TEXT variant

export const getButtonStyles = (Button: typeof BaseButton) => [
  variantStyles(Button, 'success'),
  variantStyles(Button, 'danger'),
  variantStyles(Button, 'primary'),
  variantStyles(Button, 'default'),
  sizeStyles(Button, 'small'),
  sizeStyles(Button, 'medium'),
  sizeStyles(Button, 'large'),
  css`
    /* Text */
    :host([variant='text']) #button {
      color: ${Button.cssVar('color')};
    }
    :host([variant='text']) #button[hover] {
      color: ${Button.cssVar('color-hover')};
    }
    #checkmark {
      display: none;
      align-self: center;
    }
    #button[checkmark] {
      width: var(--width);
    }
    #button[checkmark] #checkmark {
      display: block;
    }
    #button[checkmark] :not(#checkmark) {
      display: none;
    }
    :host {
      ${Button.cssKey('color')}: ${Button.cssVar('color')};
      --click-x: 0;
      --click-y: 0;
      --radiant: 5%;
      box-sizing: border-box;
      display: ${Button.cssVar('display')};
      position: relative;
    }

    :host([disabled]),
    :host([loading]) {
      pointer-events: none;
    }
    :host([loading]) #button {
      cursor: 'wait';
    }
    :host([disabled]) #button {
      cursor: 'not-allowed';
    }

    :host([disabled]) #button {
      opacity: 0.4;
    }
    :host(:not([loading])) #spinner {
      display: none;
    }

    #button {
      -webkit-appearance: none;
      -webkit-tap-highlight-color: transparent;
      border-radius: ${Button.cssVar('border-radius')};
      box-sizing: border-box;
      cursor: pointer;
      display: grid;
      align-items: center;
      font-family: ${Button.cssVar('font-family')};
      font-weight: ${Button.cssVar('font-weight')};
      gap: ${Button.cssVar('gap')};
      grid-auto-flow: column;
      height: 100%;
      justify-content: ${Button.cssVar('justify')};
      letter-spacing: ${Button.cssVar('letter-spacing')};

      border: none;
      outline: ${Button.cssVar('outline')};
      outline-offset: ${Button.cssVar('outline-offset')};
      overflow: hidden;
      position: relative;
      text-transform: ${Button.cssVar('text-transform')};
      text-decoration: none;
      white-space: nowrap;
      width: 100%;
      contain: content;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    #button::before {
      position: absolute;
      z-index: 1;
      content: '';
      top: var(--click-y);
      left: var(--click-x);
      background-color: ${Button.cssVar('ripple')};
      width: 100%;
      min-height: 100%;
      aspect-ratio: 1 / 1;
      transform-origin: center;
      transform: translate(-50%, -50%) scale(0);
      border-radius: 50%;
    }
    #button[pressed]::before {
      animation-duration: 0.5s;
      animation-name: ripple;
      animation-timing-function: ease-out;
    }
    ::slotted([slot='prefix']),
    ::slotted([slot='suffix']) {
      align-self: center;
    }

    :host([outline]) #button {
      background-color: transparent;
    }

    wc-spinner {
      align-self: center;
      height: 60%;
      ${WcSpinner.cssKey('color')}: currentColor;
    }
    @keyframes ripple {
      to {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
      }
    }
  `,
]
