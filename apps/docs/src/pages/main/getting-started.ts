import {html} from 'lit'

const main = new URL('./main.md', import.meta.url)

import '../../../../src/components/markdown'

export const GettingStartedTemplate = html`<lit-markdown filePath = "${main as any}" ></lit-markdown>`