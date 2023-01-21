{
  "version": "experimental",
  "tags": [
    {
      "name": "lit-dialog",
      "path": "./..\\..\\..\\..\\..\\src\\components\\dialog\\dialog\\dialog.component.ts",
      "attributes": [
        {
          "name": "type",
          "description": "Type of dialog",
          "type": "'modal' | 'bottomsheet' | 'smart'",
          "default": "\"smart\""
        }
      ],
      "properties": [
        {
          "name": "styles",
          "type": "CSSResult",
          "default": "\"css`\\r\\n    :host{\\r\\n        word-wrap: break-word;\\r\\n        visibility: hidden;\\r\\n        isolation: isolate;\\r\\n        position: fixed;\\r\\n        top: 0;\\r\\n        padding: 0;\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n        z-index: ${getVar('overlap-z-index')};\\r\\n    }\\r\\n    :host([visible]){\\r\\n        visibility: visible;\\r\\n    }\\r\\n    .overlap{\\r\\n        position: absolute;\\r\\n        margin: 0;\\r\\n        top: 0;\\r\\n        padding: 0;\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n        z-index: 0;\\r\\n        background-color: ${getVar('overlap-background')};\\r\\n    }\\r\\n    .content{\\r\\n        z-index: 2;\\r\\n    }\\r\\n    \\r\\n    .overlap.visible{\\r\\n        animation-duration: 0.3s;\\r\\n        animation-name: fadein;\\r\\n        animation-timing-function: ease-in;   \\r\\n    }\\r\\n    .overlap.visible.closing{\\r\\n        animation-duration: 0.3s;\\r\\n        animation-name: fadeout;\\r\\n        animation-timing-function: ease;   \\r\\n        animation-fill-mode: forwards;\\r\\n    }\\r\\n    @keyframes fadein{\\r\\n        0% {\\r\\n            opacity: 0;\\r\\n        }\\r\\n        100% {\\r\\n            opacity: 1;\\r\\n        }\\r\\n    }\\r\\n    @keyframes fadeout{\\r\\n        0% {\\r\\n            opacity: 1;\\r\\n        }\\r\\n        100% {\\r\\n            opacity: 0;\\r\\n        }\\r\\n    }`\""
        },
        {
          "name": "isClosing",
          "type": "boolean",
          "default": "false"
        },
        {
          "name": "hasDialogs",
          "type": "boolean"
        },
        {
          "name": "hasOpenedDialogs",
          "type": "boolean"
        },
        {
          "name": "type",
          "attribute": "type",
          "description": "Type of dialog",
          "type": "'modal' | 'bottomsheet' | 'smart'",
          "default": "\"smart\""
        }
      ],
      "cssProperties": [
        {
          "name": "--lit-dialog-overlap-z-index",
          "description": "Z-index of overlap"
        },
        {
          "name": "--lit-dialog-overlap-background",
          "description": "Background color"
        }
      ]
    }
  ]
}