import { css } from 'lit';

export const DIALOG_STYLES = css`
:host{
    display: none;
}
:host([opened]){
    display: block;
}
.overlap{
    display: flex;
    --dialog-z-index: 125;
    margin: 0;
    left: 0;
    top: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: var(--lit-dialog-z-index, 100);
    background-color: var(--lit-dialog-overlap, rgba(0,0,0,0.7));
    visibility: hidden;
}
:host([opened]) .overlap{
    visibility: visible;
    align-items: center;
    justify-content: center;
}
:host([opened]) main{
    padding: var(--lit-dialog-main-padding, 15px 20px);
}
:host([opened]) header{
    padding: var(--lit-dialog-header-padding, 15px 20px);
}
:host([opened]) footer{
    padding: var(--lit-dialog-footer-padding, 15px 20px);
}
.dialog{          
    max-height: var(--lit-dialog-max-height, initial);
    width: var(--lit-dialog-width, 600px);
    height: var(--lit-dialog-height, 300px);
    min-height: var(--lit-dialog-minHeight, initial);
    z-index: calc(var(--lit-dialog-z-index, 100) + 1);
    color: black;
    color: var(--lit-dialog-color, black);
    background-color: var(--lit-dialog-background, #fefefe);
    border-radius: var(--lit-dialog-radius, 3px);
    box-sizing: border-box;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 1px 1px 8px var(--lit-dialog-boxshadow, rgba(0,0,0,0.7));
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
    background-color: var(--lit-dialog-header-background, #111);
    color: var(--lit-dialog-header-color, #fefefe);
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
    color: var(--lit-dialog-control-icons, #aaa);
    --icon-font-size: 18px;
}
.arrow-back{
    right: 30px;
    transform-origin: center;
    transform: rotate(90deg);
}`