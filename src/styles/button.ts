import { css } from 'lit';
import { noselect } from './noselect';
export const button = [
    noselect,
    css`
    :host{
        display: var(--lit-button-display, inline-block);
    }
    
    .wrapper{
        cursor: pointer;
        display: grid;
        gap: var(--lit-button-icon-gap, 4px);
        justify-content: var(--button-justify);
        box-sizing: border-box;
        align-items: center;
        grid-template-columns: auto;
        height: 100%;
        border: 1px solid  var(--lit-button-border,  hsl(222, 20%, 65%));
        outline: var(--lit-button-outline, none);
        border-radius: var(--lit-button-radius, 1px);
        color: var(--lit-button-color, hsl(222, 20%, 35%));
        background-color: var(--lit-button-background, hsl(222, 20%, 99%));
        --icon-color: var(--lit-button-color);
        font-weight: var(--lit-button-weight, 600);
        padding: var(--lit-button-padding, 6px 14px);
        text-transform: var(--lit-button-text-transform, uppercase);
    }

    :host([center]) .wrapper{
        text-align: center;
        justify-content: center;
    }
    :host([disabled]){
        opacity: 0.5;
    }
    :host(:not([disabled])) .wrapper:hover{
        background-color: var(--lit-button-background-hover,  hsl(222, 20%, 96%));
    }
    :host(:not([disabled])) .wrapper:focus{
        background-color: var(--lit-button-background-focus, hsl(222,20%, 99%));
        outline: 1px solid var(--lit-button-outline-focus, hsla(222, 20%, 60%, 0.5));
        
    }

    :host([primary]) .wrapper{
        color: var(--lit-button-primary, hsl(222, 95%, 98%));
        background-color: var(--lit-button-primary-background, hsl(222, 95%, 65%));
        border: 1px solid var(--lit-button-primary-border,  hsl(222, 95%, 45%));
        --lit-icon-color: var(--lit-button-primary);
    }
    :host(:not([disabled])[primary]) .wrapper:hover{
        background-color: var(--lit-button-primary-background-hover,  hsl(222, 95%, 60%));
    }
    :host(:not([disabled])[primary]) .wrapper:focus{
        background-color: var(--lit-button-primary-background-focus,  hsl(222, 95%, 65%));
        outline: 1px solid  var(--lit-button-primary-outline-focus,  hsl(222, 95%, 45%));
    }


    .checkmark{
        --lit-icon-color: var(--lit-button-success-background, hsl(110, 85%, 70%));
    }
    :host([success]) .wrapper{
        color: var(--lit-button-success, hsl(120, 95%, 15%));
        background-color: var(--lit-button-success-background, hsl(110, 85%, 70%));
        border:  1px solid var(--lit-button-success-border, hsl(120, 95%, 45%));
        --lit-icon-color: var(--lit-button-success);
    }
    :host(:not([disabled])[success]) .wrapper:hover{
        background-color: var(--lit-button-success-background-hover, hsl(120, 95%, 80%));
    }
    :host(:not([disabled])[success]) .wrapper:focus{
        background-color: var(--lit-button-success-background-focus, hsl(120, 95%, 70%));
        outline: 1px solid var(--lit-button-success-outline-focus,  hsl(120, 95%, 50%));
    }

    :host([danger]) .wrapper{
        color: var(--lit-button-danger, hsl(1, 95%, 15%));
        background-color: var(--lit-button-danger-background, hsl(1, 95%, 80%));
        border: 1px solid var(--lit-button-danger-border, hsl(1, 95%, 55%));
        --lit-icon-color: var(--lit-button-danger);
    }
    :host(:not([disabled])[danger]) .wrapper:hover{
        background-color: var(--lit-button-danger-background-hover,  hsl(1, 95%, 75%));
    }
    :host(:not([disabled])[danger]) .wrapper:focus{
        background-color: var(--lit-button-danger-background-hover,  hsl(1, 95%, 80%));
        outline: 1px solid var(--lit-button-danger-outline-focus,  hsl(1, 95%, 55%));
    }

    :host([switch][switchOn]) .wrapper{
        background-color: var(--lit-button-switch-background, hsl(222, 80%, 60%));
        color: var(--lit-button-switch-color, hsl(222, 80%, 98%));
        --lit-icon-color: var(--lit-button-switch-color, hsl(222, 80%, 98%));
    }
    :host([switch]) .wrapper:focus{
        outline: none;
    }
    :host(:not([switchOn])[switch]) .wrapper:not(:hover),
    :host(:not([switchOn])[switch]) .wrapper:focus{
        background-color: transparent;
    }

    :host([size = "small"]) .wrapper{
        padding: var(--lit-button-small-padding, 4px 6px);
        font-size: var(--lit-button-small-font-size);
    }
    :host([size = "medium"]) .wrapper{
        padding: var(--lit-button-padding, 6px 14px);
        font-size: var(--lit-button-font-size);
    }
    :host([size = "large"]) .wrapper{
        padding: var(--lit-button-large-padding,  8px 20px);
        font-size: var(--lit-button-large-font-size, 1.1rem);
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