import { expect, assert } from '@esm-bundle/chai';

import './index'

const getTextfield = () => document.querySelector("lit-number")!;

describe('Test number', async () => {
    beforeEach(async () => {
        document.body.innerHTML = `<lit-number></lit-number>`;
    });

    it('should contain icon slot', async() => {
        const textField = getTextfield();
        expect(textField.shadowRoot!.querySelector(`slot[name=icon]`)).exist;
    });
});