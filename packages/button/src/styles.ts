import {css} from '@ui-wc/utils'

import type {BaseButton} from './base.component'

export const getButtonStyles = (Button: typeof BaseButton) => css`
  #checkmark {
    display: none;
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
    height: 12.8px;
    width: 12.8px;
    justify-self: center;
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
    line-height: ${Button.cssVar('height')};
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
    font-family: inherit;
    font-weight: ${Button.cssVar('weight')};
    gap: ${Button.cssVar('gap')};
    grid-auto-flow: column;
    height: 100%;
    justify-content: ${Button.cssVar('justify')};
    letter-spacing: ${Button.cssVar('letter-spacing')};

    outline: ${Button.cssVar('outline')};
    overflow: hidden;
    position: relative;
    text-transform: ${Button.cssVar('text-transform')};
    text-decoration: none;
    white-space: nowrap;
    width: 100%;
    contain: content;
  }
  ::slotted([slot='prefix']),
  ::slotted([slot='suffix']) {
    align-self: center;
  }

  /* Default */
  :host([variant='default']) #button {
    color: ${Button.cssVar('color')};
    background-color: ${Button.cssVar('background')};
    border: ${Button.cssVar('border')};
  }
  :host([variant='default']) #button:focus {
    outline: ${Button.cssVar('outline-focus')};
  }
  :host([variant='default'][hover]) #button {
    color: ${Button.cssVar('color-hover')};
    background-color: ${Button.cssVar('background-hover')};
  }
  :host([variant='default'][pressed]) #button {
    background-color: ${Button.cssVar('background-hover')};
  }

  /* Switch */
  :host([variant='switch']) #button {
    color: ${Button.cssVar('switch-color')};
    ${Button.cssKey('color')}: ${Button.cssVar('switch-color')};
  }
  :host([variant='switch']) #button:focus {
    outline: ${Button.cssVar('switch-outline-focus')};
    border: ${Button.cssVar('switch-outline-focus')};
  }
  :host([variant='switch'][switchOn]) #button {
    color: ${Button.cssVar('switch-on-color')};
    ${Button.cssKey('color')}: ${Button.cssVar('switch-on-color')};
    background-color: ${Button.cssVar('switch-on-background')};
  }
  :host([variant='switch'][switchOn]) #button:focus {
    outline: ${Button.cssVar('switch-on-outline-focus')};
    border: ${Button.cssVar('switch-on-outline-focus')};
  }

  /* Text */
  :host([variant='text']) #button,
  :host([variant='text'][hover]) #button {
    border: none;
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
  :host([variant='primary'][hover]) #button {
    color: ${Button.cssVar('primary-color-hover')};
    background-color: ${Button.cssVar('primary-background-hover')};
  }
  :host([variant='primary'][pressed]) #button {
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
  :host([variant='success'][hover]) #button {
    color: ${Button.cssVar('success-color-hover')};
    background-color: ${Button.cssVar('success-background-hover')};
  }
  :host([variant='success'][pressed]) #button {
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
  :host([variant='danger'][hover]) #button {
    color: ${Button.cssVar('danger-color-hover')};
    background-color: ${Button.cssVar('danger-background-hover')};
  }
  :host([variant='danger'][pressed]) #button {
    background-color: ${Button.cssVar('danger-background-hover')};
  }

  :host([outline]) #button {
    background-color: transparent;
  }
`
