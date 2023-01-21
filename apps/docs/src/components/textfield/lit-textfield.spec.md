# lit-textfield

**Mixins:** focusable, labled, definable

## Properties

| Property            | Attribute         | Modifiers | Type                                   | Default | Description                                      |
|---------------------|-------------------|-----------|----------------------------------------|---------|--------------------------------------------------|
| `autocomplete`      | `autocomplete`    |           | `"on" \| "off" \| "current-password"`  | "off"   |                                                  |
| `autofocus`         | `autofocus`       |           | `boolean`                              | false   |                                                  |
| `customMessage`     | `customMessage`   |           | `string`                               | ""      |                                                  |
| `disabled`          | `disabled`        |           | `boolean`                              | false   |                                                  |
| `form`              |                   | readonly  | `LitFrom \| null`                      |         |                                                  |
| `hiddenPassword`    |                   |           | `boolean`                              | true    |                                                  |
| `icon`              | `icon`            |           | `string \| TemplateResult<ResultType>` | ""      |                                                  |
| `initValidation`    | `initValidation`  |           | `boolean`                              | true    | Whet false validation will only when current value not equal default value |
| `inputValidation`   | `inputValidation` |           | `boolean`                              | false   | Validation on each input. Logic must realazied in child class |
| `inputmode`         | `inputmode`       |           | `TInputMode`                           | "text"  |                                                  |
| `isFocused`         |                   | readonly  | `boolean`                              |         |                                                  |
| `labels`            |                   | readonly  | `LitLabel[]`                           |         |                                                  |
| `maxlength`         | `maxlength`       |           | `number`                               | 0       |                                                  |
| `minlength`         | `minlength`       |           | `number`                               | 0       |                                                  |
| `name`              | `name`            |           | `string`                               | ""      |                                                  |
| `pattern`           | `pattern`         |           | `string`                               | ""      |                                                  |
| `placeholder`       | `placeholder`     |           | `string`                               | ""      |                                                  |
| `readonly`          | `readonly`        |           | `boolean`                              | false   |                                                  |
| `reporterNode`      | `reporterNode`    |           | `HTMLElement \| undefined`             |         | Node to report validation state                  |
| `required`          | `required`        |           | `boolean`                              | false   |                                                  |
| `selectionStart`    |                   | readonly  | `number`                               |         |                                                  |
| `size`              | `size`            |           | `number`                               | 0       |                                                  |
| `spellcheck`        | `spellcheck`      |           | `boolean`                              | false   |                                                  |
| `type`              | `type`            |           | `TFileldTypes`                         | "text"  |                                                  |
| `validationMessage` |                   | readonly  |                                        |         |                                                  |
| `validity`          |                   |           |                                        | {}      |                                                  |
| `value`             | `value`           |           | `string`                               |         |                                                  |
| `valueAsDate`       |                   |           | `Date`                                 |         |                                                  |
| `valueAsNumber`     |                   |           | `number`                               |         |                                                  |
| `willValidate`      | `willValidate`    |           | `boolean`                              | true    | Validation of component (off on false).          |
| `withCancalation`   | `withCancalation` |           | `boolean`                              | false   |                                                  |

## Methods

| Method              | Type                      | Description                                      |
|---------------------|---------------------------|--------------------------------------------------|
| `addLabel`          | `(label: LitLabel): void` | **label**: custom label                          |
| `blur`              | `(): void`                |                                                  |
| `checkValidity`     | `(): boolean`             | Checks if an element meets any constraint validation rules applied to it. |
| `focus`             | `(): void`                |                                                  |
| `removeLabel`       | `(label: LitLabel): void` | **label**: custom label                          |
| `reportValidity`    | `(): boolean`             | Checks if an element meets any constraint validation rules applied to it, and also sends a validation message to the user agent. |
| `setCustomValidity` | `(message: string): void` | Set custom message on any validation fallback<br /><br />**message**: Custom validation message |
| `validate`          | `(): void`                |                                                  |
| `validityDefault`   | `(): void`                |                                                  |

## Events

| Event             | Type                                             |
|-------------------|--------------------------------------------------|
| `changed`         | `CustomEvent<string>`                            |
| `fromAttached`    | `CustomEvent<{ element: this; onAttatch: (form: LitFrom) => void; }>` |
| `labledConnected` | `CustomEvent<this>`                              |
| `submitForm`      |                                                  |
