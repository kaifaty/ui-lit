import {statableLit} from '@statx/lit'
import {css, html, LitElement} from 'lit'
import {WcApiViewer} from '@ui-wc/api-viewer'
import {WcHeader} from '@ui-wc/header'
import {WcButton} from '@ui-wc/button'
import {pallets} from '@ui-wc/utils'
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
  pallets(data: any) {
    if (!data) return
    return Object.keys(data).map((key) => {
      const value = data[key]
      return html`<div class="pallete-block" data-key="${key}" style="background: ${value}"></div>`
    })
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
                  GitHub
                  <img width="24px" slot="suffix" src="${blacktocat}" />
                </wc-button>
              </div>
            </div>
            <lit-theme-switcher></lit-theme-switcher>
          </header>
          <main>
            <div class="pallets">${this.pallets(pallets.neutral)}</div>
            <div class="pallets">${this.pallets(pallets.primary)}</div>
            <div class="pallets">${this.pallets(pallets.danger)}</div>
            <div class="pallets">${this.pallets(pallets.warning)}</div>
            <div class="pallets">${this.pallets(pallets.success)}</div>
            <wc-api-viewer src="/custom-elements.json"></wc-api-viewer>
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
