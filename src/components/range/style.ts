import {css} from 'lit'

import {makeCSSNameProxy, makeCSSProxy} from '../../helpers/cssproxy'

const defaultFilled = 'hsl(264, 100%, 60%)'

export const RangeCSSVars = {
    size: {
        name: 'thumb-size',
        default: '16px'
    },
    outlineFocus: {
        name: 'outline-focus',
        default: '1px dashed rgba(0,0,0,0.5)'
    },
    
    trackBackground: {
        name: 'track-background',
        default: '#eee'
    },
    trackBackgroundHover: {
        name: 'track-background-hover',
        default: '#ddd'
    },
    trackOutline: {
        name: 'track-outline',
        default: '1px solid #999'
    },


    thumbBackground: {
        name: 'thumb-background',
        default: 'hsl(264, 10%, 40%)' 
    },
    thumbBackgroundHover: {
        name: 'thumb-background-hover',
        default: 'hsl(264, 10%, 20%)'
    },
    thumbBackgroundPressed: {
        name: 'thumb-background-pressed',
        default: defaultFilled
    },
    thumbOutline: {
        name: 'thumb-outline',
        default: '2px solid  hsl(264, 100%, 99%)'
    },
    thumbOutlineFullfiled: {
        name: 'thumb-fillfiled-outline',
        default: 'var(thumb-outline, 2px solid  hsl(264, 100%, 99%))'
    },
    thumbShadow: {
        name: 'thumb-shadow',
        default: '0 1px 3px hsl(264, 100%, 20%)'
    },
    pointBackground: {
        name: 'points-background',
        default: '#bbb'
    },
    filled: {
        name: 'filled',
        default: defaultFilled
    },
    filledHover: {
        name: 'filled-hover',
        default: 'hsl(264, 100%, 50%)'
    },
}

const _v = makeCSSProxy(RangeCSSVars, '--lit-range-')

export const rangeCSSNames = makeCSSNameProxy(RangeCSSVars, '--lit-range-')


export const cssState = {
    size: 16,
    padding: 12,
    pointer: 8,
    pointerBorder: 2,
    topMargin: 8,
    tumbBorderSize: 2,
    get poinerWidth(){
        return this.pointer + this.pointerBorder
    },
    get toMiddle(){
        return (this.size - this.pointer) / 2 
    },
}


export const rangeStyles = css`
:host{
    display: inline-block;
    --size: ${_v.size};
    --pointer: ${cssState.pointer}px;
    --pointer-border: ${cssState.pointerBorder}px;
    --line-height: 4px;
    --top-margin: ${cssState.topMargin}px;
    --padding: ${cssState.padding}px;
    --poiner-width: calc(var(--pointer) + var(--pointer-border));
    --to-middle: calc((var(--size) - var(--pointer)) / 2);
    --default-filled: hsl(264, 100%, 60%);
    --percent: 0;
    --thumb-border-size: ${cssState.tumbBorderSize};
    
    padding: 1px;
    box-sizing: border-box;
    contain: content;

}
:host([showPercent]) .wrapper{
    padding-bottom: 17px;
}
.wrapper:focus{
    outline: ${_v.outlineFocus};
}

.wrapper{
    min-width: 100px;
    position: relative;
    box-sizing: border-box;
    padding: 5px var(--padding);
    box-sizing: border-box;
}
.percent{
    opacity: 1;
    text-align: center;
    left: 0;
    position: absolute;
    text-align: center;
    transform-origin: center;
    font-size: 12px;
    will-change: transform;
    bottom: 0;
    left: calc(var(--size) / 2 * -1 + 4px);
}
.percent.hidden{
    opacity: 0;
}
.track{
    display: flex;
    position: relative;
    width: 100%;
    border-radius: 5px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
}
:host([hover]) .track-line{
    background: linear-gradient(to right, ${_v.filledHover} var(--percent), ${_v.trackBackgroundHover} var(--percent));
}
.track-line{
    width: 100%;
    height: var(--line-height);
    margin: var(--top-margin) auto;
    border-radius: 5px;
    outline: ${_v.trackOutline};
    background: linear-gradient(to right, ${_v.filled} var(--percent), ${_v.trackBackground} var(--percent));
}
.thumb-wrapper{
    position: absolute;
    z-index: 3;
    left: calc(var(--size) / 2 * -1);
    top: calc(var(--top-margin) - var(--size) / 2 + var(--line-height) / 2 - var(--thumb-border-size));
    width: var(--size, 14px);
    height: var(--size, 14px);
}

.thumb.fullfiled{
    background-color: ${_v.filled};
    border: ${_v.thumbOutlineFullfiled};
}


:host([hover]) .thumb{
    background-color: ${_v.thumbBackgroundHover};
}
:host([pressed]) .thumb{      
    background-color:  ${_v.thumbBackgroundPressed};
}
.thumb{
    border-radius: 100%;
    width: 100%;
    height: 100%;
    background-color: ${_v.thumbBackground};
    border: ${_v.thumbOutline};
    box-shadow: ${_v.thumbShadow};    
}

.point{
    position: absolute;
    top: calc(var(--top-margin) - var(--pointer) / 2 + var(--line-height) / 2 - var(--pointer-border));
    width: var(--pointer);
    height: var(--pointer);
    border-radius: var(--pointer);
    background-color: ${_v.pointBackground};
    border: var(--pointer-border) solid ${_v.trackBackground};
    transform: translate(-50%, 0);
    z-index: 1;
}
.point.filled{
    border: var(--pointer-border) solid ${_v.filled};
    background-color: ${_v.filled};
}
:host([hover]) .point.filled{
    border: var(--pointer-border) solid ${_v.filledHover};
    background-color: ${_v.filledHover};
}
:host([hover]) .point:not(.filled){
    border: var(--pointer-border) solid ${_v.trackBackgroundHover};
}
`