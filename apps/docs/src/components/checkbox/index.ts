import {html} from 'lit'
import '../../../../src/components/markdown'
import '../../../../src/components/checkbox'
import '../../../../src/components/form'


const spec = new URL('./lit-checkbox.spec.md', import.meta.url)
const readme = new URL('./lit-checkbox.md', import.meta.url)

export const CheckboxTemplate = html`
<div>
    <lit-markdown filePath="${readme as any}"></lit-markdown>
    <lit-markdown filePath="${spec as any}"></lit-markdown>
</div>`