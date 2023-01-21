# lit-textarea

**Mixins:** focusable, labled, notificatable, formAssociated

## Properties

| Property            | Attribute          | Modifiers | Type                  | Default |
|---------------------|--------------------|-----------|-----------------------|---------|
| `autofocus`         | `autofocus`        |           | `boolean`             | false   |
| `disabled`          | `disabled`         |           | `boolean`             | false   |
| `form`              |                    | readonly  | `LitFrom \| null`     |         |
| `isFirstUpdated`    |                    |           | `boolean`             | false   |
| `isFocused`         |                    | readonly  | `boolean`             |         |
| `labels`            |                    | readonly  | `LitLabel[]`          |         |
| `max`               |                    |           | `number \| undefined` | "NaN"   |
| `min`               |                    |           | `number \| undefined` | "NaN"   |
| `name`              | `name`             |           | `string`              | ""      |
| `pattern`           |                    |           | `string \| undefined` | ""      |
| `placeholder`       | `placeholder`      |           | `string`              | ""      |
| `readonly`          | `readonly`         |           | `boolean`             | false   |
| `required`          | `required`         |           | `boolean`             | false   |
| `resize`            | `resize`           |           | `TResize`             | "none"  |
| `showNote`          | `showNote`         |           | `boolean`             | false   |
| `step`              |                    |           | `number \| undefined` | "NaN"   |
| `valid`             |                    | readonly  | `boolean`             |         |
| `validateOnChange`  | `validateOnChange` |           | `boolean`             | false   |
| `validationMessage` |                    | readonly  | `string`              |         |
| `validity`          |                    |           | `ValidityStateFlags`  | {}      |
| `value`             | `value`            |           | `string`              |         |
| `willValidate`      | `willValidate`     |           | `boolean`             | true    |

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
