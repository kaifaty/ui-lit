import '../dist/dialog';
import type { IDialogProps } from '../src/dialog';
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';


const open = () => {
    document.querySelector("lit-dialog").open();
}
const Link = (data: IDialogProps) => 
    html`
    <lit-button @click = "${open}">Open</lit-button>
    <lit-dialog 
        style = "margin-left: -15px;"
        ?useCancelBtn = "${data.useCancelBtn}"
        >
        <h2 slot = "header">Header</h2>
        <lit-header level = "5">Confirm otp please</lit-header>
        <lit-button slot = "footer" primary confirm>Confirm</lit-button>
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