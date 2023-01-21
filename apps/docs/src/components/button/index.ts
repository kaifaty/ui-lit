import {html} from 'lit'

const spec = new URL('./lit-button.spec.md', import.meta.url) as unknown as string
const json = new URL('./lit-button.spec', import.meta.url) as unknown as string
const readme = new URL('./lit-button.md', import.meta.url) as unknown as string

export const ButtonTemplate = html`
<div>
    <lit-wc-viewer src = "${json}"></lit-wc-viewer></lit-wc-viewer>
    <lit-markdown filePath = "${readme}"></lit-markdown>
    <lit-markdown filePath = "${spec}"></lit-markdown>
</div>`