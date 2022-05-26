import { css } from 'lit';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';
import { iconCSSVarNames } from '../icon/styles';

const dialogCSSVars = {
    overlapIndex: {
        name: "z-index",
        default: 100,
    },
    overlapBackground: {
        name: "background",
        default: `rgba(0,0,0,0.7)`,
    },
    overlapMaxHeight: {
        name: "max-height",
        default: `initial`,
    },
    width: {
        name: "width",
        default: `600px`,
    },
    height: {
        name: "height",
        default: `300px`,
    },
    minHeight: {
        name: "min-height",
        default: `initial`,
    },
    color: {
        name: "color",
        default: `black`,
    },
    backgroundColor: {
        name: "background-color",
        default: `#fefefe`,
    },
    radius: {
        name: "radius",
        default: `3px`,
    },
    boxshadow: {
        name: "boxshadow",
        default: `rgba(0,0,0,0.7)`,
    },
    headerPadding: {
        name: "header-padding",
        default: `15px 20px`,
    },
    headerBackgroundColor: {
        name: "header-background-color",
        default: `#111`,
    },
    headerColor: {
        name: "header-color",
        default: `#fefefe`,
    },
    mainPadding: {
        name: "main-color",
        default: `15px 20px`,
    },
    footerPadding: {
        name: "footer-color",
        default: `15px 20px`,
    },
    iconColor: {
        name: "footer-color",
        default: `15px 20px`,
    },
    get zIndex () {
        return {
            name: "z-index",
            default: this.overlapIndex.default + 1,
        }
    },
};

const _v = makeCSSProxy(dialogCSSVars, "--lit-dialog-");

export const dialogCSSVarNames = makeCSSNameProxy(dialogCSSVars, "--lit-dialog-");


export const DIALOG_STYLES = css`
:host{
    display: none;
}
:host([opened]){
    display: block;
}
.overlap{
    display: flex;
    isolation: isolate;
    margin: 0;
    left: 0;
    top: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: ${_v.overlapIndex};
    background-color: ${_v.overlapBackground};
    visibility: hidden;
}
:host([opened]) .overlap{
    visibility: visible;
    align-items: center;
    justify-content: center;
}
.dialog{          
    max-height: ${_v.overlapMaxHeight};
    width: ${_v.width};
    height: ${_v.height};
    min-height: ${_v.minHeight};
    z-index: ${_v.zIndex};
    color: ${_v.color};
    background-color: ${_v.backgroundColor};
    border-radius: ${_v.radius};
    box-shadow: 1px 1px 8px ${_v.boxshadow};
    box-sizing: border-box;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    position: relative;
    ${iconCSSVarNames.color}: ${_v.headerColor};
}

slot[name = header]::slotted(*){
    position: relative;
    padding: ${_v.headerPadding};
    background-color: ${_v.headerBackgroundColor};
    color: ${_v.headerColor};
    font-size: 16px;
}

slot[name = header]::slotted(lit-header){
    margin: 0;
}
main{
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
    padding: ${_v.mainPadding};
}
footer{
    display: flex;
    justify-content: space-between;
    padding: ${_v.footerPadding};
}
.closebtn-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: end;
}
.icons{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 222;
}
.close-icon, 
.arrow-back{
    padding: 10px;
    cursor: pointer;
    ${iconCSSVarNames.fontSize}: 18px;
}`
