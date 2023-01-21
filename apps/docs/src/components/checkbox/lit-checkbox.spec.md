# lit-checkbox

**Mixins:** labled, definable

## Properties

| Property            | Attribute         | Modifiers | Type                       | Default    | Description                                      |
|---------------------|-------------------|-----------|----------------------------|------------|--------------------------------------------------|
| `checked`           | `checked`         |           | `boolean`                  |            |                                                  |
| `customMessage`     | `customMessage`   |           | `string`                   | ""         |                                                  |
| `disabled`          | `disabled`        |           | `boolean`                  | false      |                                                  |
| `form`              |                   | readonly  | `LitFrom \| null`          |            |                                                  |
| `initValidation`    | `initValidation`  |           | `boolean`                  | true       | Whet false validation will only when current value not equal default value |
| `inputValidation`   | `inputValidation` |           | `boolean`                  | false      | Validation on each input. Logic must realazied in child class |
| `labels`            |                   | readonly  | `LitLabel[]`               |            |                                                  |
| `name`              | `name`            |           | `string`                   | ""         |                                                  |
| `readonly`          | `readonly`        |           | `boolean`                  | false      |                                                  |
| `reporterNode`      | `reporterNode`    |           | `HTMLElement \| undefined` |            | Node to report validation state                  |
| `required`          | `required`        |           | `boolean`                  | false      |                                                  |
| `type`              | `type`            |           | `TCheckboxType`            | "switcher" |                                                  |
| `validationMessage` |                   | readonly  |                            |            |                                                  |
| `validity`          |                   |           |                            | {}         |                                                  |
| `value`             | `value`           |           | `string`                   |            |                                                  |
| `willValidate`      | `willValidate`    |           | `boolean`                  | true       | Validation of component (off on false).          |

## Methods

| Method              | Type                      | Description                                      |
|---------------------|---------------------------|--------------------------------------------------|
| `addLabel`          | `(label: LitLabel): void` | **label**: custom label                          |
| `checkValidity`     | `(): boolean`             | Checks if an element meets any constraint validation rules applied to it. |
| `click`             | `(): void`                |                                                  |
| `removeLabel`       | `(label: LitLabel): void` | **label**: custom label                          |
| `reportValidity`    | `(): boolean`             | Checks if an element meets any constraint validation rules applied to it, and also sends a validation message to the user agent. |
| `setCustomValidity` | `(message: string): void` | Set custom message on any validation fallback<br /><br />**message**: Custom validation message |
| `toggle`            | `(): void`                |                                                  |
| `validate`          | `(): void`                |                                                  |
| `validityDefault`   | `(): void`                |                                                  |

## Events

| Event             | Type                                             |
|-------------------|--------------------------------------------------|
| `changed`         | `CustomEvent<{ value: string; checked: boolean; }>` |
| `fromAttached`    | `CustomEvent<{ element: this; onAttatch: (form: LitFrom) => void; }>` |
| `labledConnected` | `CustomEvent<this>`                              |
| `submitForm`      |                                                  |

## CSS Custom Properties

| Property                                     | Default                             | Description                  |
|----------------------------------------------|-------------------------------------|------------------------------|
| `--lit-checkbox-checkbox-background`         | "#fff"                              | Background color of checkbox |
| `--lit-checkbox-checkbox-border`             | "1px solid #999"                    | Border of checkbox           |
| `--lit-checkbox-checkmark-color`             | "hsl(100, 65%, 5%)"                 | Checkmark color              |
| `--lit-checkbox-checkmark-shadow-hover`      | "0 0 2px #999"                      | checkmark-shadow-hover       |
| `--lit-checkbox-switcher-control-background` | "#fff"                              | switcher-control-background  |
| `--lit-checkbox-switcher-control-shadow`     | "1px 1px 2px rgba(0,0,0,0.6)"       | switcher-control-shadow      |
| `--lit-checkbox-switcher-off-background`     | "hsl(0, 65%, 50%)"                  | Disabled switcher color      |
| `--lit-checkbox-switcher-on-background`      | "hsl(110, 65%, 50%)"                | Enabled switcher color       |
| `--lit-checkbox-switcher-shadow`             | "inset 1px 1px 2px rgba(0,0,0,0.7)" | Shadow of switcher circle    |
