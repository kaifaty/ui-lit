# lit-numberfield

**Mixins:** focusable, labled, notificatable, formAssociated

## Properties

| Property            | Attribute          | Modifiers | Type                                   | Default   |
|---------------------|--------------------|-----------|----------------------------------------|-----------|
| `autofocus`         | `autofocus`        |           | `boolean`                              | false     |
| `decimals`          | `decimals`         |           | `number`                               | 8         |
| `disabled`          | `disabled`         |           | `boolean`                              | false     |
| `form`              |                    | readonly  | `LitFrom \| null`                      |           |
| `icon`              | `icon`             |           | `string \| TemplateResult<ResultType>` | ""        |
| `inputmode`         | `inputmode`        |           | `"decimal" \| "numeric"`               | "decimal" |
| `isFirstUpdated`    |                    |           | `boolean`                              | false     |
| `isFocused`         |                    | readonly  | `boolean`                              |           |
| `labels`            |                    | readonly  | `LitLabel[]`                           |           |
| `max`               | `max`              |           | `number`                               | "NaN"     |
| `min`               | `min`              |           | `number`                               | "NaN"     |
| `name`              | `name`             |           | `string`                               | ""        |
| `pattern`           |                    |           | `string \| undefined`                  | ""        |
| `placeholder`       | `placeholder`      |           | `string`                               | ""        |
| `readonly`          | `readonly`         |           | `boolean`                              | false     |
| `replaceToRange`    | `replaceToRange`   |           | `boolean`                              | false     |
| `required`          | `required`         |           | `boolean`                              | false     |
| `selectionStart`    |                    | readonly  | `number`                               |           |
| `showNote`          | `showNote`         |           | `boolean`                              | false     |
| `step`              |                    |           | `number \| undefined`                  | "NaN"     |
| `useCancelButton`   | `useCancelButton`  |           | `boolean`                              | false     |
| `valid`             |                    | readonly  | `boolean`                              |           |
| `validateOnChange`  | `validateOnChange` |           | `boolean`                              | false     |
| `validationMessage` |                    | readonly  | `string`                               |           |
| `validity`          |                    |           | `ValidityStateFlags`                   | {}        |
| `value`             | `value`            |           | `string`                               |           |
| `valueAsNumber`     | `valueAsNumber`    |           | `number`                               |           |
| `willValidate`      | `willValidate`     |           | `boolean`                              | true      |

## Methods

| Method            | Type                                             |
|-------------------|--------------------------------------------------|
| `addLabel`        | `(label: LitLabel): void`                        |
| `blur`            | `(): void`                                       |
| `checkValidity`   | `(): boolean`                                    |
| `focus`           | `(): void`                                       |
| `notify`          | `(): void`                                       |
| `removeLabel`     | `(label: LitLabel): void`                        |
| `reportValidity`  | `(): boolean`                                    |
| `setValidity`     | `(flags: ValidityStateFlags, message?: string \| undefined, anchor?: HTMLElement \| undefined): void` |
| `validate`        | `(): void`                                       |
| `validityDefault` | `(): void`                                       |
| `willUpdate`      | `(_changedProperties: Map<string \| number \| symbol, unknown>): void` |

## Events

| Event             | Type                                             |
|-------------------|--------------------------------------------------|
| `changed`         | `CustomEvent<string>`                            |
| `fromAttached`    | `CustomEvent<{ element: this; onAttatch: (form: LitFrom) => void; }>` |
| `labledConnected` | `CustomEvent<this>`                              |
| `reportInvalid`   |                                                  |
| `submitForm`      |                                                  |
