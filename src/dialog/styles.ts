import { css } from 'lit';

export const DIALOG_STYLES = css`
:host{
    display: block;
}
.overlap{
    display: flex;
    --dialog-z-index: 125;
    margin: 0;
    top: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: var(--dialog-z-index, 100);
    background-color: var(--dialog-overlap, rgba(0,0,0,0.7));
    visibility: hidden;
}
:host([opened]) .overlap{
    visibility: visible;
    align-items: center;
    justify-content: center;
}
:host([opened]) main{
    padding: var(--dialog-main-padding, var(--dialog-padding, 15px 20px));
}
:host([opened]) header{
    padding: var(--dialog-header-padding, var(--dialog-padding, 15px 20px));
}
:host([opened]) footer{
    padding: var(--dialog-footer-padding, var(--dialog-padding, 15px 20px));
}
.dialog{          
    max-height: var(--dialog-max-height, initial);
    width: var(--dialog-width, 600px);
    height: var(--dialog-height, 300px);
    z-index: calc(var(--dialog-z-index, 100) + 1);
    color: black;
    color: var(--dialog-color, black);
    background-color: var(--dialog-background, #fefefe);
    border-radius: 3px;
    box-sizing: border-box;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 1px 1px 8px var(--dialog-boxshadow, rgba(0,0,0,0.7));
}

header ::slotted(h1), 
header ::slotted(h2), 
header ::slotted(h3), 
header ::slotted(h4){
    margin: 0;
}
main{
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
}
header{
    position: relative;
    background-color: var(--dialog-header-background, #111);
    color: var(--dialog-header-color, #fefefe);
    font-size: 16px;
    display: none;
}
header.visible{
    display: block;
}
footer{
    display: flex;
    justify-content: space-between;
}
.closebtn-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: end;
}
.close-icon, .arrow-back{
    position: absolute;
    padding: 10px;
    right: 2px;
    top: -2px;
    cursor: pointer;
    color: #aaa;
    --icon-font-size: 18px;
}
.arrow-back{
    right: 30px;
    transform-origin: center;
    transform: rotate(90deg);
}
.close-icon svg{
    fill: var(--dialog-icon-fill, #888);
}`