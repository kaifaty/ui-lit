# lit-tooltip

## Properties

| Property      | Type                                             | Default                                          |
|---------------|--------------------------------------------------|--------------------------------------------------|
| `getPosition` | `() => { top: string; bottom: string; maxHeight: string; left: string; right: string; maxWidth: string; }` | "() => {\r\n        const targetRect = this.getBoundingClientRect()\r\n        const awailableWidth = window.visualViewport?.width \|\| 0\r\n        const awailableHeight = window.visualViewport?.height \|\| 0\r\n        \r\n        const x = (targetRect.x) //\|\| rect.x;\r\n        const y = (targetRect.y) //\|\| rect.y;\r\n\r\n        const availableTop = y\r\n        const availableBottom = awailableHeight - y\r\n        const availableLeft = x\r\n        const availableRight = awailableWidth - x\r\n        return {\r\n            top: availableTop < availableBottom ? (availableTop + targetRect.height) + 'px' : 'initial',\r\n            bottom: availableTop > availableBottom ? availableBottom + 'px' : 'initial',\r\n            maxHeight: availableTop < availableBottom ? (availableBottom - 10) + 'px' : (availableTop - 10) + 'px',\r\n\r\n            left: availableLeft < availableRight ? (availableLeft + targetRect.width) + 'px' : 'initial',\r\n            right: availableLeft > availableRight ? (availableRight + 10) + 'px' : 'initial', \r\n            maxWidth: availableLeft < availableRight ? (availableRight - targetRect.width - 10)  + 'px' : (availableLeft - 10) + 'px'\r\n        }\r\n        \r\n    }" |
| `opened`      | `boolean`                                        | false                                            |

## Methods

| Method  | Type       |
|---------|------------|
| `close` | `(): void` |
| `open`  | `(): void` |
