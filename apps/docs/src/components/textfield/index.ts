import {html} from 'lit'

import {LitTextfield} from '../../../../src/components/textfield'
import '../../../../src/components/form'

LitTextfield.define('lit-textfield')

const spec = new URL('./lit-textfield.spec.md', import.meta.url)
const readme = new URL('./lit-textfield.md', import.meta.url)

const node = document.createElement('div')

export const TextfieldTemplate = html`
<div>
    <lit-markdown filePath="${readme as any}"></lit-markdown>
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
    </div>
    <lit-markdown filePath="${spec as any}"></lit-markdown>
</div>`
