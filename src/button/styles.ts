import { css } from 'lit';
import { noselect } from '../styles/noselect';

export const button = [
    noselect,
    css`
    :host{
        display: var(--lit-button-display, inline-block);
    }
    :host([size = "small"]) .wrapper{
        height: var(--lit-button-small-height, 25px);
        padding: var(--lit-button-small-padding, 0 6px);
        font-size: var(--lit-button-small-font-size);
    }
    :host([size = "medium"]) .wrapper{
        height: var(--lit-button-height, 30px);
        padding: var(--lit-button-padding, 0 14px);
        font-size: var(--lit-button-font-size);
    }
    :host([size = "large"]) .wrapper{
        height: var(--lit-button-large-height, 35px);
        padding: var(--lit-button-large-padding,  0 20px);
        font-size: var(--lit-button-large-font-size, 1.1rem);
    }
    :host([disabled]), 
    :host([loading]){
        pointer-events: none;
    }
    :host([disabled]) .wrapper{
        opacity: 0.4;
    }
    
    .wrapper{
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        display: inline-grid;
        gap: var(--lit-button-icon-gap, 8px);
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        grid-auto-flow: column;
        width: 100%;
        height: 100%;
        border-radius: var(--lit-button-border-radius, 2px);
        font-weight: var(--lit-button-weight, 600);
        text-transform: var(--lit-button-text-transform, uppercase);
        letter-spacing: var(--lit-button-letter-spacing, 0.089em);
        
        outline: var(--lit-button-outline, none);
        border: var(--lit-button-border, 1px solid hsl(264, 50%, 85%));
        color: var(--lit-button-color, hsl(264, 100%, 46%));
        background-color: var(--lit-button-background, hsl(264, 20%, 100%));
        --lit-icon-color: var(--lit-button-color, hsl(264, 100%, 46%));
    }
    lit-spinner{
        height: 12.8px;
        width: 12.8px;
        justify-self: center;
    }

    .wrapper.hover{
        color: var(--lit-button-color-hover, var(--lit-button-color, hsl(264, 100%, 46%)));
        background-color: var(--lit-button-background-hover,  hsl(264, 100%, 98%));
        outline: var(--lit-button-outline-hover);
    }
    .wrapper.focus{
        color: var(--lit-button-color-focus, var(--lit-button-color, hsl(264, 100%, 46%)));
        background-color: var(--lit-button-background-focus, hsl(264, 100%, 95%));
        outline: var(--lit-button-outline-focus);
    }
    .wrapper.pressed{
        color: var(--lit-button-color-pressed, var(--lit-button-color, hsl(264, 100%, 46%)));
        background-color: var(--lit-button-background-pressed,  hsl(264, 100%, 92%));
        outline: var(--lit-button-outline-pressed);
    }
    :host([loading]) .wrapper{
        cursor: initial;
    }

    :host([primary]) .wrapper{
        color: var(--lit-button-primary-color, hsl(264, 95%, 98%));
        background-color: var(--lit-button-primary-background, hsl(264, 95%, 65%));
        border: var(--lit-button-primary-border);
        --lit-icon-color: var(--lit-button-primary, hsl(264, 95%, 98%));
    }
    :host([primary]) .wrapper.hover{
        color: var(--lit-button-primary-color-hover, var(--lit-button-primary-color, hsl(264, 95%, 98%)));
        background-color: var(--lit-button-primary-background-hover,  hsl(264, 95%, 62%));
        outline: var(--lit-button-primary-outline-hover);
    }
    :host([primary]) .wrapper.focus{
        color: var(--lit-button-primary-color-focus, var(--lit-button-primary-color, hsl(264, 95%, 98%)));
        background-color: var(--lit-button-primary-background-focus,  hsl(264, 95%, 58%));
        outline: var(--lit-button-primary-outline-focus);
    }
    :host([primary]) .wrapper.pressed{
        color: var(--lit-button-primary-color-pressed, var(--lit-button-primary-color, hsl(264, 95%, 98%)));
        background-color: var(--lit-button-primary-background-pressed,  hsl(264, 95%, 52%));
        outline: var(--lit-button-primary-outline-pressed);
    }


    .checkmark{
        background-color: var(--lit-button-success-background,  hsl(110, 100%, 70%)) !important;
        --lit-icon-color: var(--lit-button-success, hsl(110, 100%, 10%)) !important;
    }
    :host([success]) .wrapper{
        color: var(--lit-button-success-color, hsl(120, 95%, 10%));
        background-color: var(--lit-button-success-background, hsl(110, 85%, 70%));
        border: var(--lit-button-success-border);
        --lit-icon-color: var(--lit-button-success);
    }
    :host([success]) .wrapper.hover{
        color: var(--lit-button-success-color-hover, var(--lit-button-success-color, hsl(120, 95%, 10%)));
        background-color: var(--lit-button-success-background-hover, hsl(120, 100%, 68%));
        outline: var(--lit-button-success-outline-hover);
    }
    :host([success]) .wrapper.focus{
        color: var(--lit-button-success-color-focus, var(--lit-button-success-color, hsl(120, 95%, 10%)));
        background-color: var(--lit-button-success-background-focus, hsl(120, 100%, 55%));
        outline: var(--lit-button-success-outline-focus);
    }
    :host([success]) .wrapper.pressed{
        color: var(--lit-button-success-color-pressed, var(--lit-button-success-color, hsl(120, 95%, 10%)));
        background-color: var(--lit-button-success-background-pressed, hsl(120, 100%, 80%));
        outline: var(--lit-button-success-outline-pressed);
    }

    :host([danger]) .wrapper{
        color: var(--lit-button-danger-color, hsl(1, 95%, 15%));
        background-color: var(--lit-button-danger-background, hsl(1, 95%, 80%));
        border: 1px solid var(--lit-button-danger-border, hsl(1, 95%, 55%));
        --lit-icon-color: var(--lit-button-danger);
    }
    :host([danger]) .wrapper.hover{
        color: var(--lit-button-danger-color-hover, var(--lit-button-danger-color, hsl(1, 95%, 15%)));
        background-color: var(--lit-button-danger-background-hover,  hsl(1, 95%, 75%));
        outline: var(--lit-button-danger-outline-hover);
    }
    :host([danger]) .wrapper.focus{
        color: var(--lit-button-danger-color-focus, var(--lit-button-danger-color, hsl(1, 95%, 15%)));
        background-color: var(--lit-button-danger-background-focus,  hsl(1, 95%, 80%));
        outline: var(--lit-button-danger-outline-focus);
    }
    :host([danger]) .wrapper.pressed{
        color: var(--lit-button-danger-color-pressed, var(--lit-button-danger-color, hsl(1, 95%, 15%)));
        background-color: var(--lit-button-danger-background-pressed,  hsl(1, 95%, 80%));
        outline: var(--lit-button-danger-outline-pressed);
    }

    :host([type=switch]) .wrapper{
        color: var(--lit-button-switch-color, var(--lit-button-color, hsl(264, 100%, 46%)));
        background-color: var(--lit-button-switch-background, var(--lit-button-background, hsl(264, 20%, 100%)));
        --lit-icon-color: var(--lit-button-switch-color, var(--lit-button-color, hsl(264, 100%, 46%)));
    }
    :host([type=switch][switchOn]) .wrapper{
        color: var(--lit-button-switch-on-color, hsl(264, 80%, 98%));
        background-color: var(--lit-button-switch-on-background, hsl(264, 80%, 60%));
        --lit-icon-color: var(--lit-button-switch-on-color, hsl(264, 80%, 98%));
    }
    :host([type=switch]) .wrapper.pressed,
    :host([type=switch]) .wrapper.hover,
    :host([type=switch]) .wrapper.focus{
        outline: none;
    }
/*
    :host(:not([switchOn])[switch]) .wrapper:not(.hover),
    :host(:not([switchOn])[switch]) .wrapper.focus{
        background-color: transparent;
    }*/

    :host([borderless]) .wrapper,
    :host([borderless]) .wrapper.hover,
    :host([borderless]) .wrapper.focus{
        border: 1px solid transparent;
        outline: none;
        
    }`
];