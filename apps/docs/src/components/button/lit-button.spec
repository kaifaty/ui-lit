{
  "version": "experimental",
  "tags": [
    {
      "name": "lit-button",
      "path": "./..\\..\\..\\..\\src\\components\\button\\button.component.ts",
      "attributes": [
        {
          "name": "loading",
          "description": "Loading button state. If defined - render spinner.",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "href",
          "description": "Button can be `link` if href defined",
          "type": "string | null"
        },
        {
          "name": "target",
          "description": "Target for `link`. Work with `href` prop.",
          "type": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\"",
          "default": "\"_self\""
        },
        {
          "name": "between",
          "description": "Justyfy space between for button content.",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "switchOn",
          "description": "Switcher state for type=switch button",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "notifyOnClick",
          "description": "Notify on click. Render checked icon for a while.",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "tabindex",
          "description": "Tab index to native tabIntex of reflected inner conteiner. Pay attention - lowercase!",
          "type": "number",
          "default": "0"
        },
        {
          "name": "type",
          "description": "Type of button.",
          "type": "'submit' | 'button' | 'switch' | 'close'",
          "default": "\"button\""
        },
        {
          "name": "size",
          "description": "Button size",
          "type": "'small' | 'medium' | 'large'",
          "default": "\"medium\""
        },
        {
          "name": "disabled",
          "description": "Disabled state",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "autofocus",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "align",
          "description": "Content align",
          "type": "'start' | 'center' | 'end'",
          "default": "\"center\""
        },
        {
          "name": "borderless",
          "description": "Borderless element",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "success",
          "description": "Success",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "danger",
          "description": "Danger style",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "primary",
          "description": "Primary style",
          "type": "boolean",
          "default": "false"
        }
      ],
      "properties": [
        {
          "name": "loading",
          "attribute": "loading",
          "description": "Loading button state. If defined - render spinner.",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "href",
          "attribute": "href",
          "description": "Button can be `link` if href defined",
          "type": "string | null"
        },
        {
          "name": "target",
          "attribute": "target",
          "description": "Target for `link`. Work with `href` prop.",
          "type": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\"",
          "default": "\"_self\""
        },
        {
          "name": "between",
          "attribute": "between",
          "description": "Justyfy space between for button content.",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "switchOn",
          "attribute": "switchOn",
          "description": "Switcher state for type=switch button",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "notifyOnClick",
          "attribute": "notifyOnClick",
          "description": "Notify on click. Render checked icon for a while.",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "tabindex",
          "attribute": "tabindex",
          "description": "Tab index to native tabIntex of reflected inner conteiner. Pay attention - lowercase!",
          "type": "number",
          "default": "0"
        },
        {
          "name": "type",
          "attribute": "type",
          "description": "Type of button.",
          "type": "'submit' | 'button' | 'switch' | 'close'",
          "default": "\"button\""
        },
        {
          "name": "size",
          "attribute": "size",
          "description": "Button size",
          "type": "'small' | 'medium' | 'large'",
          "default": "\"medium\""
        },
        {
          "name": "disabled",
          "attribute": "disabled",
          "description": "Disabled state",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "autofocus",
          "attribute": "autofocus",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "isFocused",
          "type": "boolean"
        }
      ],
      "events": [
        {
          "name": "buttonClose"
        },
        {
          "name": "switchChanged"
        },
        {
          "name": "submitForm"
        }
      ],
      "slots": [
        {
          "name": "icon-before",
          "description": "You can put some elements before content"
        },
        {
          "name": "icon-after",
          "description": "You can put some elements after content"
        }
      ],
      "cssProperties": [
        {
          "name": "--lit-button-background",
          "description": "background",
          "default": "\"initial\""
        },
        {
          "name": "--lit-button-background-focus",
          "description": "background-focus",
          "default": "\"hsl(264, 100%, 55%)\""
        },
        {
          "name": "--lit-button-background-hover",
          "description": "background-hover",
          "default": "\"hsl(264, 100%, 93%)\""
        },
        {
          "name": "--lit-button-border",
          "description": "border",
          "default": "\"1px solid hsl(264, 50%, 85%)\""
        },
        {
          "name": "--lit-button-border-radius",
          "description": "border-radius",
          "default": "\"2px\""
        },
        {
          "name": "--lit-button-color",
          "description": "color",
          "default": "\"hsl(264, 100%, 46%)\""
        },
        {
          "name": "--lit-button-danger-background",
          "description": "danger-background",
          "default": "\"hsl(5, 80%, 55%)\""
        },
        {
          "name": "--lit-button-danger-background-hover",
          "description": "danger-background-hover",
          "default": "\"hsl(5, 80%, 60%)\""
        },
        {
          "name": "--lit-button-danger-border",
          "description": "danger-border",
          "default": "\"1px solid hsl(5, 80%, 55%)\""
        },
        {
          "name": "--lit-button-danger-color",
          "description": "danger-color",
          "default": "\"hsl(5, 80%, 98%)\""
        },
        {
          "name": "--lit-button-danger-outline-focus",
          "description": "danger-outline-focus",
          "default": "\"1px solid hsl(5, 80%, 35%)\""
        },
        {
          "name": "--lit-button-danger-ripple",
          "description": "danger-ripple",
          "default": "\"hsl(5, 80%, 65%)\""
        },
        {
          "name": "--lit-button-display",
          "description": "default display position of button",
          "default": "\"inline-flex\""
        },
        {
          "name": "--lit-button-font-size",
          "description": "Medium size fontsize",
          "default": "\"inherit\""
        },
        {
          "name": "--lit-button-height",
          "description": "Medium size height",
          "default": "\"30px\""
        },
        {
          "name": "--lit-button-icon-gap",
          "description": "icon-gap",
          "default": "\"8px\""
        },
        {
          "name": "--lit-button-justify",
          "description": "justify",
          "default": "\"center\""
        },
        {
          "name": "--lit-button-large-font-size",
          "description": "large-font-size",
          "default": "\"inherit\""
        },
        {
          "name": "--lit-button-large-height",
          "description": "large-height",
          "default": "\"0 40px\""
        },
        {
          "name": "--lit-button-large-padding",
          "description": "large-padding",
          "default": "\"0 20px\""
        },
        {
          "name": "--lit-button-letter-spacing",
          "description": "letter-spacing",
          "default": "\"normal\""
        },
        {
          "name": "--lit-button-outline",
          "description": "outline",
          "default": "\"none\""
        },
        {
          "name": "--lit-button-outline-focus",
          "description": "outline-focus",
          "default": "\"1px #ccc solid\""
        },
        {
          "name": "--lit-button-padding",
          "description": "Medium size padding",
          "default": "\"0 20px\""
        },
        {
          "name": "--lit-button-primary-background",
          "description": "primary-background",
          "default": "\"hsl(264, 80%, 55%)\""
        },
        {
          "name": "--lit-button-primary-background-hover",
          "description": "primary-background-hover",
          "default": "\"hsl(264, 80%, 60%)\""
        },
        {
          "name": "--lit-button-primary-border",
          "description": "primary-border",
          "default": "\"1px solid hsl(264, 80%, 55%)\""
        },
        {
          "name": "--lit-button-primary-color",
          "description": "Primary text color",
          "default": "\"hsl(264, 80%, 98%)\""
        },
        {
          "name": "--lit-button-primary-outline-focus",
          "description": "primary-outline-focus",
          "default": "\"1px solid hsl(264, 80%, 75%)\""
        },
        {
          "name": "--lit-button-primary-ripple",
          "description": "primary-ripple",
          "default": "\"hsl(264, 80%, 75%)\""
        },
        {
          "name": "--lit-button-ripple",
          "description": "ripple",
          "default": "\"hsl(264, 100%, 88%)\""
        },
        {
          "name": "--lit-button-small-font-size",
          "description": "Small size font-size",
          "default": "\"inherit\""
        },
        {
          "name": "--lit-button-small-height",
          "description": "Small size height",
          "default": "\"25px\""
        },
        {
          "name": "--lit-button-small-padding",
          "description": "Small size padding",
          "default": "\"0 6px\""
        },
        {
          "name": "--lit-button-success-background",
          "description": "success-background",
          "default": "\"hsl(110, 80%, 55%)\""
        },
        {
          "name": "--lit-button-success-background-hover",
          "description": "success-background-hover",
          "default": "\"hsl(110, 80%, 60%)\""
        },
        {
          "name": "--lit-button-success-border",
          "description": "success-border",
          "default": "\"1px solid hsl(110, 80%, 55%)\""
        },
        {
          "name": "--lit-button-success-color",
          "description": "success-color",
          "default": "\"hsl(110, 80%, 4%)\""
        },
        {
          "name": "--lit-button-success-outline-focus",
          "description": "success-outline-focus",
          "default": "\"1px solid hsl(110, 80%, 35%)\""
        },
        {
          "name": "--lit-button-success-ripple",
          "description": "success-ripple",
          "default": "\"hsl(110, 80%, 65%)\""
        },
        {
          "name": "--lit-button-switch-color",
          "description": "switch-color",
          "default": "\"hsl(264, 100%, 46%)\""
        },
        {
          "name": "--lit-button-switch-on-background",
          "description": "switch-on-background",
          "default": "\"hsl(264, 80%, 60%)\""
        },
        {
          "name": "--lit-button-switch-on-color",
          "description": "switch-on-color",
          "default": "\"hsl(264, 80%, 98%)\""
        },
        {
          "name": "--lit-button-switch-on-outline-focus",
          "description": "switch-on-outline-focus",
          "default": "\"1px solid hsl(264, 100%, 46%)\""
        },
        {
          "name": "--lit-button-switch-outline-focus",
          "description": "switch-outline-focus",
          "default": "\"1px solid hsl(264, 100%, 46%)\""
        },
        {
          "name": "--lit-button-text-transform",
          "description": "text-transform",
          "default": "\"uppercase\""
        },
        {
          "name": "--lit-button-weight",
          "description": "weight",
          "default": "600"
        }
      ]
    }
  ]
}