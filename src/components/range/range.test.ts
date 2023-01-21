import {assert, expect} from '@esm-bundle/chai'

import './index'
const getRangeFiled = () => document.querySelector('lit-range')!

describe('Test range', async () => {
    beforeEach(async () => {
        document.body.innerHTML = '<lit-range></lit-range>'
    })

    it('should calc percent', async() => {
        const range = getRangeFiled()        
        range.min = 0
        range.max = 100
        range.valueAsNumber = 50
        expect(range.percent).equal(50)
    })
    it('should calc percent from min', async() => {
        const range = getRangeFiled()        
        range.startFromMin = true
        range.min = 50
        range.max = 100
        range.valueAsNumber = 75
        expect(range.percent).equal(50)
    })
    it('should calc offset from min', async() => {
        const range = getRangeFiled()        
        range.startFromMin = true
        range.min = 50
        range.max = 100
        range.valueAsNumber = 50
        await new Promise(r => setTimeout(r, 0))
        expect(range.offsetX).equal(0)
    })
    
    it('should recalc by min value', async() => {
        const range = getRangeFiled()        
        range.min = 50
        range.max = 100
        range.valueAsNumber = 20
        await new Promise(r => setTimeout(r, 0))
        expect(range.valueAsNumber).equal(50)
    })
    
    it('should recalc by max value', async() => {
        const range = getRangeFiled()        
        range.min = 50
        range.max = 100
        range.valueAsNumber = 120
        await new Promise(r => setTimeout(r, 0))
        expect(range.valueAsNumber).equal(100)
    })
})