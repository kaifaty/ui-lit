import {expect, should} from '@esm-bundle/chai'
import {delay} from '@kai/utils'

import {Dialog} from './adapter'

const dialog = new Dialog()

const getForm = () => document.querySelector('lit-dialog')?.shadowRoot?.querySelector<HTMLElement>('lit-form')
const getCloseButton = () => getForm()?.querySelector('lit-modal')?.shadowRoot?.querySelector<HTMLDivElement>('.close')

const isVisible = () => getForm()?.classList.contains('visible')
const isClosing = () => getForm()?.classList.contains('closing')

describe('Test dialogs', async () => {
    it('should exist dialog', async() => {        
        should().exist(document.querySelector('lit-dialog'))
    })
    it('should has visible class when open at lit-form element', async() => {
        dialog.open({})
        await delay(1)
        expect(isVisible()).equal(true)
    })
    it('should possible to close dialog by method', async() => {
        dialog.open({})
        await delay(1)
        await dialog.close()
        expect(isClosing()).equal(true)
        await delay(400)
        expect(isClosing()).equal(false)
        expect(isVisible()).equal(false)
    })
    it('should possible to close dialog by button', async() => {
        dialog.open({})
        await delay(1)
        getCloseButton()?.click()
        await delay(1)
        expect(isClosing()).equal(true)
    })
})
