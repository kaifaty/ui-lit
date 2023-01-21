import {expect} from '@esm-bundle/chai'


import './index'

const getNymberFiled = () => document.querySelector('lit-numberfield')!

describe('Test number', async () => {
    beforeEach(async () => {
        document.body.innerHTML = '<lit-numberfield></lit-numberfield>'
    })

    it('should contain icon slot', async() => {
        const number = getNymberFiled()
        expect(number.shadowRoot!.querySelector('slot[name=icon]')).exist
    })
    it('should validate min value', async() => {
        const number = getNymberFiled()
        number.min = 10
        number.valueAsNumber = 5
        await true
        expect(number.checkValidity()).equal(false)
    })
    it('should validate min value', async() => {
        const number = getNymberFiled()
        number.max = 20
        number.valueAsNumber = 22
        await true
        expect(number.checkValidity()).equal(false)
    })
    it('should validate in range of min max', async() => {
        const number = getNymberFiled()
        number.min = 10
        number.max = 20
        number.valueAsNumber = 15
        await true
        expect(number.checkValidity()).equal(true)
    })
    it('should replace "," to "."', async() => {
        const number = getNymberFiled()
        number.value = '0,123'
        await true
        expect(number.value).equal('0.123')
    })
    it('should place in step', async() => {
        const number = getNymberFiled()
        number.decimals = 2
        number.value = '0.123123'
        await true
        expect(number.value).equal('0.12')
    })
    it('should possible to input zeroes after point by keyboard, for example: 0.0001 ', async() => {
        const number = getNymberFiled()
        number.value = '0.000'
        await true
        expect(number.value).equal('0.000')
    })
    it('should possible to input zeroes after point by keyboard, for example: 0.0001 ', async() => {
        const number = getNymberFiled()
        number.value = '1.000'
        await true
        expect(number.value).equal('1.000')
    })
    it('should save minus', async() => {
        const number = getNymberFiled()
        number.decimals = 1
        number.value = '-0.5'
        await true
        expect(number.value).equal('-0.5')
    })
    it('should possible set as Number', async() => {
        const number = getNymberFiled()
        number.decimals = 0
        number.valueAsNumber = 1
        await true
        expect(number.value).equal('1')
    })
    it('should zero number by equal empty string', async() => {
        const number = getNymberFiled()
        number.decimals = 2
        number.valueAsNumber = 0
        await true
        expect(number.value).equal('')
    })
    it('should splice zeroes when set as number', async() => {
        const number = getNymberFiled()
        number.decimals = 2
        number.valueAsNumber = 1
        await true
        expect(number.value).equal('1')
    })
    it('should prevent input not Numbers', async() => {
        const number = getNymberFiled()
        number.decimals = 2
        number.value = '123ImNotNumber'
        await true
        expect(number.value).equal('123')
    })
    it('should possible remove by cancel icon', async() => {
        const number = getNymberFiled()
        number.value = '4452'
        number.useCancelButton = true
        await true;
        (number.shadowRoot?.querySelector('.danger[icon=remove]') as HTMLElement)?.click()
        await true

        expect(number.value).equal('')
    })
})