import '../dist/dialog';
import '../dist/dialog/test-dialog';
import type { IDialogProps } from '../src/dialog';
import { html } from 'lit';
import { Story, Meta } from '@storybook/web-components';


const open = () => {
    document.querySelector("dialog-element").open();
}
const Link = (data: IDialogProps) => 
    html`
    <button-element @click = "${open}">Open</button-element>
    <dialog-element 
        style = "margin-left: -15px;"
        ?useCancelBtn = "${data.useCancelBtn}"
        >
        <h2 slot = "header">Header</h2>
        <header-element level = "5">Confirm otp please</header-element>
        <test-dialog></test-dialog>
        <button-element slot = "footer" primary confirm>Confirm</button-element>
    </dialog-element>`;


const Template: Story<Partial<IDialogProps>> = (args) => Link(args as IDialogProps);

export const Default = Template.bind({});
Default.args = {
    opened: true,
    useCancelBtn: true,
}
export default {
    title: 'Other/Dialog Element',
    
} as Meta;