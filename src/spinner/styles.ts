import { css } from 'lit';
import { makeCSSProxy, makeCSSNameProxy } from '../helpers/cssproxy';

const spinnerCSSVars = {
    background: {
        name: "background",
        default: ""
    },
    color: {
        name: "color",
        default: "rgba(0,0,0,0.5)"
    },
};

const _v = makeCSSProxy(spinnerCSSVars, "--lit-spinner-");

export const spinnerCSSVarsNames = makeCSSNameProxy(spinnerCSSVars, "--lit-spinner-");


export const spinnerStyles = css`
:host{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
:host([fullscreen]){
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 100vh;
    width: 100%;
    background-color: ${_v.background};
}
:host([fullContent]){    
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    height: 100%;
    width: 100%;
    background-color: ${_v.background};
}
:host(.container){
    display: flex;
    height: 100%;
    width: 100%;
}
.pulsor{
    width: 30px;
    height: 30px;
    position: relative;
}
:host([small]) .pulsor{
    width: 15px;
    height: 15px;
}
:host([big]) .pulsor{
    width: 50px;
    height: 50px;
}
.bounce {
    contain: content;
    background-color: ${_v.color};
    width: 100%;
    height: 100%;
    border-radius: 50%;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: sk-bounce 1.5s infinite ease-in-out;
    animation: sk-bounce 1.5s infinite ease-in-out;
}
.bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}
@-webkit-keyframes sk-bounce {
    0%, 100% {
        -webkit-transform: scale(0.0)
    }
    50% {
        -webkit-transform: scale(1.0)
    }
}
@keyframes sk-bounce {
    0%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
    }
    50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
    }
}`;