import {statableLit} from '@statx/lit'
import {css, html, LitElement} from 'lit'
import {WcApiViewer} from '@ui-wc/api-viewer'
import {WcHeader} from '@ui-wc/header'

// import {LitButton} from '@ui-lit/button'
// import {LitForm} from '@ui-lit/form'
/*
import {LitButton, LitCheckbox, LitHeader, LitMarkdown, LitNavBurger, LitTheme, LitTreeItem, LitTreeView, LitWcViewer} from '../../src'
*/
//import {getPage, getPageContent, paths} from './router'

//const json = new URL('../../dist/custom-elements.json', import.meta.url) as unknown as string
// LitButton.define()
/*
LitMarkdown.define()
LitCheckbox.define()
LitTreeItem.define()
LitTreeView.define()
LitTheme.define()
LitNavBurger.define()
LitWcViewer.define()
LitHeader.define()
*/
WcApiViewer.define()
WcHeader.define()

const json = new URL('../custom-elements.json', import.meta.url) as unknown as string
const logo = new URL('./logo.png', import.meta.url) as unknown as string
const blacktocat = new URL('./assets/blacktocat.png', import.meta.url) as unknown as string

export class Doc extends statableLit(LitElement) {
  static styles = css`
    :host {
      display: block;
    }
    wc-header {
      margin: 0;
    }
  `
  protected createRenderRoot() {
    return this
  }

  render() {
    return html`
      <lit-theme>
        <div class="wrapper">
          <header>
            <div>
              <div>
                <wc-header level="1"><img src="${logo}" style="width: 80px; height: 80px;" />UI WC</wc-header>
                <wc-header level="5">Native Web-components UI library</wc-header>
              </div>
              <div class="buttons">
                <lit-button primary target="_blank" href="https://github.com/kaifaty/ui-lit">
                  View on GitHub
                  <img width="16px" slot="icon-after" src="${blacktocat}" />
                </lit-button>
                <lit-button href="https://github.com/kaifaty/ui-lit/archive/refs/heads/main.zip">Download .zip</lit-button>
              </div>
            </div>
            <lit-theme-switcher></lit-theme-switcher>
          </header>
          <main>
            <wc-api-viewer src="${json}"></wc-api-viewer>
          </main>
        </div>
        <lit-nav-burger></lit-nav-burger>
      </lit-theme>
    `
  }
}

if (!customElements.get('ui-lit-doc')) {
  customElements.define('ui-lit-doc', Doc)
}
