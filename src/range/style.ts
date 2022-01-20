import { css } from 'lit';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';

const defaultFilled = "hsl(264, 100%, 60%)";

export const RangeCSSVars = {
    size: {
        name: "--lit-range-thumb-size",
        default: "16px"
    },
    outlineFocus: {
        name: "--lit-range-outline-focus",
        default: "1px dashed rgba(0,0,0,0.5)"
    },
    
    trackBackground: {
        name: "--lit-range-track-background",
        default: "#eee"
    },
    trackBackgroundHover: {
        name: "--lit-range-track-background-hover",
        default: "#ddd"
    },
    trackOutline: {
        name: "--lit-range-track-outline",
        default: "1px solid #999"
    },


    thumbBackground: {
        name: "--lit-range-thumb-background",
        default: "hsl(264, 10%, 40%)" 
    },
    thumbBackgroundHover: {
        name: "--lit-range-thumb-background-hover",
        default: "hsl(264, 10%, 20%)"
    },
    thumbBackgroundPressed: {
        name: "--lit-range-thumb-background-pressed",
        default: defaultFilled
    },
    thumbOutline: {
        name: "--lit-range-thumb-outline",
        default: "2px solid  hsl(264, 100%, 99%)"
    },
    thumbOutlineFullfiled: {
        name: "--lit-range-thumb-fillfiled-outline",
        default: "var(--lit-range-thumb-outline, 2px solid  hsl(264, 100%, 99%))"
    },
    thumbShadow: {
        name: "--lit-range-thumb-shadow",
        default: "0 1px 3px hsl(264, 100%, 20%)"
    },
    pointBackground: {
        name: "--lit-range-points-background",
        default: "#eee"
    },
    pointOutlineColor: {
        name: "--lit-range-points-outline-color",
        default: "hsl(264, 100%, 80%)"
    },

    pointOutlineColorHover: {
        name: "--lit-range-points-outline-color-hover",
        default: "hsl(264, 100%, 80%)"
    },

    filled: {
        name: "--lit-range-filled",
        default: defaultFilled
    },
    filledHover: {
        name: "--lit-range-filled-hover",
        default: "hsl(264, 100%, 50%)"
    },
}

const _v = makeCSSProxy(RangeCSSVars);

export const cssRangeNames = makeCSSNameProxy(RangeCSSVars);


export const rangeStyles = css`
:host{
    display: inline-block;
    --size: ${_v.size};
    --pointer: 8px;
    --pointer-border: 2px;
    --poiner-width: calc(var(--pointer) + var(--pointer-border));
    --line-height: 4px;
    --to-middle: calc((var(--size) - var(--pointer)) / 2);
    --top-margin: 8px;
    --padding: 12px;
    --default-filled: hsl(264, 100%, 60%);
    --percent: 0;
    
    padding: 1px;
    box-sizing: border-box;
    contain: content;

}
:host([showPercent]) .wrapper{
    padding-bottom: 15px;
}
.wrapper:focus{
    outline: ${_v.outlineFocus};
}
:host([hover]),
:host([pressed]){                
    --lit-range-track-background: ${_v.trackBackgroundHover};
    --lit-range-filled: ${_v.filledHover};
    --lit-range-track-background: ${_v.trackBackgroundHover};
    
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
    left: calc(var(--size) / 2 * -1);
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
    top: calc(var(--top-margin) - var(--size) / 2 + var(--line-height) / 2);
    width: var(--size, 14px);
    height: var(--size, 14px);
}
.thumb.fullfiled{
    background-color: ${_v.filled};
    outline: ${_v.thumbOutlineFullfiled};
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
    outline: ${_v.thumbOutline};
    box-shadow: ${_v.thumbShadow};    
}

.point{
    position: absolute;
    top: calc(var(--top-margin) - var(--pointer) / 2 + var(--line-height) / 2);
    width: var(--pointer);
    height: var(--pointer);
    border-radius: var(--pointer);
    background-color: ${_v.pointBackground};
    outline: var(--pointer-border) solid ${_v.pointOutlineColor};
    transform: translate(-50%, 0);
    z-index: 1;
}
.point.filled{
    outline: var(--pointer-border) solid ${_v.filled};
    background-color: ${_v.filled};
}
:host([hover]) .point{
    outline: var(--pointer-border) solid ${_v.pointOutlineColorHover};
}
:host([hover]) .point.filled{
    outline: var(--pointer-border) solid ${_v.pointOutlineColorHover};
}
`;