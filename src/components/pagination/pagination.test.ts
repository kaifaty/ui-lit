import {assert, expect} from '@esm-bundle/chai'

import './index'

const getElement = () => document.querySelector('lit-pagination')!

describe('Base', async () => {
    let lastChangedEvent: CustomEvent | null = null

    const changed = (e: CustomEvent) => {
        lastChangedEvent = e
    }

    beforeEach(async () => {
        document.body.innerHTML = `<lit-pagination 
            pageLength = "5" 
            page = "0" 
            length = "25"></lit-pagination>`
        getElement().addEventListener('changed', changed as EventListener)
    })
    
    
    it('Should prevent set page < 0', () => {
        const pagination = getElement()
        pagination.prev()
        expect(pagination.page).equal(0)
    })
    it('Should be possible to increment page', () => {
        const pagination = getElement()
        pagination.next()
        expect(pagination.page).equal(1)
    })
    it('Increment must be limited', () => {
        const pagination = getElement()
        pagination.pageLength = 5
        pagination.page = 5
        pagination.length = 25
        pagination.next()
        expect(pagination.getPage()).equal(5)
    })
    it('Should be possible to decrement page', () => {
        const pagination = getElement()
        pagination.page = 2
        pagination.prev()
        expect(pagination.page).equal(1)
    })
    it('Sholud calc number of pages', () => {
        const pagination = getElement()
        pagination.pageLength = 5
        pagination.length = 25
        
        expect(pagination.pageCount).equal(5)
    })
    it('Sholud calc number of pages', () => {
        const pagination = getElement()
        pagination.pageLength = 5
        pagination.length = 22
        
        expect(pagination.pageCount).equal(5)
    })
    it('Sholud calc number of pages', () => {
        const pagination = getElement()
        pagination.pageLength = 5
        pagination.length = 1
        
        expect(pagination.pageCount).equal(1)
    })
    it('Sholud calc number of pages', () => {
        const pagination = getElement()
        pagination.pageLength = 5
        pagination.length = 1
        pagination.page = 15
        
        expect(pagination.getPage()).equal(1)
    })
    it('Shoud notify on change', () => {
        const pagination = getElement()
        pagination.page = 0
        pagination.next()
        
        expect(lastChangedEvent?.detail).equal(1)
    })
    it('Shoud recalc page after change length', () => {
        const pagination = getElement()
        pagination.length = 0
        pagination.page = 0
        pagination.length = 10
        //pagination.next();
        
        expect(pagination.page).equal(0)
    })
})