import { expect, assert } from '@esm-bundle/chai';

import './index'

const getButton = () => document.querySelector("lit-button")!;
describe('Base', async () => {
    
    
    beforeEach(async () => {
        document.body.innerHTML = `<lit-button>Button</lit-button>`;
    });
    
    it('is text Transformed', () => {
        const button = getButton();
        button.innerText = "button";
        expect(button.innerText).equal('button'.toUpperCase());
    });
    it('should spin', async() => {
        const button = getButton();
        button.loading = true;
        await (() => setTimeout(() => 0))();
        expect(button.shadowRoot!.querySelector("lit-spinner")).exist;
    });
    it('should notify on click', async() => {
        const button = getButton();
        button.notifyOnClick = true;
        button.click();
        await (() => setTimeout(() => 0))();
        expect(button.shadowRoot!.querySelector("lit-icon[icon=checkmark]")).exist;
    });
    it('should be focusable', async() => {
        const button = getButton();      
        button.focus();
        expect(button.shadowRoot!.querySelector(".wrapper:focus")).exist;
    });
    it('should width be same after ckecked', async() => {
        const button = getButton();  
        button.notifyOnClick = true;
        const widthBefore = button.clientWidth    
        button.click();
        await (() => setTimeout(() => 0))();
        expect(button.clientWidth).equal(widthBefore);
    });
    it('should width be same after loading', async() => {
        const button = getButton();  
        const widthBefore = button.clientWidth    
        button.loading = true;
        await (() => setTimeout(() => 0))();
        expect(button.clientWidth).equal(widthBefore);
    });
});