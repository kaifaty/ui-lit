# Examples

## Simple textfiled

```html
<lit-textfield></lit-textfield>
```

<lit-textfield></lit-textfield>

## Min length validation

```html
<lit-textfield minlength = "4" ></lit-textfield>
```

<lit-textfield minlength = "4" ></lit-textfield>

## Textfiled with custom reporterNode

```js
import {html} from 'lit'
import {LitTextField} from '../../../../src/components/textfield'

LitTextField.define('lit-textfield')

const node = document.createElement('div')

export const TextfieldTemplate = html`
<div>
    <lit-textfield .reporterNode = "${node}" maxlength = "4" inputvalidation></lit-textfield>
    <style>
        .reporter{
            color: red; 
            padding: 20px; 
            height: 40px;
            margin-bottom: 50px;
        }
    </style>
    <div class = "reporter">
        ${node}
    </div>
</div>`

```
