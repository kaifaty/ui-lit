import { css } from 'lit';
export const input = css `
:host{
    display: var(--input-display, inline-block);
    height: var(--input-height);
}
:host(.error-valid) input{
    border: 1px solid var(--error-border, #ff7e6d);
}
:host(.error-valid) input:focus{
    outline: 1px solid var(--error-border, #ff7e6d);
}
:host(.disabled){
    opacity: 0.8;
}
:host(.readonly){
    opacity: 0.9;
}
.wrapper{
    position: relative;
    height: 100%;
    width: 100%;
}
.icon{
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
}
input, textarea{
    height: 100%;
    width: 100%;
    font-size: var(--input-font-size, inherit);
    box-sizing: border-box;
    padding: var(--input-padding, 6px 8px);
    border: 1px solid var(--input-border, hsla(222, 20%, 60%, 0.5));
    text-align: var(--input-align, initial);
    background-color: var(--input-background, #fff);
    color: var(--input-color, inherit);
}

input:focus, 
textarea:focus{
    outline:  1px solid var(--input-outline-focus, hsla(222, 20%, 60%, 0.5));
}
input:focus::-webkit-input-placeholder {opacity: 0; transition: opacity 0.3s ease;}
input:focus::-moz-placeholder          {opacity: 0; transition: opacity 0.3s ease;}
input:focus:-moz-placeholder           {opacity: 0; transition: opacity 0.3s ease;}
input:focus:-ms-input-placeholder      {opacity: 0; transition: opacity 0.3s ease;}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active{
    box-shadow: 0 0 0 30px white inset
}

textarea{
}

textarea:focus::-webkit-input-placeholder {opacity: 0; transition: opacity 0.3s ease;}
textarea:focus::-moz-placeholder          {opacity: 0; transition: opacity 0.3s ease;}
textarea:focus:-moz-placeholder           {opacity: 0; transition: opacity 0.3s ease;}
textarea:focus:-ms-input-placeholder      {opacity: 0; transition: opacity 0.3s ease;}
`;
