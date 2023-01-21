import {assert, expect} from '@esm-bundle/chai'

import './index'
import '../checkbox/index'
import '../textfield/index'


const getLabel = () => document.querySelector('lit-label')!
const getCheckbox = () => document.querySelector('lit-checkbox')!
const getText = () => document.querySelector('lit-textfield')!

describe('Test Checkbox', async () => {
    
    beforeEach(async () => {
        document.body.innerHTML = '<lit-label></lit-label>'
    })

    it('should labled', async() => {
        document.body.innerHTML = '<lit-label for = "test">Label</lit-label><lit-checkbox id = "test"></lit-checkbox>'
        const checbox = getCheckbox()
        await true
        expect(getLabel().labled).equal(checbox)
    })
    it('should contain labels buy adding "for"', async() => {
        document.body.innerHTML = '<lit-label for = "test">Label</lit-label><lit-checkbox id = "test"></lit-checkbox>'
        const checbox = getCheckbox()
        await true
        expect(checbox.labels.length).equal(1)
    })
    it('should contain labels by container', async() => {
        document.body.innerHTML = '<lit-label>Label<lit-checkbox></lit-checkbox></lit-label>'
        const checbox = getCheckbox()
        await true
        expect(checbox.labels.length).equal(1)
    })
    it('should contain only one label by container and for', async() => {
        document.body.innerHTML = '<lit-label for = "test">Label<lit-checkbox id = "test"></lit-checkbox></lit-label>'
        const checbox = getCheckbox()
        await true
        expect(checbox.labels.length).equal(1)
    })
    it('should change checked by click on label', async() => {
        document.body.innerHTML = '<lit-label for = "test">Label</lit-label><lit-checkbox id = "test"></lit-checkbox>'
        const checbox = getCheckbox()
        checbox.checked = false
        await true
        getLabel().click()
        expect(checbox.checked).equal(true)
    })
    it('should focus on field', async() => {
        document.body.innerHTML = '<lit-label for = "test">Label</lit-label><lit-textfield id = "test"></lit-textfield>'
        const checbox = getText()
        await true
        getLabel().click()
        expect(checbox.isFocused).equal(true)
    })
})