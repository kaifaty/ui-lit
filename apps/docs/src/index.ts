import {statableLit} from '@statx/lit'
import {css, html, LitElement} from 'lit'
import {WcApiViewer} from '@ui-wc/api-viewer'
import {WcHeader} from '@ui-wc/header'
import {WcButton} from '@ui-lit/button'

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
WcButton.define()

const json = new URL('../custom-elements.json', import.meta.url) as unknown as string
const logo = new URL('./logo.svg', import.meta.url) as unknown as string
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
              <div class="logo-wrapper">
                <img src="${logo}" class="logo" />
                <div class="v-center">
                  <wc-header level="1">Wuik</wc-header>
                  <wc-header level="4">Web-components UI kit</wc-header>
                </div>
              </div>
              <div class="buttons">
                <wc-button variant="primary" target="_blank" href="https://github.com/kaifaty/ui-lit">
                  View on GitHub
                  <img width="24px" slot="suffix" src="${blacktocat}" />
                </wc-button>
                <wc-button variant="text">Test button</wc-button>
                <wc-button>No variant button</wc-button>
                <wc-button variant="default" href="https://github.com/kaifaty/ui-lit/archive/refs/heads/main.zip">Download .zip</wc-button>
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

if (!customElements.get('wuik-doc')) {
  customElements.define('wuik-doc', Doc)
}
