{
  "version": "experimental",
  "tags": [
    {
      "name": "lit-checkbox",
      "path": "./..\\..\\..\\..\\src\\components\\checkbox\\checkbox.component.ts",
      "attributes": [
        {
          "name": "type",
          "type": "TCheckboxType",
          "default": "\"switcher\""
        },
        {
          "name": "checked",
          "type": "boolean"
        },
        {
          "name": "name",
          "type": "string",
          "default": "\"\""
        },
        {
          "name": "disabled",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "required",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "readonly",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "customMessage",
          "type": "string",
          "default": "\"\""
        },
        {
          "name": "inputValidation",
          "description": "Validation on each input. Logic must realazied in child class",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "initValidation",
          "description": "Whet false validation will only when current value not equal default value",
          "type": "boolean",
          "default": "true"
        },
        {
          "name": "willValidate",
          "description": "Validation of component (off on false).",
          "type": "boolean",
          "default": "true"
        },
        {
          "name": "reporterNode",
          "description": "Node to report validation state",
          "type": "HTMLElement | undefined"
        },
        {
          "name": "value",
          "type": "string"
        }
      ],
      "properties": [
        {
          "name": "type",
          "attribute": "type",
          "type": "TCheckboxType",
          "default": "\"switcher\""
        },
        {
          "name": "checked",
          "attribute": "checked",
          "type": "boolean"
        },
        {
          "name": "labels",
          "type": "LitLabel[]"
        },
        {
          "name": "styles",
          "type": "CSSResult[]",
          "default": "[\"noselect\",\"checkboxStyles\",\"switcherStyles\"]"
        },
        {
          "name": "name",
          "attribute": "name",
          "type": "string",
          "default": "\"\""
        },
        {
          "name": "disabled",
          "attribute": "disabled",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "required",
          "attribute": "required",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "readonly",
          "attribute": "readonly",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "customMessage",
          "attribute": "customMessage",
          "type": "string",
          "default": "\"\""
        },
        {
          "name": "inputValidation",
          "attribute": "inputValidation",
          "description": "Validation on each input. Logic must realazied in child class",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "initValidation",
          "attribute": "initValidation",
          "description": "Whet false validation will only when current value not equal default value",
          "type": "boolean",
          "default": "true"
        },
        {
          "name": "willValidate",
          "attribute": "willValidate",
          "description": "Validation of component (off on false).",
          "type": "boolean",
          "default": "true"
        },
        {
          "name": "reporterNode",
          "attribute": "reporterNode",
          "description": "Node to report validation state",
          "type": "HTMLElement | undefined"
        },
        {
          "name": "validity",
          "default": "{}"
        },
        {
          "name": "value",
          "attribute": "value",
          "type": "string"
        },
        {
          "name": "form",
          "type": "LitFrom | null"
        },
        {
          "name": "validationMessage"
        }
      ],
      "events": [
        {
          "name": "changed"
        },
        {
          "name": "labledConnected"
        },
        {
          "name": "submitForm"
        },
        {
          "name": "fromAttached"
        }
      ],
      "cssProperties": [
        {
          "name": "--lit-checkbox-checkbox-background",
          "description": "Background color of checkbox",
          "default": "\"#fff\""
        },
        {
          "name": "--lit-checkbox-checkbox-border",
          "description": "Border of checkbox",
          "default": "\"1px solid #999\""
        },
        {
          "name": "--lit-checkbox-checkmark-color",
          "description": "Checkmark color",
          "default": "\"hsl(100, 65%, 5%)\""
        },
        {
          "name": "--lit-checkbox-checkmark-shadow-hover",
          "description": "checkmark-shadow-hover",
          "default": "\"0 0 2px #999\""
        },
        {
          "name": "--lit-checkbox-switcher-control-background",
          "description": "switcher-control-background",
          "default": "\"#fff\""
        },
        {
          "name": "--lit-checkbox-switcher-control-shadow",
          "description": "switcher-control-shadow",
          "default": "\"1px 1px 2px rgba(0,0,0,0.6)\""
        },
        {
          "name": "--lit-checkbox-switcher-off-background",
          "description": "Disabled switcher color",
          "default": "\"hsl(0, 65%, 50%)\""
        },
        {
          "name": "--lit-checkbox-switcher-on-background",
          "description": "Enabled switcher color",
          "default": "\"hsl(110, 65%, 50%)\""
        },
        {
          "name": "--lit-checkbox-switcher-shadow",
          "description": "Shadow of switcher circle",
          "default": "\"inset 1px 1px 2px rgba(0,0,0,0.7)\""
        }
      ]
    }
  ]
}