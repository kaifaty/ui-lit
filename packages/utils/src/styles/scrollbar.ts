import {createcssMap} from '../create-css-map.js'
import {css} from './css-stylesheet.js'

const {getVar, getKey} = createcssMap(
  {
    'size-webkit': '5px',
    'thumb-webkit': '#333',
    'track-webkit': '#f1f1f1',
    'color-ff': '#333 #f1f1f1',
  },
  '--lit-scroll-',
)

export const scrollbarCSSVarNames = getKey

/**
 * @cssprop [--lit-scroll-size-webkit=5px]
 * @cssprop [--lit-scroll-thumb-webkit=#333]
 * @cssprop [--lit-scroll-track-webkit=#f1f1f1]
 * @cssprop [--lit-scroll-color-ff=#333 #f1f1f1]
 */

export const scrollbar = css`
  ::-webkit-scrollbar {
    width: ${getVar('size-webkit')};
    height: ${getVar('size-webkit')};
  }
  ::-webkit-scrollbar-track {
    background: ${getVar('track-webkit')};
  }
  ::-webkit-scrollbar-thumb {
    background: ${getVar('thumb-webkit')};
  }
  .ff-scrollbar {
    scrollbar-color: ${getVar('color-ff')};
    scrollbar-width: thin;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
  ::-webkit-resizer {
    background: transparent;
  }
`
