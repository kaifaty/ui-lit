import {css, html, LitElement} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'

import {formAssociated} from '../../mixins/form-associated'
import {labled} from '../../mixins/labled'
import '../button/button.component'
import '../text'

@customElement('lit-file')
export class LitFile extends labled(formAssociated(LitElement)){
    static styles = css`
    :host{
        display: inline-block;
        position: relative;
    }
    input{
        display: none;
    }
    lit-button{
        width: 100%;
    }
    .filename{
        position: absolute;
        display: block;
        left: 50%;
        top: -1px;
        transform: translate(-50%, -50%);
        z-index: 1;
        font-size: 0.9rem;
        padding: 1px 10px;
        backdrop-filter: blur(3px);
    }
    `
    @property({type: String}) accept = 'text/plain'
    @property({type: String}) label = ''
    @property({type: String}) value = ''
    @state() fileName = ''
    
    #onFileChange(){
        const input = this.shadowRoot?.querySelector('input')
        
        const file = input?.files?.[0]
        if(!file){
            throw new Error('File not provided')
        }
        this.fileName = file.name
        const reader = new FileReader()
        
        reader.onload = () => {
            this.value = reader.result as string
        }
        reader.onerror = () => { 
            this.value = ''
        }
        reader.readAsText(file, 'UTF-8')
    }
    click(): void {
        const input = this.shadowRoot?.querySelector('input')
        input?.click()
    }
    protected render(): unknown {
        return html`
        <input 
            class = "none"
            type = "file" 
            accept="${this.accept}"
            @change = "${this.#onFileChange}"/>
        <lit-text class = "filename">${this.fileName}</lit-text>
        <lit-button @click = "${this.click}" size = "large">${this.label}</lit-button>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'lit-file': LitFile;
    }
    
}