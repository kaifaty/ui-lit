import { css } from 'lit';
import { noselect } from './noselect';
export const button = [
    noselect,
    css`
    :host{
        display: var(--button-display, inline-block);
    }
    
    .wrapper{
        cursor: pointer;
        display: grid;
        gap: var(--button-icon-gap, 4px);
        box-sizing: border-box;
        align-items: center;
        grid-template-columns: auto;
        height: 100%;
        padding: var(--button-padding, 6px 18px);
        border: var(--button-border, 1px solid  hsl(222, 20%, 65%));
        outline: var(--button-outline, none);
        border-radius: var(--button-radius, 1px);
        color: var(--button-color, hsl(222, 20%, 35%));
        background-color: var(--button-background, hsl(222, 20%, 99%));
        --icon-fill: var(--button-color);
        font-weight: var(--button-weight, 600);
    }

    :host([disabled]){
        opacity: 0.5;
    }
    :host(:not([disabled])) .wrapper:hover{
        background-color: var(--button-background-hover,  hsl(222, 20%, 96%));
    }
    :host(:not([disabled])) .wrapper:focus{
        background-color: var(--button-background-focus, var(--button-background, hsl(222,20%, 99%)));
        outline: var(--button-outline-focus, 1px solid hsla(222, 20%, 60%, 0.5));
        
    }

    :host([primary]) .wrapper{
        color: var(--button-primary, hsl(222, 95%, 98%));
        background-color: var(--button-primary-background, hsl(222, 95%, 65%));
        border: 1px solid var(--button-primary-border,  hsl(222, 95%, 45%));
        --icon-fill: var(--button-primary);
    }
    :host(:not([disabled])[primary]) .wrapper:hover{
        background-color: var(--button-primary-background-hover,  hsl(222, 95%, 60%));
    }
    :host(:not([disabled])[primary]) .wrapper:focus{
        background-color: var(--button-primary-background-focus,  var(--button-primary-background, hsl(222, 95%, 65%)));
        outline: var(--button-primary-outline-focus, 1px solid  hsl(222, 95%, 45%));
    }


    :host([success]) .wrapper{
        color: var(--button-success, hsl(120, 95%, 15%));
        background-color: var(--button-success-background, hsl(110, 85%, 70%));
        border: var(--button-success-border, 1px solid hsl(120, 95%, 45%));
        --icon-fill: var(--button-success);
    }
    :host(:not([disabled])[success]) .wrapper:hover{
        background-color: var(--button-success-background-hover, hsl(120, 95%, 80%));
    }
    :host(:not([disabled])[success]) .wrapper:focus{
        background-color: var(--button-success-background-focus, hsl(120, 95%, 70%));
        outline: var(--button-success-outline-focus, 1px solid hsl(120, 95%, 50%));
    }

    :host([danger]) .wrapper{
        color: var(--button-danger, hsl(1, 95%, 15%));
        background-color: var(--button-danger-background, hsl(1, 95%, 80%));
        border: 1px solid var(--button-danger-border, hsl(1, 95%, 55%));
        --icon-fill: var(--button-danger);
    }
    :host(:not([disabled])[danger]) .wrapper:hover{
        background-color: var(--button-danger-background-hover,  hsl(1, 95%, 75%));
    }
    :host(:not([disabled])[danger]) .wrapper:focus{
        background-color: var(--button-danger-background-hover,  hsl(1, 95%, 80%));
        outline: var(--button-danger-outline-focus, 1px solid  hsl(1, 95%, 55%));
    }

    :host([switch][switchOn]) .wrapper{
        background-color: var(--button-switch-background, hsl(222, 80%, 60%));
        color: var(--button-switch-color, hsl(222, 80%, 98%));
        --icon-color: var(--button-switch-color, hsl(222, 80%, 98%));
    }
    :host([switch]) .wrapper:focus{
        outline: none;
    }
    :host(:not([switchOn])[switch]) .wrapper:not(:hover),
    :host(:not([switchOn])[switch]) .wrapper:focus{
        background-color: transparent;
    }

    :host([size = "small"]) .wrapper{
        padding: 4px 6px;
        font-size: 0.9rem;
    }
    :host([size = "large"]) .wrapper{
        padding: 8px 16px;
        font-size: 1.3rem;
    }
    :host([borderless]) .wrapper,
    :host([borderless]) .wrapper:hover,
    :host([borderless]) .wrapper:focus{
        border: 1px solid transparent;
        background-color: transparent;
        
    }
    

    .wrapper.icon-before, 
    .wrapper.icon-after{
        grid-template-columns: auto auto;
    }
    .wrapper.icon-before.icon-after{
        grid-template-columns: auto auto auto;
    }
    .icon{
        align-self: center;
        justify-self: center;
    }
    `
];