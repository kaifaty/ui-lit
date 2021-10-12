import { css } from 'lit';
import { noselect } from './noselect';
export const button = [
    noselect,
    css`
    :host{
        display: var(--button-display, inline-block);
        height: var(--button-height);
    }
    .icon{
        align-self: center;
        justify-self: center;
    }
    .wrapper.mini{
        padding: 2px 4px;
        font-size: 0.9rem;
    }
    .wrapper.disabled{
        opacity: 0.5;
    }
    .wrapper.icon-before, .wrapper.icon-after{
        grid-template-columns: auto auto;
    }
    .wrapper.icon-before.icon-after{
        grid-template-columns: auto auto auto;
    }
    .wrapper.borderless, div.wrapper.borderless:focus{
        border: none;
        outline: none;
    }
    div.wrapper.borderless:focus{
        background-color: var(--button-background-hover,  hsl(222, 20%, 96%));
    }
    .wrapper{
        cursor: pointer;
        display: grid;
        gap: var(--button-icon-gap, 4px);
        box-sizing: border-box;
        align-content: center;
        grid-template-columns: auto;
        height: 100%;
        padding: var(--button-padding, 6px 20px);
        border: var(--button-border, 1px solid  hsl(222, 20%, 65%));
        outline: var(--button-outline, none);
        border-radius: var(--button-radius, 3px);
        color: var(--button-color, hsl(222, 20%, 35%));
        background-color: var(--button-backround, hsl(222, 20%, 99%));
        --icon-fill: var(--button-color);
        font-weight: var(--button-weight, 600);
    }
    .wrapper:not(.disabled):hover{
        background-color: var(--button-background-hover,  hsl(222, 20%, 96%));
    }
    .wrapper:not(.disabled):focus{
        background-color: var(--button-background-focus, var(--button-backround, hsl(222,20%, 99%)));
        outline: var(--button-outline-focus, 1px solid hsla(222, 20%, 60%, 0.5));
        
    }

    .wrapper.primary{
        color: var(--button-primary, hsl(222, 95%, 98%));
        background-color: var(--button-primary-background, hsl(222, 95%, 65%));
        border: 1px solid var(--button-primary-border,  hsl(222, 95%, 45%));
        --icon-fill: var(--button-primary);
    }
    .wrapper.primary:not(.disabled):hover{
        background-color: var(--button-primary-background-hover,  hsl(222, 95%, 60%));
    }
    .wrapper.primary:not(.disabled):focus{
        background-color: var(--button-primary-background-focus,  var(--button-primary-background, hsl(222, 95%, 65%)));
        outline: var(--button-primary-outline-focus, 1px solid  hsl(222, 95%, 45%));
    }

    .wrapper.success{
        color: var(--button-success, hsl(120, 95%, 15%));
        background-color: var(--button-success-background, hsl(110, 85%, 70%));
        border: var(--button-success-border, 1px solid hsl(120, 95%, 45%));
        --icon-fill: var(--button-success);
    }
    .wrapper.success:not(.disabled):hover{
        background-color: var(--button-success-background-hover, hsl(120, 95%, 80%));
    }
    .wrapper.success:not(.disabled):focus{
        background-color: var(--button-success-background-focus, hsl(120, 95%, 70%));
        outline: var(--button-success-outline-focus, 1px solid hsl(120, 95%, 50%));
    }

    .wrapper.danger{
        color: var(--button-danger, hsl(1, 95%, 15%));
        background-color: var(--button-danger-background, hsl(1, 95%, 80%));
        border: 1px solid var(--button-danger-border, hsl(1, 95%, 55%));
        --icon-fill: var(--button-danger);
    }
    .wrapper.danger:not(.disabled):hover{
        background-color: var(--button-danger-background-hover,  hsl(1, 95%, 75%));
    }
    .wrapper.danger:not(.disabled):focus{
        background-color: var(--button-danger-background-hover,  hsl(1, 95%, 80%));
        outline: var(--button-danger-outline-focus, 1px solid  hsl(1, 95%, 55%));
    }

    .wrapper.switch:focus{
        outline: none;
    }
    .wrapper.switch.switch-on{
        background-color: var(--button-switch-backround, hsl(222, 80%, 60%));
        color: var(--button-switch-color, hsl(222, 80%, 98%));
    }
    .wrapper.switch:not(.switch-on):not(:hover),
    .wrapper.switch:not(.switch-on):focus
    {
        background-color: transparent;
    }
    `
];