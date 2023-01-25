import {createcssMap} from '../create-css-map.js'
import {css} from './css-stylesheet.js'

export const INPUT_PREFIX = '--lit-input-'
export const inputCSSVar = {
  display: 'inline-block',
  height: 'initial',
  color: 'inherit',
  background: '#fff',
  'border-radius': '3px',
  'font-size': 'inherit',
  padding: '6px 8p',
  border: '1px solid hsla(222, 20%, 60%, 0.5)',
  align: 'initial',
  'outline-focus': '1px solid  hsla(222, 20%, 60%, 0.5)',
  'error-border': '1px solid hsl(5, 66%, 55%)',
  'error-outline': '1px solid hsl(5, 66%, 55%)',
}

const {getVar} = createcssMap(inputCSSVar, INPUT_PREFIX)

export const input = css`
  :host {
    display: ${getVar('display')};
    height: ${getVar('height')};
  }
  .wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .icon {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
  }
  input,
  textarea {
    height: 100%;
    width: 100%;
    font-size: ${getVar('font-size')};
    box-sizing: border-box;
    padding: ${getVar('padding')};
    border: ${getVar('border')};
    text-align: ${getVar('align')};
    background: ${getVar('background')};
    color: ${getVar('color')};
    font-family: inherit;
    border-radius: ${getVar('border-radius')};
  }

  input::-webkit-calendar-picker-indicator {
    display: none;
  }

  input[type='date']::-webkit-inner-spin-button,
  input[type='date']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input:focus,
  textarea:focus {
    outline: ${getVar('outline-focus')};
  }
  input:focus::-webkit-input-placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  input:focus::-moz-placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  input:focus:-moz-placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  input:focus:-ms-input-placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0 30px white inset;
  }

  :host([invalid]) input {
    border: ${getVar('error-border')};
  }
  :host([invalid]) input:focus {
    outline: ${getVar('error-outline')};
  }

  textarea:focus::-webkit-input-placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  textarea:focus::-moz-placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  textarea:focus:-moz-placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  textarea:focus:-ms-input-placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`
