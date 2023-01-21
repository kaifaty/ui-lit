# lit-dialog

## Properties

| Property           | Attribute | Modifiers | Type                                  | Default | Description    |
|--------------------|-----------|-----------|---------------------------------------|---------|----------------|
| `hasDialogs`       |           | readonly  | `boolean`                             |         |                |
| `hasOpenedDialogs` |           | readonly  | `boolean`                             |         |                |
| `isClosing`        |           |           | `boolean`                             | false   |                |
| `type`             | `type`    |           | `'modal' \| 'bottomsheet' \| 'smart'` | "smart" | Type of dialog |

## Methods

| Method            | Type                                             |
|-------------------|--------------------------------------------------|
| `#getElementName` | `(): DialogTypes`                                |
| `#onSubmit`       | `(e: CustomEvent<{ data: Record<string, unknown>; }>): Promise<void>` |
| `#onanimationend` | `(e: AnimationEvent): void`                      |
| `back`            | `(): Promise<void> \| undefined`                 |
| `close`           | `(): void`                                       |
| `open`            | `(data: DialogState): Promise<unknown>`          |
| `willUpdate`      | `(): void`                                       |

## CSS Custom Properties

| Property                          | Description        |
|-----------------------------------|--------------------|
| `--lit-dialog-overlap-background` | Background color   |
| `--lit-dialog-overlap-z-index`    | Z-index of overlap |
