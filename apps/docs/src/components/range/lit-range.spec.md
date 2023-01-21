# lit-range

<lit-range></lit-range>

**Mixins:** focusable, labled, notificatable, formAssociated

## Properties

| Property            | Attribute          | Modifiers | Type                  | Default |
|---------------------|--------------------|-----------|-----------------------|---------|
| `autofocus`         | `autofocus`        |           | `boolean`             | false   |
| `decimals`          | `decimals`         |           | `number`              | 8       |
| `disabled`          | `disabled`         |           | `boolean`             | false   |
| `disabledByVol`     |                    |           | `boolean`             | true    |
| `form`              |                    | readonly  | `LitFrom \| null`     |         |
| `isFirstUpdated`    |                    |           | `boolean`             | false   |
| `isFocused`         |                    | readonly  | `boolean`             |         |
| `isPercentHidden`   |                    |           | `boolean`             | true    |
| `labels`            |                    | readonly  | `LitLabel[]`          |         |
| `max`               | `max`              |           | `number`              | "NaN"   |
| `min`               | `min`              |           | `number`              | "NaN"   |
| `minPercent`        |                    | readonly  | `number`              |         |
| `name`              | `name`             |           | `string`              | ""      |
| `offsetX`           |                    | readonly  | `number`              |         |
| `pattern`           |                    |           | `string \| undefined` | ""      |
| `percent`           |                    | readonly  | `number`              |         |
| `readonly`          | `readonly`         |           | `boolean`             | false   |
| `required`          | `required`         |           | `boolean`             | false   |
| `showNote`          | `showNote`         |           | `boolean`             | false   |
| `showPercent`       | `showPercent`      |           | `boolean`             | false   |
| `startFromMin`      | `startFromMin`     |           | `boolean`             | false   |
| `step`              |                    |           | `number \| undefined` | "NaN"   |
| `tabindex`          |                    |           | `number`              | 0       |
| `usePoints`         | `usePoints`        |           | `boolean`             | false   |
| `valid`             |                    | readonly  | `boolean`             |         |
| `validateOnChange`  | `validateOnChange` |           | `boolean`             | false   |
| `validationMessage` |                    | readonly  | `string`              |         |
| `validity`          |                    |           | `ValidityStateFlags`  | {}      |
| `value`             | `value`            |           | `string`              |         |
| `valueAsNumber`     |                    |           | `number`              |         |
| `willValidate`      | `willValidate`     |           | `boolean`             | true    |

## Methods

| Method            | Type                                             |
|-------------------|--------------------------------------------------|
| `addLabel`        | `(label: LitLabel): void`                        |
| `blur`            | `(): void`                                       |
| `checkValidity`   | `(): boolean`                                    |
| `focus`           | `(): void`                                       |
| `isDisabled`      | `(): boolean`                                    |
| `notify`          | `(): void`                                       |
| `removeLabel`     | `(label: LitLabel): void`                        |
| `reportValidity`  | `(): boolean`                                    |
| `setPercent`      | `(value: number): void`                          |
| `setValidity`     | `(flags: ValidityStateFlags, message?: string \| undefined, anchor?: HTMLElement \| undefined): void` |
| `validate`        | `(): void`                                       |
| `validityDefault` | `(): void`                                       |
| `willUpdate`      | `(): void`                                       |

## Events

| Event             | Type                                             |
|-------------------|--------------------------------------------------|
| `changed`         | `CustomEvent<{ value: string; percent: number; valueAsNumber: number; type: string; }>` |
| `fromAttached`    | `CustomEvent<{ element: this; onAttatch: (form: LitFrom) => void; }>` |
| `labledConnected` | `CustomEvent<this>`                              |
| `reportInvalid`   |                                                  |
| `submitForm`      |                                                  |

## CSS Custom Properties

| Property              | Description                    |
|-----------------------|--------------------------------|
| `--lit-range`         | track Track color              |
| `--lit-range-filled`  | hover Fillted color            |
| `--lit-range-outline` | focus Outline when focused     |
| `--lit-range-points`  | background Points background   |
| `--lit-range-thumb`   | size Thumb size                |
| `--lit-range-track`   | hover Track color when hovered |
