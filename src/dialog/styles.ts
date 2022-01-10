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
    /*--dialog-z-index: 125;*/
    isolation: isolate;
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
    box-shadow: 1px 1px 8px var(--lit-dialog-boxshadow, rgba(0,0,0,0.7));
    position: relative;
}

slot[name = header]::slotted(*){
    padding: var(--lit-dialog-header-padding, 15px 20px);
    position: relative;
    background-color: var(--lit-dialog-header-background, #111);
    color: var(--lit-dialog-header-color, #fefefe);
    font-size: 16px;
}

slot[name = header]::slotted(lit-header){
    margin: 0;
}
main{
    flex: 1 1 auto;
    overflow-y: auto;
    overflow-x: hidden;
    padding: var(--lit-dialog-main-padding, 15px 20px);
}
footer{
    display: flex;
    justify-content: space-between;
    padding: var(--lit-dialog-footer-padding, 15px 20px);
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
}
.close-icon, 
.arrow-back{
    padding: 10px;
    cursor: pointer;
    color: var(--lit-dialog-control-icons, #aaa);
    --icon-font-size: 18px;
}`