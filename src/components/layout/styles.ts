import {css} from 'lit'

import {makeCSSNameProxy, makeCSSProxy} from '../../helpers/cssproxy'

const layoutCSSVars = {
    gridBackground: {
        name: 'grid-background',
        default: '#eee',
    },
    shadowBackground: {
        name: 'shadow-background',
        default: '#eee',
    },
    padding: {
        name: 'padding',
        default: '3px',
    },
    background: {
        name: 'background',
        default: '#ccc',
    },
}

const _v = makeCSSProxy(layoutCSSVars, '--lit-layout-')

export const layoutCSSValues = _v
export const layoutCSSVarsNames = makeCSSNameProxy(layoutCSSVars, '--lit-layout-')


export const grid = css`
:host{
    display: block;
    width: 100%;
    height: 100%;
}
.wrapper{
    overflow: auto;         
    width: 100%;
    height: 100%;
    position: relative;
    background-color: ${_v.gridBackground};
    
}
.wrapper.move{
    cursor: move;
}
.shadow{
    display: none;
    position: absolute;
    background-color: ${_v.shadowBackground};
    z-index: 0;
    top: 0;
    left: 0;
    opacity: 0.5;
}
.move .shadow{
    transition: ease-out 0.1s;
}
.shadow.show{
    display: block;
}`

export const element = css`
:host{
  display: block;
  box-sizing: border-box;
  width: var(--width, 200px);
  height: var(--height, 200px);
  padding: ${_v.padding};
  position: absolute;
  left: var(--left, 0);
  top: var(--top, 0);
  z-index: var(--z-index, 1);
}
.wrapper{
  background-color: ${_v.background};
  padding: 3px 6px;
  box-sizing: border-box;
  height: 100%;

}

.resize, .move{
  opacity: 0.5;
  font-size: 10px;
}
.move{
  position: absolute;
  right: -4px;
  top: -2px;
  z-index: 10;
  padding: 5px;
  
}
.resize{
  position: absolute;
  right: -3px;
  bottom: -2px;
  transform-origin: center;
  transform: scaleX(-1);
  cursor: nw-resize;
  padding: 5px;
  z-index: 10;
  --icon-font-size: 7px;
}
.move{
  cursor: move;
  padding: 0 4px 0 0;
}
:host(.move),
:host(.resize){
  pointer-events: none;
}`