import {assert, expect} from '@esm-bundle/chai'

import './index'

const getTextfield = () => document.querySelector('lit-textfield')!

describe('Test textfield', async () => {
    beforeEach(async () => {
        document.body.innerHTML = '<lit-textfield></lit-textfield>'
    })

    it('should contain icon slot', async() => {
        const textField = getTextfield()
        expect(textField.shadowRoot!.querySelector('slot[name=icon]')).exist
    })
    it('should set value', async() => {
        const textField = getTextfield()
        textField.value = 'test'
        await true
        expect((textField.shadowRoot!.querySelector('input') as any).value).equal('test')
    })
    it('should possible to focus', async() => {
        const textField = getTextfield()
        textField.focus()
        expect(textField.isFocused).equal(true)
    })
    it('should autofocus', async() => {
        document.body.innerHTML = '<lit-textfield autofocus></lit-textfield>'
        const textField = getTextfield()
        await true
        expect(textField.isFocused).equal(true)
    })
    it('should validate minValue', async() => {
        const textField = getTextfield()
        textField.minlength = 5
        textField.value = 'test'
        await true
        expect(textField.validationMessage).equal('Value is too short')
    })
    it('should validate maxValue', async() => {
        const textField = getTextfield()
        textField.maxlength = 3
        textField.value = 'test'
        await true
        expect(textField.validationMessage).equal('Value is too long')
    })
    it('should validate pattern', async() => {
        const textField = getTextfield()
        textField.pattern = '/test/'
        textField.value = 'test1'
        await true
        expect(textField.validationMessage).equal('Pattern /test/ error')
    })
    it('should use cancel button', async() => {
        const textField = getTextfield()
        textField.withCancalation = true
        textField.value = 'test'
        await true;
        (textField.shadowRoot?.querySelector('.cancel.icon') as HTMLElement)?.click()
        expect(textField.value).equal('')
    })
    it('should switch password visible', async() => {
        const textField = getTextfield()
        textField.type = 'password'
        await true;
        (textField.shadowRoot?.querySelector('.toggle-password') as HTMLElement)?.click()
        await true
        expect(textField.shadowRoot!.querySelector('input')?.type).equal('text')
    })
    it('should date accasable as number', async() => {
        const textField = getTextfield()
        textField.type = 'date'
        textField.value = '1970-01-01'
        
        await true
        expect(textField.valueAsNumber).equal(0)
    })
    it('should date accasable as Date', async() => {
        const textField = getTextfield()
        textField.type = 'date'
        textField.value = '1970-01-01'
        
        await true
        expect(textField.valueAsDate.toISOString()).equal(new Date('1970-01-01').toISOString())
    })
    it('should possible to set Date', async() => {
        const textField = getTextfield()
        textField.type = 'date'
        textField.valueAsDate = new Date('1970-01-01')
        await true
        expect(textField.valueAsNumber).equal(0)
    })
    it('should trigger changed CustomEvent', async() => {
        const textField = getTextfield()
        let value = ''
        textField.addEventListener('changed', ((e: CustomEvent) => {
            value = e.detail
        }) as EventListener)
        await true
        const input = textField.shadowRoot!.querySelector('input')!
        input.value = 'test'
        input.dispatchEvent(new Event('input'))
        
        await true
        expect(value).equal('test')
    })
    
})