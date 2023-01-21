# lit-button

**Mixins:** focusable, definable

## Attributes

| Attribute    | Type                           | Default  | Description        |
|--------------|--------------------------------|----------|--------------------|
| `align`      | `'start' \| 'center' \| 'end'` | "center" | Content align      |
| `borderless` | `boolean`                      | false    | Borderless element |
| `danger`     | `boolean`                      | false    | Danger style       |
| `primary`    | `boolean`                      | false    | Primary style      |
| `success`    | `boolean`                      | false    | Success            |

## Properties

| Property        | Attribute       | Modifiers | Type                                          | Default  | Description                                      |
|-----------------|-----------------|-----------|-----------------------------------------------|----------|--------------------------------------------------|
| `autofocus`     | `autofocus`     |           | `boolean`                                     | false    |                                                  |
| `between`       | `between`       |           | `boolean`                                     | false    | Justyfy space between for button content.        |
| `disabled`      | `disabled`      |           | `boolean`                                     | false    | Disabled state                                   |
| `href`          | `href`          |           | `string \| null`                              | null     | Button can be `link` if href defined             |
| `isFocused`     |                 | readonly  | `boolean`                                     |          |                                                  |
| `loading`       | `loading`       |           | `boolean`                                     | false    | Loading button state. If defined - render spinner. |
| `notifyOnClick` | `notifyOnClick` |           | `boolean`                                     | false    | Notify on click. Render checked icon for a while. |
| `size`          | `size`          |           | `'small' \| 'medium' \| 'large'`              | "medium" | Button size                                      |
| `switchOn`      | `switchOn`      |           | `boolean`                                     | false    | Switcher state for type=switch button            |
| `tabindex`      | `tabindex`      |           | `number`                                      | 0        | Tab index to native tabIntex of reflected inner conteiner. Pay attention - lowercase! |
| `target`        | `target`        |           | `"_blank" \| "_parent" \| "_self" \| "_top"`  | "_self"  | Target for `link`. Work with `href` prop.        |
| `type`          | `type`          |           | `'submit' \| 'button' \| 'switch' \| 'close'` | "button" | Type of button.                                  |

## Methods

| Method         | Type       | Description                                   |
|----------------|------------|-----------------------------------------------|
| `blur`         | `(): void` |                                               |
| `click`        | `(): void` | Click button action                           |
| `focus`        | `(): void` |                                               |
| `submit`       | `(): void` | Submit for type='submit' button               |
| `toggleSwitch` | `(): void` | Toggle switchOn state for type=switch button. |

## Events

| Event           | Type                   |
|-----------------|------------------------|
| `buttonClose`   | `CustomEvent<boolean>` |
| `submitForm`    | `CustomEvent<boolean>` |
| `switchChanged` | `CustomEvent<boolean>` |

## Slots

| Name          | Description                              |
|---------------|------------------------------------------|
| `icon-after`  | You can put some elements after content  |
| `icon-before` | You can put some elements before content |

## CSS Custom Properties

| Property                                | Default                         | Description                        |
|-----------------------------------------|---------------------------------|------------------------------------|
| `--lit-button-background`               | "initial"                       | background                         |
| `--lit-button-background-focus`         | "hsl(264, 100%, 55%)"           | background-focus                   |
| `--lit-button-background-hover`         | "hsl(264, 100%, 93%)"           | background-hover                   |
| `--lit-button-border`                   | "1px solid hsl(264, 50%, 85%)"  | border                             |
| `--lit-button-border-radius`            | "2px"                           | border-radius                      |
| `--lit-button-color`                    | "hsl(264, 100%, 46%)"           | color                              |
| `--lit-button-danger-background`        | "hsl(5, 80%, 55%)"              | danger-background                  |
| `--lit-button-danger-background-hover`  | "hsl(5, 80%, 60%)"              | danger-background-hover            |
| `--lit-button-danger-border`            | "1px solid hsl(5, 80%, 55%)"    | danger-border                      |
| `--lit-button-danger-color`             | "hsl(5, 80%, 98%)"              | danger-color                       |
| `--lit-button-danger-outline-focus`     | "1px solid hsl(5, 80%, 35%)"    | danger-outline-focus               |
| `--lit-button-danger-ripple`            | "hsl(5, 80%, 65%)"              | danger-ripple                      |
| `--lit-button-display`                  | "inline-flex"                   | default display position of button |
| `--lit-button-font-size`                | "inherit"                       | Medium size fontsize               |
| `--lit-button-height`                   | "30px"                          | Medium size height                 |
| `--lit-button-icon-gap`                 | "8px"                           | icon-gap                           |
| `--lit-button-justify`                  | "center"                        | justify                            |
| `--lit-button-large-font-size`          | "inherit"                       | large-font-size                    |
| `--lit-button-large-height`             | "0 40px"                        | large-height                       |
| `--lit-button-large-padding`            | "0 20px"                        | large-padding                      |
| `--lit-button-letter-spacing`           | "normal"                        | letter-spacing                     |
| `--lit-button-outline`                  | "none"                          | outline                            |
| `--lit-button-outline-focus`            | "1px #ccc solid"                | outline-focus                      |
| `--lit-button-padding`                  | "0 20px"                        | Medium size padding                |
| `--lit-button-primary-background`       | "hsl(264, 80%, 55%)"            | primary-background                 |
| `--lit-button-primary-background-hover` | "hsl(264, 80%, 60%)"            | primary-background-hover           |
| `--lit-button-primary-border`           | "1px solid hsl(264, 80%, 55%)"  | primary-border                     |
| `--lit-button-primary-color`            | "hsl(264, 80%, 98%)"            | Primary text color                 |
| `--lit-button-primary-outline-focus`    | "1px solid hsl(264, 80%, 75%)"  | primary-outline-focus              |
| `--lit-button-primary-ripple`           | "hsl(264, 80%, 75%)"            | primary-ripple                     |
| `--lit-button-ripple`                   | "hsl(264, 100%, 88%)"           | ripple                             |
| `--lit-button-small-font-size`          | "inherit"                       | Small size font-size               |
| `--lit-button-small-height`             | "25px"                          | Small size height                  |
| `--lit-button-small-padding`            | "0 6px"                         | Small size padding                 |
| `--lit-button-success-background`       | "hsl(110, 80%, 55%)"            | success-background                 |
| `--lit-button-success-background-hover` | "hsl(110, 80%, 60%)"            | success-background-hover           |
| `--lit-button-success-border`           | "1px solid hsl(110, 80%, 55%)"  | success-border                     |
| `--lit-button-success-color`            | "hsl(110, 80%, 4%)"             | success-color                      |
| `--lit-button-success-outline-focus`    | "1px solid hsl(110, 80%, 35%)"  | success-outline-focus              |
| `--lit-button-success-ripple`           | "hsl(110, 80%, 65%)"            | success-ripple                     |
| `--lit-button-switch-color`             | "hsl(264, 100%, 46%)"           | switch-color                       |
| `--lit-button-switch-on-background`     | "hsl(264, 80%, 60%)"            | switch-on-background               |
| `--lit-button-switch-on-color`          | "hsl(264, 80%, 98%)"            | switch-on-color                    |
| `--lit-button-switch-on-outline-focus`  | "1px solid hsl(264, 100%, 46%)" | switch-on-outline-focus            |
| `--lit-button-switch-outline-focus`     | "1px solid hsl(264, 100%, 46%)" | switch-outline-focus               |
| `--lit-button-text-transform`           | "uppercase"                     | text-transform                     |
| `--lit-button-weight`                   | 600                             | weight                             |
