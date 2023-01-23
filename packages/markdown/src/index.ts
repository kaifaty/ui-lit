import {html, LitElement, PropertyValueMap, css} from 'lit'
import {property, state} from 'lit/decorators'
import {unsafeHTML} from 'lit/directives/unsafe-html'
import type MarkdownIt from 'markdown-it'

import {definable, stylable} from '@ui-lit/utils'
import type {Constructor} from '@ui-lit/types'

import {androidStyles} from './styles'
import {markdownCSSVars, PREFIX} from './styles.map'

/**
 * Markdown instance
 */
let md: MarkdownIt
const cacheMap = new Map<string, string>()

/**
 * @element lit-markdown - Markdowm text
 *
 */
export class LitMarkdown extends stylable(definable(LitElement), markdownCSSVars, PREFIX) {
  static styles = [
    androidStyles,
    css`
      :host {
        font-size: 16px;
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji';
      }
      .line-counter {
        color: ${this.cssVar('color-line-counter')};
        user-select: none;
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -o-user-select: none;
        margin-right: 20px;
      }
      .lang-name {
        position: absolute;
        right: 8px;
        top: 4px;
        color: ${this.cssVar('color-lang')};
      }
      .code {
        line-height: 1.3;
        position: relative;
        padding: 10px;
        border-radius: 5px;
        display: block;
        background-color: ${this.cssVar('background')};
        color: ${this.cssVar('color')};
        box-shadow: 2px 2px 4px ${this.cssVar('box-shadow')};
      }

      a {
        color: ${this.cssVar('color-link')};
        text-decoration: none;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        cursor: text;
        position: relative;
      }

      h1:first-child,
      h2:first-child,
      h3:first-child {
        margin-top: 0 !important;
        word-wrap: break-word;
      }
      h1:hover a.anchor,
      h2:hover a.anchor,
      h3:hover a.anchor,
      h4:hover a.anchor,
      h5:hover a.anchor,
      h6:hover a.anchor {
        text-decoration: none;
      }
      h1 {
        padding-bottom: 0.3em;
        font-size: 2em;
        border-bottom: 1px solid ${this.cssVar('border-muted')};
      }

      h2 {
        padding-bottom: 0.3em;
        font-size: 1.5em;
        border-bottom: 1px solid ${this.cssVar('border-muted')};
      }

      h3 {
        font-size: 1.25em;
      }

      h4 {
        font-size: 1em;
      }

      h5 {
        font-size: 0.875em;
      }

      h6 {
        font-size: 0.85em;
        color: ${this.cssVar('color-muted')};
      }

      p,
      blockquote,
      ul,
      ol,
      dl,
      li,
      table,
      pre {
        margin: 15px 0;
      }

      hr {
        border: 0 none;
        height: 4px;
        padding: 0;
      }

      ul,
      ol {
        padding-left: 30px;
      }

      ul :first-child,
      ol :first-child {
        margin-top: 0;
      }

      ul :last-child,
      ol :last-child {
        margin-bottom: 0;
      }

      dl {
        padding: 0;
      }

      dl dt {
        font-size: 14px;
        font-weight: bold;
        font-style: italic;
        padding: 0;
        margin: 15px 0 5px;
      }

      dl dt:first-child {
        padding: 0;
      }

      dl dt > :first-child {
        margin-top: 0;
      }

      dl dt > :last-child {
        margin-bottom: 0;
      }

      dl dd {
        margin: 0 0 15px;
        padding: 0 15px;
      }

      dl dd > :first-child {
        margin-top: 0;
      }

      dl dd > :last-child {
        margin-bottom: 0;
      }

      blockquote {
        padding: 0 1em;
        color: this.cssVar('color-muted');
        border-left: 0.25em solid ${this.cssVar('color-blockquote')};
      }

      blockquote > :first-child {
        margin-top: 0;
      }

      blockquote > :last-child {
        margin-bottom: 0;
      }

      table {
        overflow: auto;
        border-collapse: collapse;
        border-spacing: 0;
      }

      table td,
      table th {
        word-wrap: break-word;
        text-align: left;
        padding: 6px 13px;
        border: 1px solid ${this.cssVar('border-default')};
      }

      table tr:nth-child(2n) {
        background-color: ${this.cssVar('background-color-subtle')};
      }

      table tr th :first-child,
      table tr td :first-child {
        margin-top: 0;
      }

      table tr th :last-child,
      table tr td :last-child {
        margin-bottom: 0;
      }

      img {
        max-width: 100%;
      }

      code,
      tt {
        display: inline-block;
        padding: 3px 6px;
        border-radius: 12px;
        background-color: ${this.cssVar('background-code')};
        margin: 0 2px;
      }
    `,
  ]
  @property({type: String, attribute: true, reflect: true}) codeTheme: 'android' | 'default' = 'android'
  @property({type: String, attribute: true, reflect: true}) src?: string
  @property({type: String, attribute: true}) text?: string

  @state() content = ''

  /** @ignore */
  #parseMarkdown(text: string) {
    if (!md) {
      console.error('Libs not loaded')
      return
    }

    this.content = md.render(text)

    if (this.src) {
      cacheMap.set(this.src, this.content)
    }
  }

  /** @ignore */
  async #loadLibs() {
    if (md) return
    const [MD, hljs] = await Promise.all([import('markdown-it'), (await import('highlight.js')).default])

    md = new (MD as unknown as Constructor<MarkdownIt>)({
      breaks: true,
      html: true,
      linkify: true,
      typographer: true,
      langPrefix: 'code language-',
      highlight: (str: string, lang: string) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            const pre = hljs.highlight(str, {language: lang}).value
            const values = pre.split('\n')
            let result = ''
            for (let i = 0; i < values.length; i++) {
              if (i === values.length - 1) {
                break
              }
              result += `<span class = "line-counter">${i + 1}</span>` + values[i] + '\n'
            }
            return result + `<span class = "lang-name">${lang}</span>`
          } catch (e) {
            console.error(e)
          }
        }
        return ''
      },
    })
  }

  /** @ignore */
  async #renderOnConnect() {
    if (this.src) {
      const conntent = cacheMap.get(this.src || '')
      if (conntent) {
        this.content = conntent
        return
      }
    }

    await this.#loadLibs()

    if (this.src) {
      fetch(this.src)
        .then((r) => r.text())
        .then((r) => this.#parseMarkdown(r))
        .catch(console.error)
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.#renderOnConnect()
  }

  willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    if (_changedProperties.has('text')) {
      if (!this.text) {
        this.content = ''
      } else {
        this.#parseMarkdown(this.text)
      }
    }
  }

  /** @ignore */
  render() {
    return html`<div>${unsafeHTML(this.content)}</div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-markdown': LitMarkdown
  }
}
