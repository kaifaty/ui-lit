

import {observeLitElement} from '@kai/lit-store'
import {css, html, LitElement} from 'lit'

import {LitButton, LitCheckbox, LitHeader, LitMarkdown, LitNavBurger, LitTheme, LitTreeItem, LitTreeView, LitWcViewer} from '../../src'

//import {getPage, getPageContent, paths} from './router'

//const json = new URL('../../dist/custom-elements.json', import.meta.url) as unknown as string

LitMarkdown.define()
LitButton.define()
LitCheckbox.define()
LitTreeItem.define()
LitTreeView.define()
LitTheme.define()
LitNavBurger.define()
LitWcViewer.define()
LitHeader.define()

const logo = new URL('./logo.svg', import.meta.url) as unknown as string
const blacktocat = new URL('./assets/blacktocat.png', import.meta.url) as unknown as string


export class Doc extends observeLitElement(LitElement){
    static styles = css`
    :host{
        display: block;
    }
    `
    protected createRenderRoot() {
        return this
    }

    render() {
        return html`
        <lit-theme>
            <div class = "wrapper">
                <header>
                    <div>
                        <div>
                            <lit-header level = "1"><img src = "${logo}" style = "width: 40px; height: 40px;">&nbsp;UI Lit</lit-header>
                            <lit-header level = "5">Web-components UI library based on Lit 2</lit-header>
                        </div>
                        <div class = "buttons">
                            <lit-button primary 
                                        target="_blank"
                                        href = "https://github.com/kaifaty/ui-lit">
            
                                View on GitHub
                                <img width="16px" slot = 'icon-after' src = "${blacktocat}"/>
                            </lit-button>
                            <lit-button 
                                href = "https://github.com/kaifaty/ui-lit/archive/refs/heads/main.zip" 
                                >Download .zip</lit-button>
                        </div>
                    </div>
                    <lit-theme-switcher></lit-theme-switcher>
                </header>
                <main>
                    <lit-wc-viewer src = "/custom-elements.json"></lit-wc-viewer></lit-wc-viewer>
                </main>
            </div>
            <lit-nav-burger></lit-nav-burger>
            
        </lit-theme>
        `
    }
}

if(!customElements.get('ui-lit-doc')){
    customElements.define('ui-lit-doc', Doc)
}
