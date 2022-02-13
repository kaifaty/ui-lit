import { expect } from '@esm-bundle/chai';
import './index';
import '../number';
import '../button';

const getDialog = () => document.querySelector("lit-dialog")!;

beforeEach(async () => {
    document.body.innerHTML = `<lit-dialog>
        <lit-numberfield name = "test" value = "555"></lit-numberfield>
        <lit-button type = "submit"></lit-button>
    </lit-dialog>`;
});


describe('Test dialog', async () => {
    it('should raise dialogOpened event', async() => {
        const dialog = getDialog();
        let opened = false;
        dialog.addEventListener("dialogOpened", () => {
            opened = true;
        })
        dialog.open();
        await 1;
        expect(opened).equal(true);
    });
    it('should raise dialogClose event', async() => {
        const dialog = getDialog();
        let closed = false;
        dialog.addEventListener("dialogClose", () => {
            closed = true;
        })
        dialog.open();
        dialog.close();
        await 1;
        expect(closed).equal(true);
    });
    it('should raise dialogConfirm event', async() => {
        const dialog = getDialog();
        let confirmed = false;
        dialog.addEventListener("dialogConfirm", () => {
            confirmed = true;
        })
        dialog.open();
        await dialog.confirm();
        expect(confirmed).equal(true);
    });
    it('should work reset on close dialog', async() => {
        const dialog = getDialog();
        const numberfield = dialog.querySelector("lit-numberfield");
        dialog.open();
        numberfield!.value = "777";
        dialog.close();
        await new Promise(r => setTimeout(r));
        expect(numberfield?.value).equal("555");
    });
})