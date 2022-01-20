import { expect, assert } from '@esm-bundle/chai';

import './index'

const getSelect = () => document.querySelector("lit-select")!;

const getButton = () => getSelect().shadowRoot?.querySelector("lit-button");

describe('Test Button', async () => {
    
    beforeEach(async () => {
        document.body.innerHTML = `<lit-select>
            <lit-option value = "1">1</lit-option>
            <lit-option value = "2">2</lit-option>
            <lit-option value = "3">3</lit-option>
            <lit-option value = "4">4</lit-option>
            <lit-option value = "5">5</lit-option>
        </lit-select>`;
    });
    
    it('is should init all options', async() => {
        const select = getSelect();
        expect(select.length).equal(5);
    });
    it('is should default value in empty string', async() => {
        const select = getSelect();
        expect(select.value).equal('');
    });
    it('is should possible to set value', async() => {
        const select = getSelect();
        select.value = '5';
        expect(select.options.find(it => it.selected)?.value).equal('5');
    });
    it('is should be move forward', async() => {
        const select = getSelect();
        getButton()!.dispatchEvent(new KeyboardEvent("keydown", {
            key: "ArrowDown",
            bubbles: true, 
            composed: true
        }));
        expect(select.value).equal('1');
    });
    it('is should be move back', async() => {
        const select = getSelect();
        select.value = '5';
        getButton()!.dispatchEvent(new KeyboardEvent("keydown", {
            key: "ArrowUp",
            bubbles: true, 
            composed: true
        }));
        expect(select.value).equal('4');
    });
    
    it('is should be focus', async() => {
        const select = getSelect();
        await new Promise(r => setTimeout(r, 0));
        select.focus();
        expect(select.isFocused).equal(true);
    });
    it('should close on key escape', async() => {
        const select = getSelect();
        select.open = true;
        getButton()!.dispatchEvent(new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true, 
            composed: true
        }))
        expect(select.open).equal(false);
    });
    it('should close on key tab', async() => {
        const select = getSelect();
        select.open = true;
        getButton()!.dispatchEvent(new KeyboardEvent("keydown", {
            key: "Tab",
            bubbles: true, 
            composed: true
        }))
        expect(select.open).equal(false);
    });
    it('should open on enter', async() => {
        const select = getSelect();
        await new Promise(r => setTimeout(r, 0));
        getButton()!.focus();
        getButton()!.dispatchEvent(new KeyboardEvent("keydown", {
            key: "Enter",
            bubbles: true, 
            composed: true
        }))
        expect(select.open).equal(true);
    });
    /*
    it('should moveDown by arrowDown', async() => {
        const select = getSelect();
        select.open = true;
        select.value = "1";
        await new Promise(r => setTimeout(r, 0));
        select.dispatchEvent(new KeyboardEvent("keydown", {
            key: "ArrowDown",
            bubbles: true, 
            composed: true
        }))
        expect(select.value).equal("2");
    });*/

})