import {css} from '@ui-wc/utils'
import {WcSpinner} from '@ui-wc/spinner'

import type {BaseButton} from './base.component'

export const getButtonStyles = (Button: typeof BaseButton) => css`
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
  wc-spinner {
    align-self: center;
    height: 60%;
    ${WcSpinner.cssKey('color')}: currentColor;
  }
  :host {
    ${Button.cssKey('color')}: ${Button.cssVar('color')};
    --click-x: 0;
    --click-y: 0;
    --radiant: 5%;
    box-sizing: border-box;
    display: ${Button.cssVar('display')};
    height: ${Button.cssVar('height')};
    position: relative;
  }
  :host([size='small']) #button {
    padding: ${Button.cssVar('small-padding')};
    font-size: ${Button.cssVar('small-font-size')};
    line-height: ${Button.cssVar('small-height')};
  }
  :host #button {
    padding: ${Button.cssVar('padding')};
    font-size: ${Button.cssVar('font-size')};
    line-height: calc(${Button.cssVar('height')} - 2px);
  }
  :host([size='large']) #button {
    padding: ${Button.cssVar('large-padding')};
    font-size: ${Button.cssVar('large-font-size')};
    line-height: ${Button.cssVar('large-height')};
  }

  :host([size='small']) {
    height: ${Button.cssVar('small-height')};
  }
  :host([size='large']) {
    height: ${Button.cssVar('large-height')};
    line-height: ${Button.cssVar('height')};
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
  /* Default & Text */
  :host([variant='default']) #button {
    color: ${Button.cssVar('color')};
    background-color: ${Button.cssVar('background')};
    border: ${Button.cssVar('border')};
  }
  :host([variant='default']) #button:focus {
    color: ${Button.cssVar('color-focus')};
    background-color: ${Button.cssVar('background-focus')};
    outline: ${Button.cssVar('outline-focus')};
  }
  :host([variant='default']) #button[hover] {
    color: ${Button.cssVar('color-hover')};
    border: ${Button.cssVar('border-hover')};
    background-color: ${Button.cssVar('background-hover')};
  }
  :host([variant='default']) #button[pressed] {
    color: ${Button.cssVar('color-pressed')};
    background-color: ${Button.cssVar('background-pressed')};
  }

  /* Text */
  :host([variant='text']) #button {
    color: ${Button.cssVar('color')};
  }
  :host([variant='text']) #button[hover] {
    color: ${Button.cssVar('color-hover')};
  }

  /* Primary */
  :host([variant='primary']) #button {
    color: ${Button.cssVar('primary-color')};
    background: ${Button.cssVar('primary-background')};
    border: ${Button.cssVar('primary-border')};
    ${Button.cssKey('color')}: ${Button.cssVar('primary-background')};
  }
  :host([variant='primary']) #button:focus {
    outline: ${Button.cssVar('primary-outline-focus')};
  }
  :host([variant='primary']) #button[hover] {
    color: ${Button.cssVar('primary-color-hover')};
    background-color: ${Button.cssVar('primary-background-hover')};
  }
  :host([variant='primary']) #button[pressed] {
    background-color: ${Button.cssVar('primary-background-hover')};
  }

  /* Success */
  :host([variant='success']) #button {
    color: ${Button.cssVar('success-color')};
    background: ${Button.cssVar('success-background')};
    border: ${Button.cssVar('success-border')};
    ${Button.cssKey('color')}: ${Button.cssVar('success-color')};
  }
  :host([variant='success']) #button:focus {
    outline: ${Button.cssVar('success-outline-focus')};
  }
  :host([variant='success']) #button[hover] {
    color: ${Button.cssVar('success-color-hover')};
    background-color: ${Button.cssVar('success-background-hover')};
  }
  :host([variant='success']) #button[pressed] {
    /** TODO Pressed style  */
    background-color: ${Button.cssVar('success-background-hover')};
  }

  /* Danger variant*/
  :host([variant='danger']) #button {
    ${Button.cssKey('color')}: ${Button.cssVar('danger-color')};
    background: ${Button.cssVar('danger-background')};
    border: ${Button.cssVar('danger-border')};
    color: ${Button.cssVar('danger-color')};
  }
  :host([variant='danger']) #button:focus {
    outline: ${Button.cssVar('danger-outline-focus')};
  }
  :host([variant='danger']) #button[hover] {
    color: ${Button.cssVar('danger-color-hover')};
    background-color: ${Button.cssVar('danger-background-hover')};
  }
  :host([variant='danger']) #button[pressed] {
    background-color: ${Button.cssVar('danger-background-hover')};
  }

  :host([outline]) #button {
    background-color: transparent;
  }
  @keyframes ripple {
    to {
      transform: translate(-50%, -50%) scale(4);
      opacity: 0;
    }
  }
`
