import {createcssMap} from '@kai/utils'
import {css} from 'lit'

const {getVar, getKey} = createcssMap({
  'header-color': '#fefefe',
  'header-background': '#111',
  'header-padding': '10px 20px',
  'header-font-size': '1.5rem',

  'background': '#fff',
  'min-height': '200px',
  'max-height': '100%',
  'height': 'min-content',
  
  'min-width': '280px',
  'max-width': 'min(600px, 90%)',
  'width': '100%',

  'footer-padding': '0 10px 10px 10px',
  'main-padding': '10px 20px',

  'border-radius': '5px',
  'box-shadow': '1px 1px 16px rgba(0,0,0,0.4)',
  'icon-color': '#888',
}, '--lit-modal-')


export const modalCSSVarNames = getKey

export const styles = css`
:host{
    display: contents;
}
.wrapper{
    align-self: center;
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    animation-name: appear;
    animation-timing-function: ease-in;
    border-radius: ${getVar('border-radius')};
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 100%;
    height: ${getVar('height')};
    left: 50%;
    max-height: ${getVar('max-height')};
    max-width:${getVar('max-width')};
    min-height: ${getVar('min-height')};
    min-width: ${getVar('min-width')};
    overflow: hidden;
    position: absolute;
    top: 50%;
    transform: translateX(-50%);
    width: ${getVar('width')};
}
:host([atTop]){
    box-shadow: ${getVar('box-shadow')};
}
.wrapper.closing{
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
    animation-name: disappear;
    animation-timing-function: ease;
}
.content{
    display: flex;
    flex-direction: column;
}
.icon-fill{
    fill: ${getVar('icon-color')};
}
.icon-stroke{
    stroke: ${getVar('icon-color')};
}
.icon{
    cursor: pointer;
    height: 19px;
    padding: 10px 5px;
    width: 19px;
}
.icons-wrapper{
    align-items: center;
    display: flex;
    height: 30px;
    padding: 3px 4px;
    position: absolute;
    right: 0;
    top: 2px;
}
header{
    background-color: ${getVar('header-background')};
    color: ${getVar('header-color')};
    font-size: ${getVar('header-font-size')};
    padding: ${getVar('header-padding')};
}
header lit-header{
    margin: 0;
}
main{
    background: ${getVar('background')};
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    padding: ${getVar('main-padding')};
}
footer{
    background: ${getVar('background')};
    padding: ${getVar('footer-padding')};
}
footer .error{
    padding-bottom: 12px;
}
footer .footer-content{
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
}
lit-text{
    display: block;
}
@keyframes appear{
    0% {
        transform: translateX(-50%) translateY(-50%) scale(0);
    }
    100% {
        transform: translateX(-50%) translateY(-50%) scale(1);
    }
}
@keyframes disappear{
    0% {
        transform: translateX(-50%) translateY(-50%) scale(1);
    }
    100% {
        transform: translateX(-50%) translateY(-50%) scale(0);
    }
}

`