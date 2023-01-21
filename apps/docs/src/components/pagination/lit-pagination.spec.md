# lit-pagination

## Properties

| Property     | Attribute    | Modifiers | Type                                  | Default |
|--------------|--------------|-----------|---------------------------------------|---------|
| `length`     | `length`     |           | `number`                              |         |
| `page`       | `page`       |           | `number`                              |         |
| `pageCount`  |              | readonly  | `number`                              |         |
| `pageLength` | `pageLength` |           | `number`                              | 5       |
| `pageList`   |              | readonly  | `{ value: number; label: string; }[]` |         |

## Methods

| Method    | Type                   |
|-----------|------------------------|
| `getPage` | `(): number`           |
| `next`    | `(): void`             |
| `prev`    | `(): void`             |
| `setPage` | `(page: number): void` |

## Events

| Event     | Type                          |
|-----------|-------------------------------|
| `changed` | `CustomEvent<number \| null>` |
