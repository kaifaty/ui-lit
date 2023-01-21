import {html} from 'lit'

import {Dialog} from '../../../../src/components/dialog'

const dialog = new Dialog({type: 'smart'})


const buyBtc = () => {
    dialog.open({
        header: 'BUY BTC',
        body: html`<lit-textfield placeholder = "Volume"></lit-textfield>`, 
        'footer': html`<lit-button size = "large" primary @click="${() => alert('TADAM')}">BUY BTC</lit-button>`, 
    })
    
}
const click = () => dialog.open({
    'header': html`Header`,
    'body': html`<lit-button @click="${click}">New Dialog</lit-button>`,
    'footer': html`<lit-button size = "large" primary @click="${buyBtc}">BUY BTC</lit-button>`,
})

export const DialogTemplate = html`<lit-button @click = "${click}">Dialog</lit-button>`






