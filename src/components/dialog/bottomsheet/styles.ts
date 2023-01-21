import {createcssMap} from '@kai/utils'
import {css} from 'lit'

const {getVar, getKey} = createcssMap({
  'nav-padding': '16px 16px 0 16px',
  'blocks-gap': '12px',
  'border-radius': '24px 24px 0 0',
  'box-shadow': '3px -6px 30px rgba(0, 0, 0, 30%)',
  'background-color': '#fff'
}, '--lit-bottomsheet-')

export const bottomsheetCSSVarNames = getKey

export const styles = css`
  :host{
      display: contents;
      --translateY: translateY(0);
  }
  .wrapper{
      background-color: ${getVar('background-color')};
      border-radius: ${getVar('border-radius')};
      bottom: 0;
      box-shadow: ${getVar('box-shadow')};
      box-sizing: border-box;
      contain: content;
      display: grid;
      gap: ${getVar('blocks-gap')};
      grid-template-rows: min-content min-content auto min-content;
      height: calc(90% - 4% * var(--index, 0));
      position: absolute;
      width: 100%;
  }
  .wrapper.fadein{
      animation-duration: 0.3s;
      animation-name: fadein;
      animation-timing-function: ease-in;   
  }
  .wrapper.touching{
      transform: var(--translateY);
  }
  .wrapper.restoring{
      animation-duration: 0.3s;
      animation-name: faderestore;
      animation-timing-function: ease;   
  }
  .wrapper.closing{
      animation-duration: 0.3s;
      animation-name: fadeout;
      animation-timing-function: ease;   
  }
  nav, footer, header, main{
      padding: 0 16px;
  }
  nav{
      padding: ${getVar('nav-padding')}; 
      display: flex;
      justify-content: space-between;
  }
  header{
      font-size: 2rem;
  }
  header > * {
      margin: 0;
  }
  main{
      overflow-x: hidden;
      overflow-y: auto;
  }
  footer{
      padding: 16px;
      box-shadow: 1px -4px 16px rgba(0, 0, 0, 20%);
      border-radius: 24px 24px 0 0;
      --lit-button-border-radius: 16px;
      --lit-button-letter-spacing: 0.5px;
  }
  footer lit-button{
      width: 100%;
      height: 56px;
  }
  footer .error{
      padding: 0 12px 12px 12px;
      display: block;
  }
  .icon{
      cursor: pointer;
      width: 24px;
      height: 24px;
      box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
      padding: 10px;
      border-radius: 30px;
  }
  .icon:hover{
      box-shadow: 1px 1px 5px rgba(0,0,0,0.4);
  }
  .icon-back{
      left: 16px;
  }
  .icon-close{
      right: 16px;
  }
  @keyframes fadein{
      0% {
          transform: translateY(100%);
      }
      100% {
          transform: translateY(0);
      }
  }
  @keyframes faderestore{
      0% {
          transform: var(--translateY);
      }
      100% {
          transform: translateY(0);
      }
  }
  @keyframes fadeout{
      0% {
          transform: var(--translateY);
          box-shadow: 3px -6px 30px rgba(0, 0, 0, 30%);
      }
      30% {
          box-shadow: 3px -6px 30px rgba(0, 0, 0, 0%);
      }
      100% {
          transform: translateY(100%);
          box-shadow: 3px -6px 30px rgba(0, 0, 0, 0%);
      }
  }`