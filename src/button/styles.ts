import { css, unsafeCSS } from 'lit';
import { noselect } from '../styles/noselect';


const defaultStates = [{
    key: 'primary',
    defaultColor: 264
}, {
    key: 'success', 
    defaultColor: 110
}, {
    key: 'danger',
    defaultColor: 5
}];

export const button = [
    noselect,
    css`
    :host{
        display: var(--lit-button-display, inline-flex);
        white-space: nowrap;
    }
    
    :host([size = "small"]) .wrapper{
        height: var(--lit-button-small-height, 25px);
        padding: var(--lit-button-small-padding, 0 6px);
        font-size: var(--lit-button-small-font-size);
    }
    :host([size = "medium"]) .wrapper{
        height: var(--lit-button-small-height, 30px);
        padding: var(--lit-button-large-padding,  0 20px);
        font-size: var(--lit-button-font-size);
    }
    :host([size = "large"]) .wrapper{
        padding: var(--lit-button-large-padding,  0 20px);
        height: var(--lit-button-large-height, 35px);
        font-size: var(--lit-button-large-font-size, 1.1rem);
    }

    :host([disabled]), 
    :host([loading]){
        pointer-events: none;
    }
    :host([disabled]) .wrapper{
        opacity: 0.4;
    }
    
    :host([between]) .wrapper{
        justify-content: space-between;
    }
    .wrapper{
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        display: grid;
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
        letter-spacing: var(--lit-button-letter-spacing, normal);
        outline: var(--lit-button-outline, none);
        border: var(--lit-button-border, 1px solid hsl(264, 50%, 85%));
        color: var(--lit-button-color, hsl(264, 100%, 46%));
        --lit-icon-color: var(--lit-button-color, hsl(264, 100%, 46%));   
    }
    .wrapper{
        background-color: var(--lit-button-background);
    }
    lit-spinner{
        height: 12.8px;
        width: 12.8px;
        justify-self: center;
    }

    :host([loading]) .wrapper{
        cursor: initial;
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

    :host([borderless]) .wrapper,
    :host([borderless]) .wrapper.hover,
    :host([borderless]) .wrapper.focus{
        border: 1px solid transparent;
        outline: none;
        
    }`,
    ...defaultStates.map(k => {
        const key = unsafeCSS(k.key);
        const h = unsafeCSS(k.defaultColor);
        const color = unsafeCSS(((k.defaultColor < 30 || k.defaultColor > 190) ? 95 : 5) + "%");

        return css`
        :host{
            --${key}-hue: var(--lit-${key}-hue, ${h});
        }
        :host([${key}]) .wrapper{
            color: var(--lit-button-${key}-color, hsl(var(--${key}-hue), 95%, ${color}));
            border: var(--lit-button-${key}-border, 1px solid hsl(var(--${key}-hue), 50%, 85%));
            --lit-icon-color: var(--lit-button-${key}-color, hsl(var(--${key}-hue), 95%, 98%));
        }
        :host([${key}]) .wrapper::before,
        :host([${key}]) .wrapper::after{
            background-color: var(--lit-button-${key}-background, hsl(var(--${key}-hue), 95%, 55%));
        }
        `
    })
];

/**
        :host([${key}]) .wrapper.hover{
            color: var(--lit-button-${key}-color-hover);
            background-color: var(--lit-button-${key}-background-hover,  hsl(264, 95%, 62%));
            outline: var(--lit-button-${key}-outline-hover);
        } */