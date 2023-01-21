# lit-form

## Properties

| Property      | Attribute    | Modifiers | Type                      | Default  |
|---------------|--------------|-----------|---------------------------|----------|
| `button`      |              | readonly  | `LitButton \| null`       |          |
| `disabled`    |              |           | `boolean`                 |          |
| `elements`    |              | readonly  | `FormAssociatedElement[]` |          |
| `length`      |              | readonly  | `number`                  |          |
| `noValidate`  | `noValidate` |           | `boolean`                 | false    |
| `noValidate ` |              |           |                           | " false" |
| `onAction`    | `onAction`   |           | `TAction \| undefined`    |          |

## Methods

| Method           | Type                                |
|------------------|-------------------------------------|
| `checkValidity`  | `(): boolean`                       |
| `detatchElement` | `(el: HTMLElement): void`           |
| `getData`        | `(): TReturnData`                   |
| `reportValidity` | `(): boolean`                       |
| `reset`          | `(): Promise<unknown>`              |
| `submit`         | `(): Promise<false \| TReturnData>` |

## Events

| Event    | Type                                  | Description      |
|----------|---------------------------------------|------------------|
| `submit` | `CustomEvent<{ data: TReturnData; }>` | Submit form data |
