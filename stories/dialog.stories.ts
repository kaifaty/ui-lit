import '../src/dialog';
import '../src/tooltip';
import '../src/range';
import '../src/header';
import type { IDialogProps } from '../src/dialog';
import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';


const open = () => {
    document.querySelector("#dialog-1").open();
}
const open2 = () => {
    document.querySelector("#dialog-2").open();
}

const onConfirm = (data: any) => {
    return new Promise(r => {
        setTimeout(() => {            
            r(data)
        }, 500);
    })
}
const onConfirmSecond = (data: any) => {
    return new Promise(r => {
        document.querySelector("lit-textfield")!.value = "New value";
        setTimeout(() => {            
            r(data)
        }, 2000);
    })
}
const Link = (data: IDialogProps) => 
    html`
    <lit-button @click = "${open}">Open</lit-button>
    
    <lit-dialog 
        .onConfirm = "${onConfirmSecond}" 
        id = "dialog-2">
        Now on confirm after 2sec we replate textfield value
        <lit-header slot = "header">Replace dialog</lit-header>
        <lit-button type = "submit" slot = "footer">Confirm</lit-button>
    </lit-dialog>
    <lit-dialog 
        id = "dialog-1"
        @dialogConfirm = "${() => alert("Confimed")}"
        .onConfirm = "${onConfirm}"
        ?useCancelBtn = "${data.useCancelBtn}">
            <lit-textfield name = "test" required minLength = "4" value = "default value"></lit-textfield>
            <lit-tooltip>
                <lit-icon icon = "help"></lit-icon>
                <div slot = "tooltip">Tooltip content text</div>
            </lit-tooltip>
            <div>
                <lit-header level = "5">Replace value with next dialog confirm</lit-header>
                <lit-button @click = "${open2}">Replace</lit-button>
            </div>
        <lit-header level = "2" slot = "header">Header</lit-header>
        <lit-button slot = "footer" primary type = "submit">Confirm</lit-button>

    </lit-dialog>`;


const Template: Story<Partial<IDialogProps>> = (args) => Link(args as IDialogProps);

export const Default = Template.bind({});
Default.args = {
    opened: true,
    useCancelBtn: true,
}
export default {
    title: 'Other/Dialog Element',
    
} as Meta;