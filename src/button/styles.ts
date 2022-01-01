import { css } from 'lit';
import { noselect } from '../styles/noselect';

export const button = [
    noselect,
    css`
    :host{
        display: var(--lit-button-display, inline-block);
    }
    
    .wrapper{
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        display: inline-grid;
        gap: var(--lit-button-icon-gap, 8px);
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        grid-auto-flow: column;
        width: 100%;
        height: 30px;
        border: 1px solid  var(--lit-button-border);
        outline: var(--lit-button-outline, none);
        border-radius: var(--lit-button-radius, 1px);
        color: var(--lit-button-color, hsl(264, 100%, 46%));
        background-color: var(--lit-button-background, hsl(264, 20%, 100%));
        --lit-icon-color: var(--lit-button-color, hsl(264, 100%, 46%));
        font-weight: var(--lit-button-weight, 600);
        padding: var(--lit-button-padding, 0 14px);
        text-transform: var(--lit-button-text-transform, uppercase);
        letter-spacing: var(--mdc-typography-button-letter-spacing, 0.089em);
    }
    lit-spinner{
        height: 15px;
        width: 15px;
        justify-self: center;
    }

    :host([disabled]) .wrapper{
        color: var(--lit-button-color-disabled,  hsl(264, 1%, 70%)) !important;
        --lit-icon-color: var(--lit-button-color-disabled,  hsl(264, 1%, 60%)) !important;
        background-color: var(--lit-button-background-disabled,  hsl(264, 1%, 99%)) !important;
        border: 1px solid var(--lit-button-border-disabled,  hsl(264, 1%, 75%)) !important;
        outline: none;
        cursor: initial;
    }
    :host(:not([disabled]):not([loading])) .wrapper.hover{
        background-color: var(--lit-button-background-hover,  hsl(264, 100%, 98%));
    }
    :host(:not([disabled]):not([loading])) .wrapper.focused{
        background-color: var(--lit-button-background-focus, hsl(264, 100%, 95%));
        /* outline: 1px solid var(--lit-button-outline-focus, hsla(264, 20%, 60%, 0.5));
        */
    }
    :host(:not([disabled]):not([loading])) .wrapper.pressed{
        background-color: var(--lit-button-background-pressed,  hsl(264, 100%, 92%));
    }
    /*
    */
    :host([loading]) .wrapper{
        cursor: initial;
    }

    :host([primary]) .wrapper{
        color: var(--lit-button-primary, hsl(264, 95%, 98%));
        background-color: var(--lit-button-primary-background, hsl(264, 95%, 65%));
        border: 1px solid var(--lit-button-primary-border);
        --lit-icon-color: var(--lit-button-primary, hsl(264, 95%, 98%));
    }
    :host([primary]) .wrapper.hover{
        background-color: var(--lit-button-primary-background-hover,  hsl(264, 95%, 68%));
    }
    :host([primary]) .wrapper.focused{
        background-color: var(--lit-button-primary-background-focus,  hsl(264, 95%, 55%));
        outline: 1px solid  var(--lit-button-primary-outline-focus, #000);
    }
    :host([primary]) .wrapper.pressed{
        background-color: var(--lit-button-primary-background-pressed,  hsl(264, 95%, 60%));
    }


    .checkmark{
        background-color: var(--lit-button-success-background,  hsl(110, 100%, 70%)) !important;
        --lit-icon-color: var(--lit-button-success, hsl(110, 100%, 15%)) !important;
    }
    :host([success]) .wrapper{
        color: var(--lit-button-success, hsl(120, 95%, 15%));
        background-color: var(--lit-button-success-background, hsl(110, 85%, 70%));
        border:  1px solid var(--lit-button-success-border, hsl(120, 95%, 45%));
        --lit-icon-color: var(--lit-button-success);
    }
    :host([success]) .wrapper.hover{
        background-color: var(--lit-button-success-background-hover, hsl(120, 95%, 80%));
    }
    :host([success]) .wrapper.focused{
        background-color: var(--lit-button-success-background-focus, hsl(120, 95%, 70%));
        outline: 1px solid var(--lit-button-success-outline-focus,  hsl(120, 95%, 50%));
    }

    :host([danger]) .wrapper{
        color: var(--lit-button-danger, hsl(1, 95%, 15%));
        background-color: var(--lit-button-danger-background, hsl(1, 95%, 80%));
        border: 1px solid var(--lit-button-danger-border, hsl(1, 95%, 55%));
        --lit-icon-color: var(--lit-button-danger);
    }
    :host([danger]) .wrapper.hover{
        background-color: var(--lit-button-danger-background-hover,  hsl(1, 95%, 75%));
    }
    :host([danger]) .wrapper.focus{
        background-color: var(--lit-button-danger-background-hover,  hsl(1, 95%, 80%));
        outline: 1px solid var(--lit-button-danger-outline-focus,  hsl(1, 95%, 55%));
    }

    :host([switch][switchOn]) .wrapper{
        background-color: var(--lit-button-switch-background, hsl(264, 80%, 60%));
        color: var(--lit-button-switch-color, hsl(264, 80%, 98%));
        --lit-icon-color: var(--lit-button-switch-color, hsl(264, 80%, 98%));
    }
    :host([switch]) .wrapper.focused{
        outline: none;
    }
    :host(:not([switchOn])[switch]) .wrapper:not(.hover),
    :host(:not([switchOn])[switch]) .wrapper.focused{
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
    :host([borderless]) .wrapper.hover,
    :host([borderless]) .wrapper.focused{
        border: 1px solid transparent;
        background-color: transparent;
        
    }`
];