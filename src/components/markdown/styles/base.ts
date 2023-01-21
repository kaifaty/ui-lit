import {createcssMap} from '@kai/utils'
import {css} from 'lit'

const PREFIX = '--lit-markdown-'


const {getVar, getKey} = createcssMap({
  
  'border-muted': 'hsl(300, 20%, 14%)',
  'border-default': 'hsl(300, 20%, 19%)',

  'color': 'hsl(0, 3%, 80%)',
  'color-muted': '#444',
  'color-link': '#58a6ff',
  'color-lang': 'hsl(0, 23%, 68%)',
  'color-line-counter': 'hsl(0, 3%, 30%)',
  'color-blockquote': '#a2799c',

  'background': 'hsl(306, 15%, 7%)',
  'background-code': 'hsl(306, 15%, 5%)',
  'background-color-subtle': 'hsl(300, 20%, 7%)',
  
  'box-shadow': 'rgba(0, 0, 0, 0.2)',
}, PREFIX)

export const markdownCssVarNames = getKey

export const base = css`

:host{
  font-size: 16px;
  display: block;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
}
.line-counter{
  color: ${getVar('color-line-counter')};
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
  margin-right: 20px;
}
.lang-name{
  position: absolute;
  right: 8px;
  top: 4px;
  color: ${getVar('color-lang')};
}
.code{
  line-height: 1.3;
  position: relative;
  padding: 10px;
  border-radius: 5px;
  display: block;
  background-color:  ${getVar('background')};
  color: ${getVar('color')};
  box-shadow: 2px 2px 4px ${getVar('box-shadow')};
}

a {
  color: ${getVar('color-link')};
  text-decoration: none;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  cursor: text;
  position: relative;
}

h1:first-child, h2:first-child, h3:first-child{
  margin-top: 0 !important;
  word-wrap: break-word;
}
h1:hover a.anchor, h2:hover a.anchor, h3:hover a.anchor, h4:hover a.anchor, h5:hover a.anchor, h6:hover a.anchor {
  text-decoration: none;
}
h1 {
  padding-bottom: .3em;
  font-size: 2em;
  border-bottom: 1px solid ${getVar('border-muted')};
}

h2 {
  padding-bottom: .3em;
  font-size: 1.5em;
  border-bottom: 1px solid ${getVar('border-muted')};
}

h3 {
  font-size: 1.25em;
}

h4 {
  font-size: 1em;
}

h5 {
  font-size: .875em;
}

h6 {
  font-size: .85em;
  color: ${getVar('color-muted')}
}

p, blockquote, ul, ol, dl, li, table, pre {
  margin: 15px 0;
}

hr {
  border: 0 none;
  height: 4px;
  padding: 0;
}

ul, ol {
  padding-left: 30px;
}

ul :first-child, ol :first-child {
  margin-top: 0;
}

ul :last-child, ol :last-child {
  margin-bottom: 0;
}

dl {
  padding: 0;
}

dl dt {
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
  padding: 0;
  margin: 15px 0 5px;
}

dl dt:first-child {
  padding: 0;
}

dl dt > :first-child {
  margin-top: 0;
}

dl dt > :last-child {
  margin-bottom: 0;
}

dl dd {
  margin: 0 0 15px;
  padding: 0 15px;
}

dl dd > :first-child {
  margin-top: 0;
}

dl dd > :last-child {
  margin-bottom: 0;
}

blockquote {
  padding: 0 1em;
  color: getVar('color-muted');
  border-left: .25em solid ${getVar('color-blockquote')};
}

blockquote > :first-child {
  margin-top: 0;
}

blockquote > :last-child {
  margin-bottom: 0;
}

table {
  overflow: auto;
  border-collapse: collapse;
  border-spacing: 0;
}


table td, table th {
  word-wrap: break-word;
  text-align: left;
  padding: 6px 13px;
  border: 1px solid ${getVar('border-default')};
}

table tr:nth-child(2n) {
  background-color: ${getVar('background-color-subtle')};
}

table tr th :first-child, table tr td :first-child {
  margin-top: 0;
}

table tr th :last-child, table tr td :last-child {
  margin-bottom: 0;
}

img {
  max-width: 100%;
}

code, tt {
  display: inline-block;
  padding: 3px 6px;
  border-radius: 12px;
  background-color: ${getVar('background-code')};
  margin: 0 2px;
}
`